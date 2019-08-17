import React from 'react';
import Table from './Table/Table';
import './app.css';

export default class App extends React.Component {
  render() {
    return (<div className='container'>
      <h1>Github's Top 100 JavaScript Repositories</h1>
      <Table />
    </div>);
  }
}
