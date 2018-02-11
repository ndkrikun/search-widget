import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { App } from './components/app';

const rootId = 'js-application';

ReactDOM.render(
  <App/>,
  document.getElementById(rootId)
);
