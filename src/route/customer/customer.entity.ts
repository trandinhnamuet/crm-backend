import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('customer')
export class Customer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  code: string;

  @Column({ type: 'text' })
  name: string;

  @Column({ type: 'text' })
  address: string;

  @Column({ type: 'text' })
  phone_number: string;

  @Column({ type: 'text' })
  email: string;

  @Column({ type: 'text', nullable: true })
  note: string;

  @Column({ type: 'integer', nullable: true })
  image_id: number;

  @Column({ type: 'double precision', nullable: true })
  latitude: number;

  @Column({ type: 'double precision', nullable: true })
  longitude: number;

  @Column({ type: 'integer', nullable: true })
  created_by: number;

  @Column({ type: 'timestamp', nullable: true })
  created_at: Date;

  @Column({ type: 'integer', nullable: true })
  updated_by: number;

  @Column({ type: 'timestamp', nullable: true })
  updated_at: Date;

  @Column({ type: 'integer', nullable: true })
  deleted_by: number;

  @Column({ type: 'timestamp', nullable: true })
  deleted_at: Date;

  @Column({ type: 'boolean', default: true })
  is_active: boolean;
}
