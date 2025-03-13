import {
  IsNotEmpty,
  IsEmail,
  IsDateString,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePersonDto {
  @ApiProperty({ example: 'João Silva' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: 'joao.silva@email.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: '1990-05-15' })
  @IsDateString()
  birthDate: string;

  @ApiProperty({ example: 'Masculino' })
  @IsNotEmpty()
  gender: string;

  @ApiProperty({ example: 'Desenvolvedor' })
  @IsNotEmpty()
  occupation: string;

  @ApiProperty({ example: 'Empresa XYZ', required: false })
  @IsOptional()
  company?: string;

  @ApiProperty({ example: '+5511999999999', required: false })
  @IsOptional()
  whatsapp?: string;

  @ApiProperty({ example: '+5511988888888', required: false })
  @IsOptional()
  mobile?: string;

  @ApiProperty({ example: 'Rua ABC, 123, Cidade, Estado' })
  @IsNotEmpty()
  address: string;

  @ApiProperty({
    description: 'URL da foto',
    example: 'https://exemplo.com/foto.jpg',
    required: false,
  })
  @IsOptional()
  photo?: string;
}
