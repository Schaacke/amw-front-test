import styles from './TodoList.module.scss';
import { ReactComponent as AddIcon } from '../../assets/icons/add.svg';
import TodoItem from '../TodoItem';
import { observer } from 'mobx-react-lite';
import { useTodosStore } from '../../store/hooks/useTodosStore.ts';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver.ts';
import { Todos } from '../../store/TodosStore.ts';

const TodoList = () => {
  const { todos, getTodos } = useTodosStore();
  const [listItems, setListItems] = useState<Todos[]>(todos);
  const [page, setPage] = useState<number>(1);

  const ref = useRef<HTMLDivElement | null>(null);
  const entry = useIntersectionObserver(ref, {});
  const isVisible = !!entry?.isIntersecting;

  const counter = listItems.length;

  const loadMore = useCallback(() => {
    setListItems((prevState) => [...prevState, ...todos]);
  }, [todos]);

  useEffect(() => {
    getTodos(page);
  }, [getTodos, page]);

  useEffect(() => {
    if (isVisible && todos.length > 0) {
      setPage(page + 1);
      loadMore();
    }
  }, [isVisible, loadMore, todos]);

  return (
    <div className={styles.list}>
      <div className={styles.list__control}>
        <div className={styles.list__title}>Today</div>
        <div className={styles.list__nav}>
          <button className={styles.list__add}>
            <AddIcon />
          </button>
          <div className={styles.list__counter}>{counter}</div>
        </div>
      </div>
      <div className={styles.list__iterated}>
        {listItems.map(({ id, title, completed }) => (
          <TodoItem key={id} title={title} completed={completed} />
        ))}
        {todos.length > 0 && <div className={styles.list__pagination} ref={ref} />}
      </div>
    </div>
  );
};

export default observer(TodoList);
