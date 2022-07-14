import React, { Component, createRef } from "react";
import {
    ImageBackground,
    StyleSheet,
    TouchableOpacity,
    View,
    ScrollView,
    Alert,
    Text,
    TextInput,
    Animated,
    Dimensions,
    KeyboardAvoidingView
} from "react-native";

const HEIGHT_SCREEN = Dimensions.get('window').height;

export default class SigninWithNumberPhone extends Component {

    constructor(props) {
        super(props);
        this.state = {
            validating: false,
            numberPhone: "",
            firstNumber: '',
            secondNumber: '',
            thirdNumber: '',
            fourthNumber: '',
            fifthNumber: '',
            sixthNumber: '',
            translateX_FirstNumber: new Animated.Value(-500),
            translateY_SecondNumber: new Animated.Value(-1000),
            translateY_ThirdNumber: new Animated.Value(1000),
            translateY_FourthNumber: new Animated.Value(-1000),
            translateY_FifthNumber: new Animated.Value(1000),
            translateX_SixthNumber: new Animated.Value(500),
            opacityNotification: new Animated.Value(0),
            opacityInputNumberPhone: new Animated.Value(1),
            editableInputNumberPhone: true,
            verified: false,
        }
        this.firstRef = createRef();
        this.secondRef = createRef();
        this.thirdRef = createRef();
        this.fourthRef = createRef();
        this.fifthRef = createRef();
        this.sixthRef = createRef();
        this.allRef = [this.firstRef, this.secondRef, this.thirdRef, this.fourthRef, this.fifthRef, this.sixthRef];
    
        this.onChangePhoneNumber = this.onChangePhoneNumber.bind(this);
        this.validating = this.validating.bind(this);
        this.enterNumberPhone = this.enterNumberPhone.bind(this);
        this.startAnimationIn = this.startAnimationIn.bind(this);
        this.startAnimationOut = this.startAnimationOut.bind(this);
        this.getAllValue = this.getAllValue.bind(this);

        this.handleGoBackButton = this.handleGoBackButton.bind(this);
        this.handleContinueButton = this.handleContinueButton.bind(this);
        this.handleNotReceived = this.handleNotReceived.bind(this);
    
    }

    componentDidMount() {

    }

    validating() {
        this.setState({
            validating: true,
            editableInputNumberPhone: false
        }, () => {
            this.startAnimationIn();
        })
    }

    enterNumberPhone() {
        this.setState({
            validating: false,
            editableInputNumberPhone: true
        }, () => {
            this.startAnimationOut();
        })
    }

    checkNumberPhone() {
        let reg = /^[0-9]{9,11}$/

        let address = this.state.numberPhone.trim();
        if (reg.test(address) == false) {
            Alert.alert("Số điện thoại không hợp lệ!");
            return false;
        }
        return true;
    }

    startAnimationIn() {

        Animated.timing(this.state.translateX_FirstNumber, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
        }).start();

