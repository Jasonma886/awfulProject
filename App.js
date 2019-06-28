/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import React, {Component} from 'react';
import AppContainer from './src/routes'
import { mapping, light as lightTheme } from '@eva-design/eva';
import { ApplicationProvider, Layout } from 'react-native-ui-kitten';

export default class App extends React.Component {
  render() {
    return <ApplicationProvider
      mapping={mapping}
      theme={lightTheme}>
      <Layout style={{flex: 1}}>
        <AppContainer></AppContainer>
      </Layout>
    </ApplicationProvider>
  }
}
