import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { File } from './file.entity';

@Entity('assessments')
export class Assessment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ name: 'completed', type: 'boolean', default: false })
  completed: boolean;

  @Column({ name: 'property_type', type: 'varchar' })
  propertyType: string;

  @Column({ type: 'varchar' })
  country: string;

  @Column({ type: 'varchar' })
  address: string;

  @Column({ type: 'varchar' })
  city: string;

  @Column({ type: 'varchar' })
  postcode: string;

  @Column({ name: 'responsible_person', type: 'varchar' })
  responsiblePerson: string;

  @Column({ name: 'persons_consulted', type: 'varchar', array: true })
  personsConsulted: string[];

  @Column({ type: 'varchar' })
  accessor: string;

  @Column({ name: 'report_validated_by', type: 'varchar' })
  reportValidatedBy: string;

  @Column({ name: 'date_of_assessment', type: 'timestamp' })
  dateOfAssessment: Date;

  @Column({
    name: 'date_of_previous_assessment',
    type: 'timestamp',
    nullable: true,
  })
  dateOfPreviousAssessment: Date;

  @Column({ name: 'suggested_date_for_review', type: 'timestamp' })
  suggestedDateForReview: Date;

  @OneToMany(() => File, (file) => file.assessment, {
    eager: true,
  })
  files: File[];

  @Column({ type: 'varchar', nullable: true })
  assessmentImageUrl: string;

  @Column({ type: 'jsonb', nullable: true })
  questions: JSON | null;

  @ManyToOne(() => User, (user) => user.assessments)
  user: User;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;
}
