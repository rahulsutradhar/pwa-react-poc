import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import Invite from '../src/components/Invite'
import registerServiceWorker from './registerServiceWorker';


const element = (<Invite></Invite>);

ReactDOM.render(element, document.getElementById('root'));
registerServiceWorker();


