import React from 'react';

const TableHeader = props => (
  <thead>
    <tr>
      { props.headers.map((el, index) => <th key={index}>{el}</th>) }
    </tr>
  </thead>
);

export default TableHeader;