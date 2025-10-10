import { FieldType } from '@prisma/client';
import { DetectedParameter } from '../../n8n/services/parser.service';
export declare class ParameterTypeInferenceService {
    inferFieldType(parameter: DetectedParameter): FieldType;
    private isPasswordField;
    private isEmailField;
    private isUrlField;
    private isNumberField;
    private isBooleanField;
    private isLongTextField;
    private isDateField;
    generateValidationRules(fieldType: FieldType, parameter: DetectedParameter): Record<string, any>;
    generateDisplayLabel(parameterName: string): string;
    generateHelpText(fieldType: FieldType, parameterName: string): string;
}
