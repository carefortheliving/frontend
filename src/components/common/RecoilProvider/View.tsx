import * as React from 'react';
import { RecoilRoot } from 'recoil';

class RecoilProvider extends React.PureComponent<any, any> {
  render() {
    return (
      <RecoilRoot>
        {this.props.children}
      </RecoilRoot>
    );
  }
}

export default RecoilProvider;
