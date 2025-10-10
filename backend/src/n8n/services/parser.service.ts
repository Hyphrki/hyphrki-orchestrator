import { Injectable, BadRequestException } from '@nestjs/common';

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

@Injectable()
export class N8NWorkflowParserService {
  private readonly MAX_WORKFLOW_SIZE = 5 * 1024 * 1024; // 5MB

  /**
   * Validate workflow JSON size
   */
  validateWorkflowSize(workflowJson: string): void {
    const sizeInBytes = Buffer.byteLength(workflowJson, 'utf8');

    if (sizeInBytes > this.MAX_WORKFLOW_SIZE) {
      throw new BadRequestException(
        `Workflow JSON exceeds maximum size of ${this.MAX_WORKFLOW_SIZE / (1024 * 1024)}MB`
      );
    }
  }

  /**
   * Validate workflow structure
   */
  validateWorkflowStructure(workflow: any): void {
    if (!workflow || typeof workflow !== 'object') {
      throw new BadRequestException('Invalid workflow JSON: must be an object');
    }

    if (!workflow.nodes || !Array.isArray(workflow.nodes)) {
      throw new BadRequestException('Invalid workflow JSON: missing or invalid nodes array');
    }

    if (workflow.nodes.length === 0) {
      throw new BadRequestException('Invalid workflow JSON: workflow must contain at least one node');
    }
  }

  /**
   * Parse N8N workflow JSON and extract metadata
   */
  parseWorkflow(workflowJson: string): ParsedWorkflow {
    try {
      const workflow = JSON.parse(workflowJson);
      this.validateWorkflowStructure(workflow);

      const parameters = this.extractParameters(workflow);
      const triggers = this.extractTriggers(workflow);

      return {
        nodes: workflow.nodes || [],
        connections: workflow.connections || {},
        parameters,
        triggers,
      };
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException(`Failed to parse workflow JSON: ${error.message}`);
    }
  }

  /**
   * Extract configurable parameters from workflow
   */
  private extractParameters(workflow: any): DetectedParameter[] {
    const parameters: DetectedParameter[] = [];
    const nodes = workflow.nodes || [];

    for (const node of nodes) {
      if (node.parameters) {
        this.extractNodeParameters(node, parameters);
      }
    }

    return parameters;
  }

  /**
   * Extract parameters from a single node
   */
  private extractNodeParameters(node: any, parameters: DetectedParameter[]): void {
    const nodeParams = node.parameters || {};

    for (const [key, value] of Object.entries(nodeParams)) {
      // Check if parameter contains template variables like {{ $json.fieldName }}
      if (typeof value === 'string' && this.isTemplateVariable(value)) {
        const paramName = this.extractVariableName(value);

        parameters.push({
          name: paramName,
          path: `nodes.${node.id}.parameters.${key}`,
          defaultValue: value,
          isRequired: true,
        });
      }
    }
  }

  /**
   * Check if string contains N8N template variables
   */
  private isTemplateVariable(value: string): boolean {
    return /\{\{.*?\}\}/.test(value);
  }

  /**
   * Extract variable name from template string
   */
  private extractVariableName(template: string): string {
    const match = template.match(/\{\{\s*\$json\.(\w+)\s*\}\}/);
    return match ? match[1] : template.replace(/[{}$.\s]/g, '');
  }

  /**
   * Extract webhook/trigger nodes from workflow
   */
  private extractTriggers(workflow: any): any[] {
    const nodes = workflow.nodes || [];

    return nodes.filter((node: any) =>
      node.type && (
        node.type.includes('webhook') ||
        node.type.includes('trigger') ||
        node.type.includes('start')
      )
    );
  }
}
