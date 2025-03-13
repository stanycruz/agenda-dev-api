import { IsNotEmpty, IsEmail, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCompanyDto {
  @ApiProperty({ example: 'Razão Social S/A' })
  @IsNotEmpty()
  legalName: string;

  @ApiProperty({ example: 'Nome Fantasia' })
  @IsNotEmpty()
  tradeName: string;

  @ApiProperty({ example: 'empresa@exemplo.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: '12.345.678/0001-99' })
  @IsNotEmpty()
  cnpj: string;

  @ApiProperty({ example: 'Responsável' })
  @IsNotEmpty()
  contactPerson: string;

  @ApiProperty({ example: '+5511999999999', required: false })
  @IsOptional()
  whatsapp?: string;

  @ApiProperty({ example: '+5511988888888', required: false })
  @IsOptional()
  mobile?: string;

  @ApiProperty({ example: '+551133332222', required: false })
  @IsOptional()
  phone?: string;

  @ApiProperty({ example: 'Rua XYZ, 456, Cidade, Estado' })
  @IsNotEmpty()
  address: string;

  @ApiProperty({
    description: 'URL do logo',
    example: 'https://exemplo.com/logo.png',
    required: false,
  })
  @IsOptional()
  logo?: string;
}
