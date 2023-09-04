import styles from './Tags.module.scss';

export interface TagsData {
  title?: string;
  direction?: string;
}

type Props = {
  data: TagsData;
};

const Tags = ({ data }: Props) => {
  const { title, direction } = data;
  return (
    <div className={styles.tags}>
      <div className={`${styles.tags__item} ${styles.tags__title}`} title={title}>{title}</div>
      <div className={`${styles.tags__item} ${styles.tags__direction}`}>
        {direction}
      </div>
    </div>
  );
};

export default Tags;
