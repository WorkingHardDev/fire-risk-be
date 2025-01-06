import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity('business_accounts')
export class BusinessAccount {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'business_name' })
  businessName: string;

  @Column()
  number: string;

  @Column({ name: 'address_line' })
  addressLine: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column()
  postCode: string;

  @OneToOne(() => User, (user) => user.businessAccount)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
