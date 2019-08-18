import React from "react";
// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";
import { columns } from "./columns";
import "./table.css";

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
      currentPage: [],
      pages: null,
      loading: true
    };
    this.handleInteraction = this.handleInteraction.bind(this);
  }
  /**
   * Fetch from API on component load
   */
  componentDidMount() {
    const errorText = "Loading failed.\nPlease refresh the page to try again";
    fetch(
      "https://api.github.com/search/repositories?q=language:javascript&sort=stars&order=desc&per_page=100",
      { mode: "cors" }
    )
      .then(response => {
        response
          .json()
          .then(data => {
            // store entire response in state
            this.setState({ data: data.items });
            // initialize table with api response
            this.handleInteraction(this.refs.table.state, {});
          })
          .catch(error => {
            alert(errorText);
          });
      })
      .catch(error => {
        alert(errorText);
      })
      .finally(() => {
        this.setState({ loading: false });
      });
  }
  /**
   * called from eventhandler when user interacts with table.
   * Creates an array, page, and calculates total number of pages.
   * @param  {number} pageSize size of page selected in table
   * @param  {number} page     current page number in table
   * @return {{page: [], pages: number}}     object used to set currentPage, pages in parent
   */
  updatePages(pageSize, page) {
    const newData = {
      page: this.state.data.slice(pageSize * page, pageSize * page + pageSize),
      pages: Math.ceil(this.state.data.length / pageSize)
    };
    console.log(newData);
    return newData;
  }
  /**
   * Event handler called when pages are need to be updated in table
   * updates state with new page configurations
   * @param  {Object} state    state of child ReactTable component
   * @param  {Object} instance unused
   */
  handleInteraction(state, instance) {
    const newData = this.updatePages(state.pageSize, state.page);
    this.setState({
      currentPage: newData.page,
      pages: newData.pages
    });
  }

  render() {
    const { currentPage, pages, loading } = this.state;
    return (
      <div style={{ height: "100%" }}>
        <ReactTable
          columns={columns}
          ref={"table"}
          manual // !important! Forces table not to paginate or sort automatically
          data={currentPage}
          pages={pages} // Display the total number of pages
          loading={loading}
          onFetchData={this.handleInteraction} // Request new data when things change
          defaultPageSize={20}
          className="-striped -highlight"
        />
        <br />
      </div>
    );
  }
}
