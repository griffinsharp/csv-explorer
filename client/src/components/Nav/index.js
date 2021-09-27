import React from 'react';

import styles from './nav.module.css';
import layoutStyles from '../../styles/layout.module.css';
import colorStyles from '../../styles/colors.module.css';
import fontStyles from '../../styles/fonts.module.css';

const Nav = () => (
  <div
    className={`${layoutStyles.flexJustifyRight} ${layoutStyles.paddingTop10} ${layoutStyles.paddingRight10} ${colorStyles.mainText} ${fontStyles.sizeXl}`}>
    CSV Explorer
  </div>
);

export default Nav;