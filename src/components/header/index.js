import React from 'react';
import './style.css';

const Header = ({ title }) => (
  <header>
    <h1 className="font-weight-bold"> {title?title: 'Este es un titulo'} </h1>
  </header>
);

export default Header;

//npm i bootstrap reactstrap --save
