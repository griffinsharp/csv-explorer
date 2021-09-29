import React from 'react';

import colorStyles from '../../styles/colors.module.css';
import fontStyles from '../../styles/fonts.module.css';
import layoutStyles from '../../styles/layout.module.css';

const Nav = () => (
  <div
    className={`${layoutStyles.flexJustifyRight} ${layoutStyles.paddingTop10} ${layoutStyles.paddingRight10} ${colorStyles.white} ${fontStyles.sizeXl}`}>
    Home Finder
  </div>
);

export default Nav;