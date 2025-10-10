import { OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { FrameworkRegistry } from './registry/framework-registry';
import { LangGraphAdapter } from './langgraph/langgraph.adapter';
import { AgnoAdapter } from './agno/agno.adapter';
import { CrewAIAdapter } from './crewai/crewai.adapter';
import { N8nAdapter } from './n8n/n8n.adapter';
export declare class FrameworksModule implements OnModuleInit, OnModuleDestroy {
    private readonly frameworkRegistry;
    private readonly langGraphAdapter;
    private readonly agnoAdapter;
    private readonly crewAIAdapter;
    private readonly n8nAdapter;
    constructor(frameworkRegistry: FrameworkRegistry, langGraphAdapter: LangGraphAdapter, agnoAdapter: AgnoAdapter, crewAIAdapter: CrewAIAdapter, n8nAdapter: N8nAdapter);
    onModuleInit(): Promise<void>;
    onModuleDestroy(): Promise<void>;
}
