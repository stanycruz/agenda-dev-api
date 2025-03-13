import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Person } from '../domain/entities/person.entity';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';

@Injectable()
export class PersonService {
  constructor(
    @InjectRepository(Person)
    private personRepository: Repository<Person>,
  ) {}

  async create(createPersonDto: CreatePersonDto): Promise<Person> {
    const person = this.personRepository.create(createPersonDto);
    return await this.personRepository.save(person);
  }

  async findAll(): Promise<Person[]> {
    return await this.personRepository.find();
  }

  async findOne(id: number): Promise<Person> {
    const person = await this.personRepository.findOneBy({ id });
    if (!person) {
      throw new NotFoundException('Pessoa não encontrada');
    }
    return person;
  }

  async update(id: number, updatePersonDto: UpdatePersonDto): Promise<Person> {
    await this.personRepository.update(id, updatePersonDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.personRepository.delete(id);
  }

  // Método para pesquisa avançada (ex.: por nome, profissão ou cidade)
  async search(
    query: Partial<Pick<Person, 'name' | 'occupation' | 'address'>>,
  ): Promise<Person[]> {
    // Exemplo simples com query builder; pode ser aprimorado conforme a necessidade
    const qb = this.personRepository.createQueryBuilder('person');
    if (query.name) {
      qb.andWhere('person.name ILIKE :name', { name: `%${query.name}%` });
    }
    if (query.occupation) {
      qb.andWhere('person.occupation ILIKE :occupation', {
        occupation: `%${query.occupation}%`,
      });
    }
    if (query.address) {
      qb.andWhere('person.address ILIKE :address', {
        address: `%${query.address}%`,
      });
    }
    return qb.getMany();
  }
}
