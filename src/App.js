import React, { Component } from 'react';

import Header from './components/header';
import UserBox from './components/user';

function App() {
  return (
    <div className="container">
      <Header title="Req | Res App"/>
      <br/>
      <UserBox />
    </div>
  );
}

export default App;
