import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Header from '../../components/Header';
import CardSwipeTab from './CardSwipeTab';
import FavouriteTab from './FavouriteTab';
import HomeTab from './HomeTab';
import ChatsTab from './ChatsTab';
import UserTab from './UserTab';
import CustomTabs from '../../components/CustomTabs';

const Tab = createBottomTabNavigator();

export default function TabsManager(props) {

    return (
        <View style={{ flex: 1, backgroundColor: '#324B4C' }} >
            <Header {...props} />
            <Tab.Navigator
                initialRouteName='CardSwipeTab'
                screenOptions={{
                    headerShown: false,
                    tabBarShowLabel: false,
                    tabBarHideOnKeyboard: true,
                }}
                tabBar={(props) => <CustomTabs {...props} />}
            >
                <Tab.Screen
                    name="CardSwipeTab"
                    component={CardSwipeTab}
                />
                <Tab.Screen
                    name="FavouriteTab"
                    component={FavouriteTab}
                />
                <Tab.Screen
                    name="HomeTab"
                    component={HomeTab}
                />
                <Tab.Screen
                    name="ChatsTab"
                    component={ChatsTab}
                />
                <Tab.Screen
                    name="UserTab"
                    component={UserTab}
                />
            </Tab.Navigator>
        </View>
    )
}