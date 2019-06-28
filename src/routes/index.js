import { createStackNavigator, createAppContainer, createBottomTabNavigator, createSwitchNavigator } from "react-navigation";
import React from "react";
import {Platform, StyleSheet, Text, View, Button} from 'react-native';
import {
  BottomNavigation,
  BottomNavigationTab,
  BottomNavigationProps,
  Avatar
} from 'react-native-ui-kitten';
import HomeScreen from '../Pages/HomeScreen'
import SettingsScreen from '../Pages/SettingScreen'
import ProfileScreen from '../Pages/ProfileScreen'
import LoginScreen from '../Pages/LoginScreen'
import BasicExample from '../Pages/Lottie'

class DetailsScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Details Screen</Text>
        <Button
          title="Go to Details... again"
          onPress={() => this.props.navigation.navigate('BasicExample')}
        />
        <Button
          title="Go to Home"
          onPress={() => this.props.navigation.navigate('Home')}
        />
        <Button
          title="Go back"
          onPress={() => this.props.navigation.goBack()}
        />
      </View>
    );
  }
}

class BottomNavigationShowcase extends React.Component {
  render () {
    const onTabSelect = (selectedIndex: number) => {
      const selectedRoute = this.props.navigation.state.routes[selectedIndex];
      console.log(selectedRoute)
      this.props.navigation.navigate(selectedRoute.routeName);
    };

    return (
      <BottomNavigation
        selectedIndex={this.props.navigation.state.index}
        onSelect={onTabSelect}>
        <BottomNavigationTab icon={() => {
          return <Avatar source={require('./agent.png')} />
        }} title='Home'/>
        <BottomNavigationTab title='Setting'/>
      </BottomNavigation>
    );
  }
}

const HomeStack = createStackNavigator({
  Home: HomeScreen,
  Details: DetailsScreen,
  BasicExample: BasicExample,
});

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen,
  Profile: ProfileScreen,
});

const TabNavigator = createBottomTabNavigator(
  {
    Home: HomeStack,
    Settings: SettingsStack,
  }, {
    initialRouteName: "Settings",
    tabBarComponent: BottomNavigationShowcase
  }
);

const RootNavigator = createSwitchNavigator({
  Main: TabNavigator,
  Login: LoginScreen
}, {
  initialRouteName: "Main",
})

const AppContainer = createAppContainer(RootNavigator);

export default AppContainer
