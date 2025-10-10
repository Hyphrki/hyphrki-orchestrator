import { ConfigService } from '@nestjs/config';
import { Strategy } from 'passport-auth0';
import { PrismaService } from '../../database/prisma.service';
declare const Auth0Strategy_base: new (...args: [options: Strategy.StrategyOption] | [options: Strategy.StrategyOptionWithRequest]) => Strategy & {
    validate(...args: any[]): unknown;
};
export declare class Auth0Strategy extends Auth0Strategy_base {
    private configService;
    private prisma;
    constructor(configService: ConfigService, prisma: PrismaService);
    validate(accessToken: string, refreshToken: string, extraParams: any, profile: any, done: Function): Promise<any>;
}
export {};
