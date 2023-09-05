import styles from './TodoList.module.scss';
import { ReactComponent as AddIcon } from '../../assets/icons/add.svg';
import TodoItem from '../TodoItem';
import { observer } from 'mobx-react-lite';
import { useTodosStore } from '../../store/hooks/useTodosStore.ts';
import { useEffect, useRef, useState } from 'react';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver.ts';
import Loader from '../Loader';

const TodoList = () => {
  const { todos, loading, loaded, getTodos } = useTodosStore();
  const [page, setPage] = useState<number>(1);

  const ref = useRef<HTMLDivElement | null>(null);
  const entry = useIntersectionObserver(ref, {});
  const isVisible = !!entry?.isIntersecting;

  const counter = todos.length;

  useEffect(() => {
    getTodos(page);
  }, [getTodos, page]);

  useEffect(() => {
    if (isVisible && todos.length > 0) {
      setPage(page + 1);
    }
  }, [isVisible]);

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
        {todos.map(({ id, title, completed }) => (
          <TodoItem key={id} title={title} completed={completed} />
        ))}
        {!loaded && (
          <div className={styles.list__pagination} ref={ref}>
            {loading && <Loader />}
          </div>
        )}
      </div>
    </div>
  );
};

export default observer(TodoList);
