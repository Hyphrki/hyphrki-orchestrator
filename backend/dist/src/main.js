"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
async function bootstrap() {
    console.log('Starting NestJS application...');
    console.log('PORT:', process.env.PORT);
    console.log('DATABASE_URL:', process.env.DATABASE_URL);
    console.log('Creating NestJS app...');
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    console.log('NestJS app created successfully');
    app.enableCors({
        origin: process.env.FRONTEND_URL || 'http://localhost:5173',
        credentials: true,
    });
    const port = parseInt(process.env.PORT ?? '3000');
    console.log(`Starting server on port ${port}`);
    await app.listen(port);
    console.log(`Application started successfully on port ${port}`);
}
bootstrap();
//# sourceMappingURL=main.js.map