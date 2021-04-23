import React, { useState } from 'react';
import { Tree } from 'antd';
import { makeStyles } from "@material-ui/core/styles";
import FilterData from '../../../Constants/FilterData'
import {Locations} from '../../../Constants/FilterData'
import { useSnackbar } from "src/components/common/SnackbarProvider/View";


const { categories, status, state: indianStates } = FilterData();


const {indianStates:rashtr , indianCities:nagar} = Locations()


const useStyles = makeStyles(() => ({
  style: {
    backgroundColor: "inherit"
  }
}))
const treeData = [

  {
    title: 'Status',
    key: 'status',
    children: [
      ...status.map(item => ({ title: item, key: item }))
    ]
  },

  {
    title: 'Category',
    key: 'category',
    children: [
      ...categories.map(item => ({ title: item, key: item }))
    ]
  },



  {
    title: 'Location',
    key: 'location',
    children: [
      ...Object.keys(indianStates).map(state => {
        return ({
          title: state, key: state, children: [
            ...indianStates[state].map(val => {
              return ({ title: val.city || val, key: val.city })
            })
          ]
        })
      })
    ]
  },
];

const Demo = (props:any) => {
  const snackbar = useSnackbar();
  const classes = useStyles();
  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>(['status', 'category']);
  const [checkedKeys, setCheckedKeys] = useState<React.Key[]>(['Active']);
  const [selectedKeys, setSelectedKeys] = useState<React.Key[]>([]);
  const [autoExpandParent, setAutoExpandParent] = useState<boolean>(true);
  // const [stateCount , setStateCount] = React.useState(0)
  // const [cityCount , setCityCount] = React.useState(0)
  const onExpand = (expandedKeysValue: React.Key[]) => {
    // console.log('onExpand', expandedKeysValue);
    // if not set autoExpandParent to false, if children expanded, parent can not collapse.
    // or, you can remove all expanded children keys.
    setExpandedKeys(expandedKeysValue);
    setAutoExpandParent(false);
  };

  const onCheck = (checkedKeysValue) => {
    //console.log('onCheck', checkedKeysValue);
    // setCheckedKeys(checkedKeysValue);
  };

  const onSelect = (selectedKeysValue: React.Key[], info: any) => {
//     let status=""


    if (!checkedKeys.includes(selectedKeysValue[0]))
      setCheckedKeys([...checkedKeys, selectedKeysValue[0]])
    else
      setCheckedKeys(checkedKeys.filter(val => val != selectedKeysValue[0]))

  };
  

  React.useEffect(() => {
    let status=""
    let states=""
    let cities=""
    let categoryTypes=""
    checkedKeys.map(ele => {
      if(ele === "Active" || ele === "Completed")
        status+="*"+ele
      else if(categories.includes(ele.toString()))
        categoryTypes+="*"+ele 
      else if(rashtr.includes(ele))
      states+="*"+ele
      else if(nagar.includes(ele))
      cities+="*"+ele
    })
    // console.log({status:(status.split('*')).slice(1) , states:(states.split('*')).slice(1) , cities:(cities.split('*')).slice(1)})
      props.getFilters({status:(status.split('*')).slice(1) , states:(states.split('*')).slice(1) , cities:(cities.split('*')).slice(1) , categories:(categoryTypes.split('*')).slice(1)})
  }, [checkedKeys])

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
