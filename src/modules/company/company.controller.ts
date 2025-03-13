import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { CompanyService } from './application/dto/company.service';
import { CreateCompanyDto } from './application/dto/create-company.dto';
import { UpdateCompanyDto } from './application/dto/update-company.dto';
import { AuthGuard } from '../auth/guards/auth/auth.guard';

@ApiTags('companies')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('companies')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Post()
  async create(@Body() createCompanyDto: CreateCompanyDto) {
    return this.companyService.create(createCompanyDto);
  }

  @Get()
  async findAll(@Query() query: any) {
    if (Object.keys(query).length) {
      return this.companyService.search(query);
    }
    return this.companyService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.companyService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateCompanyDto: UpdateCompanyDto,
  ) {
    return this.companyService.update(id, updateCompanyDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.companyService.remove(id);
  }

  // Endpoint para retornar a URL do Google Maps com base no endereço (pode ser ajustado conforme a integração)
  @Get(':id/map')
  async getMap(@Param('id') id: number) {
    const company = await this.companyService.findOne(id);
    const addressEncoded = encodeURIComponent(company.address);
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${addressEncoded}`;
    return { googleMapsUrl };
  }
}
