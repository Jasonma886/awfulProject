import React from "react";
import {Layout, Text, Button} from 'react-native-ui-kitten';
import SplashScreen from 'react-native-splash-screen'

export default class ProfileScreen extends React.Component {

  componentDidMount () {
    // SplashScreen.show()
    SplashScreen.hide()

  }

  render() {
    return (
      <Layout style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>ProfileScreen Screen</Text>
        <Button
          title="Go to ProfileScreen... again"
          onPress={() => this.props.navigation.navigate('Main')}
        />
      </Layout>
    );
  }
}

