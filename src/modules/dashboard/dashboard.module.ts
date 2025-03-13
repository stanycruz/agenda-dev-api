import { Module } from '@nestjs/common';
import { DashboardController } from './dashboard.controller';
import { PersonModule } from '../person/person.module';
import { CompanyModule } from '../company/company.module';

@Module({
  imports: [PersonModule, CompanyModule],
  controllers: [DashboardController],
})
export class DashboardModule {}
