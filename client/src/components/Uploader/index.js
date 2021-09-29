import React from 'react';

import fontStyles from '../../styles/fonts.module.css';
import layoutStyles from '../../styles/layout.module.css';
import styles from './uploader.module.css';
import utilStyles from '../../styles/util.module.css';

import { AiOutlineUpload } from "react-icons/ai";
import ScaleLoader from "react-spinners/ScaleLoader";

const LoaderView = () => <ScaleLoader color={'#03dac6'} />;

const UploadBtnView = () => (
  <label for="file-upload" className={`${styles.fileUploadBtn} ${fontStyles.sizeLg} ${utilStyles.hover}`}>
    Upload CSV
    <AiOutlineUpload className={layoutStyles.marginLeft10} />
  </label>
);

const Uploader = (props) => (
  <div>
    {props.isLoading ? LoaderView() : UploadBtnView()}
    <input
      accept=".csv,.xls,.xlsx,text/csv"
      className={utilStyles.hidden}
      disabled={props.isLoading}
      id='file-upload'
      onChange={props.onChange}
      type='file'
      >
    </input>
  </div>
);

export default Uploader;