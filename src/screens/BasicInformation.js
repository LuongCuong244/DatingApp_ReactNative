import React, { Component } from "react";
import { View, StyleSheet, Text, ScrollView, TextInput, TouchableOpacity, Alert, BackHandler } from 'react-native';
import DatePicker from "react-native-date-picker";
import Moment from 'moment';
import { listCountrys } from '../data/Countrys';
import LinearGradient from 'react-native-linear-gradient';
import ArrowRight from '../../assets/vectors/arrow-right.svg';

export default class BasicInformation extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name: "",
            dateOfBirth: null,
            country: null,
            city: null,
            gender: "Male",
            openDatePicker: false,
        }

        this.onPressNameInput = this.onPressNameInput.bind(this);
        this.onPressDateOfBirthInput = this.onPressDateOfBirthInput.bind(this);
        this.onPressCityInput = this.onPressCityInput.bind(this);
        this.onPressCountryInput = this.onPressCountryInput.bind(this);
        this.onCancelDate = this.onCancelDate.bind(this);
        this.onConfirmDate = this.onConfirmDate.bind(this);
        this.onSetGenderToFemale = this.onSetGenderToFemale.bind(this);
        this.onSetGenderToMale = this.onSetGenderToMale.bind(this);
        this.onSetGenderToTransgender = this.onSetGenderToTransgender.bind(this);
        this.onPressToContinue = this.onPressToContinue.bind(this);
    }

    componentDidMount() {
        this.backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            () => {
                return true;
            }
        );
    }

    componentWillUnmount() {
        this.backHandler.remove();
    }

    formatName(name) {
        let newName = '';
        for (let i = 0; i < name.length; i++) {
            if (name.charAt(i) == ' ' && name.charAt(i + 1) == ' ') {
                continue;
            }
            if (i == 0 || (name.charAt(i - 1) == ' ' && name.charAt(i) != ' ')) {
                newName += name.charAt(i).toUpperCase();
                continue;
            }
            newName += name.charAt(i).toLowerCase();
        }
        return newName;
    }

    checkName() {
        let reg = /^[A-Za-z\s\u00C0-\u1EF9\u0300-\u036f]+$/
        // từ u00C0 đến u1EF9 : khoảng ký tự đặc biệt.
        // từ u0300 đến u036f : khoảng dấu câu

        // Nguồn: http://vietunicode.sourceforge.net/charset/

        let name = this.state.name.trim();

        return reg.test(name);
    }

    checkDateOfBirth() {

        if (!this.state.dateOfBirth) return false;

        let currentTime = new Date();

        currentTime.setFullYear(currentTime.getFullYear() - 18)
        if (this.state.dateOfBirth.getTime() > currentTime.getTime()) {
            return false;
        }
        return true;
    }

    shouldNextScreen() {

        if (this.checkDateOfBirth() == false) {
            Alert.alert(null, "Nếu bạn chưa đủ 18 tuổi. Chúng tôi nghĩ bạn không nên sử dụng app này");
            return false;
        }

        if (this.checkName() && this.state.country && this.state.city) {
            return true;
        }

        Alert.alert(null, "Hãy chắc chắn rằng bạn đã nhập đúng và đủ");
        return false;
    }

    onPressNameInput() {

        const onSubmitName = (value) => {
            this.setState({
                name: this.formatName(value),
            })
        }

        this.props.navigation.navigate('SelectingValue', {
            type: 'enter',
            attributeName: "tên",
            attributeValue: this.state.name,
            description: "Tên của bạn là gì ?",
            onSubmit: onSubmitName
        });
    }

    onPressDateOfBirthInput() {
        this.setState({
            openDatePicker: true,
        })
    }

    onPressCountryInput() {
        const onSubmit = (value) => {

            if (value !== this.state.country) {
                this.setState({
                    city: null,
                })
            }

            this.setState({
                country: value,
            })
        }

        this.props.navigation.navigate('SelectingValue', {
            type: 'select',
            attributeName: "quốc gia",
            attributeValue: this.state.country,
            listAtributes: listCountrys.map((item) => {
                return item.country;
            }),
            onSubmit: onSubmit
        });
    }

    onPressCityInput() {
        const onSubmit = (value) => {
            this.setState({
                city: value,
            })
        }

        if (this.state.country) {
            this.props.navigation.navigate('SelectingValue', {
                type: 'select',
                attributeName: "thành phố",
                attributeValue: this.state.city,
                listAtributes: listCountrys[listCountrys.findIndex(item => item.country == this.state.country)].citys,
                onSubmit: onSubmit
            });
        } else {
            Alert.alert(null, "Bạn chưa chọn quốc gia!");
        }
    }

    onSetGenderToMale() {
        this.setState({
            gender: 'Male'
        })
    }

    onSetGenderToFemale() {
        this.setState({
            gender: 'Female'
        })
    }

    onSetGenderToTransgender() {
        this.setState({
            gender: 'Transgender'
        })
    }

    onPressToContinue() {
        if (this.shouldNextScreen()) {
            this.props.navigation.navigate('MoreInformation', {
                name: this.state.name,
                country: this.state.country,
                address: this.state.city,
                gender: this.state.gender,
                dateOfBirth: this.state.dateOfBirth,
            });
        }
    }

    onConfirmDate(date) {
        this.setState({
            dateOfBirth: date,
            openDatePicker: false,
        })
    }

    onCancelDate() {
        this.setState({
            openDatePicker: false,
        })
    }

    render() {
        return (
            <ScrollView
                contentContainerStyle={styles.container}
                keyboardShouldPersistTaps="handled"
            >
                <Text style={{ fontSize: 55, color: 'white', width: '100%', marginTop: 10 }} >Để bắt đầu</Text>
                <Text style={{ fontSize: 23, color: 'rgba(100,157,163,0.65)', width: '100%', fontWeight: '500' }}>{"Hãy hoàn thành một số \nthông tin cơ bản ở bên dưới"}</Text>
                <View style={styles.bodyStyle} >
                    <View style={[styles.inputContainer, { marginTop: 0 }]} >
                        <Text style={styles.textHeader}>Tên</Text>
                        <TouchableOpacity
                            style={styles.inputBorderStyle}
                            activeOpacity={0.7}
                            onPress={this.onPressNameInput}
                        >
                            <TextInput
                                style={styles.textInput}
                                placeholder={"Tên của bạn là?"}
                                editable={false}
                                value={this.state.name}
                            />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.inputContainer} >
                        <Text style={styles.textHeader}>Ngày sinh</Text>
                        <TouchableOpacity
                            activeOpacity={1}
                            style={styles.inputBorderStyle}
                            onPress={this.onPressDateOfBirthInput}
                        >
                            <TextInput
                                style={styles.textInput}
                                placeholder={"Ngày sinh của bạn là?"}
                                editable={false}
                                value={this.state.dateOfBirth ? Moment(this.state.dateOfBirth).format("DD/MM/YYYY") : null}
                            />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.inputContainer} >
                        <Text style={styles.textHeader}>Quốc gia</Text>
                        <TouchableOpacity
                            activeOpacity={1}
                            style={styles.inputBorderStyle}
                            onPress={this.onPressCountryInput}
                        >
                            <TextInput
                                style={styles.textInput}
                                placeholder={"Bạn đang ở nước nào?"}
                                editable={false}
                                value={this.state.country}
                            />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.inputContainer} >
                        <Text style={styles.textHeader}>Thành phố</Text>
                        <TouchableOpacity
                            activeOpacity={1}
                            style={styles.inputBorderStyle}
                            onPress={this.onPressCityInput}
                        >
                            <TextInput
                                style={styles.textInput}
                                placeholder={"Thành phố bạn đang sống là?"}
                                editable={false}
                                value={this.state.city}
                            />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.inputContainer} >
                        <Text style={styles.textHeader}>Giới tính</Text>
                        <View style={{ flexDirection: 'row', marginTop: 6, width: '100%', height: 40 }}>
                            <TouchableOpacity
                                activeOpacity={0.7}
                                style={[
                                    styles.genderButtonStyle,
                                    {
                                        backgroundColor: this.state.gender == 'Male' ? '#62B6E7' : 'rgba(157,223,233,0.3)',
                                    }
                                ]}
                                onPress={this.onSetGenderToMale}
                            >
                                <Text
                                    style={
                                        this.state.gender == 'Male' ? {
                                            fontSize: 20, color: 'white', fontWeight: 'bold'
                                        } : {
                                            fontSize: 20, color: '#344B47'
                                        }
                                    }
                                >Nam</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                activeOpacity={0.7}
                                style={[
                                    styles.genderButtonStyle,
                                    {
                                        backgroundColor: this.state.gender == 'Female' ? '#EF8BE8' : 'rgba(157,223,233,0.3)',
                                    }
                                ]}
                                onPress={this.onSetGenderToFemale}
                            >
                                <Text
                                    style={
                                        this.state.gender == 'Female' ? {
                                            fontSize: 20, color: 'white', fontWeight: 'bold'
                                        } : {
                                            fontSize: 20, color: '#344B47'
                                        }
                                    }
                                >Nữ</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                activeOpacity={0.7}
                                style={[
                                    styles.genderButtonStyle,
                                    {
                                        backgroundColor: this.state.gender == 'Transgender' ? '#8AEE83' : 'rgba(157,223,233,0.3)',
                                    }
                                ]}
                                onPress={this.onSetGenderToTransgender}
                            >
                                <Text
                                    style={
                                        this.state.gender == 'Transgender' ? {
                                            fontSize: 20, color: 'white', fontWeight: 'bold'
                                        } : {
                                            fontSize: 20, color: '#344B47'
                                        }
                                    }
                                >LGBT</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                <TouchableOpacity
                    style={{ width: '100%', height: 50, marginBottom: 20 }}
                    activeOpacity={0.7}
                    onPress={this.onPressToContinue}
                >
                    <LinearGradient
                        style={styles.buttonStyle}
                        colors={['#7F80F0', '#DF7BDD']}
                    >
                        <View style={{ width: 50 }} ></View>
                        <Text style={{ fontSize: 22, color: 'white', textAlign: 'center', flex: 1, fontWeight: '500' }} >Tiếp tục</Text>
                        <View style={{ width: 50, height: 50, borderColor: 'white', borderWidth: 2, justifyContent: 'center', alignItems: 'center', borderRadius: 25, left: 2 }} >
                            <ArrowRight width={20.73} height={15.65} />
                        </View>
                    </LinearGradient>
                </TouchableOpacity>

                <DatePicker
                    modal
                    open={this.state.openDatePicker}
                    mode='date'
                    date={this.state.dateOfBirth || new Date()}
                    onConfirm={this.onConfirmDate}
                    onCancel={this.onCancelDate}
                />
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        backgroundColor: '#145C5F',
        paddingHorizontal: 15,
    },
    bodyStyle: {
        flex: 1,
        width: '100%',
        marginVertical: 20,
        alignItems: 'center',
        borderRadius: 27,
        paddingHorizontal: 7,
        paddingTop: 15,
        paddingBottom: 20,
        backgroundColor: 'rgba(230,244,241,0.8)',
    },
    inputContainer: {
        width: '100%',
        height: 70,
        marginTop: 20,
    },
    textHeader: {
        fontSize: 19,
        color: '#344B47',
        marginLeft: 10
    },
    inputBorderStyle: {
        width: '100%',
        height: 43,
        borderRadius: 9,
        borderColor: '#707070',
        borderWidth: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 6
    },
    textInput: {
        fontSize: 20,
        color: '#344B47',
        width: '90%',
        height: '120%',
        textAlign: 'center',
    },
    genderButtonStyle: {
        flex: 1,
        marginHorizontal: 10,
        borderRadius: 100,
        backgroundColor: 'rgba(157,223,233,0.3)',
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: 'white',
    },
    buttonStyle: {
        flex: 1,
        borderRadius: 100,
        flexDirection: 'row',
        borderColor: 'white',
        borderWidth: 2,
        alignItems: 'center'
    }
})