import React, { Component } from 'react';

import ScrollContainer from 'react-indiana-drag-scroll'

import { indexIsSimple } from '../../utils/tableUtils';

import TableHeader from './TableHeader';
import TableRow from './TableRow';

import layoutStyles from '../../styles/layout.module.css';

// TODO: This can be a purely functional component. No need for state.
class TableContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {

    }
  }

  // HELPERS
  _getRowsAndHeaders(dataRow) {
    return this.props.simplified
      ? dataRow.filter((row, index) => indexIsSimple(index))
      : dataRow
  }

  // VIEWS
  render() {
    return(
      <ScrollContainer className="scroll-container">
        <div className={layoutStyles.fadeIn}>
          <table>
            <TableHeader headers={this._getRowsAndHeaders(this.props.headers)} />
            { this.props.rows.map((row, index) => <TableRow key={index} row={this._getRowsAndHeaders(row)} simplified={this.props.simplified} />) }
          </table>
        </div>
      </ScrollContainer>
    );
  }
}

export default TableContainer;