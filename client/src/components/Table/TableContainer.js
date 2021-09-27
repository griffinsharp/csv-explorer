import React, { Component } from 'react';

import TableHeader from './TableHeader';
import TableRow from './TableRow';

class TableContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {

    }
  }

  render() {
    return(
      <table>
        <TableHeader headers={this.props.headers} />
        { this.props.rows.map((row, index) => <TableRow key={index} row={row} />) }
      </table>
    );
  }
}

export default TableContainer;