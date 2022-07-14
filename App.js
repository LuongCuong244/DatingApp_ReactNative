import React, { Component } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from "@react-navigation/stack";
import LogIn from './src/screens/LogIn';
import LogUp from './src/screens/LogUp';
import SigninWithNumberPhone from './src/screens/SigninWithNumberPhone'
import BasicInformation from './src/screens/BasicInformation'
import MoreInformation from './src/screens/MoreInformation'
import SelectingValue from './src/screens/SelectingValue'
import TabsManager from './src/screens/Tabs/TabsManager';
import ChatRoom from "./src/screens/ChatRoom";
import UserProfile from './src/screens/UserProfile';
import Setting from "./src/screens/Setting";
import { LogBox } from "react-native";
import TransitionScreen from './src/animated/TransitionScreen';
import Verification from "./src/screens/Verification";
import EnterAddress from "./src/screens/ForgotPassword/EnterAddress";
import ResetPassword from "./src/screens/ForgotPassword/ResetPassword";
import MatchAndChat from "./src/screens/MatchAndChat";
import SearchByDistance from './src/screens/SearchByDistance';
import QuickSearch from "./src/screens/QuickSearch";

LogBox.ignoreAllLogs();

const Stack = createStackNavigator();

export default class App extends Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{ 
            headerShown: false,
          }}
          initialRouteName="TabsManager"
        >
          <Stack.Screen name="LogIn" component={LogIn} />

          <Stack.Screen
            name="LogUp"
            component={LogUp}
            options={{
              cardStyleInterpolator: TransitionScreen.fromLeftTop,
              transitionSpec: TransitionScreen.transitionSpecWithTiming(400),
            }}
          />

          <Stack.Screen
            name="EnterAddress"
            component={EnterAddress}
            options={{ cardStyleInterpolator: TransitionScreen.leftToRight, }}
          />

          <Stack.Screen
            name="ResetPassword"
            component={ResetPassword}
            options={{ cardStyleInterpolator: TransitionScreen.leftToRight, }}
          />

          <Stack.Screen
            name="Verification"
            component={Verification}
            options={{ cardStyleInterpolator: TransitionScreen.leftToRight, }}
          />

          <Stack.Screen
            name="SigninWithNumberPhone"
            component={SigninWithNumberPhone}
            options={{ cardStyleInterpolator: TransitionScreen.leftToRight, }}
          />

          <Stack.Screen
            name="BasicInformation"
            component={BasicInformation}
            options={{ cardStyleInterpolator: TransitionScreen.leftToRight, }}
          />

          <Stack.Screen
            name="MoreInformation"
            component={MoreInformation}
            options={{ cardStyleInterpolator: TransitionScreen.leftToRight, }}
          />

          <Stack.Screen
            name="SelectingValue"
            component={SelectingValue}
            options={{ cardStyleInterpolator: TransitionScreen.leftToRight, }}
          />

          <Stack.Screen
            name="TabsManager"
            component={TabsManager}
            options={{
              cardStyleInterpolator: TransitionScreen.forFade,
              transitionSpec: TransitionScreen.transitionSpecWithTiming(400),
            }}
          />

          <Stack.Screen
            name="ChatRoom"
            component={ChatRoom}
            options={{ cardStyleInterpolator: TransitionScreen.leftToRight, }}
          />

          <Stack.Screen
            name="UserProfile"
            component={UserProfile}
            options={{
              cardStyleInterpolator: TransitionScreen.leftToRight,
            }}
          />

          <Stack.Screen
            name="Setting"
            component={Setting}
            options={{
              cardStyleInterpolator: TransitionScreen.leftToRight,
            }}
          />

          <Stack.Screen
            name="MatchAndChat"
            component={MatchAndChat}
            options={{
              cardStyleInterpolator: TransitionScreen.forFade,
            }}
          />

          <Stack.Screen
            name="SearchByDistance"
            component={SearchByDistance}
            options={{
              cardStyleInterpolator: TransitionScreen.leftToRight,
            }}
          />

          <Stack.Screen
            name="QuickSearch"
            component={QuickSearch}
            options={{
              cardStyleInterpolator: TransitionScreen.leftToRight,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    )
  }
}