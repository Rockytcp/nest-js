import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class ProductEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  price: string;
}
