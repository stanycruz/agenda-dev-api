import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { PersonModule } from './modules/person/person.module';
import { CompanyModule } from './modules/company/company.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { EmailModule } from './modules/email/email.module';

@Module({
  imports: [
    AuthModule,
    PersonModule,
    CompanyModule,
    DashboardModule,
    EmailModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
