import React from 'react';
import ReactDOM from 'react-dom';

import styles from './index.module.scss';

import { ComponentA } from '../../src/components/a';

const App = () => {
  return <div className={styles.main}>Main Area</div>;
};

ReactDOM.render(<App />, document.getElementById('app'));