        Animated.timing(this.state.translateY_SecondNumber, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: true,
        }).start();

        Animated.timing(this.state.translateY_ThirdNumber, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: true,
        }).start();

        Animated.timing(this.state.translateY_FourthNumber, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: true,
        }).start();

        Animated.timing(this.state.translateY_FifthNumber, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: true,
        }).start();

        Animated.timing(this.state.translateX_SixthNumber, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: true,
        }).start();

        Animated.timing(this.state.opacityNotification, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
        }).start();

        Animated.timing(this.state.opacityInputNumberPhone, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: true,
        }).start();
    }

    startAnimationOut() {

        Animated.timing(this.state.translateX_FirstNumber, {
            toValue: -500,
            duration: 500,
            useNativeDriver: true,
        }).start();

        Animated.timing(this.state.translateY_SecondNumber, {
            toValue: -1000,
            duration: 1000,
            useNativeDriver: true,
        }).start();

        Animated.timing(this.state.translateY_ThirdNumber, {
            toValue: 1000,
            duration: 1000,
            useNativeDriver: true,
        }).start();

        Animated.timing(this.state.translateY_FourthNumber, {
            toValue: -1000,
            duration: 1000,
            useNativeDriver: true,
        }).start();

        Animated.timing(this.state.translateY_FifthNumber, {
            toValue: 1000,
            duration: 1000,
            useNativeDriver: true,
        }).start();

        Animated.timing(this.state.translateX_SixthNumber, {
            toValue: 500,
            duration: 1000,
            useNativeDriver: true,
        }).start();

        Animated.timing(this.state.opacityNotification, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: true,
        }).start();

        Animated.timing(this.state.opacityInputNumberPhone, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
        }).start();
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

    onChangePhoneNumber(numberPhone) {
        this.setState({
            numberPhone
        })
    }

    handleGoBackButton() {
        if (this.state.validating) {
            this.enterNumberPhone();
        } else {
            this.props.navigation.goBack();
        }
    }

    handleContinueButton() {
        if (this.state.validating) {
            Alert.alert("Mã OTP bạn nhập không chính xác!");
        } else {
            if (this.checkNumberPhone()) {
                this.validating();
            }
        }
    }

    handleNotReceived() {

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
                            <Text style={styles.title}>{this.state.validating ? 'Xác thực số điện thoại của bạn' : 'Số điện thoại của bạn là gì?'}</Text>

                            <Animated.View
                                style={[
                                    styles.inputContainer,
                                    {
                                        opacity: this.state.opacityInputNumberPhone,
                                    }
                                ]} >
                                <TextInput
                                    style={styles.textInput}
                                    keyboardType="number-pad"
                                    placeholder="Nhập số điện thoại"
                                    placeholderTextColor={'rgba(200,200,200,0.5)'}
                                    onChangeText={this.onChangePhoneNumber}
                                    editable={this.state.editableInputNumberPhone}
                                />
                            </Animated.View>

                            <View style={{ flexDirection: 'row', marginTop: 57, position: 'absolute' }} >
                                <Animated.View style={[
                                    styles.inputContainer,
                                    {
                                        width: 40,
                                        marginHorizontal: 5,
                                        transform: [
                                            {
                                                translateX: this.state.translateX_FirstNumber,
                                            }
                                        ]
                                    }
                                ]} >
                                    {
                                        this.renderNumberTextInput(this.firstRef, 'firstNumber', 0, true)
                                    }
                                </Animated.View>

                                <Animated.View style={[
                                    styles.inputContainer,
                                    {
                                        width: 40,
                                        marginHorizontal: 5,
                                        transform: [
                                            {
                                                translateY: this.state.translateY_SecondNumber,
                                            }
                                        ]
                                    }
                                ]} >
                                    {
                                        this.renderNumberTextInput(this.secondRef, 'secondNumber', 1)
                                    }
                                </Animated.View>

                                <Animated.View style={[
                                    styles.inputContainer,
                                    {
                                        width: 40,
                                        marginHorizontal: 5,
                                        transform: [
                                            {
                                                translateY: this.state.translateY_ThirdNumber,
                                            }
                                        ]
                                    }
                                ]} >
                                    {
                                        this.renderNumberTextInput(this.thirdRef, 'thirdNumber', 2)
                                    }
                                </Animated.View>

                                <Animated.View style={[
                                    styles.inputContainer,
                                    {
                                        width: 40,
                                        marginHorizontal: 5,
                                        transform: [
                                            {
                                                translateY: this.state.translateY_FourthNumber,
                                            }
                                        ]
                                    }
                                ]} >
                                    {
                                        this.renderNumberTextInput(this.fourthRef, 'fourthNumber', 3)
                                    }
                                </Animated.View>

                                <Animated.View style={[
                                    styles.inputContainer,
                                    {
                                        width: 40,
                                        marginHorizontal: 5,
                                        transform: [
                                            {
                                                translateY: this.state.translateY_FifthNumber,
                                            }
                                        ]
                                    }
                                ]} >
                                    {
                                        this.renderNumberTextInput(this.fifthRef, 'fifthNumber', 4)
                                    }
                                </Animated.View>

                                <Animated.View style={[
                                    styles.inputContainer,
                                    {
                                        width: 40,
                                        marginHorizontal: 5,
                                        transform: [
                                            {
                                                translateX: this.state.translateX_SixthNumber,
                                            }
                                        ]
                                    }
                                ]} >
                                    {
                                        this.renderNumberTextInput(this.sixthRef, 'sixthNumber', 5)
                                    }
                                </Animated.View>
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
                                onPress={this.handleGoBackButton}
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
                                onPress={this.handleContinueButton}
                            >
                                <Text style={{ fontSize: 18, color: 'white', fontWeight: 'bold' }} >Tiếp tục</Text>
                            </TouchableOpacity>
                        </View>
                    </KeyboardAvoidingView>

                    {
                        this.state.validating ? (
                            <Animated.View
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
                                        marginTop: 47
                                    }}
                                >{"Chúng tôi đã gửi một mã gồm 6 chữ số \nvề số điện thoại " + this.state.numberPhone + ". Hãy xác minh đó là bạn !"}</Text>
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
                                    onPress={this.handleNotReceived}
                                >
                                    <Text style={{ fontSize: 14, color: 'white', }}>Tôi chưa nhận được mã</Text>
                                </TouchableOpacity>
                            </Animated.View>
                        ) : (
                            <View style={{ flex: 1 }} ></View>
                        )
                    }
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