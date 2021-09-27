import React from 'react';

const TableRow = props => (
  <tbody>
    <tr>
      {props.row.map((el, index) => <td key={index}>{el}</td>)}
    </tr>
  </tbody>
);


export default TableRow;