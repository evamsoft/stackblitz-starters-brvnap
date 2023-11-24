import {
  FC,
  useCallback,
  useEffect,
  useState,
} from 'react';
import ListView from './ListView';
import styled from 'styled-components';
import { getSelectableHumanValues } from '../data/values';
import { Selectable, HumanValue } from '../types/types';

const ListWrapper = styled.div<{ $side?: 'left' | 'right' }>`
padding: 0em 1em;
background: papayawhip;
`;

const ButtonsWrapper = styled.div`
`;

// clear: none;
// float: ${(props) => (props.$side ? props.$side : 'left')};
// function selectable<T>(item: T) {
//   return {
//     ...item,
//     selected: false,
//   };
// }

export const ListTracker: FC = () => {
  const [beneficialValues, setBeneficialValues] =
    useState<Selectable<HumanValue>[]>();
  const [detrimentalValues, setDetrimentalValues] =
    useState<Selectable<HumanValue>[]>();

  useEffect(() => {
    console.log(
      'This useEffect should only run once (or twice in strict mode).'
    );
    const [firstValues, secondValues] = getSelectableHumanValues(); // <== rename this to getData to make it generic later!

    setBeneficialValues(firstValues);
    setDetrimentalValues(secondValues);
  }, []);

  const handleBeneficialValueClick = useCallback(
    ({ id }: { id: number }) => {
      const modifiedValue = beneficialValues.filter(
        (item) => item.id === id
      )[0];
      modifiedValue.selected = !modifiedValue.selected;
      setBeneficialValues((prev) => [...prev]);
    },
    [beneficialValues]
  );

  const handleDetrimentalValueClick = useCallback(
    ({ id }: { id: number }) => {
      const modifiedValue = detrimentalValues.filter(
        (item) => item.id === id
      )[0];
      modifiedValue.selected = !modifiedValue.selected;
      setDetrimentalValues((prev) => [...prev]);
    },
    [detrimentalValues]
  );

  const handleMoveSelectedValuesFromLeftToRight = () => {
    const selectedBeneficialValues = beneficialValues.filter(
      (value) => value.selected
    );

    if (selectedBeneficialValues.length === 0) return;

    const unSelectedBeneficialValues = beneficialValues.filter(
      (value) => !selectedBeneficialValues.includes(value)
    );
    setBeneficialValues(unSelectedBeneficialValues);

    setDetrimentalValues((prev) => [
      ...prev,
      ...selectedBeneficialValues.map((value) => ({
        ...value,
        selected: false,
      })),
    ]);
  };

  const handleMoveSelectedValuesFromRightToLeft = () => {
    const selectedDetrimentalValues = detrimentalValues.filter(
      (value) => value.selected
    );

    if (selectedDetrimentalValues.length === 0) return;

    const unselectedDetrimentalValues = detrimentalValues.filter(
      (value) => !selectedDetrimentalValues.includes(value)
    );
    setDetrimentalValues(unselectedDetrimentalValues);

    setBeneficialValues((prev) => [
      ...prev,
      ...selectedDetrimentalValues.map((value) => ({
        ...value,
        selected: false,
      })),
    ]);
  };

  return (
    <div style={{}}>
      <h1>Good vs Bad Values Tracker</h1>
      <div
        style={{
          border: '10px solid black',
          display: 'flex',
          width: '100%',
        }}
      >
        <ListWrapper>
          <ListView
            title="Beneficial Values"
            items={beneficialValues}
            onClick={handleBeneficialValueClick}
          />
        </ListWrapper>
        <div
          style={{
            border: '0px dotted black',
          }}
        >
          <div
            style={{
              display: 'flex',
              'flex-flow': 'column',
              'padding-top': '50%',
              'text-align': 'center',
              border: '0px solid red',
              height: '100%',
              background: 'papayawhip',
            }}
          >
            <input
              type="button"
              value="Move To Right =>"
              style={{ width: '130px', height: '20px' }}
              onClick={handleMoveSelectedValuesFromLeftToRight}
            />
            <input
              type="button"
              value="<= Move To Left"
              style={{ width: '130px', height: '20px' }}
              onClick={handleMoveSelectedValuesFromRightToLeft}
            />
          </div>
        </div>
        <ListWrapper>
          <ListView
            title="Detrimental Values"
            items={detrimentalValues}
            onClick={handleDetrimentalValueClick}
          />
        </ListWrapper>
      </div>
    </div>
  );
};
