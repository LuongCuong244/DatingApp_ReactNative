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
import InputForm from "../../components/InputForm";
import HelpApi from "../../api/Help.api";

const HEIGHT_SCREEN = Dimensions.get("window").height;

export default ResetPassword = ({ navigation, route }) => {

    const onPressRightButton = (address, addressType, passwordValue, reenterPasswordValue) => {
        // HelpApi.resetPassword({
        //     address,
        //     newPassword: passwordValue,
        // }, () => {
        //     navigation.navigate("LogIn");
        // });

        navigation.navigate("LogIn");
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
                source={require('../../../assets/imgs/background.jpg')}
            >
                <KeyboardAvoidingView
                    behavior="padding"
                    keyboardVerticalOffset={50}
                >
                    <InputForm
                        hideLeftButton={true}
                        rightButtonLabel={"Hoàn tất"}
                        placeholderAddressInput={"Số điện thoại hoặc email"}
                        addressFixedValue={route.params.address}
                        placeholderPasswordInput={"Nhập mật khẩu mới"}
                        placeholderReenterPasswordInput={"Nhập lại mật khẩu"}
                        reenterPassword={true}
                        onPressRightButton={onPressRightButton}
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