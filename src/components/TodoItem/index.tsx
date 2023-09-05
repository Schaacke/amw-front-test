import styles from './TodoItem.module.scss';
import Checkbox from '../common/Checkbox';
import { useEffect, useState } from 'react';
import Tags, { TagsData } from '../Tags';
import Avatar from '../../assets/images/avatar.png';
import { faker } from '@faker-js/faker';
import moment from 'moment';

type Props = {
  title: string;
  completed: boolean;
};

const TodoItem = ({ title, completed }: Props) => {
  const [check, setCheck] = useState(completed ?? false);
  const [description, setDescription] = useState<string>();
  const [date, setDate] = useState<{ startDate: Date; endDate: Date }>();
  const [tags, setTags] = useState<TagsData>();

  useEffect(() => {
    setDescription(faker.commerce.productDescription());
    const startDate = faker.date.between({
      from: '2023-01-01T00:00:00.000Z',
      to: '2023-05-01T00:00:00.000Z',
    });
    const endDate = faker.date.between({
      from: '2023-05-01T00:00:00.000Z',
      to: '2024-01-01T00:00:00.000Z',
    });
    setDate({ startDate, endDate });
    setTags({ title: faker.company.name(), direction: faker.person.jobType() });
  }, []);

  return (
    <div className={styles.item}>
      <div className={styles.item__card}>
        <div className={styles.item__title}>
          <Checkbox onChange={() => setCheck(!check)} checked={check} /> {title}
        </div>
        <div className={styles.item__dates}>
          <span>{moment(date?.startDate).format('MMM D, HH:MM A')}</span>
          <span>{moment(date?.endDate).format('MMM D, HH:MM A')}</span>
        </div>
        <div className={styles.item__desc}>{description}</div>
        <div className={styles.item__meta}>
          <Tags data={{ title: tags?.title, direction: tags?.direction }} />
          <img className={styles.item__avatar} src={Avatar} alt="avatar" />
        </div>
      </div>
    </div>
  );
};

export default TodoItem;
