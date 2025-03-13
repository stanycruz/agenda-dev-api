import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Company } from '../../domain/entities/company.entity';
import { CreateCompanyDto } from './create-company.dto';
import { UpdateCompanyDto } from './update-company.dto';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company)
    private companyRepository: Repository<Company>,
  ) {}

  async create(createCompanyDto: CreateCompanyDto): Promise<Company> {
    const company = this.companyRepository.create(createCompanyDto);
    return await this.companyRepository.save(company);
  }

  async findAll(): Promise<Company[]> {
    return await this.companyRepository.find();
  }

  async findOne(id: number): Promise<Company> {
    const company = await this.companyRepository.findOneBy({ id });
    if (!company) {
      throw new NotFoundException('Empresa não encontrada');
    }
    return company;
  }

  async update(
    id: number,
    updateCompanyDto: UpdateCompanyDto,
  ): Promise<Company> {
    await this.companyRepository.update(id, updateCompanyDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.companyRepository.delete(id);
  }

  // Pesquisa avançada: filtrar por legalName, tradeName ou cnpj
  async search(
    query: Partial<Pick<Company, 'legalName' | 'tradeName' | 'cnpj'>>,
  ): Promise<Company[]> {
    const qb = this.companyRepository.createQueryBuilder('company');
    if (query.legalName) {
      qb.andWhere('company.legalName ILIKE :legalName', {
        legalName: `%${query.legalName}%`,
      });
    }
    if (query.tradeName) {
      qb.andWhere('company.tradeName ILIKE :tradeName', {
        tradeName: `%${query.tradeName}%`,
      });
    }
    if (query.cnpj) {
      qb.andWhere('company.cnpj = :cnpj', { cnpj: query.cnpj });
    }
    return qb.getMany();
  }
}
