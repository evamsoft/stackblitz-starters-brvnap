import '../types/index.ts';
import { BaseEntity, Selectable } from '../types/types';

export const positiveHumanValues = ['empathy', 'confidence', 'courage'];

export const negativeHumanValues = ['fear', 'indifference', 'inaction'];

export const getSelectableHumanValues = () => {
  const entities = [...positiveHumanValues, ...negativeHumanValues]
    .map(createBaseEntity)
    .map(createSelectableEntity);

  return assignEntityIds(entities).shuffle().splitEquallyIntoTwoArrays();
};

const createBaseEntity = (item: string): BaseEntity => {
  return { id: 0, name: item };
};

const createSelectableEntity = <T extends BaseEntity>(
  entity: T
): Selectable<T> => ({ ...entity, selected: false });

const assignEntityIds = <T extends BaseEntity>(entities: T[]): T[] => {
  let maxId = Math.max(...entities.map((item) => item.id));
  return [
    ...entities
      .filter((item) => item.id === 0)
      .map((item) => {
        item.id = maxId;
        maxId++;
        return item;
      }),
  ];
};
