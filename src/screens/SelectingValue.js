import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, FlatList, LogBox, TouchableHighlight, TextInput, Dimensions, Alert } from 'react-native';
import BackButton from '../../assets/vectors/back-button.svg';
import Tick from '../../assets/vectors/tick.svg';
import FindIcon from '../../assets/vectors/find-icon.svg';
import DeleteIcon from '../../assets/vectors/delete-textinput-icon.svg';

LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
]);

export default class SelectingValue extends Component {

    constructor(props) {
        super(props);

        this.state = {
            textInput: props.route.params.attributeValue ? props.route.params.attributeValue.toString() : null,
            listAtributes: props.route.params.listAtributes,
        }

        this.onSelectChangeText = this.onSelectChangeText.bind(this);
        this.onEnterChangeText = this.onEnterChangeText.bind(this);
        this.renderItem = this.renderItem.bind(this);
        this.setBarEmpty = this.setBarEmpty.bind(this);
        this.handleGoBack = this.handleGoBack.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
    }

    componentDidMount() {
    }

    formatTitle(title) {
        return title.charAt(0).toUpperCase() + title.slice(1);
    }

    onSelectChangeText(value) {
        if (value.trim() == "") {
            this.setState({
                listAtributes: this.props.route.params.listAtributes,
            })
            return;
        }

        this.setState({
            listAtributes: this.props.route.params.listAtributes.filter((item) => {
                return item.toLowerCase().normalize().startsWith(value.trim().toLowerCase().normalize());
            })
        })
    }

    onEnterChangeText(value) {
        this.setState({
            textInput: value,
        })
    }

    renderItem(item) {
        return (
            <Item
                item={item.item}
                currentValue={this.props.route.params.attributeValue}
                onSubmit={this.props.route.params.onSubmit}
                navigation={this.props.navigation}
            />
        )
    }

    setBarEmpty() {
        this.setState({
            textInput: "",
        })
    }

    handleGoBack() {
        this.props.navigation.goBack();
    }

    handleUpdate() {
        let value = this.state.textInput.trim();
        let regex = this.props.route.params.regex;

        if (regex && new RegExp(regex).test(value) === false) {
            Alert.alert("Đầu vào không hợp lệ !");
            this.props.navigation.goBack();
            return;
        }
        this.props.route.params.onSubmit(this.state.textInput);
        this.props.navigation.goBack();
    }

    render() {

        const { type, description, attributeName, keyboardType } = this.props.route.params;

        return (
            <View style={{ flex: 1, backgroundColor: '#00444E' }} >
                <View style={styles.headerContainer} >
                    <TouchableOpacity
                        activeOpacity={0.7}
                        style={styles.backButton}
                        onPress={this.handleGoBack}
                    >
                        <BackButton width={14.71} height={25} />
                    </TouchableOpacity>

                    <View style={{ flex: 1, height: '100%', justifyContent: 'center', alignItems: 'center' }} >
                        <Text style={styles.textHeader}>{"Cập nhật " + attributeName}</Text>
                    </View>

                    <View style={{ width: 50 }} ></View>
                </View>

                {
                    type == 'select' && (
                        <View style={{ flex: 1, alignItems: 'center', paddingHorizontal: 15 }} >
                            <View style={styles.findContainer} >
                                <FindIcon width={28} height={28} />
                                <TextInput
                                    style={styles.textInput}
                                    placeholder={"Tìm kiếm"}
                                    placeholderTextColor={'rgba(255,255,255,0.7)'}
                                    onChangeText={this.onSelectChangeText}
                                />
                            </View>
                            <FlatList
                                data={this.state.listAtributes}
                                renderItem={this.renderItem}
                                keyboardShouldPersistTaps='handled'
                                style={{ flex: 1, width: '100%' }}
                            />
                        </View>
                    )
                }

                {
                    type == 'enter' && (
                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 40 }} >
                            <View style={styles.formStyle} >
                                <Text style={styles.textTitleForm} >{this.formatTitle(attributeName)}</Text>
                                <Text style={styles.textDescriptionForm} >{description}</Text>
                                <View style={styles.inputContainerForm} >
                                    <TextInput
                                        style={styles.textInputForm}
                                        value={this.state.textInput}
                                        placeholder={"Nhập ở đây"}
                                        placeholderTextColor={'rgba(200,200,200,0.3)'}
                                        onChangeText={this.onEnterChangeText}
                                        autoFocus
                                        keyboardType={keyboardType || 'default'}
                                    />
                                    <TouchableOpacity
                                        style={{ width: 40, height: 40, justifyContent: 'center', alignItems: 'center' }}
                                        onPress={this.setBarEmpty}
                                    >
                                        <DeleteIcon width={20} height={20} />
                                    </TouchableOpacity>
                                </View>

                                <View style={styles.buttonContainer} >
                                    <TouchableOpacity
                                        activeOpacity={0.3}
                                        style={[styles.buttonItem, { borderRightColor: 'rgba(255,255,255,0.3)', borderRightWidth: 0.6 }]}
                                        onPress={this.handleGoBack}
                                    >
                                        <Text style={[styles.textInnerButton, { fontWeight: 'bold' }]} >Hủy bỏ</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        activeOpacity={0.3}
                                        style={styles.buttonItem}
                                        onPress={this.handleUpdate}
                                    >
                                        <Text style={styles.textInnerButton} >Cập nhật</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    )
                }
            </View>
        )
    }
}

