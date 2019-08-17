import React from "react";
import _ from "lodash";
// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";

// fetch goes here
// https://api.github.com/search/repositories?q=language:javascript&sort=stars&order=desc&per_page=100
export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
      pages: null,
      loading: true
    };

  }

  render() {
    const { data, pages, loading } = this.state;
    return (
      <div>
        <ReactTable
          columns={[
            {
              Header: "1",
              accessor: "1"
            },
            {
              Header: "2",
              id: "2",
            },
            {
              Header: "3",
              accessor: "3"
            },
            {
              Header: "4",
              accessor: "4"
            }
          ]}
          manual // Forces table not to paginate or sort automatically, so we can handle it server-side
          data={data}
          pages={pages} // Display the total number of pages
          loading={loading} // Display the loading overlay when we need it
  }
}
