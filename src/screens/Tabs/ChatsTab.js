import React, { useState, useRef, useEffect } from 'react';
import {
    View,
    StyleSheet,
    TextInput,
    FlatList,
    Text,
    TouchableOpacity,
    Dimensions,
    ImageBackground,
    TouchableHighlight
} from 'react-native';

import { CircleSnail } from 'react-native-progress';

import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';

import ChatRow from '../../components/ChatRow';
import { ChatListData } from '../../DataTest';

import SearchIcon from '../../../assets/vectors/search.svg';

const WIDTH_SCREEN = Dimensions.get('window').width;

const list = [
    {
        userID: 1,
        userName: "Lương Cường",
        avatar: 'https://images.pexels.com/photos/1580271/pexels-photo-1580271.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
        userIsActive: true,
    },
    {
        userID: 2,
        userName: "Võ Mai Trang",
        avatar: 'https://images.pexels.com/photos/1382734/pexels-photo-1382734.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
        userIsActive: true,
    },
    {
        userID: 3,
        userName: "Huyền My",
        avatar: 'https://images.pexels.com/photos/8450454/pexels-photo-8450454.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
        userIsActive: true,
    },
    {
        userID: 4,
        userName: "Hứa Thành Đạt",
        avatar: 'https://images.pexels.com/photos/1391498/pexels-photo-1391498.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
        userIsActive: true,
    },
    {
        userID: 5,
        userName: "Đỗ Tuyết Mai",
        avatar: 'https://images.pexels.com/photos/2915216/pexels-photo-2915216.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
        userIsActive: true,
    },
    {
        userID: 6,
        userName: "Quan Văn Vũ",
        avatar: 'https://images.pexels.com/photos/1319911/pexels-photo-1319911.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
        userIsActive: true,
    },
    {
        userID: 7,
        userName: "Mai Ngọc",
        avatar: 'https://nhansusaigon.com/upload/activation/cosplay/model/thue-model-chuyen-nghiep-hcm-09.jpg',
        userIsActive: true,
    },
    {
        userID: 8,
        userName: "Minh Trang",
        avatar: 'https://images.pexels.com/photos/1580274/pexels-photo-1580274.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
        userIsActive: true,
    },
    {
        userID: 9,
        userName: "Đỗ Ngọc",
        avatar: 'https://images.pexels.com/photos/3680219/pexels-photo-3680219.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
        userIsActive: true,
    },
    {
        userID: 10,
        userName: "Văn Cao",
        avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
        userIsActive: true,
    },
    {
        userID: 11,
        userName: "Thảo Mai",
        avatar: 'https://images.pexels.com/photos/1391499/pexels-photo-1391499.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
        userIsActive: true,
    },
    {
        userID: 12,
        userName: "Phạm Quân",
        avatar: 'https://images.pexels.com/photos/341970/pexels-photo-341970.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
        userIsActive: true,
    }
]

