export class CreateDeploymentDto {
  agentTemplateId: string;
  deploymentName: string;
  parameterValues: Record<string, any>;
}

export class ExecuteDeploymentDto {
  inputParameters?: Record<string, any>;
}
