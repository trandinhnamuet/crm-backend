import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity({ name: 'image' })
export class Image {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ type: 'text' })
	file_name: string;

	@Column({ type: 'text' })
	link: string;

	@Column({ type: 'text' })
	mime_type: string;

	@Column({ type: 'bytea' })
	image_data: Buffer;

	@CreateDateColumn({ type: 'timestamp' })
	created_at: Date;
}
