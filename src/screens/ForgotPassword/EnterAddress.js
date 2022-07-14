import React, { useState } from "react";
import {
    View,
    StyleSheet,
    ScrollView,
    ImageBackground,
    KeyboardAvoidingView,
    Dimensions,
    Text,
    TextInput,
    TouchableOpacity,
    Alert,
} from 'react-native';

const HEIGHT_SCREEN = Dimensions.get("window").height;

export default EnterAddress = ({ navigation }) => {

    const [address, setAddress] = useState();

    const checkValidValue = () => {
        let addressType;
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

        if (reg.test(address)) {
            addressType = 'email';
            navigation.navigate('Verification', {
                addressType: addressType,
                address: address,
                purpose: 'password_retrieval'
            });
            return;
        }

        reg = /^[0-9]{9,11}$/

        if (reg.test(address)) {
            addressType = "numberPhone";
            navigation.navigate('Verification', {
                addressType: addressType,
                address: address,
                purpose: 'password_retrieval'
            });
            return;
        }

        Alert.alert(null, "Vui lòng nhập địa chỉ hợp lệ !");
    }

    const onChangeTextAddress = (address) => {
        setAddress(address);
    }

    const onGoBack = () => {
        navigation.goBack();
    }

    return (
        <ScrollView
            contentContainerStyle={{ flex: 1, width: '100%', height: '100%' }}
            keyboardShouldPersistTaps='handled'
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
                source={require('../../../assets/imgs/background.jpg')}
            >

                <View style={{ flex: 1 }} ></View>

                <KeyboardAvoidingView
                    behavior="padding"
                    keyboardVerticalOffset={30}
                    style={{ width: '100%', alignItems: 'center' }}
                >
                    <View style={{ width: '90%', height: 120, backgroundColor: 'rgba(13,88,86,0.7)', borderRadius: 10, alignItems: 'center', paddingHorizontal: 18 }}>
                        <Text style={styles.title}>{'Địa chỉ bạn đã đăng ký là?'}</Text>

                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.textInput}
                                keyboardType="visible-password"
                                placeholder="Nhập số điện thoại hoặc email"
                                placeholderTextColor={'rgba(200,200,200,0.5)'}
                                onChangeText={onChangeTextAddress}
                            />
                        </View>
                    </View>

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={[
                                styles.buttonStyle,
                                {
                                    backgroundColor: 'rgba(51,75,76,0.75)'
                                }
                            ]}
                            activeOpacity={0.7}
                            onPress={onGoBack}
                        >
                            <Text style={{ fontSize: 18, color: 'white' }} >Trở lại</Text>
                        </TouchableOpacity>
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
                            <Text style={{ fontSize: 18, color: 'white', fontWeight: 'bold' }} >Tiếp tục</Text>
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>

                <View style={{ flex: 1 }} ></View>

            </ImageBackground >
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    imageBackground: {
        height: HEIGHT_SCREEN,
        alignItems: 'center',
        justifyContent: 'center',
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
    title: {
        fontSize: 17,
        fontWeight: 'bold',
        paddingVertical: 17,
        color: 'white',
        letterSpacing: 0.5,
    },
    inputContainer: {
        backgroundColor: 'rgba(32,49,50,0.4)',
        borderRadius: 10,
        borderColor: 'white',
        borderWidth: 1,
        height: 40,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 2,
    },
    textInput: {
        fontSize: 17,
        letterSpacing: 0.5,
        color: 'white',
        width: '90%',
        textAlign: 'center',
        height: '200%',
    }
})