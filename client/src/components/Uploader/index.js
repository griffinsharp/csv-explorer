import React from 'react';

import styles from './uploader.module.css';
import utilStyles from '../../styles/util.module.css';

const Uploader = (props) => (
  <div>
    <label for="file-upload" className={styles.fileUploadBtn}>
      Upload CSV
    </label>
    <input
      className={utilStyles.hidden}
      accept=".csv,.xls,.xlsx,text/csv"
      id='file-upload'
      disabled={props.isLoading}
      onChange={props.onChange}
      type='file'
      >
    </input>
  </div>
)

export default Uploader;