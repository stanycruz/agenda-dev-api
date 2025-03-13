import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('persons')
export class Person {
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'João Silva' })
  @Column({ length: 100 })
  name: string;

  @ApiProperty({ example: 'joao.silva@email.com' })
  @Column({ unique: true })
  email: string;

  @ApiProperty({ example: '1990-05-15' })
  @Column('date')
  birthDate: Date;

  @ApiProperty({ example: 'Masculino' })
  @Column()
  gender: string;

  @ApiProperty({ example: 'Desenvolvedor' })
  @Column()
  occupation: string;

  @ApiProperty({ example: 'Empresa XYZ' })
  @Column({ nullable: true })
  company: string;

  @ApiProperty({ example: '+5511999999999' })
  @Column({ nullable: true })
  whatsapp: string;

  @ApiProperty({ example: '+5511988888888' })
  @Column({ nullable: true })
  mobile: string;

  @ApiProperty({ example: 'Rua ABC, 123, Cidade, Estado' })
  @Column()
  address: string;

  @ApiProperty({
    description: 'URL da foto',
    example: 'https://exemplo.com/foto.jpg',
  })
  @Column({ nullable: true })
  photo: string;
}
