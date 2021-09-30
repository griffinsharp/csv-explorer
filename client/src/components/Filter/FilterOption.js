import React from 'react';

import { objectIsValid } from '../../utils/objectUtils';

import { AiOutlineCloseSquare } from "react-icons/ai";

import layoutStyles from '../../styles/layout.module.css';
import colorStyles from '../../styles/colors.module.css';
import styles from './filter.module.css';
import utilStyles from '../../styles/util.module.css';

const SubColumnView = (name, params) => {
  if (!objectIsValid(params)) return <div></div>;

  return(
    <div className={`${layoutStyles.marginRight10} ${layoutStyles.flex}`}>
      <p className={`${colorStyles.white} ${layoutStyles.marginRight10}`}>{name}</p>
      {
        Object.keys(params).map((paramKey, i) => (
          <div className={`${layoutStyles.flex} ${layoutStyles.marginRight10}`}>
            {(i > 0) && <p className={layoutStyles.marginRight10}>and</p>}
            <p className={layoutStyles.marginRight10}>{paramKey}</p>
            <p className={colorStyles.purple}>{params[paramKey]}</p>
          </div>
        ))
      }
    </div>
  );
}

const FilterOption = ({filterName, subColsObj, removeFilterFromState}) => {
  return (
    <div className={`${layoutStyles.flex} ${styles.filterOption} ${layoutStyles.paddingLeft20} ${layoutStyles.paddingRight20}`}>
      <p className={`${layoutStyles.marginRight20} ${colorStyles.white}`}>{filterName.toUpperCase()}</p>
      { Object.keys(subColsObj).map(subCol => SubColumnView(subCol, subColsObj[subCol])) }
      <div onClick={(event) => removeFilterFromState(filterName)} style={{ fontSize: '20px' }} className={`${layoutStyles.flexAlignCenter} ${colorStyles.white} ${utilStyles.hover}`}>
        <AiOutlineCloseSquare />
      </div>
    </div>
  );
};

export default FilterOption;