export default function ChatsTab({ navigation }) {

    const [chatList, setChatList] = useState(null);
    const [searchList, setSearchList] = useState(null);

    const [isLoading, setIsLoading] = useState(true);

    const _rows = useRef({}).current;
    const searchInput = useRef();

    const opacityOfHeader = useSharedValue(1);
    const opacityOfCancelButton = useSharedValue(0);
    const widthOfSearchBar = useSharedValue(WIDTH_SCREEN - 20);
    const translateYOfSearchComponent = useSharedValue(0);
    const opacityOfSearchList = useSharedValue(0);

    useEffect(() => {
        setTimeout(() => {
            setChatList(ChatListData);
            setSearchList(list);
            setIsLoading(false);
        }, 3000);
    }, []);

    const uas_HeaderLabel = useAnimatedStyle(() => {
        return {
            opacity: opacityOfHeader.value,
        }
    })

    const uas_CancelLabel = useAnimatedStyle(() => {
        return {
            opacity: opacityOfCancelButton.value
        }
    });

    const uas_SearchBar = useAnimatedStyle(() => {
        return {
            width: widthOfSearchBar.value,
        }
    })

    const uas_SearchBarWrap = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateY: translateYOfSearchComponent.value,
                }
            ]
        }
    });

    const uas_SearchList = useAnimatedStyle(() => {
        return {
            opacity: opacityOfSearchList.value,
            zIndex: opacityOfSearchList.value === 0 ? -1 : 1
        }
    })

    const animWhenInputFocus = () => {
        opacityOfHeader.value = withTiming(0);
        opacityOfCancelButton.value = withTiming(1);
        widthOfSearchBar.value = withTiming(WIDTH_SCREEN - 60);
        translateYOfSearchComponent.value = withTiming(-30);
        opacityOfSearchList.value = withTiming(1);
    }

    const animWhenInputBlur = () => {
        opacityOfHeader.value = withTiming(1);
        opacityOfCancelButton.value = withTiming(0);
        widthOfSearchBar.value = withTiming(WIDTH_SCREEN - 20);
        translateYOfSearchComponent.value = withTiming(0);
        opacityOfSearchList.value = withTiming(0);
    }

    const SearchBar = () => {

        const onInputFocus = () => {
            animWhenInputFocus();
        }

        const onInputBlur = () => {
            animWhenInputBlur();
        }

        const onChangeText = (value) => {
            if (value.trim() == "") {
                setSearchList(list);
                return;
            }

            setSearchList(list.filter((item) => {
                return item.userName.toLowerCase().normalize().startsWith(value.trim().toLowerCase().normalize());
            }))
        }

        const setRef = (ref) => searchInput.current = ref;

        const onPressCancel = () => {
            if (searchInput.current) {
                searchInput.current.blur();
            }
        }

        return (
            <Animated.View style={[styles.searchWrapperStyle, uas_SearchBarWrap]}>
                <Animated.View
                    style={[
                        styles.searchBar,
                        uas_SearchBar,
                    ]}
                >
                    <SearchIcon width={25} height={25} />
                    <TextInput
                        style={styles.input}
                        placeholder={"Tìm kiếm"}
                        placeholderTextColor={'rgba(255,255,255,0.7)'}
                        onFocus={onInputFocus}
                        onBlur={onInputBlur}
                        onChangeText={onChangeText}
                        ref={setRef}
                    />
                </Animated.View>

                <TouchableOpacity
                    style={{ position: 'absolute', top: 0, bottom: 0, right: 0, justifyContent: 'center' }}
                    activeOpacity={0.7}
                    onPress={onPressCancel}
                >
                    <Animated.Text style={[{ fontSize: 16, marginRight: 15, color: 'cyan', letterSpacing: 0.5, fontWeight: '400' }, uas_CancelLabel]} >Hủy</Animated.Text>
                </TouchableOpacity>
            </Animated.View>
        )
    }

    const SearchList = ({ navigation }) => {

        const renderItem = (item) => {

            const onPressItem = () => {
                navigation.navigate("ChatRoom", {
                    userId: item.item.userID,
                    userName: item.item.userName,
                    avatar: item.item.avatar,
                });
            }

            return (
                <TouchableHighlight
                    underlayColor={'rgba(200,200,200,0.3)'}
                    activeOpacity={0.5}
                    onPress={onPressItem}
                >
                    <View style={{ height: 75, paddingHorizontal: 10, width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }} >
                        <ImageBackground
                            imageStyle={styles.avatar}
                            style={styles.avatar}
                            source={{ uri: item.item.avatar }}
                        >
                            {
                                item.item.userIsActive && (
                                    <View style={styles.userActive} ></View>
                                )
                            }
                        </ImageBackground>

                        <View style={{ height: 75, flex: 1, marginHorizontal: 10, justifyContent: 'center', borderBottomColor: 'rgba(255,255,255,0.5)', borderBottomWidth: item.index === searchList.length - 1 ? 0 : 0.5 }} >
                            <Text style={{ fontSize: 20, color: 'white', fontWeight: '500', letterSpacing: 0.5 }} >{item.item.userName}</Text>
                        </View>
                    </View>
                </TouchableHighlight>
            )
        }

        return (
            <Animated.View style={[{ top: 70, bottom: 0, left: 0, right: 0, position: 'absolute', backgroundColor: '#00444E', zIndex: 1 }, uas_SearchList]} >
                <FlatList
                    data={searchList}
                    contentContainerStyle={{ flexGrow: 1 }}
                    keyboardShouldPersistTaps={'always'}
                    renderItem={renderItem}
                />
            </Animated.View>
        )
    }

    const ChatList = () => {

        const renderItem = (item) => {

            const onTouchStart = () => {
                for (let key in _rows) {
                    if (key !== item.index && _rows[key].returnIsOpen()) { // vì lấy index làm key nên ...
                        _rows[key].closeRow();
                    }
                }
            }

            const setRef = (row) => {
                if (row) {
                    _rows[item.index] = row;
                }
            }

            return (
                <View
                    onTouchStart={onTouchStart}
                >
                    <ChatRow
                        {...item.item}
                        navigation={navigation}
                        ref={setRef}
                    />
                </View>
            )
        }

        return (
            <FlatList
                data={chatList}
                contentContainerStyle={styles.scrollStyle}
                renderItem={renderItem}
            />
        )
    }

    return (
        <View style={styles.screenStyle} >
            <Animated.View style={[styles.headerWrapper, uas_HeaderLabel]}>
                <Text style={styles.headerTittle}>Đoạn chat</Text>
            </Animated.View>

            {
                SearchBar()
            }

            {
                isLoading ? (
                    <View View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
                        <CircleSnail
                            color={['white']}
                            size={40}
                            thickness={2}
                        />
                    </View>
                ) : (
                    <View style={{ flex: 1 }} >
                        <ChatList />
                    </View>
                )
            }

            {
                !isLoading && (
                    <SearchList navigation={navigation} />
                )
            }

        </View >
    )
}

const styles = StyleSheet.create({
    screenStyle: {
        flex: 1,
        backgroundColor: '#00444E',
        alignItems: 'center'
    },
    headerWrapper: {
        width: '100%',
        height: 45,
        justifyContent: 'center',
        alignItems: 'center'
    },
    headerTittle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        letterSpacing: 1,
    },
    searchWrapperStyle: {
        flexDirection: 'row',
        width: '100%',
        height: 40,
        marginBottom: 15,
    },
    searchBar: {
        height: '100%',
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#627B81',
        paddingHorizontal: 10,
        marginHorizontal: 10,
    },
    input: {
        color: 'white',
        fontSize: 18,
        padding: 0,
        paddingHorizontal: 5,
        flex: 1,
    },
    scrollStyle: {
        flexGrow: 1,
    },
    avatar: {
        width: 55,
        height: 55,
        borderRadius: 30,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
    },
    userActive: {
        backgroundColor: '#00CD54',
        borderRadius: 10,
        width: 16,
        height: 16,
        borderWidth: 2,
        borderColor: '#00444E',
    },
})