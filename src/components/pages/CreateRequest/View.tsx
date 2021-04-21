import * as React from 'react';
import { makeStyles } from '@material-ui/core';
import withAuth from 'src/components/common/withAuth/View';

const useStyles = makeStyles((theme) => ({}));

interface CreateRequestProps {

}

const CreateRequest: React.FC<CreateRequestProps> = ({
}) => {

  const classes = useStyles();

  return <div>

  </div>;
};

export default React.memo(
  withAuth(CreateRequest)
);
