import { BACKEND_KEYS } from '../modules/common/consts/app-keys.const';
import { ITodo, ITodoCreate, ITodoGetAllParams } from '../modules/todos/types/todos.types';
import HttpService from './htt.service';

class TodoService extends HttpService {
  async getAllTodos(params?: ITodoGetAllParams) {
    return await this.get(
      {
        url: `${BACKEND_KEYS.TODOS}`,
        params
      },
      true
    );
  }

  editTodo(todo: ITodo) {
    const { id, user, ...todoWithoutId } = todo;
    return this.put(
      {
        url: `${BACKEND_KEYS.TODOS}/${id}`,
        data: { ...todoWithoutId }
      },
      true
    );
  }

  deleteTodo(todoId: string) {
    return this.delete(
      {
        url: `${BACKEND_KEYS.TODOS}/${todoId}`
      },
      true
    );
  }

  createTodo(todo: ITodoCreate) {
    return this.post(
      {
        url: BACKEND_KEYS.TODOS,
        data: todo
      },
      true
    );
  }

  getOneTodo(todoId: string) {
    return this.get(
      {
        url: `${BACKEND_KEYS.TODOS}/${todoId}`
      },
      true
    );
  }
}

const todoService = new TodoService();
export default todoService;
