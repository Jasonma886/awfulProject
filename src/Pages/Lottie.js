import React from 'react';
import LottieView from 'lottie-react-native';

export default class Lottie extends React.Component {
  render() {
    return <LottieView source={require('./animation.json')} autoPlay loop />;
  }
}
