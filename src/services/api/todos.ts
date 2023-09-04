import axios from 'axios';
import { Todos } from '../../store/TodosStore.ts';

export default {
  /**
   * @method GET
   * @description Get todos
   * */

  getTodos: (page: number) =>
    axios
      .get<unknown, { data: Todos[] }>(
        `https://jsonplaceholder.typicode.com/todos?_page=${page}&_limit=6`,
      )
      .then((r) => r.data),
};
