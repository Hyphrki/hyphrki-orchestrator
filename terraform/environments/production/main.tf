terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
    kubernetes = {
      source  = "hashicorp/kubernetes"
      version = "~> 2.0"
    }
    helm = {
      source  = "hashicorp/helm"
      version = "~> 2.0"
    }
  }

  backend "s3" {
    bucket = "orchestrator-terraform-state"
    key    = "production/terraform.tfstate"
    region = "us-east-1"
  }
}

provider "aws" {
  region = var.aws_region
}

provider "kubernetes" {
  config_path = "~/.kube/config"
}

provider "helm" {
  kubernetes {
    config_path = "~/.kube/config"
  }
}

# VPC and Networking
module "vpc" {
  source = "../../modules/vpc"

  name = "orchestrator-prod"
  cidr = "10.0.0.0/16"

  azs             = ["${var.aws_region}a", "${var.aws_region}b", "${var.aws_region}c"]
  private_subnets = ["10.0.1.0/24", "10.0.2.0/24", "10.0.3.0/24"]
  public_subnets  = ["10.0.101.0/24", "10.0.102.0/24", "10.0.103.0/24"]

  enable_nat_gateway = true
  single_nat_gateway = false

  tags = {
    Environment = "production"
    Project     = "orchestrator"
  }
}

# EKS Cluster
module "eks" {
  source = "../../modules/eks"

  cluster_name    = "orchestrator-prod"
  cluster_version = "1.28"

  vpc_id     = module.vpc.vpc_id
  subnet_ids = module.vpc.private_subnets

  # GPU node group for AI workloads
  node_groups = {
    general = {
      instance_types = ["m6i.large", "m6i.xlarge"]
      min_size       = 3
      max_size       = 10
      desired_size   = 3
    }

    gpu = {
      instance_types = ["g4dn.xlarge", "g4dn.2xlarge"]
      min_size       = 0
      max_size       = 5
      desired_size   = 1

      taints = [{
        key    = "nvidia.com/gpu"
        value  = "present"
        effect = "NO_SCHEDULE"
      }]
    }
  }

  tags = {
    Environment = "production"
    Project     = "orchestrator"
  }
}

# RDS PostgreSQL
module "rds" {
  source = "../../modules/rds"

  identifier = "orchestrator-prod"

  engine         = "postgres"
  engine_version = "15.4"
  instance_class = "db.r6g.large"

  allocated_storage = 100
  storage_type      = "gp3"

  db_name  = "orchestrator_prod"
  username = "orchestrator"
  password = var.db_password
  port     = 5432

  vpc_security_group_ids = [module.rds_security_group.security_group_id]
  subnet_ids             = module.vpc.private_subnets

  backup_retention_period = 30
  backup_window           = "03:00-04:00"
  maintenance_window      = "sun:04:00-sun:05:00"

  tags = {
    Environment = "production"
    Project     = "orchestrator"
  }
}

# ElastiCache Redis
module "elasticache" {
  source = "../../modules/elasticache"

  cluster_id      = "orchestrator-prod"
  engine          = "redis"
  node_type       = "cache.t3.medium"
  num_cache_nodes = 1
  engine_version  = "7.0"

  subnet_ids             = module.vpc.private_subnets
  vpc_security_group_ids = [module.elasticache_security_group.security_group_id]

  tags = {
    Environment = "production"
    Project     = "orchestrator"
  }
}

# S3 buckets
module "s3" {
  source = "../../modules/s3"

  bucket_names = [
    "orchestrator-prod-workflows",
    "orchestrator-prod-logs",
    "orchestrator-prod-backups"
  ]

  tags = {
    Environment = "production"
    Project     = "orchestrator"
  }
}

# Load Balancer
module "alb" {
  source = "../../modules/alb"

  name    = "orchestrator-prod"
  vpc_id  = module.vpc.vpc_id
  subnets = module.vpc.public_subnets

  certificate_arn = module.acm.certificate_arn

  tags = {
    Environment = "production"
    Project     = "orchestrator"
  }
}

# Route 53
module "route53" {
  source = "../../modules/route53"

  domain_name = var.domain_name
  alb_dns_name = module.alb.alb_dns_name
  alb_zone_id  = module.alb.alb_zone_id

  tags = {
    Environment = "production"
    Project     = "orchestrator"
  }
}

# Security Groups
module "rds_security_group" {
  source = "../../modules/security_group"

  name        = "orchestrator-rds-prod"
  description = "Security group for RDS PostgreSQL"
  vpc_id      = module.vpc.vpc_id

  ingress_rules = [
    {
      from_port   = 5432
      to_port     = 5432
      protocol    = "tcp"
      cidr_blocks = module.vpc.private_subnets_cidr_blocks
    }
  ]
}

module "elasticache_security_group" {
  source = "../../modules/security_group"

  name        = "orchestrator-elasticache-prod"
  description = "Security group for ElastiCache Redis"
  vpc_id      = module.vpc.vpc_id

  ingress_rules = [
    {
      from_port   = 6379
      to_port     = 6379
      protocol    = "tcp"
      cidr_blocks = module.vpc.private_subnets_cidr_blocks
    }
  ]
}

# ACM Certificate
module "acm" {
  source = "../../modules/acm"

  domain_name = var.domain_name
  zone_id     = module.route53.zone_id

  tags = {
    Environment = "production"
    Project     = "orchestrator"
  }
}

# Outputs
output "cluster_endpoint" {
  description = "EKS cluster endpoint"
  value       = module.eks.cluster_endpoint
}

output "cluster_name" {
  description = "EKS cluster name"
  value       = module.eks.cluster_name
}

output "database_endpoint" {
  description = "RDS database endpoint"
  value       = module.rds.db_instance_endpoint
}

output "redis_endpoint" {
  description = "ElastiCache Redis endpoint"
  value       = module.elasticache.cluster_address
}

output "alb_dns_name" {
  description = "Application Load Balancer DNS name"
  value       = module.alb.alb_dns_name
}
