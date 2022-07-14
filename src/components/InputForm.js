import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    View,
    Alert,
    BackHandler
} from "react-native";
import Text from './AppText';
import TextInput from './AppTextInput';
import UserIcon from '../../assets/vectors/user-icon.svg';
import LockIcon from '../../assets/vectors/lock-icon.svg';

export default InputForm = ({
    onPressLeftButton, onPressRightButton, leftButtonLabel, rightButtonLabel,
    placeholderAddressInput = "Số điện thoại hoặc email",
    placeholderPasswordInput = "Nhập mật khẩu của bạn",
    placeholderReenterPasswordInput = "Nhập lại mật khẩu của bạn",
    hideLeftButton = false,
    addressFixedValue,
    reenterPassword }) => {

    const [addressToLogin, setAddressToLogin] = useState(addressFixedValue);
    const [password, setPassword] = useState();
    const [reenterPasswordValue, setReenterPasswordValue] = useState();

    useEffect(() => {
        const backAction = () => {
            return true;
        };

        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );

        return () => backHandler.remove();
    }, []);

    const checkValidValue = () => {
        if (reenterPassword && password !== reenterPasswordValue) {
            Alert.alert(null, "Mật khẩu nhập lại không khớp !");
            return;
        }

        let reg = /^[\S]{8,30}$/
        if (!reg.test(password)) {
            Alert.alert(null, "Mật khẩu phải tối thiểu 8 ký tự và không được chứa khoảng trắng !");
            return;
        }

        let addressType;
        reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

        if (reg.test(addressToLogin)) {
            addressType = 'email';
            onPressRightButton(addressToLogin, addressType, password, reenterPasswordValue);
            return;
        }

        reg = /^[0-9]{9,11}$/

        if (reg.test(addressToLogin)) {
            addressType = "numberPhone";
            onPressRightButton(addressToLogin, addressType, password, reenterPasswordValue);
            return;
        }

        Alert.alert(null, "Vui lòng nhập địa chỉ hợp lệ !");
    }

    const onChangeTextAddress = (addressToLogin) => {
        setAddressToLogin(addressToLogin);
    }

    const onChangeTextPassword = (password) => {
        setPassword(password);
    }

    const onChangeTextReenterPassword = (value) => {
        setReenterPasswordValue(value);
    }

    return (
        <View style={{ width: '100%', alignItems: 'center' }} >

            <View style={styles.textInputContainer} >
                <UserIcon width={33.39} height={33.39} ></UserIcon>
                <TextInput
                    style={styles.inputStyle}

                    keyboardType='visible-password'
                    placeholder={placeholderAddressInput}
                    onChangeText={onChangeTextAddress}
                    editable={addressFixedValue ? false : true}
                >{addressFixedValue}</TextInput>
            </View>

            <View style={styles.textInputContainer} >
                <LockIcon width={33.39} height={33.39} ></LockIcon>
                <TextInput
                    style={styles.inputStyle}
                    secureTextEntry={true}
                    placeholder={placeholderPasswordInput}
                    onChangeText={onChangeTextPassword}
                ></TextInput>
            </View>

            {
                reenterPassword && (
                    <View style={styles.textInputContainer} >
                        <LockIcon width={33.39} height={33.39} ></LockIcon>
                        <TextInput
                            style={styles.inputStyle}
                            secureTextEntry={true}
                            placeholder={placeholderReenterPasswordInput}
                            onChangeText={onChangeTextReenterPassword}
                        ></TextInput>
                    </View>
                )
            }

            <View style={styles.buttonContainer}>
                {
                    hideLeftButton === false && (
                        <TouchableOpacity
                            style={[
                                styles.buttonStyle,
                                {
                                    backgroundColor: 'rgba(51,75,76,0.75)'
                                }
                            ]}
                            activeOpacity={0.7}
                            onPress={onPressLeftButton}
                        >
                            <Text style={{ fontSize: 18, color: 'white' }} >{leftButtonLabel}</Text>
                        </TouchableOpacity>
                    )
                }

                <View style={{ width: '6%' }} ></View>

                <TouchableOpacity
                    style={[
                        styles.buttonStyle,
                        {
                            backgroundColor: 'rgba(0,230,132,0.75)'
                        }
                    ]}
                    activeOpacity={0.7}
                    onPress={checkValidValue}
                >
                    <Text style={{ fontSize: 18, color: 'white', fontWeight: 'bold' }} >{rightButtonLabel}</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    buttonContainer: {
        flexDirection: 'row',
        marginBottom: 15,
        marginTop: 5,
        width: '85%',
        height: 40,
        alignItems: 'center',
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
        marginBottom: 10,
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
    },
})