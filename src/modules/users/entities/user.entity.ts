import { Assessment } from 'src/modules/assessments/entities/assessment.entity';
import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BusinessAccount } from './business-account.entity';

@Entity('users') // Adjust table name as needed
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'first_name', type: 'varchar', length: 50 })
  firstName: string;

  @Column({ name: 'last_name', type: 'varchar', length: 50 })
  lastName: string;

  @Column({ type: 'varchar', length: 50 })
  email: string;

  @Column({ type: 'varchar' })
  password: string;

  @Column({ name: 'amount_of_assessments', type: 'int', default: 0 })
  amountOfAssessments: number;

  @Column({ name: 'amount_of_reviews', type: 'int', default: 0 })
  amountOfReviews: number;

  @OneToOne(() => BusinessAccount, (businessAccount) => businessAccount.user, {
    eager: true,
    onDelete: 'CASCADE',
  })
  businessAccount: BusinessAccount;

  @OneToMany(() => Assessment, (assessment) => assessment.user, {
    onDelete: 'CASCADE',
  })
  assessments: Assessment[];
}
