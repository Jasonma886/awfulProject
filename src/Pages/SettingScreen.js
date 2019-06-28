import React from "react";
import {Layout, Text, Button} from 'react-native-ui-kitten';

export default class SettingScreen extends React.Component {
  render() {
    return (
      <Layout style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>SettingScreen Screen alone</Text>
        <Button
          title="Go to Details"
          onPress={() => this.props.navigation.navigate('Details')}
        />
      </Layout>
    );
  }
}
