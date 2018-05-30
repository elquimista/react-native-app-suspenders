import React from 'react';
import { Animated } from 'react-native';
import NativeTachyons from 'react-native-style-tachyons';

const { View } = Animated;

@NativeTachyons.wrap
export default class AnimatedView extends React.Component {
  state = {
    opacity: new Animated.Value(0)
  };

  componentDidMount() {
    Animated.timing(this.state.opacity, {
      toValue: 1,
      duration: 300
    }).start();
  }

  render() {
    const { className, style, children } = this.props;
    const { opacity } = this.state;

    return pug`
      View(className=className style=[style, { opacity }])
        = children
    `;
  }
}
