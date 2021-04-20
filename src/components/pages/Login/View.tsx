import * as React from 'react';
import { StylesProps } from '../../../types';

const styles = theme => ({
});
interface LoginProps extends
  StylesProps <ReturnType <typeof styles>> {
}

const Login: React.FC<LoginProps> = ({
  classes,
}) => {

  return <div>
  </div>;
};

export default React.memo(Login);
