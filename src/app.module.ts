import { Module } from '@nestjs/common';
import { ProjectModule } from './project/project.module';
import { ServiceModule } from './service/service.module';
import { ToolModule } from './tool/tool.module';
import { AuthModule } from './auth/auth.module';
import { MessageModule } from './message/message.module';
import { FaqModule } from './faq/faq.module';

@Module({
  imports: [ProjectModule, ServiceModule, ToolModule, AuthModule, MessageModule, FaqModule],
})
export class AppModule {}
