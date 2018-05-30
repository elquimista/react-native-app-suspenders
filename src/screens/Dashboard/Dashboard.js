import React from 'react';
import { connect } from 'react-redux';
import autobind from 'autobind-decorator';
import { View, Text, Button } from 'react-native';
import NativeTachyons from 'react-native-style-tachyons';
import AnimatedView from 'components/AnimatedView';
import authThunk from 'services/auth/auth-thunk';
import { API_BASEURL } from 'config';

const mapDispatchToProps = {
  logout: authThunk.logout
};

@connect(null, mapDispatchToProps)
@NativeTachyons.wrap
export default class Dashboard extends React.Component {
  @autobind
  handleLogoutButtonPress() {
    this.props.logout();
  }

  render() {
    return pug`
      AnimatedView.pt-44.h-100p
        View.flx-i.jcc.aic
          Text.mb4
            | API_BASEURL = #{API_BASEURL}
          Button(title="Sign Out" onPress=this.handleLogoutButtonPress)
    `;
  }
}
