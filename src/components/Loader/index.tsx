import styles from './Loader.module.scss';

const Loader = () => {
  return (
    <div className={styles.loading}>
      <span className={styles.loading__dot} />
      <span className={styles.loading__dot} />
      <span className={styles.loading__dot} />
    </div>
  );
};

export default Loader;
