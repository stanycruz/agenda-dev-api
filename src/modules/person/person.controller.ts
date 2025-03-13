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
import { PersonService } from './application/person.service';
import { CreatePersonDto } from './application/dto/create-person.dto';
import { UpdatePersonDto } from './application/dto/update-person.dto';
import { AuthGuard } from '../auth/guards/auth/auth.guard';

@ApiTags('persons')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('persons')
export class PersonController {
  constructor(private readonly personService: PersonService) {}

  @Post()
  async create(@Body() createPersonDto: CreatePersonDto) {
    return this.personService.create(createPersonDto);
  }

  @Get()
  async findAll(@Query() query: any) {
    // Se parâmetros de pesquisa forem passados, chama o método search
    if (Object.keys(query).length) {
      return this.personService.search(query);
    }
    return this.personService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.personService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updatePersonDto: UpdatePersonDto,
  ) {
    return this.personService.update(id, updatePersonDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.personService.remove(id);
  }
}
