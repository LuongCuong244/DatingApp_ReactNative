import React, { Component, createRef } from "react";
import {
    ImageBackground,
    StyleSheet,
    TouchableOpacity,
    TouchableHighlight,
    View,
    ScrollView,
    Alert,
    Text,
    TextInput,
    Dimensions,
    KeyboardAvoidingView
} from "react-native";

const HEIGHT_SCREEN = Dimensions.get('window').height;

export default class Verification extends Component {

    constructor(props) {
        super(props);
        this.state = {
            numberPhone: "",
            firstNumber: '',
            secondNumber: '',
            thirdNumber: '',
            fourthNumber: '',
            fifthNumber: '',
            sixthNumber: '',
            verified: false,
        }
        this.firstRef = createRef();
        this.secondRef = createRef();
        this.thirdRef = createRef();
        this.fourthRef = createRef();
        this.fifthRef = createRef();
        this.sixthRef = createRef();
        this.allRef = [this.firstRef, this.secondRef, this.thirdRef, this.fourthRef, this.fifthRef, this.sixthRef];
    
        this.handleBackButton = this.handleBackButton.bind(this);
        this.handleContinueButton = this.handleContinueButton.bind(this);
    }

    getAllValue() {
        return [
            this.state.firstNumber,
            this.state.secondNumber,
            this.state.thirdNumber,
            this.state.fourthNumber,
            this.state.fifthNumber,
            this.state.sixthNumber,
        ];
    }

    getStateName(index) {
        switch (index) {
            case 1: return 'firstNumber'
            case 2: return 'secondNumber'
            case 3: return 'thirdNumber'
            case 4: return 'fourthNumber'
            case 5: return 'fifthNumber'
            case 6: return 'sixthNumber'
        }
    }

    checkVerified() {
        if (/[0-9]/.test(this.state.firstNumber) == false) {
            return false;
        }
        if (/[0-9]/.test(this.state.secondNumber) == false) {
            return false;
        }
        if (/[0-9]/.test(this.state.thirdNumber) == false) {
            return false;
        }
        if (/[0-9]/.test(this.state.fourthNumber) == false) {
            return false;
        }
        if (/[0-9]/.test(this.state.fifthNumber) == false) {
            return false;
        }
        if (/[0-9]/.test(this.state.sixthNumber) == false) {
            return false;
        }
        return true;
    }

    renderNumberTextInput(ref, currentNumber, index, autoFocus) {

        const onChangeText = async (number) => {
            if (/[0-9]/.test(number) == false && number !== '') {
                if (this.allRef[index].current) {
                    await this.allRef[index].current.blur();
                    await this.allRef[index].current.clear();
                    await this.allRef[index].current.focus();
                }
                await this.setState({
                    [currentNumber]: ''
                })
                return;
            }
            await this.setState({
                [currentNumber]: number
            })
            if (number !== '') {
                let allValue = this.getAllValue();
                for (let i = index + 1; i < 6; i++) {
                    if (this.allRef[i].current && allValue[i] === '') {
                        this.allRef[i].current.focus();
                        return;
                    }
                }
                for (let j = 0; j < 6; j++) {
                    if (this.allRef[j].current && allValue[j] === '') {
                        this.allRef[j].current.focus();
                        return;
                    }
                }
                this.allRef[index].current.blur();
            }
            this.setState({
                verified: this.checkVerified()
            })
        }

        const onKeyPress = (even) => {
            if (even.nativeEvent.key === 'Backspace') {
                let allValue = this.getAllValue();
                if (allValue[index] === '') {
                    for (let i = index - 1; i >= 0; i--) {
                        if (this.allRef[i].current && allValue[i] !== '') {
                            this.setState({
                                [this.getStateName(index)]: ''
                            })
                            this.allRef[i].current.clear();
                            this.allRef[i].current.focus();
                            return;
                        }
                    }
                }
            }
        }

        return (
            <TextInput
                style={styles.textInput}
                maxLength={1}
                keyboardType="number-pad"
                onChangeText={onChangeText}
                onKeyPress={onKeyPress}
                ref={ref}
            ></TextInput>
        )
    }

    handleBackButton() {
        this.props.navigation.goBack();
    }

    handleContinueButton() {
        if (this.state.verified) {
            switch (this.props.route.params.purpose) {
                case 'log_up': {
                    this.props.navigation.navigate('LogIn');
                    break;
                }
                case 'password_retrieval': {
                    this.props.navigation.navigate('ResetPassword', {
                        address: this.props.route.params.address
                    });
                    break;
                }
            }
        }
    }

