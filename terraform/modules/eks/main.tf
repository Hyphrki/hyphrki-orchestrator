module "eks" {
  source  = "terraform-aws-modules/eks/aws"
  version = "~> 19.0"

  cluster_name    = var.cluster_name
  cluster_version = var.cluster_version

  vpc_id     = var.vpc_id
  subnet_ids = var.subnet_ids

  # Cluster access
  cluster_endpoint_private_access = true
  cluster_endpoint_public_access  = true

  # Node groups
  eks_managed_node_groups = var.node_groups

  # Addons
  cluster_addons = {
    coredns = {
      most_recent = true
    }
    kube-proxy = {
      most_recent = true
    }
    vpc-cni = {
      most_recent = true
    }
    aws-ebs-csi-driver = {
      most_recent = true
    }
    aws-efs-csi-driver = {
      most_recent = true
    }
  }

  # IAM roles for service accounts
  enable_irsa = true

  # CloudWatch logging
  cluster_enabled_log_types = [
    "api",
    "audit",
    "authenticator",
    "controllerManager",
    "scheduler"
  ]

  tags = var.tags
}

# IAM role for GPU node group
resource "aws_iam_role_policy_attachment" "gpu_policy" {
  for_each = { for k, v in var.node_groups : k => v if contains(keys(v), "taints") }

  policy_arn = "arn:aws:iam::aws:policy/AmazonEC2ContainerServiceforEC2Role"
  role       = module.eks.eks_managed_node_groups[each.key].iam_role_name
}

# GPU policy for node groups with GPUs
resource "aws_iam_role_policy_attachment" "gpu_optimized_policy" {
  for_each = { for k, v in var.node_groups : k => v if contains(keys(v), "taints") }

  policy_arn = "arn:aws:iam::aws:policy/AmazonEC2ContainerServiceforEC2Role"
  role       = module.eks.eks_managed_node_groups[each.key].iam_role_name
}
