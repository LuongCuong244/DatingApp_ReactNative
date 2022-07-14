import React, { useState, useRef, useImperativeHandle } from 'react';
import {
    View,
    StyleSheet,
    TextInput,
    FlatList,
    TouchableOpacity,
    ImageBackground,
    Text,
} from 'react-native';

import Animated, {
    runOnJS,
    useAnimatedGestureHandler,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';
import {
    PanGestureHandler
} from 'react-native-gesture-handler';

import MoreIcon from '../../assets/vectors/more.svg';
import GarbageCanIcon from '../../assets/vectors/garbage-can.svg';

export default ChatRow = React.forwardRef((props, ref) => {

    const chatRow_TransX = useSharedValue(0);
    const moreOption_TransX = useSharedValue(140);
    const deleteOption_TransX = useSharedValue(70);
    const prevChatRow_TransX = useSharedValue(0);

    useImperativeHandle(ref, () => ({
        closeRow: closeRow,
        returnIsOpen: returnIsOpen,
    }));

    const returnIsOpen = () => {
        return moreOption_TransX.value !== 140 || deleteOption_TransX.value !== 70;
    }

    const formatTime = (time) => {
        const presentTime = new Date();
        // tin nhắn cùng ngày
        if (presentTime.getDate() === time.getDate() && presentTime.getMonth() === time.getMonth() && presentTime.getFullYear() === time.getFullYear()) {
            return time.getHours() + ":" + time.getMinutes();
        }

        // tin nhắn cùng tuần
        const oneDay = 1000 * 60 * 60 * 24;
        const diffInTime = presentTime.getTime() - time.getTime();
        const diffInDays = Math.round(diffInTime / oneDay);

        if (diffInDays < 7) {
            return time.getDay() === 0 ? "CN" : "Th" + (time.getDay() + 1);
        }

        return time.getDate() + " th " + time.getMonth();
    }

    const onClickChatRow = () => {
        props.navigation.navigate("ChatRoom", {
            userId: props.userId,
            userName: props.userName,
            avatar: props.avatar,
        });
    }

    const uas_ChatRow = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateX: chatRow_TransX.value,
                },
            ]
        }
    });

    const uas_MoreOption = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateX: -70
                },
                {
                    translateX: moreOption_TransX.value
                }
            ]
        }
    });

    const uas_DeleteOption = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateX: deleteOption_TransX.value
                }
            ]
        }
    });

    const closeRow = () => {
        chatRow_TransX.value = withTiming(0);
        moreOption_TransX.value = withTiming(140);
        deleteOption_TransX.value = withTiming(70);
    }

    const eventMoveHandler = useAnimatedGestureHandler({
        onStart: () => {
            // tại vì trong 1 số trường hợp chatRow_TransX.value có thể nhận giá trị khác 0 và -140. Ví dụ như khi animated withTiming chưa hoàn thành mà người dùng đã nhấn tiếp
            if (chatRow_TransX.value === -140) {
                prevChatRow_TransX.value = -140;
            } else {
                prevChatRow_TransX.value = 0;
            }
        },
        onActive: (event) => {
            if ((prevChatRow_TransX.value + event.translationX) > -140) {
                chatRow_TransX.value = prevChatRow_TransX.value + event.translationX;
                if (chatRow_TransX.value < 0) {
                    moreOption_TransX.value = 140 + chatRow_TransX.value;
                    deleteOption_TransX.value = 70 + (chatRow_TransX.value / 2);
                } else {
                    if (prevChatRow_TransX.value === 0) {
                        moreOption_TransX.value = 140;
                        deleteOption_TransX.value = 70;
                    } else {
                        moreOption_TransX.value = event.translationX;
                        deleteOption_TransX.value = (event.translationX / 2);
                    }
                }
            }
        },
        onFinish: (event) => {

            if (event.translationX < -35) {
                chatRow_TransX.value = withTiming(-140);
                moreOption_TransX.value = withTiming(0);
                deleteOption_TransX.value = withTiming(0);

            } else {
                runOnJS(closeRow)();
            }

            if (event.translationX === 0 && event.translationY === 0 && moreOption_TransX.value === 140 && deleteOption_TransX.value === 70) { // thêm chút sai số
                runOnJS(onClickChatRow)();
            }
        }
    })

    return (
        <View style={{ height: 70, flexDirection: 'row-reverse' }} >

            <PanGestureHandler onGestureEvent={eventMoveHandler} activeOffsetX={[-30, 30]} activeOffsetY={[-200, 200]} >
                <Animated.View
                    style={[
                        styles.chatRowStyle,
                        uas_ChatRow,
                    ]}
                >
                    <ImageBackground
                        imageStyle={styles.avatar}
                        style={styles.avatar}
                        source={{ uri: props.avatar }}
                    >
                        {
                            props.userIsActive && (
                                <View style={styles.userActive} ></View>
                            )
                        }
                    </ImageBackground>

                    <View style={styles.rowContent} >
                        <Text
                            style={[
                                styles.userName,
                                props.isNewMessage ? { fontWeight: 'bold' } : { fontWeight: '400' }
                            ]}
                        >
                            {props.userName}
                        </Text>

                        <View style={styles.messageInformation} >
                            <Text
                                style={[
                                    styles.messageText,
                                    props.isNewMessage ? { fontWeight: 'bold', color: 'white' } : { color: '#627B81' }
                                ]}
                                numberOfLines={1}
                            >
                                {props.userIsSendMes ? "Bạn: " + props.message : props.message}
                            </Text>

                            <Text style={{ color: '#627B81', height: '100%', width: 5, marginHorizontal: 5, }}>.</Text>

                            <Text style={{ letterSpacing: 0.5, color: '#627B81' }}>{formatTime(props.time)}</Text>
                        </View>
                    </View>

                    {
                        props.isNewMessage && (
                            <View style={styles.isNewMessage} />
                        )
                    }
                </Animated.View>
            </PanGestureHandler>

            <TouchableOpacity
                activeOpacity={0.8}
                style={{ position: 'absolute' }}
            >
                <Animated.View
                    style={[
                        styles.box,
                        {
                            backgroundColor: '#687E8A',
                        },
                        uas_MoreOption
                    ]}
                >
                    <MoreIcon width={40} height={40} />
                    <Text style={styles.labelOption} >Xem thêm</Text>
                </Animated.View>
            </TouchableOpacity>

            <TouchableOpacity
                activeOpacity={0.8}
                style={{ position: 'absolute' }}
            >
                <Animated.View
                    style={[
                        styles.box,
                        {
                            backgroundColor: '#FF1060',
                        },
                        uas_DeleteOption
                    ]}
                >
                    <GarbageCanIcon width={40} height={40} />
                    <Text style={styles.labelOption} >Xóa bỏ</Text>
                </Animated.View>
            </TouchableOpacity>

        </View>
    )
})

const styles = StyleSheet.create({
    chatRowStyle: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'flex-end',
        alignItems: 'flex-end'
    },
    userActive: {
        backgroundColor: '#00CD54',
        borderRadius: 10,
        width: 17.5,
        height: 17.5,
        borderWidth: 2,
        borderColor: '#00444E',
    },
    rowContent: {
        flex: 1,
        justifyContent: 'center',
        marginLeft: 13,
    },
    userName: {
        fontSize: 21,
        color: 'white',
    },
    messageInformation: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    messageText: {
        flex: 1,
        fontSize: 15,
        color: '#627B81',
    },
    isNewMessage: {
        width: 13,
        height: 13,
        backgroundColor: '#1E70FC',
        borderRadius: 10,
        marginLeft: 10,
    },
    box: {
        width: 70,
        height: 70,
        alignItems: 'center',
        justifyContent: 'center'
    },
    labelOption: {
        fontSize: 12,
        color: 'white',
        margin: 2,
    }
})