    render() {
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
                    source={require('../../assets/imgs/background.jpg')}
                >

                    <View style={{ flex: 1 }} ></View>

                    <KeyboardAvoidingView
                        behavior="padding"
                        keyboardVerticalOffset={30}
                        style={{ width: '100%', alignItems: 'center' }}
                    >
                        <View style={{ width: '90%', height: 120, backgroundColor: 'rgba(13,88,86,0.7)', borderRadius: 10, alignItems: 'center', paddingHorizontal: 18 }}>
                            <Text
                                style={styles.title}
                            >
                                {
                                    `Xác thực ${this.props.route.params.addressType === 'email' ? 'email' : 'số điện thoại'} của bạn`
                                }
                            </Text>

                            <View style={{ flexDirection: 'row', marginTop: 57, position: 'absolute' }} >
                                <View style={[
                                    styles.inputContainer,
                                    {
                                        width: 40,
                                        marginHorizontal: 5,
                                    }
                                ]} >
                                    {
                                        this.renderNumberTextInput(this.firstRef, 'firstNumber', 0, true)
                                    }
                                </View>

                                <View style={[
                                    styles.inputContainer,
                                    {
                                        width: 40,
                                        marginHorizontal: 5,
                                    }
                                ]} >
                                    {
                                        this.renderNumberTextInput(this.secondRef, 'secondNumber', 1)
                                    }
                                </View>

                                <View style={[
                                    styles.inputContainer,
                                    {
                                        width: 40,
                                        marginHorizontal: 5,
                                    }
                                ]} >
                                    {
                                        this.renderNumberTextInput(this.thirdRef, 'thirdNumber', 2)
                                    }
                                </View>

                                <View style={[
                                    styles.inputContainer,
                                    {
                                        width: 40,
                                        marginHorizontal: 5,
                                    }
                                ]} >
                                    {
                                        this.renderNumberTextInput(this.fourthRef, 'fourthNumber', 3)
                                    }
                                </View>

                                <View style={[
                                    styles.inputContainer,
                                    {
                                        width: 40,
                                        marginHorizontal: 5,
                                    }
                                ]} >
                                    {
                                        this.renderNumberTextInput(this.fifthRef, 'fifthNumber', 4)
                                    }
                                </View>

                                <View style={[
                                    styles.inputContainer,
                                    {
                                        width: 40,
                                        marginHorizontal: 5,
                                    }
                                ]} >
                                    {
                                        this.renderNumberTextInput(this.sixthRef, 'sixthNumber', 5)
                                    }
                                </View>
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
                                onPress={this.handleBackButton}
                            >
                                <Text style={{ fontSize: 18, color: 'white' }} >Trở lại</Text>
                            </TouchableOpacity>
                            <View style={{ width: '6%' }} ></View>

                            <TouchableHighlight
                                style={[
                                    styles.buttonStyle,
                                    {
                                        backgroundColor: 'rgba(0,230,132,0.75)',
                                        opacity: this.state.verified ? 1 : 0.5
                                    },
                                ]}
                                underlayColor={'rgba(0,230,132,0.75)'}
                                activeOpacity={this.state.verified ? 0.7 : 1}
                                onPress={this.handleContinueButton}
                            >
                                <Text style={{ fontSize: 18, color: 'white', fontWeight: 'bold' }} >Tiếp tục</Text>
                            </TouchableHighlight>
                        </View>
                    </KeyboardAvoidingView>

                    <View
                        style={{
                            flex: 1,
                            alignItems: 'center',
                            opacity: this.state.opacityNotification,
                        }} >
                        <Text
                            style={{
                                fontSize: 14,
                                textAlign: 'center',
                                color: '#8D8D8D',
                                width: '95%',
                                marginTop: 20,
                                lineHeight: 25,
                            }}
                        >{"Chúng tôi đã gửi một mã gồm 6 chữ số \nđến " + (this.props.route.params.addressType === 'email' ? "địa chỉ " : "số điện thoại ") + this.props.route.params.address + ".\nHãy xác minh đó là bạn !"}</Text>
                        <TouchableOpacity
                            activeOpacity={0.7}
                            style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderColor: 'white',
                                borderWidth: 1,
                                borderRadius: 50,
                                height: 40,
                                width: 192,
                                marginTop: 16
                            }}
                            onPress={() => {

                            }}
                        >
                            <Text style={{ fontSize: 14, color: 'white', }}>Tôi chưa nhận được mã</Text>
                        </TouchableOpacity>
                    </View>
                </ImageBackground >
            </ScrollView>
        )
    }
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
        fontSize: 20,
        letterSpacing: 0.5,
        color: 'white',
        width: '90%',
        textAlign: 'center',
        height: '200%',
    }
})