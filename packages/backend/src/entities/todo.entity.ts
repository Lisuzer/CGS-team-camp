import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, JoinColumn, ManyToOne } from 'typeorm';
/* eslint-disable import/no-cycle */
import { User } from './user.entity';

@Entity('todos')
export class Todo extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ default: false })
  isPrivate: boolean;

  @Column({ default: false })
  isComplete: boolean;

  @ManyToOne(() => User, (user: User) => user.todos, { onDelete: 'CASCADE' })
  user: User;

  @Column({
    nullable: true,
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP'
  })
  createdAt?: Date;
}
