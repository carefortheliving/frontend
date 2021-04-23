import React, { useState } from 'react';
import { Tree } from 'antd';
import { makeStyles } from '@material-ui/core/styles';
import FilterData from '../../../Constants/FilterData';

const { categories, status, state: indianStates } = FilterData();

const useStyles = makeStyles(() => ({
  style: {
    backgroundColor: 'inherit',
  },
}));
const treeData = [

  {
    title: 'Status',
    key: 'status',
    children: [
      ...status.map((item) => ({ title: item, key: item })),
    ],
  },

  {
    title: 'Category',
    key: 'category',
    children: [
      ...categories.map((item) => ({ title: item, key: item })),
    ],
  },

  {
    title: 'Location',
    key: 'location',
    children: [
      ...Object.keys(indianStates).map((state) => ({
        title: state,
        key: state,
        children: [
          ...indianStates[state].map((val) => ({ title: val.city || val, key: val.city || val })),
        ],
      })),
    ],
  },
];

const Demo = (props:any) => {
  const classes = useStyles();
  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>(['status', 'category']);
  const [checkedKeys, setCheckedKeys] = useState<React.Key[]>(['Active']);
  const [selectedKeys, setSelectedKeys] = useState<React.Key[]>([]);
  const [autoExpandParent, setAutoExpandParent] = useState<boolean>(true);

  const onExpand = (expandedKeysValue: React.Key[]) => {
    // console.log('onExpand', expandedKeysValue);
    // if not set autoExpandParent to false, if children expanded, parent can not collapse.
    // or, you can remove all expanded children keys.
    setExpandedKeys(expandedKeysValue);
    setAutoExpandParent(false);
  };

  const onCheck = (checkedKeysValue) => {
    // console.log('onCheck', checkedKeysValue);
    setCheckedKeys(checkedKeysValue);
  };

  const onSelect = (selectedKeysValue: React.Key[], info: any) => {
    // console.log('onSelect', info);
    // setSelectedKeys(selectedKeysValue);
    // console.log('onCheck', checkedKeys);
    // console.log(selectedKeysValue)

    if (!checkedKeys.includes(selectedKeysValue[0])) setCheckedKeys([...checkedKeys, selectedKeysValue[0]]);
    else setCheckedKeys(checkedKeys.filter((val) => val != selectedKeysValue[0]));
  };
  // console.log(checkedKeys)

  React.useEffect(() => {
    props.getFilters(checkedKeys);
  }, [checkedKeys]);

  return (
    <>
      <Tree
        checkable
        onExpand={onExpand}
        expandedKeys={expandedKeys}
        autoExpandParent={autoExpandParent}
        onCheck={onCheck}
        checkedKeys={checkedKeys}
        onSelect={onSelect}
        selectedKeys={selectedKeys}
        treeData={treeData}
        className={classes.style}
      />
    </>

  );
};

export default Demo;
