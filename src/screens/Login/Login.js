import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import autobind from 'autobind-decorator';
import { View, Button } from 'react-native';
import NativeTachyons from 'react-native-style-tachyons';
import AnimatedView from 'components/AnimatedView';
import { loggedInSelector } from 'services/auth';
import authThunk from 'services/auth/auth-thunk';

const mapStateToProps = createStructuredSelector({
  isLoggedIn: loggedInSelector
});
const mapDispatchToProps = {
  login: authThunk.login
};

@connect(mapStateToProps, mapDispatchToProps)
@NativeTachyons.wrap
export default class Login extends React.Component {
  componentDidMount() {
    const { navigation, isLoggedIn } = this.props;
    if (isLoggedIn) {
      navigation.navigate('/dashboard');
    }
  }

  @autobind
  handleLoginButtonPress() {
    this.props.login();
  }

  render() {
    return pug`
      unless this.props.isLoggedIn
        AnimatedView.pt-44.h-100p
          View.flx-i.jcc.aic
            Button(title="Sign In" onPress=this.handleLoginButtonPress)
      else
        View
    `;
  }
}
