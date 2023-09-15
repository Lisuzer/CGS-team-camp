import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
/* eslint-disable import/no-cycle */
import { Todo } from './todo.entity';

@Entity('user')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column({ select: false })
  password: string;

  @Column({ default: false })
  isVerified: boolean;

  @OneToMany(() => Todo, (todo: Todo) => todo.user, { cascade: true })
  todos: Todo[];
}
