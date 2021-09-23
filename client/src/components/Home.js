import React, { Component } from 'react';

import TableContainer from './Table/TableContainer';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      csv: null,
      headers: [],
      isLoading: false
    }
  }

  fetchTestData(csv) {
    const params = {
      body: csv,
      method: 'POST'
    };

    fetch('/api/v1/csvs', params)
      .then(res => res.json())
      .then(res => {
        this.setState({isLoading: false});
        this.parseCSVFromServer(res);
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

    this.fetchTestData(formCSV);
  }

  parseCSVFromServer({headers, rows}) {
    this.setState({headers, rows});
  }

  render() {
    return (
      <div>
        <input
          accept=".csv,.xls,.xlsx,text/csv"
          id='csv'
          disabled={this.state.isLoading}
          onChange={e => this.handleCSVUpload(e)}
          type='file'
          >
        </input>

        {/* Move this into TableContainer itself  */}
        { this.state.headers.length > 0 && <TableContainer headers={this.state.headers} rows={this.state.rows} /> }

        {/* <form onSubmit={this.fetchTestData}>
          <button disabled={this.state.isLoading} type='submit'>Upload CSV</button>
        </form> */}
      </div>
    );
  }
}

export default Home;

