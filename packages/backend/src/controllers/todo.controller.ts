import { Response, Request } from 'express';
import TodoService from '../services/todo.service';
import { IUser } from '../types/user.type';
import { User } from '../entities/user.entity';
import { ITodoFilters } from '../types/todos.type';

export class TodoController {
  constructor(private todoService: TodoService) {}

  async getAllTodo(req: Request, res: Response) {
    const user = req.user as IUser;
    const { status, search, page, limit, isTablet } = req.query as ITodoFilters;
    const todos = await this.todoService.findAll({
      id: user?.id,
      search,
      status,
      page,
      limit,
      isTablet
    });
    res.send(todos);
  }

  async getTodoById(req: Request, res: Response) {
    const { id } = req.params;
    const todo = await this.todoService.findOne(id);
    if (todo && this.todoService.isOwner(todo, req.user as User)) {
      res.send(todo);
    } else {
      throw new Error('You are not the owner');
    }
  }

  async createNewTodo(req: Request, res: Response) {
    const todo = await this.todoService.create(req.body, req.user as User);
    res.send(todo);
  }

  async updateTodoById(req: Request, res: Response) {
    const { id } = req.params;
    const todo = await this.todoService.update(id, req.body);
    res.send(todo);
  }

  async deleteTodoById(req: Request, res: Response) {
    const { id } = req.params;
    const todo = await this.todoService.delete(id);
    res.send(todo);
  }
}

const todoController = new TodoController(new TodoService());
export default todoController;
