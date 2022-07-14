import React from "react";
import {
    View,
    StyleSheet,
    ScrollView,
    ImageBackground,
    KeyboardAvoidingView,
    Dimensions,
    Text
} from 'react-native';
import InputForm from "../components/InputForm";

const HEIGHT_SCREEN = Dimensions.get("window").height;

export default LogUp = ({ navigation }) => {

    const onPressRightButton = (address, addressType, passwordValue, reenterPasswordValue) => {
        navigation.navigate("Verification",{
            addressType: addressType,
            address: address,
            password: passwordValue,
            reenterPasswordValue: reenterPasswordValue,
            purpose: 'log_up'
        });
    }

    const onPressLeftButton = () => {
        navigation.goBack();
    }

    return (
        <ScrollView
            contentContainerStyle={{ flex: 1 }}
            keyboardShouldPersistTaps="handled"
        >
            <ImageBackground
                style={styles.screenStyle}
                imageStyle={{
                    transform: [
                        {
                            scale: 1.1,
                        }
                    ]
                }}
                source={require('../../assets/imgs/background.jpg')}
            >
                <KeyboardAvoidingView
                    behavior="padding"
                    keyboardVerticalOffset= {50}
                >
                    <InputForm
                        leftButtonLabel={"Trở lại"}
                        rightButtonLabel={"Đăng ký"}
                        placeholderAddressInput={"Số điện thoại hoặc email"}
                        placeholderPasswordInput={"Nhập mật khẩu mới"}
                        placeholderReenterPasswordInput={"Nhập lại mật khẩu"}
                        reenterPassword={true}
                        onPressRightButton={onPressRightButton}
                        onPressLeftButton={onPressLeftButton}
                    />
                </KeyboardAvoidingView>
            </ImageBackground>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    screenStyle: {
        height: HEIGHT_SCREEN,
        justifyContent: 'center',
        alignItems: 'center',
    }
})