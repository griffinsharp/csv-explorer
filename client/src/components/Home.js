import React, { Component } from 'react';

import update from 'immutability-helper';

import FilterContainer from './Filter/FilterContainer';
import TableContainer from './Table/TableContainer';
import Uploader from './Uploader/index';

import { nestedObjectIsEmpty } from '../../src/utils/objectUtils';

import colorStyles from '../styles/colors.module.css';
import layoutStyles from '../styles/layout.module.css';
import fontStyles from '../styles/fonts.module.css';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      csv: null,
      filters: {},
      headers: [],
      rows: [],
      isLoading: false,
      simplified: true
    }

    this.handleFilterUpdate = this.handleFilterUpdate.bind(this);
  }

  // METHODS
  handleFilterUpdate(column, filterObj) {
    if (nestedObjectIsEmpty(filterObj[column])) {
      const newFiltersObj = update(this.state.filters, { $unset: [ column ] });
      this._setFilterState(newFiltersObj);
    } else {
      const newFiltersObj = update(this.state.filters, {
        [ column ]: { $set: filterObj[ column ] }
      });
      this._setFilterState(newFiltersObj);
    }
  }

  // HELPERS
  _fetchCSVData(csv) {
    let formCSV = new FormData();
    formCSV.append('csv', csv);
    formCSV.append('filters', JSON.stringify(this.state.filters));

    const params = {
      body: formCSV,
      method: 'POST'
    };

    fetch('/api/v1/csvs', params)
      .then(res => res.json())
      .then(res => {
        this._parseCSVFromServer(res);
        this.setState({isLoading: false});
      })
      .catch(err => {
        // Display error somewhere...
        this.setState({isLoading: false});
      })
  }

  _handleCSVUpload(event) {
    this.setState({isLoading: true});

    const file = event.target.files[0];
    this.setState({csv: file});
    this._fetchCSVData(file);
  }

  _parseCSVFromServer({headers, rows}) {
    this.setState({headers, rows});
  }

  _setFilterState(filterState) {
    this.setState({filters: filterState}, () => this._fetchCSVData(this.state.csv));
  }

  // VIEWS
  _getCsvView() {
    return(
      <div className={layoutStyles.mainContainer}>
        <div>
          <h2>CSV NAME</h2>
          <FilterContainer handleFilterUpdate={this.handleFilterUpdate} />
        </div>
        <TableContainer headers={this.state.headers} rows={this.state.rows} simplified={this.state.simplified} />
      </div>
    );
  }

  _getUploaderView() {
    return(
      <div className={`${layoutStyles.flexAlignCenter} ${layoutStyles.flexJustifyCenter} ${layoutStyles.flexCol} ${layoutStyles.marginTop120}`}>
        <h1 className={`${layoutStyles.marginBottom15} ${colorStyles.white}`}>Hey there! 👋</h1>
        <h2 className={`${colorStyles.gray} ${fontStyles.font100} ${layoutStyles.marginBottom40}`}>Start searching homes by uploading a CSV below.</h2>
        <Uploader
          isLoading={this.state.isLoading}
          onChange={e => this._handleCSVUpload(e)}
        />
      </div>
    );
  }

  render() {
    return (
      <div className={layoutStyles.marginTop120}>
        {this.state.headers.length > 0 ? this._getCsvView() : this._getUploaderView() }
      </div>
    );
  }
}

export default Home;
