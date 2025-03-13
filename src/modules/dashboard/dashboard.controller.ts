import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { PersonService } from '../person/application/person.service';
import { CompanyService } from '../company/application/dto/company.service';
import { AuthGuard } from '../auth/guards/auth/auth.guard';

@ApiTags('dashboard')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('dashboard')
export class DashboardController {
  constructor(
    private readonly personService: PersonService,
    private readonly companyService: CompanyService,
  ) {}

  // Dashboard de aniversariantes do mês
  @Get('birthdays')
  async getBirthdays() {
    const persons = await this.personService.findAll();
    // Agrupar por dia do aniversário (simplificado)
    const dashboard = persons.reduce((acc, person) => {
      const day = new Date(person.birthDate).getDate();
      acc[day] = (acc[day] || 0) + 1;
      return acc;
    }, {});
    return dashboard;
  }

  // Dashboard de empresas cadastradas
  @Get('companies')
  async getCompaniesDashboard() {
    const companies = await this.companyService.findAll();
    return { total: companies.length };
  }
}
