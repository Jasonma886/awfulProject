import React from "react";
import {Layout} from 'react-native-ui-kitten';
import {Text} from 'react-native'
import {getLoginUser} from '../api/basic'
import { ThemeProvider, Button, Input, Overlay } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

const theme = {
  Button: {
    raised: true,
    titleStyle: {
      color: 'red',
    }
  },
}

export default class HomeScreen extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      text: '',
      isVisible: true
    }
  }
  componentDidMount () {
    getLoginUser().then(res => {
      this.setState({
        text: res.message
      })
    })
  }

  render() {
    return (
      <Layout style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ThemeProvider theme={theme}>
          <Button title="My Button" titleStyle={{ color: 'pink' }} />
          <Button title="My 2nd Button" onPress={() => this.setState({ isVisible: true })} />
          <Input
            placeholder='INPUT WITH ICON'
            leftIcon={<Icon
              name='lock'
              size={20}
              color='black'
            />}
          />

          <Input
            type={'password'}
            placeholder='INPUT WITH CUSTOM ICON'
            leftIcon={
              <Icon
                name='user'
                size={20}
                color='black'
              />
            }
          />

          <Input
            placeholder='INPUT WITH SHAKING EFFECT'
            shake={true}
          />

          <Input
            placeholder='INPUT WITH ERROR MESSAGE'
            errorStyle={{ color: 'red' }}
            errorMessage='ENTER A VALID ERROR HERE'
          />
          <Overlay
            isVisible={this.state.isVisible}
            onBackdropPress={() => this.setState({ isVisible: false })}
          >
            <Text>Hello from Overlay!</Text>
          </Overlay>
        </ThemeProvider>
        <Text>Home Screen alone</Text>
        <Text>{this.state.text}</Text>
        <Button title="My Button"
          onPress={() => this.props.navigation.navigate('Details')}
        >
          Go to Details
        </Button>
      </Layout>
    );
  }
}
