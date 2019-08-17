import React from 'react';
import { formatNumber } from '../../utils/utils';
import moment from 'moment';
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
/**
 * Configuration for columns.
 * Accessor with arrow function allows for passing modified values to cell renderer
 * Cell with arrow function allows adding jsx to cell renderer
 * @type {Array}
 */
export const columns = [
  {
    Header: "Name",
    width: 175,
    style: {'paddingleft': '10px'},
    // using object to pass multiple values to cell
    accessor: data => ({name: data.name, url: data.svn_url}),
    id: 'name',
    Cell: row => (<span><a href={row.value.url}>{row.value.name}</a></span>)
  },
  {
    Header: "Description",
    accessor: "description"
  },
  {
    Header: "Stars",
    accessor: "stargazers_count",
    width: 100,
    Cell: row =>(<span><FontAwesomeIcon icon={faStar}/> {formatNumber(row.value)}</span>)
  },
  {
    Header: "Last Updated",
    accessor: "updated_at",
    width: 150,
    Cell: row => (moment(row.value).fromNow(false))
  }
]
