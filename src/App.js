import React from "react";
import _ from "lodash";
// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";

import moment from 'moment';

import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// fetch goes here
// https://api.github.com/search/repositories?q=language:javascript&sort=stars&order=desc&per_page=100
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
  componentDidMount(){
    fetch('https://api.github.com/search/repositories?q=language:javascript&sort=stars&order=desc&per_page=100', {mode: 'cors'})
      .then( response => {
          response.json().then( data => {
            this.setState({data: data.items});
            this.handleInteraction(this.refs.table.state, {});
          })
          .catch(error => {
            //alert(error)
          });
        }
      )
      .catch(function(error) {
        console.log('Fetch Error :-S', error);
      })
      .finally( () =>{
        this.setState({loading: false})
      });

  }
  updatePages(pageSize, page) {
      // You must return an object containing the rows of the current page, and optionally the total pages number.
      const newData = {
        page: this.state.data.slice(pageSize * page, pageSize * page + pageSize),
        pages: Math.ceil(this.state.data.length / pageSize)
      };
      console.log(newData);
      return(newData);
  };

  handleInteraction(state, instance) {
    console.log(state.pageSize, state.page);
    // Whenever the table model changes, or the user sorts or changes pages, this method gets called and passed the current table model.
    // You can set the `loading` prop of the table to true to use the built-in one or show you're own loading bar if you want.
    // Request the data however you want.  Here, we'll use our mocked service we created earlier
    const newData=this.updatePages(
      state.pageSize,
      state.page
    )
      // Now just get the rows of data to your React Table (and update anything else like total pages or loading)
      this.setState({
        currentPage: newData.page,
        pages: newData.pages
    });
  }
  render() {
    const { currentPage, pages, loading } = this.state;
    return (
      <div>
        <ReactTable
          columns={[
            {
              Header: "Name",
              width: 200,
              style: {'padding-left': '10px'},
              accessor: data => ({name: data.name, url: data.svn_url}),
              id: 'name',
              Cell: row => (
                <span><a href={row.value.url}>{row.value.name}</a></span>
              )
            },
            {
              Header: "Description",
              accessor: "description"
            },
            {
              Header: "Stars",
              accessor: "stargazers_count",
              width: 100
            },
            {
              Header: "Last Update",
              accessor: "updated_at"
            }
          ]}
          ref={'table'}
          manual // Forces table not to paginate or sort automatically, so we can handle it server-side
          data={currentPage}
          pages={pages} // Display the total number of pages
          loading={loading} // Display the loading overlay when we need it
          onFetchData={this.handleInteraction} // Request new data when things change
          defaultPageSize={20}
          className="-striped -highlight"
        />
        <br />
      </div>
    );
  }
}
