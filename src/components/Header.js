import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View, Dimensions } from 'react-native';
import MenuIcon from '../../assets/vectors/header/menu.svg';
import ShopIcon from '../../assets/vectors/header/shop.svg';
import SettingIcon from '../../assets/vectors/header/setting.svg';
import Menu from './Menu';

const WIDTH_SCREEN = Dimensions.get('window').width;

export default Header = (props) => {

    const [isNotification, setIsNotification] = useState(false);

    return (
        <View style={styles.headerContainer} >
            <View style = {{width: 45, height: 45}}>
                <Menu/>
            </View>

            <TouchableOpacity
                activeOpacity={0.5}
                style={styles.buttonShop}
                onPress={() => {

                }}
            >
                <ShopIcon width={30} height={30} />
            </TouchableOpacity>

            {
                isNotification && (
                    <View style={styles.newNotificationIcon} />
                )
            }

            <TouchableOpacity
                style={{ height: '100%', paddingHorizontal: 10, justifyContent: 'center' }}
                activeOpacity={0.5}
                onPress={() => {
                    props.navigation.navigate("Setting");
                }}
            >
                <SettingIcon width={30} height={30} />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    headerContainer: {
        width: '100%',
        height: 45,
        backgroundColor: '#324B4C',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    buttonShop: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 58,
        height: 35,
        backgroundColor: 'rgba(54,91,93,0.5)',
        borderRadius: 5,
    },
    newNotificationIcon: {
        width: 12,
        height: 12,
        borderRadius: 6,
        borderColor: '#95B0B6',
        borderWidth: 1,
        backgroundColor: '#FF3F3F',
        transform: [
            {
                translateX: WIDTH_SCREEN/2 + 5,
            },
            {
                translateY: -10,
            }
        ],
        position: 'absolute'
    }
})