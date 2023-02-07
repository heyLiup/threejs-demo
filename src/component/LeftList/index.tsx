import react, { useState } from "react";
import styles from "./index.less";
interface ILeftList {}

function LeftList(props: ILeftList) {
  return <div className={styles.leftList}></div>;
}

export default LeftList;
