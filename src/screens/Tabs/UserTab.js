import React, { useRef, useState, useEffect } from 'react';
import {
    View,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    Text,
    ImageBackground,
    ScrollView,
    Alert,
} from 'react-native';
import ActionSheet from "@alessiocancian/react-native-actionsheet";
import DatePicker from 'react-native-date-picker';
import Moment from 'moment';

import PreviewIcon from '../../../assets/vectors/preview.svg';
import PencilIcon from '../../../assets/vectors/pencil.svg';
import TickIcon from '../../../assets/vectors/tick.svg';
import ArrowRightIcon from '../../../assets/vectors/arrow-right-ios.svg';
import DeleteHobbyIcon from '../../../assets/vectors/delete-hobby.svg';
import ListPhotos from '../../components/ListPhotos';
import { currentUser } from '../../data/CurrentUser';
import { inforFormatForTrans } from "../../module/InforFormatForTrans";

const WIDTH_SCREEN = Dimensions.get('window').width;

export default function CardSwipeTab({ navigation }) {

    const HobbyActionSheet = useRef();

    const [user, setUser] = useState(currentUser);
    const [userInfor, setUserInfor] = useState(inforFormatForTrans(currentUser));
    const [hobbyItemToDelete, setHobbyItemToDelete] = useState();

    const [openDatePicker, setOpenDatePicker] = useState(false);
    const [isEditing, setEditing] = useState(false);

    const showHobbyActionSheet = () => {
        HobbyActionSheet.current.show();
    }

    const editInfor = (item, index) => {
        const onSubmit = (newValue) => {
            let arr = [...userInfor];

            let clonedItem = JSON.parse(JSON.stringify(item));

            clonedItem.icon = item.icon; // vì JSON.parse(JSON.stringify(item)) chỉ sao chép chuỗi, không sao chép Function Svg.

            if (Array.isArray(clonedItem.value)) { // là sở thích
                if (clonedItem.value.indexOf(newValue) !== -1) {
                    Alert.alert("Do mục \"" + newValue + "\" đã tồn tại nên không được thêm vào nữa !");
                    return;
                }
                if (newValue === 'Thêm') {
                    return;
                }
                clonedItem.value[clonedItem.value.length - 1] = newValue;
                clonedItem.value.push("Thêm");
                clonedItem.format.attributeValue = "";
            } else {
                clonedItem.value = newValue;
                clonedItem.format.attributeValue = newValue;
            }

            if (item.key == 'height') {
                console.log(clonedItem);
            }

            arr[index] = clonedItem;

            setUserInfor(arr);
        }

        navigation.navigate('SelectingValue', { ...item.format, onSubmit })
    }

    const Header = () => {

        const onClickPreview = () => {
            navigation.navigate('UserProfile', {
                likedMe: false,
                isNavigate: true,
            });
        }

        const onEditable = () => {
            setEditing(!isEditing)
        }

        return (
            <View style={styles.headerStyle} >
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={onClickPreview}
                >
                    <View
                        style={[
                            styles.styleOfButtonInHeader,
                            {
                                right: 15,
                            }
                        ]}

                    >
                        <PreviewIcon width={20} height={20} />
                        <Text style={styles.styleOfTextInHeader} >Xem trước</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => {

                    }}
                >
                    <ImageBackground
                        style={[styles.avatar, { top: 25 }]}
                        imageStyle={[
                            styles.avatar,
                            {
                                borderWidth: 2,
                                borderColor: 'white',
                            }
                        ]}
                        source={{ uri: user.avatar }}
                    >
                        <View
                            style={[
                                styles.verify,
                                {
                                    backgroundColor: user.verify ? '#57D64E' : '#BFBFBF',
                                }
                            ]}
                        >
                            <TickIcon width={15} height={15} style={{ color: 'white' }} />
                        </View>
                    </ImageBackground>
                </TouchableOpacity>

                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={onEditable}
                >
                    <View
                        style={[
                            styles.styleOfButtonInHeader,
                            {
                                left: 15,
                                backgroundColor: isEditing ? '#11F94D' : '#ADCAD1'
                            }
                        ]}

                    >
                        {
                            !isEditing && (
                                <PencilIcon width={20} height={20} />
                            )
                        }
                        <Text style={styles.styleOfTextInHeader} >{isEditing ? "Lưu" : "Chỉnh sửa"}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

    const BasicInfor = () => {

        const indexOfName = userInfor.findIndex((item) => item.key === "userName");
        const indexOfGender = userInfor.findIndex((item) => item.key === "gender");

        return (
            <View style={[styles.inforWrapper, { marginTop: 0 }]} >

                <Text style={styles.textHeaderStyle} >Thông tin cơ bản</Text>

                <View style={[styles.inforContentWrapper, { paddingBottom: 15 }]} >
                    <BasicInforItem label={"Tên"} value={userInfor[indexOfName].value} index={indexOfName} keyItem={'userName'} />

                    <BasicInforItem label={"Ngày sinh"} value={Moment(user.dateOfBirth).format("DD/MM/YYYY")} keyItem={'dateOfBirth'} />

                    <BasicInforItem label={"Giới tính"} value={userInfor[indexOfGender].value} index={indexOfGender} keyItem={"gender"} />
                </View>
            </View>
        )
    }

    const BasicInforItem = ({ label, value, index, keyItem }) => {

        const onPress = () => {
            if (keyItem == 'dateOfBirth') {
                setOpenDatePicker(true);
                return;
            }
            editInfor(userInfor[index], index);
        }

        return (
            <TouchableOpacity
                activeOpacity={0.7}
                disabled={!isEditing}
                style={styles.basicInforItemWrapper}
                onPress={onPress}
            >
                <Text style={styles.styleOfLabelText}>{label}</Text>

                <Text style={styles.styleOfValueText} >{value}</Text>

                {
                    isEditing && (
                        <ArrowRightIcon height={15} width={8.83} style={{ color: 'white' }} />
                    )
                }
            </TouchableOpacity>
        )
    }

    const MyPhotos = () => {
        return (
            <View style={styles.inforWrapper} >
                <Text style={styles.textHeaderStyle} >Ảnh của tôi</Text>

                <View
                    style={[
                        styles.inforContentWrapper,
                        { padding: 15, }
                    ]}
                >
                    <ListPhotos
                        userId = {user.userId}
                    />
                </View>
            </View>
        )
    }

    const Introductory = () => {

        const index = userInfor.findIndex((item) => item.key === 'introductory');

        const onPress = () => {
            editInfor(userInfor[index], index);
        }

        return (
            <TouchableOpacity
                style={styles.inforWrapper}
                activeOpacity={0.7}
                disabled={!isEditing}
                onPress={onPress}
            >
                <Text style={styles.textHeaderStyle} >Giới thiệu về tôi</Text>

                <View
                    style={[
                        styles.inforContentWrapper,
                        {
                            paddingHorizontal: 25,
                            paddingVertical: 15,
                        }
                    ]}
                >
                    <Text
                        style={[
                            styles.styleOfValueText,
                            {
                                position: 'relative',
                                letterSpacing: 0.5,
                                width: '100%',
                                color: 'rgba(255,255,255,0.5)'
                            },
                            !userInfor[index].value && styles.noDataLabel
                        ]}
                    >
                        {userInfor[index].value || "Bạn chưa giới thiệu"}
                    </Text>
                </View>
            </TouchableOpacity>
        )
    }

    const MoreInfor = () => {
        return (
            <View style={styles.inforWrapper} >
                <Text style={styles.textHeaderStyle} >Thêm về tôi</Text>

                <View
                    style={[
                        styles.inforContentWrapper,
                        { padding: 10, }
                    ]}
                >
                    {
                        userInfor.map((item, index) => {

                            const Icon = item.icon;

                            if (item.key === 'introductory' || item.key === 'userName' || item.key == 'gender') {
                                return;
                            }

                            const onPressToEditing = () => {
                                editInfor(item, index);
                            }

                            return (
                                <View key={index} >
                                    {
                                        item.key !== 'hobby' ? (
                                            <TouchableOpacity
                                                key={index}
                                                activeOpacity={0.7}
                                                disabled={!isEditing}
                                                onPress={onPressToEditing}
                                            >
                                                <View style = {styles.moreInforItemWrapper} >
                                                    <View style={{ flexDirection: 'row', alignItems: 'center' }} >
                                                        <Icon width={22} height={22} style={{ color: '#FF8D3E' }} />
                                                        <Text style={[styles.styleOfLabelText, { marginLeft: 7 }]} >{item.title}</Text>
                                                    </View>

                                                    <Text
                                                        style={[
                                                            styles.styleOfValueText,
                                                            {
                                                                paddingBottom: 0,
                                                            },
                                                            !item.value && styles.noDataLabel
                                                        ]}
                                                    >
                                                        {((item.suffixes && item.value) ? (item.value + item.suffixes) : item.value) || "Chưa có dữ liệu"}
                                                    </Text>

                                                    {
                                                        isEditing && (
                                                            <ArrowRightIcon height={15} width={8.83} style={{ color: 'white' }} />
                                                        )
                                                    }
                                                </View>
                                            </TouchableOpacity>
                                        ) : (
                                            <View
                                                style={styles.moreInforItemWrapper}
                                            >
                                                <View style={{ flexDirection: 'row', alignItems: 'center' }} >
                                                    <Icon width={22} height={22} style={{ color: '#FF8D3E' }} />
                                                    <Text style={[styles.styleOfLabelText, { marginLeft: 7 }]} >{item.title}</Text>
                                                </View>

                                                <View style={{ flex: 1, flexWrap: 'wrap', flexDirection: 'row', marginHorizontal: 15 }} >
                                                    {
                                                        item.value.map((hobby, indexHobby) => {

                                                            if (item.value.length === 1 && !isEditing) {
                                                                return (
                                                                    <Text
                                                                        style={[
                                                                            styles.styleOfValueText,
                                                                            {
                                                                                position: 'relative',
                                                                                paddingBottom: 0,
                                                                                flex: 1,
                                                                            },
                                                                            styles.noDataLabel,
                                                                        ]}
                                                                    >
                                                                        Chưa có dữ liệu
                                                                    </Text>

                                                                )
                                                            }

                                                            const onPressItem = async () => {
                                                                if (hobby == 'Thêm') {
                                                                    editInfor(item, index);
                                                                } else {
                                                                    await setHobbyItemToDelete(hobby);
                                                                    showHobbyActionSheet();
                                                                }
                                                            }

                                                            return (
                                                                <TouchableOpacity
                                                                    key={indexHobby}
                                                                    activeOpacity={0.7}
                                                                    disabled={!isEditing}
                                                                    onPress={onPressItem}
                                                                >
                                                                    {
                                                                        hobby == 'Thêm' ? (
                                                                            isEditing && (
                                                                                <View style={[
                                                                                    styles.hobbyItemContainer,
                                                                                    { backgroundColor: '#FE4848', paddingRight: 20, paddingLeft: 20, alignItems: 'center' }
                                                                                ]}>
                                                                                    <Text style={[
                                                                                        styles.hobbyItemText,
                                                                                        { color: 'white', fontStyle: 'italic', fontWeight: 'bold', marginLeft: 0, marginRight: 0, fontSize: 13 }
                                                                                    ]}>{hobby}</Text>
                                                                                </View>
                                                                            )
                                                                        ) : (
                                                                            <View
                                                                                style={[
                                                                                    styles.hobbyItemContainer,
                                                                                    !isEditing && {
                                                                                        backgroundColor: 'none',
                                                                                        borderWidth: 1,
                                                                                        borderColor: 'white',
                                                                                        paddingRight: 15,
                                                                                        paddingLeft: 15,
                                                                                    }
                                                                                ]}
                                                                            >
                                                                                <Text
                                                                                    style={[
                                                                                        styles.hobbyItemText,
                                                                                        {
                                                                                            fontSize: 12,
                                                                                        },
                                                                                        !isEditing && {
                                                                                            color: 'white',
                                                                                            marginLeft: 0,
                                                                                            marginRight: 0,
                                                                                        }
                                                                                    ]}
                                                                                >
                                                                                    {hobby}
                                                                                </Text>
                                                                                {
                                                                                    isEditing && (
                                                                                        <DeleteHobbyIcon width={24} height={18} />
                                                                                    )
                                                                                }
                                                                            </View>
                                                                        )
                                                                    }
                                                                </TouchableOpacity>
                                                            )
                                                        })
                                                    }
                                                </View>
                                            </View>
                                        )
                                    }
                                </View>
                            )
                        })
                    }
                </View>
            </View>
        )
    }

    const onPressActionSheet = (index) => {
        switch (index) {
            case 0: {
                let inforCopyArray =
                    userInfor.map((obj) => {
                        return { ...obj }
                    })
                let index = inforCopyArray.findIndex(element => element.key == 'hobby');
                let newArray = inforCopyArray[index].value.filter((hobby) => hobby !== hobbyItemToDelete);
                inforCopyArray[index].value = newArray;

                setUserInfor(inforCopyArray);
            }
        }
    }

    const onConfirmDate = (date) => {
        setUser({
            ...user,
            dateOfBirth: date,
        })
        setOpenDatePicker(false);
    }

    const onCancelDate = () => {
        setOpenDatePicker(false);
    }

    return (
        <View style={styles.screenStyle} >

            <Header />

            <View style={{
                flex: 1,
                width: '100%',
                backgroundColor: '#00444E',
                borderTopRightRadius: 40,
                paddingTop: 40,
                zIndex: -1,
            }} >
                <ScrollView>
                    <View style={styles.contentStyle} >
                        <BasicInfor />

                        <MyPhotos />

                        <Introductory />

                        <MoreInfor userInfor={userInfor} isEditing={isEditing} editInfor={editInfor} />
                    </View>
                </ScrollView>
            </View>

            <View style={styles.backgroundGreenColor} />

            <ActionSheet
                ref={o => HobbyActionSheet.current = o}
                title={'Bạn có chắc muốn xóa \"' + hobbyItemToDelete + '\" không ?'}
                options={['Xóa', 'Hủy']}
                cancelButtonIndex={1}
                destructiveButtonIndex={0}
                onPress={onPressActionSheet}
            />

            <DatePicker
                modal
                open={openDatePicker}
                mode='date'
                date={user.dateOfBirth || new Date()}
                onConfirm={onConfirmDate}
                onCancel={onCancelDate}
            />
        </View >
    )
}

const styles = StyleSheet.create({
    screenStyle: {
        flex: 1,
        backgroundColor: '#00444E',
    },
    backgroundGreenColor: {
        position: 'absolute',
        backgroundColor: '#006A69',
        height: '100%',
        width: WIDTH_SCREEN / 2,
        transform: [
            { translateX: WIDTH_SCREEN / 2 }
        ],
        zIndex: -2, // hiện dưới cùng
    },
    headerStyle: {
        backgroundColor: '#006A69',
        borderBottomLeftRadius: 40,
        paddingHorizontal: 40,
        height: 60,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        paddingBottom: 5,
    },
    styleOfButtonInHeader: {
        height: 25,
        width: 95,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#56B7CD',
        borderWidth: 1,
        borderColor: '#00444E',
        borderRadius: 50,
        paddingHorizontal: 10,
        paddingVertical: 2,
    },
    styleOfTextInHeader: {
        fontSize: 11,
        fontWeight: 'bold',
        color: '#00444E',
        marginLeft: 3,
        textAlign: 'center',
    },
    avatar: {
        width: 65,
        height: 65,
        borderRadius: 35,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
    },
    verify: {
        backgroundColor: '#BFBFBF',
        borderRadius: 15,
        width: 22,
        height: 22,
        borderWidth: 1,
        top: 2,
        borderColor: 'white',
        justifyContent: 'center',
        alignItems: 'center'
    },
    contentStyle: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        backgroundColor: '#00444E',
        borderTopRightRadius: 40,
        paddingHorizontal: 10,
        paddingBottom: 15,
        zIndex: -1,
    },
    inforWrapper: {
        width: '100%',
        marginTop: 20,
    },
    textHeaderStyle: {
        fontSize: 13,
        fontWeight: 'bold',
        color: '#077D7D',
        marginBottom: 5,
        marginLeft: 15,
    },
    inforContentWrapper: {
        backgroundColor: '#002E34',
        borderRadius: 10,
        width: '100%',
        paddingHorizontal: 15,
    },
    basicInforItemWrapper: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        borderBottomWidth: 0.5,
        borderBottomColor: 'rgba(255,255,255,0.4)',
        paddingHorizontal: 15,
        paddingTop: 15,
        paddingBottom: 5,
    },
    moreInforItemWrapper: {
        width: '100%',
        padding: 10,
        flexDirection: 'row',
        backgroundColor: 'rgba(31,74,92, 0.3)',
        marginVertical: 10,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    styleOfLabelText: {
        color: '#C9C9C9',
        fontSize: 12,
        fontWeight: '500',
    },
    styleOfValueText: {
        position: 'absolute',
        width: '110%',
        color: 'white',
        fontSize: 16,
        fontWeight: '500',
        textAlign: 'center',
        paddingBottom: 5,
    },
    noDataLabel: {
        fontWeight: '300',
        color: 'rgba(200,200,200,0.6)',
        fontStyle: 'italic',
    },
    hobbyItemContainer: {
        paddingVertical: 4,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 20,
        paddingRight: 5,
        margin: 5,
    },
    hobbyItemText: {
        fontSize: 15,
        color: '#363636',
        marginLeft: 10,
        marginRight: 5
    },
})