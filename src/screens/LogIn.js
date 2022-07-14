import React, { Component } from "react";
import {
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Dimensions
} from "react-native";
import Text from '../components/AppText';
import LinearGradient from "react-native-linear-gradient";
import { AccessToken, LoginManager, Settings } from 'react-native-fbsdk-next';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import GoogleIcon from '../../assets/vectors/google-icon.svg';
import PhoneIcon from '../../assets/vectors/phone-icon.svg';
import FacebookIcon from '../../assets/vectors/facebook-icon.svg';
import InputForm from "../components/InputForm";

const HEIGHT_SCREEN = Dimensions.get("window").height;

// Settings.setAppID('333094938669452');
// Settings.initializeSDK();

GoogleSignin.configure({
  webClientId: '825638128531-1scuabiqho5g2r73e8hgjbs8qnfa7217.apps.googleusercontent.com',
  offlineAccess: true,
});

async function onGoogleButtonPress() {

  // Get the users ID token
  const { idToken } = await GoogleSignin.signIn();
  console.log('Token from Google: ', idToken);

  GoogleSignin.signOut();
}

export default class LogIn extends Component {

  constructor(props) {
    super(props);
    this.state = {
      addrestToLogin: "",
      password: "",
    }
  }

  loginWithFacebook() {
    LoginManager.logInWithPermissions(['public_profile', 'email', 'user_friends']).then(
      function (result) {
        if (result.isCancelled) {
          console.log("Login cancelled");
        } else {
          // console.log(
          //   "Login success with permissions: " +
          //   result.grantedPermissions.toString()
          // );
          AccessToken.getCurrentAccessToken().then(
            (data) => {
              console.log("Token from Facebook: ", data.accessToken.toString());
              // send the token to server
            }
          )
          LoginManager.logOut();
        }
      },
      function (error) {
        console.log("Login fail with error: " + error);
      }
    );
  }

  loginWithGoogle = () => {
    onGoogleButtonPress()
      .then(() => {
        console.log('Done');
      })
      .catch((error) => {
        console.log(error);
      })
  }

  loginWithPhone = () => {
    this.props.navigation.navigate('SigninWithNumberPhone');
  }

  onForgotPassword = () => {
    this.props.navigation.navigate("EnterAddress");
  }

  onPressRightButton = (address, addressType, passwordValue, reenterPasswordValue) => {
    this.props.navigation.navigate("BasicInformation");
  }

  onPressLeftButton = () => {
    this.props.navigation.navigate("LogUp");
  }

  render() {
    return (
      <ScrollView
        contentContainerStyle={{ flex: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <ImageBackground
          style={styles.imageBackground}
          imageStyle={{
            transform: [
              {
                scale: 1.1,
              }
            ]
          }}
          source={require('../../assets/imgs/background.jpg')}
        >
          <TouchableOpacity
            style={[styles.socialNetworkButton, { marginBottom: 15 }]}
            activeOpacity={0.7}
            onPress={this.loginWithFacebook}
          >
            <LinearGradient
              style={styles.socialNetworkLinear}
              colors={["#00b7ff", "rgba(0,85,180,0.7)"]}
            >
              <View style={styles.iconContainer}>
                <FacebookIcon width={13.37} height={24.51} ></FacebookIcon>
              </View>
              <Text style={styles.socialNetworkText} >Đăng nhập bằng Facebook</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.socialNetworkButton, { marginBottom: 15 }]}
            activeOpacity={0.7}
            onPress={this.loginWithPhone}
          >
            <LinearGradient
              style={styles.socialNetworkLinear}
              colors={["#27D889", "rgba(0,126,103,0.7)"]}
            >
              <View style={styles.iconContainer}>
                <PhoneIcon width={24.35} height={23.07} ></PhoneIcon>
              </View>
              <Text style={styles.socialNetworkText} >Đăng nhập bằng số điện thoại</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.socialNetworkButton, { marginBottom: 15 }]}
            activeOpacity={0.7}
            onPress={this.loginWithGoogle}
          >
            <LinearGradient
              style={styles.socialNetworkLinear}
              colors={["#FE5C3D", "rgba(206,0,57,0.7)"]}
            >
              <View style={styles.iconContainer}>
                <GoogleIcon width={34.16} height={21.4} ></GoogleIcon>
              </View>
              <Text style={styles.socialNetworkText} >Đăng nhập bằng Google</Text>
            </LinearGradient>
          </TouchableOpacity>

          <KeyboardAvoidingView
            behavior={'padding'}
            keyboardVerticalOffset={20}
            style={{ flex: 1, alignItems: 'center', flexDirection: 'column-reverse', marginBottom: 30 }}
          >
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={this.onForgotPassword}
            >
              <Text style={styles.forgotPassword}>Quên mật khẩu</Text>
            </TouchableOpacity>

            <InputForm
              leftButtonLabel={"Đăng ký"}
              rightButtonLabel={"Tiếp tục"}
              placeholderAddressInput={"Số điện thoại hoặc email"}
              placeholderPasswordInput={"Nhập mật khẩu của bạn"}
              onPressRightButton={this.onPressRightButton}
              onPressLeftButton={this.onPressLeftButton}
            />

          </KeyboardAvoidingView>
        </ImageBackground >
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  imageBackground: {
    height: HEIGHT_SCREEN,
    alignItems: 'center',
    flexDirection: 'column-reverse',
    paddingBottom: 25,
  },
  socialNetworkButton: {
    width: '85%',
    height: 40,
    marginVertical: "2%",
  },
  socialNetworkLinear: {
    flex: 1,
    borderRadius: 100,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  iconContainer: {
    width: 35,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  socialNetworkText: {
    textAlign: 'center',
    fontSize: 18,
    color: 'white',
    marginLeft: "5%",
  },
  forgotPassword: {
    marginBottom: 30,
    fontStyle: "italic",
    fontSize: 18,
    color: "rgba(149,176,177,0.7)",
    textDecorationLine: "underline"
  },
  buttonContainer: {
    flexDirection: 'row',
    marginVertical: 15,
    width: '85%',
    height: 40,
  },
  buttonStyle: {
    height: '100%',
    width: '47%',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#95D1D3',
    borderRadius: 100,
    borderWidth: 2,
  },
  textInputContainer: {
    height: 50,
    width: '85%',
    borderRadius: 10,
    borderColor: "#005C6E",
    borderWidth: 1,
    backgroundColor: 'rgba(149,176,177,0.7)',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 13,
  },
  inputStyle: {
    fontSize: 17,
    color: '#324B4C',
    flex: 1,
    marginLeft: 10,
  }
})