import React from 'react';
import ReactDOM from 'react-dom';
import Main from './Main.purs';

ReactDOM.render(<div>{ Main.compute(5) }</div>, document.getElementById('root'));
