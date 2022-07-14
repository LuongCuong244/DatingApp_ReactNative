import React, { Component } from "react";
import { View, StyleSheet, Text, ScrollView, TouchableOpacity, Dimensions, Alert, BackHandler } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import ActionSheet from "@alessiocancian/react-native-actionsheet";
import ArrowRight from '../../assets/vectors/arrow-right.svg';
import { currentUser } from "../data/CurrentUser";
import { inforFormatForTrans } from "../module/InforFormatForTrans";
import DeleteHobbyIcon from '../../assets/vectors/delete-hobby.svg';
import ListPhotos from "../components/ListPhotos";
import UserApi from "../api/User.api";

const WIDTH = Dimensions.get('window').width;

export default class MoreInformation extends Component {

    constructor(props) {
        super(props);

        this.state = {
            user: {
                ...props.route.params,
            },
            userInfor: inforFormatForTrans(null),
            hobbyItemToDelete: null,
        }

        this.onUpdateListPhotos = this.onUpdateListPhotos.bind(this);
        this.showHobbyActionSheet = this.showHobbyActionSheet.bind(this);
        this.editInfor = this.editInfor.bind(this);
        this.handleNextScreen = this.handleNextScreen.bind(this);
        this.onPressActionSheet = this.onPressActionSheet.bind(this);
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

    showHobbyActionSheet = () => {
        this.HobbyActionSheet.show();
    }

    editInfor(item, index) {
        const onSubmit = (newValue) => {
            let arr = this.state.userInfor;
            if (Array.isArray(item.value)) { // là sở thích
                if (item.value.indexOf(newValue) !== -1) {
                    Alert.alert("Do mục \"" + newValue + "\" đã tồn tại nên không được thêm vào nữa !");
                    return;
                }
                if (newValue === 'Thêm') {
                    return;
                }
                item.value[item.value.length - 1] = newValue;
                item.value.push("Thêm");
                item.format.attributeValue = "";
            } else {
                item.value = newValue;
                item.format.attributeValue = item.value;
            }
            arr[index] = item;
            this.setState({
                userInfor: arr,
                user: {
                    ...this.state.user,
                    [item.key]: item.key === 'hobby' ? item.value.slice(0, item.value.length - 1) : item.value,
                }
            }, () => {
                console.log(this.state.user);
            })
        }
        this.props.navigation.navigate('SelectingValue', { ...item.format, onSubmit })
    }

    onUpdateListPhotos(newList) {
        console.log('set');
        this.setState({
            user: {
                ...this.state.user,
                listPhotos: newList,
            }
        }, () => {
            console.log(this.state.user);
        })
    }

    handleNextScreen() {
        UserApi.updateUserInfor(this.state.user, () => {
            // do something
        })
        this.props.navigation.navigate('TabsManager');
    }

    onPressActionSheet(index) {
        switch (index) {
            case 0: {
                let inforCopyArray = this.state.userInfor;
                let index = inforCopyArray.findIndex(element => element.key == 'hobby');
                let newArray = inforCopyArray[index].value.filter((hobby) => hobby != this.state.hobbyItemToDelete);
                inforCopyArray[index].value = newArray;
                this.setState({
                    userInfor: inforCopyArray,
                })
            }
        }
    }

    render() {
        return (
            <ScrollView
                contentContainerStyle={styles.container}
                keyboardShouldPersistTaps="handled"
            >
                <Text style={{ fontSize: 55, color: 'white', width: '100%', marginTop: 10 }} >Thêm về bạn</Text>
                <Text style={{ fontSize: 23, color: 'rgba(100,157,163,0.65)', width: '100%', fontWeight: '500' }}>{"Cập nhật thêm thông tin \nđể có được trải nghiệm tốt nhất"}</Text>
                <View
                    style={styles.bodyStyle}
                >
                    <Text style={styles.textHeader}>Thêm ảnh</Text>

                    <ListPhotos
                        userId={this.state.user.userId}
                    />

                    <View style={styles.scrollContainer}  >
                        <ScrollView contentContainerStyle={{ flexGrow: 1 }} >
                            {
                                this.state.userInfor.map((item, index) => {

                                    const Icon = item.icon;

                                    if (item.key === 'userName' || item.key === 'gender') {
                                        return;
                                    }

                                    const onPressToItem = () => {
                                        this.editInfor(item, index);
                                    }

                                    return (
                                        <View style={styles.userInforItem} key={index} >
                                            <View style={styles.itemHeader} >
                                                <Icon width={22} height={22} style={{ color: '#FF7777' }} />
                                                <Text style={styles.itemHeaderText} >{item.title}</Text>
                                            </View>

                                            {
                                                item.key == 'hobby' ? (
                                                    <View style={[
                                                        styles.inputContainer,
                                                        { flexWrap: 'wrap', flexDirection: 'row', alignItems: 'flex-start', paddingVertical: 8, justifyContent: 'flex-start', paddingHorizontal: 0 }
                                                    ]} >
                                                        {
                                                            item.value.map((hobby, indexHobby) => {

                                                                const onPressToHobby = async () => {
                                                                    if (hobby == 'Thêm') {
                                                                        this.editInfor(item, index);
                                                                    } else {
                                                                        await this.setState({
                                                                            hobbyItemToDelete: hobby,
                                                                        })
                                                                        this.showHobbyActionSheet();
                                                                    }
                                                                }

                                                                return (
                                                                    <TouchableOpacity
                                                                        key={indexHobby}
                                                                        activeOpacity={0.7}
                                                                        style={{ paddingHorizontal: 7, paddingVertical: 5 }}
                                                                        onPress={onPressToHobby}
                                                                    >
                                                                        {
                                                                            hobby == 'Thêm' ? (
                                                                                <View style={[
                                                                                    styles.hobbyItemContainer,
                                                                                    { backgroundColor: '#FF29F8', paddingRight: 20, paddingLeft: 20, alignItems: 'center' }
                                                                                ]}>
                                                                                    <Text style={[
                                                                                        styles.hobbyItemText,
                                                                                        { color: 'white', fontStyle: 'italic', fontWeight: 'bold', marginLeft: 0, marginRight: 0 }
                                                                                    ]}>{hobby}</Text>
                                                                                </View>
                                                                            ) : (
                                                                                <View style={styles.hobbyItemContainer}>
                                                                                    <Text style={styles.hobbyItemText}>{hobby}</Text>
                                                                                    <DeleteHobbyIcon width={24} height={18} />
                                                                                </View>
                                                                            )
                                                                        }
                                                                    </TouchableOpacity>
                                                                )
                                                            })
                                                        }
                                                    </View>
                                                ) : (
                                                    <TouchableOpacity
                                                        activeOpacity={0.8}
                                                        style={[
                                                            styles.inputContainer,
                                                            item.key == 'introductory' && { backgroundColor: 'transparent', borderColor: '#707070', borderRadius: 0, borderWidth: 1 }
                                                        ]}
                                                        onPress={onPressToItem}
                                                    >
                                                        <Text
                                                            style={[
                                                                styles.textValueStyle,
                                                                !item.value && { fontStyle: 'italic', color: 'rgb(170,170,170)' },
                                                            ]}
                                                        >{((item.suffixes && item.value) ? (item.value + item.suffixes) : item.value) || "Chưa có dữ liệu"}</Text>
                                                    </TouchableOpacity>
                                                )
                                            }
                                        </View>
                                    )
                                })
                            }
                        </ScrollView>
                    </View>
                </View>

                <TouchableOpacity
                    style={{ width: '100%', height: 50, marginBottom: 20 }}
                    activeOpacity={0.7}
                    onPress={this.handleNextScreen}
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

                <ActionSheet
                    ref={o => this.HobbyActionSheet = o}
                    title={'Bạn có chắc muốn xóa \"' + this.state.hobbyItemToDelete + '\" không ?'}
                    options={['Xóa', 'Hủy']}
                    cancelButtonIndex={1}
                    destructiveButtonIndex={0}
                    onPress={this.onPressActionSheet}
                />
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: WIDTH,
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
        paddingHorizontal: 10,
        paddingVertical: 10,
        backgroundColor: 'rgba(230,244,241,0.8)',
    },
    textHeader: {
        width: '100%',
        fontSize: 19,
        color: '#344B47',
        marginLeft: 20
    },
    scrollContainer: {
        flex: 1,
        flexDirection: 'row',  // chả hiểu sao thiếu dòng này thì ScrollView bên trong không lấy maxWidth :))
        marginTop: 10,
        borderRadius: 20,
        backgroundColor: 'white',
        paddingVertical: 10,
    },
    userInforItem: {
        flex: 1,
        marginBottom: 15,
        marginHorizontal: 20,
    },
    itemHeader: {
        flexDirection: 'row',
        paddingHorizontal: 5,
        marginBottom: 5,
        alignItems: 'center',
    },
    itemHeaderText: {
        fontSize: 14,
        marginLeft: 3,
        color: '#9A7171',
    },
    inputContainer: {
        padding: 6,
        width: '100%',
        borderRadius: 5,
        backgroundColor: '#DADDE2',
        justifyContent: 'center',
        alignItems: 'center',
    },
    textValueStyle: {
        fontSize: 16,
        padding: 0,
        color: '#344B47',
        textAlign: 'center',
        width: '80%',
        letterSpacing: 0.5
    },
    hobbyItemContainer: {
        height: 27,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 20,
        paddingRight: 5,
    },
    hobbyItemText: {
        fontSize: 15,
        color: '#363636',
        marginLeft: 10,
        marginRight: 5
    },
    photosGroupStyle: {
        width: '100%',
        marginTop: 5,
        flexDirection: 'row',
    },
    photoItem: {
        borderRadius: 7,
        borderColor: 'white',
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
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