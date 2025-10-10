export interface DetectedParameter {
    name: string;
    path: string;
    defaultValue?: any;
    isRequired?: boolean;
}
export interface ParsedWorkflow {
    nodes: any[];
    connections: any;
    parameters: DetectedParameter[];
    triggers: any[];
}
export declare class N8NWorkflowParserService {
    private readonly MAX_WORKFLOW_SIZE;
    validateWorkflowSize(workflowJson: string): void;
    validateWorkflowStructure(workflow: any): void;
    parseWorkflow(workflowJson: string): ParsedWorkflow;
    private extractParameters;
    private extractNodeParameters;
    private isTemplateVariable;
    private extractVariableName;
    private extractTriggers;
}
