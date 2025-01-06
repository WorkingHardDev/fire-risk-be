import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Assessment } from './assessment.entity';

@Entity('files')
@Unique(['url', 'assessment'])
export class File {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  label: string;

  @Column()
  url: string;

  @ManyToOne(() => Assessment, (assessment) => assessment.files, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'assessment_id' })
  assessment: Assessment;
}
