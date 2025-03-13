import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('companies')
export class Company {
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Razão Social S/A' })
  @Column()
  legalName: string;

  @ApiProperty({ example: 'Nome Fantasia' })
  @Column()
  tradeName: string;

  @ApiProperty({ example: 'empresa@exemplo.com' })
  @Column({ unique: true })
  email: string;

  @ApiProperty({ example: '12.345.678/0001-99' })
  @Column({ unique: true })
  cnpj: string;

  @ApiProperty({ example: 'Responsável' })
  @Column()
  contactPerson: string;

  @ApiProperty({ example: '+5511999999999' })
  @Column({ nullable: true })
  whatsapp: string;

  @ApiProperty({ example: '+5511988888888' })
  @Column({ nullable: true })
  mobile: string;

  @ApiProperty({ example: '+551133332222' })
  @Column({ nullable: true })
  phone: string;

  @ApiProperty({ example: 'Rua XYZ, 456, Cidade, Estado' })
  @Column()
  address: string;

  @ApiProperty({
    description: 'URL do logo',
    example: 'https://exemplo.com/logo.png',
  })
  @Column({ nullable: true })
  logo: string;
}