class Item extends Component {

    constructor(props){
        super(props);
        this.onPress = this.onPress.bind(this);
    }

    onPress(){
        try {
            this.props.onSubmit(this.props.item);
        } catch (error) {

        }
        this.props.navigation.goBack();
    }

    render() {

        return (
            <TouchableHighlight
                underlayColor={'rgba(150,150,150,0.3)'}
                onPress={this.onPress}
            >
                <View style={styles.itemStyle} >
                    <Text style={styles.textItem} >{this.props.item}</Text>
                    {

                        this.props.currentValue && (this.props.item.toString().normalize() == this.props.currentValue.toString().normalize()) ?
                            (
                                <View style={{ flex: 1, alignItems: 'center', flexDirection: 'row-reverse', paddingHorizontal: 20 }} >
                                    <Tick width={30} height={30} style={{ color: '#0082FF' }} />
                                </View>
                            ) : null
                    }
                </View>
            </TouchableHighlight>
        )
    }
}

const styles = StyleSheet.create({
    headerContainer: {
        width: '100%',
        height: 60,
        backgroundColor: '#324B4C',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    backButton: {
        width: 50,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    textHeader: {
        fontSize: 20,
        color: '#A2CBD2',
    },
    findContainer: {
        width: '100%',
        height: 40,
        flexDirection: 'row',
        backgroundColor: '#627B81',
        borderRadius: 10,
        marginTop: 20,
        marginBottom: 13,
        alignItems: 'center',
        paddingHorizontal: 10,
    },
    itemStyle: {
        width: '100%',
        height: 44,
        borderBottomColor: 'rgba(255,255,255,0.3)',
        borderBottomWidth: 1,
        alignItems: 'center',
        flexDirection: 'row',
        padding: 10,
    },
    textItem: {
        fontSize: 17,
        color: 'white',
        fontWeight: 'bold'
    },
    textInput: {
        flex: 1,
        height: '120%',
        fontSize: 20,
        color: 'black',
    },
    formStyle: {
        width: '100%',
        height: 184,
        backgroundColor: '#245C64',
        borderRadius: 20,
        maxWidth: Dimensions.get('window').width - 10,
        minWidth: 334,
        alignContent: 'center',
    },
    textTitleForm: {
        textAlign: 'center',
        fontSize: 25,
        fontWeight: 'bold',
        color: 'white',
        marginTop: 10,
        letterSpacing: 0.5,
    },
    textDescriptionForm: {
        textAlign: 'center',
        fontSize: 13,
        color: 'white',
        letterSpacing: 0.3,
        marginTop: 5,
        marginBottom: 12,
    },
    inputContainerForm: {
        minHeight: 40,
        backgroundColor: 'rgba(0,68,78,0.4)',
        borderColor: '#fff',
        borderWidth: 0.2,
        borderRadius: 5,
        marginHorizontal: 16,
        flexDirection: 'row',
        alignItems: 'center',
    },
    textInputForm: {
        flex: 1,
        height: '100%',
        fontSize: 17,
        fontWeight: '500',
        color: 'white',
        marginHorizontal: 10,
        letterSpacing: 0.3,
        padding: 0,
    },
    buttonContainer: {
        marginTop: 17,
        flex: 1,
        flexDirection: 'row',
        borderTopColor: 'rgba(255,255,255,0.3)',
        borderTopWidth: 0.6,
    },
    buttonItem: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    textInnerButton: {
        fontSize: 20,
        color: '#2EE9C5',
    }
})