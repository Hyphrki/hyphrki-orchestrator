import { Module, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { FrameworkRegistry } from './registry/framework-registry';
import { FrameworkAbstractionService } from './abstraction/framework-abstraction.service';
import { LangGraphAdapter } from './langgraph/langgraph.adapter';
import { AgnoAdapter } from './agno/agno.adapter';
import { CrewAIAdapter } from './crewai/crewai.adapter';
import { N8nAdapter } from './n8n/n8n.adapter';

@Module({
  providers: [
    FrameworkRegistry,
    FrameworkAbstractionService,
    LangGraphAdapter,
    AgnoAdapter,
    CrewAIAdapter,
    N8nAdapter,
  ],
  exports: [FrameworkRegistry, FrameworkAbstractionService],
})
export class FrameworksModule implements OnModuleInit, OnModuleDestroy {
  constructor(
    private readonly frameworkRegistry: FrameworkRegistry,
    private readonly langGraphAdapter: LangGraphAdapter,
    private readonly agnoAdapter: AgnoAdapter,
    private readonly crewAIAdapter: CrewAIAdapter,
    private readonly n8nAdapter: N8nAdapter,
  ) {}

  async onModuleInit() {
    // Register all framework adapters
    this.frameworkRegistry.registerAdapter(this.langGraphAdapter);
    this.frameworkRegistry.registerAdapter(this.agnoAdapter);
    this.frameworkRegistry.registerAdapter(this.crewAIAdapter);
    this.frameworkRegistry.registerAdapter(this.n8nAdapter);

    // Initialize all registered framework adapters
    await this.frameworkRegistry.initializeAllFrameworks();
  }

  async onModuleDestroy() {
    // Shutdown all framework adapters
    await this.frameworkRegistry.shutdownAllFrameworks();
  }
}
