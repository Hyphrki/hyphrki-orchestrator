export declare class CreateDeploymentDto {
    agentTemplateId: string;
    deploymentName: string;
    parameterValues: Record<string, any>;
}
export declare class ExecuteDeploymentDto {
    inputParameters?: Record<string, any>;
}
