import React, { Component } from 'react';

import TableContainer from './Table/TableContainer';
import Uploader from './Uploader/index';
import update from 'immutability-helper';

import colorStyles from '../styles/colors.module.css';
import layoutStyles from '../styles/layout.module.css';
import fontStyles from '../styles/fonts.module.css';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      csv: null,
      address_street_name: '',
      filters: [],
      headers: [],
      isLoading: false
    }
  }

  fetchCSVData(csv, filters={}) {

    filters =
    {
      address: {
        number: {
          contains: null,
          exact: null,
          greater_than: null,
          less_than: null
        },
        street_name: {
          contains: null,
          exact: null,
          starts_with: null
        }
      }
    }
    csv.append('filters', JSON.stringify(filters));

    const params = {
      body: csv,
      method: 'POST'
    };

    fetch('/api/v1/csvs', params)
      .then(res => res.json())
      .then(res => {
        this.parseCSVFromServer(res);
        this.setState({isLoading: false});
      })
      .catch(err => {
        // Display error somewhere.
        this.setState({isLoading: false})
      })
  }

  handleChange(event, field) {
    this.setState({ [field]: event.target.value })
  }

  handleCSVUpload(event) {
    this.setState({isLoading: true});

    const file = event.target.files[0];
    this.setState({ csv: file });

    let formCSV = new FormData();
    formCSV.append('csv', file);

    this.fetchCSVData(formCSV);
  }

  parseCSVFromServer({headers, rows}) {
    this.setState({headers, rows});
  }

  render() {
    return (
      <div>
        {/* Greeting Message */}
        <div className={`${layoutStyles.flexAlignCenter} ${layoutStyles.flexJustifyCenter} ${layoutStyles.flexCol} ${layoutStyles.marginTop120}`}>
          <h1 className={`${layoutStyles.marginBottom10} ${colorStyles.white}`}>Hey there! 👋</h1>
          <h2 className={`${colorStyles.whiteLight} ${fontStyles.font100} ${layoutStyles.marginBottom40}`}>Start searching homes by uploading a CSV below.</h2>
          <Uploader
            isLoading={this.state.isLoading}
            onChange={e => this.handleCSVUpload(e)}
            />
        </div>

        {/* Move this into TableContainer itself  */}
        { this.state.headers.length > 0 && <TableContainer headers={this.state.headers} rows={this.state.rows} /> }

        {/* <form onSubmit={this.fetchCSVData}>
          <button disabled={this.state.isLoading} type='submit'>Upload CSV</button>
        </form> */}
      </div>
    );
  }
}

export default Home;

