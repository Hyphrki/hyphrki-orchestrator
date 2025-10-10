-- CreateEnum
CREATE TYPE "PublicationStatus" AS ENUM ('draft', 'published', 'unpublished');

-- CreateEnum
CREATE TYPE "PricingTier" AS ENUM ('free', 'basic', 'pro', 'enterprise');

-- CreateEnum
CREATE TYPE "FieldType" AS ENUM ('text', 'password', 'number', 'email', 'url', 'select', 'textarea', 'checkbox', 'date');

-- CreateEnum
CREATE TYPE "DeploymentStatus" AS ENUM ('active', 'deprecated', 'archived');

-- CreateEnum
CREATE TYPE "ExecutionStatus" AS ENUM ('queued', 'running', 'completed', 'failed', 'timeout');

-- CreateEnum
CREATE TYPE "OutputSource" AS ENUM ('finalResult', 'specificNodes', 'customAggregation');

-- CreateEnum
CREATE TYPE "DisplayFormat" AS ENUM ('raw', 'formatted', 'table', 'chart', 'custom');

-- CreateTable
CREATE TABLE "agent_templates" (
    "id" UUID NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" TEXT NOT NULL,
    "category" VARCHAR(100) NOT NULL,
    "tags" TEXT[],
    "n8nWorkflowId" VARCHAR(255),
    "n8nWorkflowJson" JSONB NOT NULL,
    "version" VARCHAR(20) NOT NULL,
    "publicationStatus" "PublicationStatus" NOT NULL,
    "pricingTier" "PricingTier" NOT NULL,
    "createdById" UUID NOT NULL,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "publishedAt" TIMESTAMP(6),
    "unpublishedAt" TIMESTAMP(6),

    CONSTRAINT "agent_templates_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "agent_parameter_configs" (
    "id" UUID NOT NULL,
    "agentTemplateId" UUID NOT NULL,
    "parameterName" VARCHAR(255) NOT NULL,
    "parameterPath" VARCHAR(500) NOT NULL,
    "fieldType" "FieldType" NOT NULL,
    "displayLabel" VARCHAR(255) NOT NULL,
    "helpText" TEXT,
    "defaultValue" VARCHAR(500),
    "isRequired" BOOLEAN NOT NULL DEFAULT true,
    "isSensitive" BOOLEAN NOT NULL DEFAULT false,
    "validationRules" JSONB,
    "selectOptions" JSONB,
    "order" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "agent_parameter_configs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "output_display_configs" (
    "id" UUID NOT NULL,
    "agentTemplateId" UUID NOT NULL,
    "outputSource" "OutputSource" NOT NULL,
    "displayFormat" "DisplayFormat" NOT NULL,
    "nodeIds" TEXT[],
    "fieldMappings" JSONB,
    "filterRules" JSONB,
    "customTemplate" TEXT,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "output_display_configs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_agent_deployments" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "agentTemplateId" UUID NOT NULL,
    "deploymentName" VARCHAR(255) NOT NULL,
    "parameterValues" JSONB NOT NULL,
    "deploymentStatus" "DeploymentStatus" NOT NULL,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deprecatedAt" TIMESTAMP(6),
    "archivedAt" TIMESTAMP(6),
    "lastExecutionAt" TIMESTAMP(6),
    "totalExecutions" INTEGER NOT NULL DEFAULT 0,
    "agentTemplateVersion" VARCHAR(20) NOT NULL,

    CONSTRAINT "user_agent_deployments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "agent_executions" (
    "id" UUID NOT NULL,
    "deploymentId" UUID NOT NULL,
    "n8nExecutionId" VARCHAR(255) NOT NULL,
    "status" "ExecutionStatus" NOT NULL,
    "startedAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "stoppedAt" TIMESTAMP(6),
    "inputParameters" JSONB NOT NULL,
    "executionOutput" JSONB,
    "rawOutput" JSONB,
    "errorMessage" TEXT,
    "failedNodeId" VARCHAR(255),
    "retryCount" INTEGER NOT NULL DEFAULT 0,
    "userId" UUID NOT NULL,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "agent_executions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "agent_templates_publicationStatus_idx" ON "agent_templates"("publicationStatus");

-- CreateIndex
CREATE INDEX "agent_templates_category_idx" ON "agent_templates"("category");

-- CreateIndex
CREATE INDEX "agent_templates_createdById_idx" ON "agent_templates"("createdById");

-- CreateIndex
CREATE INDEX "agent_templates_publishedAt_idx" ON "agent_templates"("publishedAt");

-- CreateIndex
CREATE INDEX "agent_parameter_configs_agentTemplateId_order_idx" ON "agent_parameter_configs"("agentTemplateId", "order");

-- CreateIndex
CREATE INDEX "agent_parameter_configs_isSensitive_idx" ON "agent_parameter_configs"("isSensitive");

-- CreateIndex
CREATE UNIQUE INDEX "output_display_configs_agentTemplateId_key" ON "output_display_configs"("agentTemplateId");

-- CreateIndex
CREATE INDEX "user_agent_deployments_userId_deploymentStatus_idx" ON "user_agent_deployments"("userId", "deploymentStatus");

-- CreateIndex
CREATE INDEX "user_agent_deployments_deploymentStatus_idx" ON "user_agent_deployments"("deploymentStatus");

-- CreateIndex
CREATE INDEX "user_agent_deployments_deprecatedAt_idx" ON "user_agent_deployments"("deprecatedAt");

-- CreateIndex
CREATE INDEX "user_agent_deployments_agentTemplateId_idx" ON "user_agent_deployments"("agentTemplateId");

-- CreateIndex
CREATE INDEX "agent_executions_deploymentId_startedAt_idx" ON "agent_executions"("deploymentId", "startedAt" DESC);

-- CreateIndex
CREATE INDEX "agent_executions_n8nExecutionId_idx" ON "agent_executions"("n8nExecutionId");

-- CreateIndex
CREATE INDEX "agent_executions_status_idx" ON "agent_executions"("status");

-- CreateIndex
CREATE INDEX "agent_executions_userId_startedAt_idx" ON "agent_executions"("userId", "startedAt" DESC);

-- CreateIndex
CREATE INDEX "agent_executions_startedAt_idx" ON "agent_executions"("startedAt");

-- AddForeignKey
ALTER TABLE "agent_templates" ADD CONSTRAINT "agent_templates_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "agent_parameter_configs" ADD CONSTRAINT "agent_parameter_configs_agentTemplateId_fkey" FOREIGN KEY ("agentTemplateId") REFERENCES "agent_templates"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "output_display_configs" ADD CONSTRAINT "output_display_configs_agentTemplateId_fkey" FOREIGN KEY ("agentTemplateId") REFERENCES "agent_templates"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_agent_deployments" ADD CONSTRAINT "user_agent_deployments_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_agent_deployments" ADD CONSTRAINT "user_agent_deployments_agentTemplateId_fkey" FOREIGN KEY ("agentTemplateId") REFERENCES "agent_templates"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "agent_executions" ADD CONSTRAINT "agent_executions_deploymentId_fkey" FOREIGN KEY ("deploymentId") REFERENCES "user_agent_deployments"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "agent_executions" ADD CONSTRAINT "agent_executions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
