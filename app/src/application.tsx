import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Hello } from './components/search-line/search-line';

ReactDOM.render(
  <Hello compiler='TypeScript' framework='React' />,
  document.getElementById('js-application')
);
