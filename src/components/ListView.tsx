import { FC, memo } from 'react';
import { BaseEntity, Selectable } from '../types/types';

type ListViewProps<T extends Selectable<BaseEntity>> = {
  title: string;
  items: T[];
  onClick?: (value: Pick<Selectable<T>, 'id'>) => void;
};

const ListView = <T extends Selectable<BaseEntity>>({
  title,
  items,
  onClick,
}: ListViewProps<T>) => {
  return (
    <div>
      <h3>{title}</h3>
      <ul style={{ 'list-style': 'none', 'padding-left': '0px' }}>
        {items?.map((item) => (
          <li
            key={item.id}
            style={{
              border: '1px solid black',
              'background-color': '',
              margin: '5px 0px',
            }}
          >
            <label>
              <input
                type="checkbox"
                value={item.id}
                checked={item.selected}
                onClick={(e) => {
                  onClick({ id: +e.currentTarget.value });
                }}
              />
              {item.name}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default memo(ListView);
