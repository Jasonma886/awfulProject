import React from "react";
import {Platform, StyleSheet} from 'react-native';
import {Layout, Text, Button, Input} from 'react-native-ui-kitten';
import {getLoginUser, _getImageSetCookie, signIn} from '../api/basic'
import SplashScreen from "react-native-splash-screen";

export default class LoginScreen extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      text: '',
      j_username: '',
      j_password: '',
      ua: Platform.OS,
      rememberPwd: false,
      rememberUser: true,
      seePwd: false,
      isLoading: false,
      isRegist: false
    }
  }
  componentDidMount () {
    SplashScreen.hide()
    getLoginUser().then(res => {
      this.setState({
        text: res.message
      })
    })
  }

  toLogin = () =>{
    _getImageSetCookie().then(res => {
      let {j_username, j_password, ua} = this.state
      signIn({j_username, j_password, ua}).then(res => {
        if (res.code === 0) {
          alert('登录成功')
        } else {
          alert(res.message || '网络错误，请重试')
        }
        getLoginUser().then(res2 => {
          if (res2.code === 0) {
            this.props.navigation.navigate('Details')
          } else {
            this.setState({
              isLoading: false
            })
          }
        })
      })
    })
  }

  render() {
    return (
      <Layout style={styles.container}>
        <Text>Login Page Screen alone</Text>
        <Text>{this.state.text}</Text>
        <Input label={'用户名'} size={'small'} onChangeText={value => {
          this.setState({
            j_username: value
          })
        }}/>
        <Input label={'密码'} type={'password'} onChangeText={value => {
          this.setState({
            j_password: value
          })
        }}/>
        <Button
          onPress={this.toLogin}
        >
          Login
        </Button>
      </Layout>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" }
})
