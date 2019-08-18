import React from "react";
import Table from "./Table/Table";
import "./app.css";

export default class App extends React.Component {
  render() {
    return (
      <div className="container">
        <h1>GitHub's Top 100 JavaScript Repositories</h1>
        <Table />
      </div>
    );
  }
}
