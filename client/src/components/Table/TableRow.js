import React from 'react';

import { dataIsUrl } from '../../utils/tableUtils';

import colorStyles from '../../styles/colors.module.css';

// TODO: Edit this to be more generic / format multiple types (not just URL).
const UrlView = (url) => (
  <td>
    <a
      className={colorStyles.purple}
      target="_blank"
      rel="noopener noreferrer"
      href={url}
      >
      link
    </a>
  </td>
);


const TableRow = props => (
  <tbody>
    <tr>
      {
        props.row.map((el, index) => dataIsUrl(el, index) ? UrlView(el) : <td key={index}>{el}</td>)
      }
    </tr>
  </tbody>
);


export default TableRow;