import React from 'react';
import ReactDOM from 'react-dom';
import lib from './lib';

const h1 = document.getElementsByTagName('h1')[0];
h1.textContent = lib.message;

const Hello = (props) => {
  return (
    <div onClick={() => alert('Hello!')}>Hello {props.name} !</div>
  );
};

ReactDOM.render(<Hello name="React"/>, document.getElementById('root'));
