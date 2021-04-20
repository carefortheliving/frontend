import * as React from 'react';
import { StylesProps } from '../../../types';
import AppLoader from 'src/components/common/AppLoader/View';

const styles = theme => ({
});
interface LoginProps extends
  StylesProps <ReturnType <typeof styles>> {
}

const Feed: React.FC<LoginProps> = ({
  classes,
}) => {

  return <div>
    <AppLoader />
  </div>;
};

export default React.memo(Feed);
