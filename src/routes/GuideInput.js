import React from 'react';
import { connect } from 'dva';
import styles from './GuideInput.css';
import { Input ,Button} from 'antd';
const Search = Input.Search;

function GuideInput() {
  return (
    <div className={styles.normal}>
     <div className={styles.main}>
      <Input placeholder="输入出发地"/>
      <Search placeholder="输入目的地"/>
      </div>
    </div>
  );
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(GuideInput);
