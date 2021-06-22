import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Album } from './Album';

@Entity('pictures')
export class Picture {
  @PrimaryColumn()
  id: string;

  @Column()
  album_id: string;

  @ManyToOne(() => Album)
  @JoinColumn({ name: 'album_id' })
  album: Album;

  @Column()
  storage_name: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  acquisition_date: Date;

  @Column()
  file_size: number;

  @Column()
  main_color: string;
}
