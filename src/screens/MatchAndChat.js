import React, { useState, useRef, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
    Dimensions,
    TouchableOpacity,
    TextInput,
    ScrollView,
    Keyboard,
    Animated,
} from 'react-native';

import { KeyboardAccessoryView } from 'react-native-keyboard-accessory'

import LabelOne from '../../assets/vectors/MatchLabel/labelOne.svg';
import LabelTwo from '../../assets/vectors/MatchLabel/match.svg';
import LabelHighlightOne from '../../assets/vectors/MatchLabel/half-match-thin.svg';
import LabelHighlightTwo from '../../assets/vectors/MatchLabel/half-match-more-thin.svg';

const WIDTH_SCREEN = Dimensions.get('window').width;
const HEIGHT_SCREEN = Dimensions.get('window').height;

// const listImages = [
//     'https://hinhanhdephd.com/wp-content/uploads/2017/06/anh-nguoi-dep-hinh-nguoi-mau-de-thuong-nhat-qua-dat-17.jpg',
//     'https://i.pinimg.com/474x/d5/f3/53/d5f35325a030ad5ab9af33e411b1d9f1.jpg',
//     'https://anhdep123.com/wp-content/uploads/2021/03/Tong-hop-nhung-hinh-anh-sieu-mau-nam-dep-2.jpg',
//     'https://nhansusaigon.com/upload/activation/cosplay/model/thue-model-chuyen-nghiep-hcm-09.jpg',
//     'https://luv.vn/wp-content/uploads/2021/09/hinh-anh-nguoi-mau-lam-hinh-nen-dien-thoai-47.jpg',
//     'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxAYqmbd0s2Zrw81YI3mlLgc0IC2dLg2dGGk5G_-b2rQmVOH886lJfWOVCR2IMYiRI21M&usqp=CAU',
//     'https://vnn-imgs-a1.vgcloud.vn/icdn.dantri.com.vn/2021/05/08/kimoanh-857-1620472406149.jpeg',
// ]; // tạm

