import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { View, ActivityIndicator } from 'react-native';
import NativeTachyons from 'react-native-style-tachyons';
import AnimatedView from 'components/AnimatedView';
import { busyStateSelector } from 'services/general';

const mapStateToProps = createStructuredSelector({
  isBusy: busyStateSelector
});

@connect(mapStateToProps)
@NativeTachyons.wrap
export default class CustomActivityIndicator extends React.Component {
  render() {
    return pug`
      View(className=this.props.isBusy ? 'absolute-fill' : '')
        if this.props.isBusy
          AnimatedView.h-100p.jcc.aic
            ActivityIndicator.pa4.br3.bg-overlay(
              animating=true
              color="black"
              size="large"
            )
    `;
  }
}
