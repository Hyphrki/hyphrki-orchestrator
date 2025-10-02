import type { SecretsProvider } from '@/Interfaces';
import { Service } from 'typedi';
import { InfisicalProvider } from './providers/infisical';

@Service()
export class ExternalSecretsProviders {
	providers: Record<string, { new (): SecretsProvider }> = {
		infisical: InfisicalProvider,
	};

	getProvider(name: string): { new (): SecretsProvider } | null {
		return this.providers[name] ?? null;
	}

	hasProvider(name: string) {
		return name in this.providers;
	}

	getAllProviders() {
		return this.providers;
	}
}
