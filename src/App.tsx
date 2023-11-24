import { FC } from 'react';
import { ListTracker } from './components/ListTracker';

import './style.css';

export const App: FC<{ name: string }> = ({ name }) => {
  return ( <ListTracker />
  );
};
