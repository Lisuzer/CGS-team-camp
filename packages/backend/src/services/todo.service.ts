import { DeepPartial } from 'typeorm';
import { IGetAllTodo, ITodo, TUpdateTodo } from '../types/todos.type';
import { Todo } from '../entities/todo.entity';
import { User } from '../entities/user.entity';

export default class TodoService {
  async findAll({
    id,
    search = '',
    status = '',
    page = 1,
    limit = 10,
    isTablet = 'false'
  }: IGetAllTodo) {
    const skip = (page - 1) * limit;
    const takeTablet = page * limit;
    const queryBuilder = Todo.createQueryBuilder('todos')
      .leftJoinAndSelect('todos.user', 'user')
      .where('((todos.title like :search))', {
        search: `%${search || ''}%`
      })
      .andWhere(
        `(
        (:status = 'completed' AND todos.isComplete = true AND ((todos.isPrivate = false) OR (todos.user.id = :id)))
        OR (:status = 'not_completed' AND todos.isComplete = false AND ((todos.isPrivate = false) OR (todos.user.id = :id)))
        OR (:status = 'public' AND (todos.isPrivate = false))
        OR ((:status = 'private') AND (todos.user.id = :id) AND (todos.isPrivate = true))
        OR ((:status = '') AND ((todos.isPrivate = false) OR (todos.user.id = :id)))
      )`,
        { status, id }
      )
      .select([
        'todos.id',
        'todos.title',
        'todos.description',
        'todos.isComplete',
        'todos.isPrivate',
        'todos.createdAt',
        'user.id'
      ]);

    const totalCount = await queryBuilder.getCount();
    const maxPage = Math.ceil(totalCount / limit);
    let todos: Todo[] = [];

    if (isTablet === 'true') {
      todos = await queryBuilder.orderBy('todos.createdAt', 'DESC').take(takeTablet).getMany();
    } else {
      todos = await queryBuilder
        .orderBy('todos.createdAt', 'DESC')
        .skip(skip)
        .take(limit)
        .getMany();
    }

    return { todos, page, maxPage };
  }

  async findOne(id: string) {
    const todo = await Todo.findOne({ where: { id }, relations: ['user'] });
    return todo;
  }

  isOwner(todo: Todo, user?: User) {
    if (todo && todo.isPrivate) {
      if (!user) {
        return false;
      }
      if (todo.user.id !== user.id) {
        return false;
      }
    }
    return true;
  }

  async create(todo: ITodo, user: User) {
    todo.user = user;
    const newTodo = await Todo.save(todo as DeepPartial<Todo>);
    return newTodo;
  }

  async update(id: string, newTodo: TUpdateTodo) {
    await Todo.update(id, newTodo);
    const updatedTodo = await Todo.findOneBy({ id });
    return updatedTodo;
  }

  async delete(id: string) {
    const todoToDelete = await Todo.findOneBy({ id });
    await Todo.delete(id);
    return todoToDelete;
  }
}
