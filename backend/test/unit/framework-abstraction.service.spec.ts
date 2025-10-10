import { Test, TestingModule } from '@nestjs/testing';
import { FrameworkAbstractionService } from '../../src/frameworks/abstraction/framework-abstraction.service';
import { FrameworkRegistry } from '../../src/frameworks/registry/framework-registry';
import { LangGraphAdapter } from '../../src/frameworks/langgraph/langgraph.adapter';
import { AgnoAdapter } from '../../src/frameworks/agno/agno.adapter';
import { CrewAIAdapter } from '../../src/frameworks/crewai/crewai.adapter';
import { N8nAdapter } from '../../src/frameworks/n8n/n8n.adapter';
import { FrameworkType } from '../../src/frameworks/types/framework.types';

describe('FrameworkAbstractionService', () => {
  let service: FrameworkAbstractionService;
  let registry: FrameworkRegistry;

  const mockAdapters = {
    langgraph: {
      executeWorkflow: jest.fn(),
      validateWorkflow: jest.fn(),
      validateConfig: jest.fn(),
      getStatus: jest.fn(),
    },
    agno: {
      executeWorkflow: jest.fn(),
      validateWorkflow: jest.fn(),
      validateConfig: jest.fn(),
      getStatus: jest.fn(),
    },
    crewai: {
      executeWorkflow: jest.fn(),
      validateWorkflow: jest.fn(),
      validateConfig: jest.fn(),
      getStatus: jest.fn(),
    },
    n8n: {
      executeWorkflow: jest.fn(),
      validateWorkflow: jest.fn(),
      validateConfig: jest.fn(),
      getStatus: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FrameworkAbstractionService,
        {
          provide: FrameworkRegistry,
          useValue: {
            getAdapter: jest.fn((type: FrameworkType) => mockAdapters[type]),
            getAvailableFrameworks: jest.fn(() => Object.keys(mockAdapters)),
            getSupportedFrameworks: jest.fn(() => Object.keys(mockAdapters)),
            validateFrameworkSupport: jest.fn(() => true),
            getFrameworkMetadata: jest.fn((type: FrameworkType) => {
              if (type === 'unknown') return null;
              return {
                name: type.charAt(0).toUpperCase() + type.slice(1),
                version: '1.0.0',
                description: `${type} framework`,
                capabilities: {
                  supportsMultiAgent: type === 'crewai' || type === 'agno',
                  supportsVisualBuilder: type === 'n8n',
                  supportsCodeEditor: true,
                  supportsAsyncExecution: true,
                  supportsStatePersistence: true,
                  gpuRequired: type === 'agno',
                },
              };
            }),
          },
        },
        {
          provide: LangGraphAdapter,
          useValue: mockAdapters.langgraph,
        },
        {
          provide: AgnoAdapter,
          useValue: mockAdapters.agno,
        },
        {
          provide: CrewAIAdapter,
          useValue: mockAdapters.crewai,
        },
        {
          provide: N8nAdapter,
          useValue: mockAdapters.n8n,
        },
      ],
    }).compile();

    service = module.get<FrameworkAbstractionService>(
      FrameworkAbstractionService,
    );
    registry = module.get<FrameworkRegistry>(FrameworkRegistry);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('executeWorkflow', () => {
    it('should execute workflow using correct adapter', async () => {
      // Arrange
      const frameworkType = 'langgraph' as FrameworkType;
      const input = {
        workflowData: { nodes: [], edges: [] },
        inputData: { message: 'Hello' },
      };
      const context = { executionId: 'exec-1' };

      const mockResult = {
        success: true,
        output: { result: 'Hello World' },
        executionTime: 1500,
        resourceUsage: { cpuTime: 100, memoryPeak: 256 },
        steps: [],
      };

      mockAdapters.langgraph.executeWorkflow.mockResolvedValue(mockResult);

      // Act
      const result = await service.executeWorkflow(
        frameworkType,
        input,
        context,
      );

      // Assert
      expect(result.success).toBe(true);
      expect(result.output).toEqual({ result: 'Hello World' });
      expect(mockAdapters.langgraph.executeWorkflow).toHaveBeenCalledWith(
        input.workflowData,
        input.inputData,
        context,
      );
      expect(registry.getAdapter).toHaveBeenCalledWith('langgraph');
    });

    it('should throw error for unsupported framework', async () => {
      // Arrange
      const frameworkType = 'unsupported' as FrameworkType;
      const input = {};
      const context = { executionId: 'exec-1' };

      jest.spyOn(registry, 'getAdapter').mockReturnValue(null);

      // Act & Assert
      await expect(
        service.executeWorkflow(frameworkType, input, context),
      ).rejects.toThrow('Framework adapter for unsupported not found');
    });
  });

  describe('getFrameworkCapabilities', () => {
    it('should return framework capabilities', () => {
      // Act
      const capabilities = service.getFrameworkCapabilities('langgraph');

      // Assert
      expect(capabilities).toBeDefined();
      expect(capabilities.supportsMultiAgent).toBe(false);
      expect(capabilities.supportsVisualBuilder).toBe(false);
      expect(capabilities.supportsCodeEditor).toBe(true);
    });

    it('should throw error for unknown framework', () => {
      // Act & Assert
      expect(() =>
        service.getFrameworkCapabilities('unknown' as FrameworkType),
      ).toThrow('Framework unknown not found');
    });
  });

  describe('getSupportedFrameworks', () => {
    it('should return list of supported frameworks', () => {
      // Act
      const frameworks = service.getSupportedFrameworks();

      // Assert
      expect(frameworks).toContain('langgraph');
      expect(frameworks).toContain('agno');
      expect(frameworks).toContain('crewai');
      expect(frameworks).toContain('n8n');
    });
  });

  describe('validateWorkflow', () => {
    it('should validate workflow configuration', async () => {
      // Arrange
      const workflowData = { nodes: [], edges: [] };
      mockAdapters.langgraph.validateWorkflow.mockResolvedValue({
        valid: true,
      });

      // Act
      const result = await service.validateWorkflow('langgraph', workflowData);

      // Assert
      expect(result.valid).toBe(true);
      expect(mockAdapters.langgraph.validateWorkflow).toHaveBeenCalledWith(
        workflowData,
      );
    });

    it('should return invalid for bad configuration', async () => {
      // Arrange
      const workflowData = { invalid: 'data' };
      mockAdapters.langgraph.validateWorkflow.mockResolvedValue({
        valid: false,
        errors: ['Invalid workflow'],
      });

      // Act
      const result = await service.validateWorkflow('langgraph', workflowData);

      // Assert
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Invalid workflow');
    });
  });
});