export default MatchAndChat = (props) => {

    const [message, setMessage] = useState();
    const [imageIndex, setImageIndex] = useState(0);
    const [showingKeyBoard, setShowingKeyBoard] = useState(false);
    const [showingMatchLabel, setShowingMatchLabel] = useState(true);

    const scaleLabelOne = useRef(new Animated.Value(1.5)).current;

    const opacityLabelTwo = useRef(new Animated.Value(0)).current;
    const scaleLabelTwo = useRef(new Animated.Value(14)).current;

    const opacityLabelHighlightOne = useRef(new Animated.Value(0)).current;
    const transLabelHighlightOne = useRef(new Animated.Value(-30)).current;

    const opacityLabelHighlightTwo = useRef(new Animated.Value(0)).current;
    const transLabelHighlightTwo = useRef(new Animated.Value(-30)).current;

    const textInputPaddingHorizontal = useRef(new Animated.Value(20)).current;
    const textInputMarginBottom = useRef(new Animated.Value(20)).current;
    const textInputBorder = useRef(new Animated.Value(10)).current;

    const isMove = useRef(false);
    const labelScale = useRef((WIDTH_SCREEN * 0.8 / 321.39)).current;

    function onKeyboardDidShow() {
        setShowingMatchLabel(false);
        //setShowingKeyBoard(true);
        inputAnimIn();
    }

    function onKeyboardDidHide() {
        //setShowingKeyBoard(false);
        inputAnimOut();
    }

    useEffect(() => {

        setTimeout(() => {
            startAnim();
        }, 200)

        const showSubscription = Keyboard.addListener('keyboardDidShow', onKeyboardDidShow);
        const hideSubscription = Keyboard.addListener('keyboardDidHide', onKeyboardDidHide);
        return () => {
            showSubscription.remove();
            hideSubscription.remove();
        };
    }, []);

    function startAnim() {
        Animated.spring(scaleLabelOne, {
            toValue: 1,
            useNativeDriver: true,
        }).start();

        Animated.spring(scaleLabelTwo, {
            toValue: 1,
            useNativeDriver: true,
        }).start();

        Animated.spring(opacityLabelTwo, {
            toValue: 1,
            useNativeDriver: true,
        }).start(() => {
            startTransAnim();
        });
    }

    function startTransAnim() {
        Animated.timing(transLabelHighlightOne, {
            duration: 200,
            toValue: 0,
            useNativeDriver: true,
        }).start();

        Animated.timing(opacityLabelHighlightOne, {
            duration: 200,
            toValue: 1,
            useNativeDriver: true,
        }).start();

        setTimeout(() => {
            Animated.timing(transLabelHighlightTwo, {
                duration: 200,
                toValue: 0,
                useNativeDriver: true,
            }).start();

            Animated.timing(opacityLabelHighlightTwo, {
                duration: 200,
                toValue: 1,
                useNativeDriver: true,
            }).start();
        }, 50);
    }

    function inputAnimIn() {
        Animated.timing(textInputPaddingHorizontal, {
            duration: 400,
            toValue: 0,
            useNativeDriver: false,
        }).start();

        Animated.timing(textInputMarginBottom, {
            duration: 400,
            toValue: -2,
            useNativeDriver: false,
        }).start();

        Animated.timing(textInputBorder, {
            duration: 400,
            toValue: 0,
            useNativeDriver: false,
        }).start();
    }

    function inputAnimOut() {
        Animated.timing(textInputPaddingHorizontal, {
            duration: 400,
            toValue: 20,
            useNativeDriver: false,
        }).start();

        Animated.timing(textInputMarginBottom, {
            duration: 400,
            toValue: 20,
            useNativeDriver: false,
        }).start();

        Animated.timing(textInputBorder, {
            duration: 400,
            toValue: 10,
            useNativeDriver: false,
        }).start();
    }

    const transferPhoto = async (touch_X) => {
        if (touch_X <= WIDTH_SCREEN / 2) {
            if (imageIndex > 0) {

                if (imageIndex - 1 > 0 && showingMatchLabel) {
                    setShowingMatchLabel(false);
                }

                setImageIndex(imageIndex - 1);
            } else {
                if (!showingMatchLabel) {

                    scaleLabelOne.setValue(1.5);
                    opacityLabelTwo.setValue(0);
                    scaleLabelTwo.setValue(14);
                    opacityLabelHighlightOne.setValue(0);
                    transLabelHighlightOne.setValue(-30);
                    opacityLabelHighlightTwo.setValue(0);
                    transLabelHighlightTwo.setValue(-30);

                    await setShowingMatchLabel(true);

                    startAnim();
                }
            }
        } else {
            if (imageIndex < (props.route.params.listImages.length - 1) && props.route.params.listImages[imageIndex + 1]) {

                if (imageIndex + 1 < (props.route.params.listImages.length - 1) && showingMatchLabel) {
                    setShowingMatchLabel(false);
                }

                setImageIndex(imageIndex + 1);
            } else {
                if (imageIndex === 0 && !showingMatchLabel) {
                    scaleLabelOne.setValue(1.5);
                    opacityLabelTwo.setValue(0);
                    scaleLabelTwo.setValue(14);
                    opacityLabelHighlightOne.setValue(0);
                    transLabelHighlightOne.setValue(-30);
                    opacityLabelHighlightTwo.setValue(0);
                    transLabelHighlightTwo.setValue(-30);

                    await setShowingMatchLabel(true);

                    startAnim();
                } else if (showingMatchLabel) {
                    setShowingMatchLabel(false);
                }
            }
        }
    }

    const MatchLabel = () => {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', opacity: showingMatchLabel ? 1 : 0 }} >
                <Animated.View
                    style={{
                        transform: [
                            {
                                scale: scaleLabelOne,
                            }
                        ]
                    }}
                >
                    <LabelOne width={labelScale * 88.87} height={labelScale * 25.77} />
                </Animated.View>

                <Animated.View
                    style={{
                        marginTop: 10,
                        transform: [
                            {
                                scale: scaleLabelTwo,
                            },
                        ],
                        opacity: opacityLabelTwo
                    }}
                >
                    <LabelTwo width={labelScale * 321.39} height={labelScale * 56.04} />
                </Animated.View>

                <Animated.View
                    style={{
                        transform: [
                            {
                                translateX: -labelScale * 7.5,
                            },
                            {
                                translateY: labelScale * 2,
                            },
                            {
                                translateY: transLabelHighlightOne,
                            }
                        ],
                        opacity: opacityLabelHighlightOne
                    }}
                >
                    <LabelHighlightOne width={labelScale * 315.13} height={labelScale * 28.8} />
                </Animated.View>

                <Animated.View
                    style={{
                        transform: [
                            {
                                translateX: -labelScale * 10,
                            },
                            {
                                translateY: labelScale * 8,
                            },
                            {
                                translateY: transLabelHighlightTwo,
                            }
                        ],
                        opacity: opacityLabelHighlightTwo
                    }}
                >
                    <LabelHighlightTwo width={labelScale * 315.13} height={labelScale * 28.8} />
                </Animated.View>
            </View>
        )
    }

    const onGoBack = () => {
        props.navigation.goBack();
    }

    const onTouchStart = (event) => {
        isMove.current = false;
    }

    const onTouchMove = (event) => {
        isMove.current = true;
    }

    const onTouchEnd = (event) => {
        let x = event.nativeEvent.locationX;
        if (isMove.current == false) {
            transferPhoto(x);
        }
    }

    const onChangeText = (mes) => {
        setMessage(mes.trim());
    }

    const onSend = () => {
        if (message) {

        }
    }

    return (
        <ImageBackground
            // style={{ flex: 1, width: WIDTH_SCREEN, height: HEIGHT_SCREEN }}
            style = {styles.screenStyle}
            source={{ uri: props.route.params.listImages[imageIndex] }}
        >
            <View style={styles.wrapDot} >
                {
                    props.route.params.listImages.map((item, index) => {

                        if (!item) {
                            return;
                        }

                        return (
                            <View
                                key={index}
                                style={{
                                    width: 10,
                                    height: 10,
                                    backgroundColor: imageIndex === index ? 'white' : 'rgba(125,125,125, 0.8)',
                                    borderWidth: imageIndex === index ? 0.1 : 1,
                                    borderColor: imageIndex === index ? 'rgba(0,0,0, 0.8)' : 'rgba(255,255,255, 0.8)',
                                    borderRadius: 5,
                                    marginHorizontal: 5,
                                }}
                            ></View>
                        )
                    })
                }
            </View>

            <TouchableOpacity
                activeOpacity={0.5}
                onPress={onGoBack}
            >
                <View style={styles.backButton} >
                    <View
                        style={[
                            styles.stick,
                            { transform: [{ rotate: '45deg' }] }
                        ]}
                    ></View>

                    <View
                        style={[
                            styles.stick,
                            { transform: [{ rotate: '-45deg' }] }
                        ]}
                    ></View>
                </View>
            </TouchableOpacity>

            <View /* View này xử lý sự kiện: "click để chuyển ảnh" */
                style={{ flex: 1, width: '100%', backgroundColor: 'rgba(0,0,0,0.0001)', flexDirection: 'row' }}
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
            >
                <MatchLabel />
            </View>

            <Animated.View
                style={[
                    styles.wrapInputToolbar,
                    // {
                    //     marginBottom: showingKeyBoard ? -2 : 20,
                    //     paddingHorizontal: showingKeyBoard ? 0 : 20,
                    // },
                    {
                        marginBottom: textInputMarginBottom,
                        paddingHorizontal: textInputPaddingHorizontal,
                    }
                ]}
            >
                <Animated.View
                    style={[
                        styles.inputToolbar,
                        // {
                        //     borderRadius: showingKeyBoard ? 0 : 10
                        // }
                        {
                            borderRadius: textInputBorder
                        }
                    ]}
                >
                    <TextInput
                        style={styles.input}
                        underlineColorAndroid='transparent'
                        placeholder='Hãy nói gì đó để mở lời...'
                        onChangeText={onChangeText}
                    />

                    <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={onSend}
                    >
                        <Text style={styles.send} >GỬI</Text>
                    </TouchableOpacity>
                </Animated.View>
            </Animated.View>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    screenStyle: {
        flex: 1,
    },
    wrapDot: {
        width: '100%',
        height: 2,
        flexDirection: 'row',
        marginTop: 40,
        justifyContent: 'center',
        alignItems: 'center'
    },
    backButton: {
        marginTop: 20,
        marginLeft: 30,
        justifyContent: 'center',
        alignItems: 'center',
        width: 30,
        height: 30,
    },
    stick: {
        width: 30,
        height: 3,
        borderRadius: 1.5,
        borderColor: 'black',
        borderWidth: 0.05,
        position: 'absolute',
        backgroundColor: 'white',
    },
    wrapInputToolbar: {
        width: '100%',
        paddingHorizontal: 20,
        height: 50,
    },
    inputToolbar: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 10,
    },
    input: {
        flex: 1,
        height: '100%',
        fontSize: 18,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        letterSpacing: 0.5,
        paddingLeft: 20,
        paddingRight: 10,
    },
    send: {
        fontSize: 18,
        color: '#108EB5',
        fontWeight: '500',
        letterSpacing: 0.5,
        padding: 10,
    },
})