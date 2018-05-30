import React from 'react';
import { connect } from 'react-redux';
import { createSwitchNavigator } from 'react-navigation';
import { View } from 'react-native';
import NativeTachyons from 'react-native-style-tachyons';
import { addNavigator, removeNavigator } from 'services/navigation';
import Login from 'screens/Login';
import Dashboard from 'screens/Dashboard';
import ActivityIndicator from './ActivityIndicator';

const Navigator = createSwitchNavigator(
  {
    '/login': Login,
    '/dashboard': Dashboard
  },
  { initialRouteName: '/login' }
);
const mapDispatchToProps = {
  addNavigator,
  removeNavigator
};

@connect(null, mapDispatchToProps)
@NativeTachyons.wrap
export default class Router extends React.Component {
  componentDidMount() {
    const { current: navigator } = this.navigatorRef;
    this.props.addNavigator({ navigator, key: 'root' });
  }

  componentWillUnmount() {
    this.props.removeNavigator('root');
  }

  navigatorRef = React.createRef();

  render() {
    return pug`
      View.bg-white
        Navigator(ref=this.navigatorRef)
        ActivityIndicator
    `;
  }
}
