import { useTheme } from '@material-ui/core';
import * as React from 'react';

const RedAsterisk = () => {
  const theme = useTheme();
  return <span style={{
    color: theme.colors.error,
    marginLeft: '5px',
  }}>*</span>;
};

export default RedAsterisk;
