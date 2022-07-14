import React, { useState, useRef } from "react";
import { Dimensions, ImageBackground, StyleSheet, TextInput, TouchableOpacity, View, Text, Image, Modal } from "react-native";
import { dataUserTest } from "../../DataTest";
import SkipIcon from '../../../assets/vectors/CardSwipeScreen/skip-icon.svg';
import RecoverIcon from '../../../assets/vectors/CardSwipeScreen/recover-icon.svg';
import FavouriteIcon from '../../../assets/vectors/CardSwipeScreen/favourite-icon.svg';
import ChatIcon from '../../../assets/vectors/CardSwipeScreen/chat-icon.svg';
import FilterIcon from '../../../assets/vectors/filter-icon.svg';
import { CircleSnail } from 'react-native-progress';
import Animated, {
    runOnJS,
    useAnimatedGestureHandler,
    useAnimatedStyle,
    useSharedValue,
    interpolateColor,
    withTiming,
    interpolate,
} from 'react-native-reanimated';
import {
    PanGestureHandler,
    gestureHandlerRootHOC,
    TapGestureHandler
} from 'react-native-gesture-handler';
import Filter from "../../components/Filter";

const WIDTH_SCREEN = Dimensions.get('window').width;

const REACH_THRESHOLD = WIDTH_SCREEN * 0.3; // vuốt quá giá trị này thì sẽ lật thẻ

const Colors = {
    favouriteIcon: '#FF84B1',
    skipIcon: '#ced7d8',
}

export default function CardSwipeTab(props) {

    const heightCard = useRef(0);
    const widthCard = useRef(0);
    const isMove = useRef(false);
    const isTakeBackCard = useRef(false);

    const [data, setData] = useState(dataUserTest);
    const [userIndex, setUserIndex] = useState(0);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [reload, setReload] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);
    const [showFilter, setShowFilter] = useState(false);

    const [isLoading, setIsLoading] = useState(false);

    const cardAbove_TranslationX = useSharedValue(0);
    const cardAbove_TranslationY = useSharedValue(0);
    const scaleBellowBackground = useSharedValue(0.97);
    const rotateCardAbove = useSharedValue('0deg');
    const rotateY = useSharedValue('0deg');
    const isTouchAbove = useSharedValue(false);

    const opacityLikeIcon = useSharedValue(0);
    const opacityNopeIcon = useSharedValue(0);

    const favourite_borderWidth = useSharedValue(1);
    const favourite_backgroundColor = useSharedValue(0);
    const favourite_iconColor = useSharedValue(Colors.favouriteIcon);
    const favourite_Scale = useSharedValue(1);
    const favourite_TranslationY = useSharedValue(0);

    const skip_borderWidth = useSharedValue(1);
    const skip_backgroundColor = useSharedValue(0);
    const skip_iconColor = useSharedValue(Colors.skipIcon);
    const skip_Scale = useSharedValue(1);
    const skip_TranslationY = useSharedValue(0);

    const leftButtons_TranslationY = useSharedValue(0);
    const chat_Opacity = useSharedValue(1);

    const recover_Opacity = useSharedValue(1);
    const recover_Rotate = useSharedValue('0deg');

    const formatName = (user) => {

        let userName = user.name;
        let arr = userName.split(' ');
        return arr[arr.length - 1].trim();
    }

    const transferPhoto = (touch_X) => {
        if (touch_X <= widthCard.current / 2) {
            if (currentImageIndex > 0) {
                setCurrentImageIndex(currentImageIndex - 1);
                setImageLoaded(false);
            } else {
                let duration = 100;
                rotateY.value = withTiming('-5deg', {
                    duration
                });

                setTimeout(() => {
                    rotateY.value = withTiming('0deg', {
                        duration: 2 * duration
                    })
                }, duration);
            }
        } else {
            if (currentImageIndex < (data[userIndex].listImages.length - 1)) {
                setCurrentImageIndex(currentImageIndex + 1);
                setImageLoaded(false);
            } else {
                let duration = 100;
                rotateY.value = withTiming('5deg', {
                    duration
                });

                setTimeout(() => {
                    rotateY.value = withTiming('0deg', {
                        duration: 2 * duration
                    })
                }, duration);
            }
        }

    }

    const setShowFilterModal = (isShow) => {
        setShowFilter(isShow);
    }

    const uas_opacityLike = useAnimatedStyle(() => {

        let opacity = interpolate(opacityLikeIcon.value, [0, 0.3, 1], [0, 0.7, 1]);

        return {
            opacity,
            marginLeft: 20,
            transform: [
                {
                    rotate: '-35deg'
                }
            ]
        }
    })

    const uas_opacityNope = useAnimatedStyle(() => {

        let opacity = interpolate(opacityNopeIcon.value, [0, 0.3, 1], [0, 0.7, 1]);

        return {
            opacity,
            marginRight: 20,
            transform: [
                {
                    rotate: '35deg'
                }
            ]
        }
    })

    const renderCardAbove = () => {

        if (heightCard.current === 0 || widthCard.current === 0) {
            return;
        }

        const onTouchStartPhoto = () => {
            isMove.current = false;
        }

        const onTouchMovePhoto = () => {
            isMove.current = true;
        }

        const onTouchEndPhoto = (event) => {
            let x = event.nativeEvent.locationX;
            if (isMove.current == false) {
                transferPhoto(x);
            }
        }

        const onPressBottomBar = () => {
            props.navigation.navigate('UserProfile', {
                likedMe: false,
                isNavigate: true,
            });
        }

        return (
            <ImageBackground
                style={[
                    styles.backgroundStyle,
                    { height: heightCard.current, width: widthCard.current }
                ]}
                imageStyle={{ borderRadius: 17 }}
                source={{ uri: data[userIndex].listImages[currentImageIndex] }}
                onLoad={() => {
                    setImageLoaded(true);
                }}
            >
                <View style={styles.barsImageStyle} >
                    {
                        data[userIndex].listImages.map((item, index) => {
                            return (
                                <View
                                    key={index}
                                    style={{
                                        width: 10,
                                        height: 10,
                                        backgroundColor: currentImageIndex === index ? 'white' : 'rgba(125,125,125, 0.8)',
                                        borderWidth: currentImageIndex === index ? 0 : 1,
                                        borderColor: 'rgba(255,255,255, 0.8)',
                                        borderRadius: 5,
                                        marginHorizontal: 5,
                                    }}
                                ></View>
                            )
                        })
                    }
                </View>

                <View /* View này xử lý sự kiện: "click để chuyển ảnh" */
                    style={{ flex: 1, width: '100%', backgroundColor: 'rgba(0,0,0,0.0001)', flexDirection: 'row' }}
                    onTouchStart={onTouchStartPhoto}
                    onTouchMove={onTouchMovePhoto}
                    onTouchEnd={onTouchEndPhoto}
                >
                    <Animated.Image
                        style={[
                            {
                                height: heightCard.current * 0.09,
                                width: (heightCard.current * 0.09) * 450 / 189,
                                marginTop: heightCard.current * 0.065,
                            },
                            uas_opacityLike]}
                        source={require('../../../assets/imgs/like.png')}
                    />

                    <View style={{ flex: 1, flexDirection: "row-reverse" }}>
                        <Animated.Image
                            style={[
                                {
                                    height: heightCard.current * 0.09,
                                    width: (heightCard.current * 0.09) * 450 / 189,
                                    marginTop: heightCard.current * 0.065,
                                },
                                uas_opacityNope
                            ]}
                            source={require('../../../assets/imgs/nope.png')}
                        />
                    </View>
                </View>

                <TouchableOpacity
                    activeOpacity={0.7}
                    style={styles.inforWrapper}
                    onPress={onPressBottomBar}
                >
                    <Text style={styles.nameStyle} >{formatName(data[userIndex])}</Text>
                    <View style={styles.rightInforContent} >
                        <Text style={styles.ageStyle} >{data[userIndex].age}</Text>
                        <Text style={styles.addressStyle} >{data[userIndex].address}</Text>
                    </View>
                </TouchableOpacity>
            </ImageBackground>
        )
    }

    const renderCardBellow = () => {

        if (heightCard.current === 0 || widthCard.current === 0) {
            return;
        }

        let indexOfCard;
        let indexOfImageBackground = 0;

        indexOfCard = userIndex + 1;

        if (indexOfCard >= data.length) {
            indexOfCard = 0;
        }

        if (isTakeBackCard.current) {
            indexOfImageBackground = isTakeBackCard.current.indexOfImage;
        }

        return (
            <ImageBackground
                style={[
                    styles.backgroundStyle,
                    { justifyContent: 'space-between' }
                ]}
                imageStyle={{ borderRadius: 17 }}
                source={{ uri: data[indexOfCard].listImages[indexOfImageBackground] }}
            >
                <View style={styles.barsImageStyle} >
                    {
                        data[indexOfCard].listImages.map((item, index) => {

                            return (
                                <View
                                    key={index}
                                    style={{
                                        width: 10,
                                        height: 10,
                                        backgroundColor: indexOfImageBackground === index ? 'white' : 'rgba(125,125,125, 0.8)',
                                        borderWidth: indexOfImageBackground === index ? 0 : 1,
                                        borderColor: 'rgba(255,255,255, 0.8)',
                                        borderRadius: 5,
                                        marginHorizontal: 5,
                                    }}
                                ></View>
                            )
                        })
                    }
                </View>

                <View style={styles.inforWrapper} >
                    <Text style={styles.nameStyle} >{formatName(data[indexOfCard])}</Text>
                    <View style={styles.rightInforContent} >
                        <Text style={styles.ageStyle} >{data[indexOfCard].age}</Text>
                        <Text style={styles.addressStyle} >{data[indexOfCard].address}</Text>
                    </View>
                </View>
            </ImageBackground>
        )
    }

    const handleClickFavouriteIcon = () => {
        let index = userIndex; // lấy index trước khi chuyển sang thẻ khác
        swipeCard();
        props.navigation.navigate("MatchAndChat", {
            listImages: data[index].listImages,
        })
    }

    const onClickFavouriteIcon = useAnimatedGestureHandler({
        onStart: (event) => {
            favourite_borderWidth.value = 0;
            favourite_iconColor.value = 1;
            favourite_backgroundColor.value = 1;
            favourite_Scale.value = 0.85;
        },
        onFinish: (event) => {
            favourite_borderWidth.value = withTiming(1);
            favourite_iconColor.value = withTiming(0);
            favourite_backgroundColor.value = withTiming(0);
            favourite_Scale.value = withTiming(1);

            opacityLikeIcon.value = 1;
            cardAbove_TranslationX.value = withTiming(2 * WIDTH_SCREEN, {
                duration: 600,
            });
            cardAbove_TranslationY.value = withTiming(20);
            rotateCardAbove.value = withTiming('15deg');

            runOnJS(handleClickFavouriteIcon)();
        },
    });

    const uas_FavouriteIcon = useAnimatedStyle(() => {
        return {
            borderColor: Colors.favouriteIcon,
            backgroundColor: interpolateColor(favourite_backgroundColor.value, [0, 0.2, 1], ['transparent', 'rgba(83,126,249,0.5)', 'rgba(83,126,249,1)']),
            borderWidth: favourite_borderWidth.value,
            transform: [
                { scale: favourite_Scale.value },
                { translateY: favourite_TranslationY.value },
            ]
        };
    });

    const handleClickSkipIcon = () => {
        swipeCard();
    }

    const onClickSkipIcon = useAnimatedGestureHandler({
        onStart: (event) => {
            skip_borderWidth.value = 0;
            skip_iconColor.value = 1;
            skip_backgroundColor.value = 1;
            skip_Scale.value = 0.85;
        },
        onFinish: (event) => {
            skip_borderWidth.value = withTiming(1);
            skip_iconColor.value = withTiming(0);
            skip_backgroundColor.value = withTiming(0);
            skip_Scale.value = withTiming(1);

            opacityNopeIcon.value = 1;
            cardAbove_TranslationX.value = withTiming(-2 * WIDTH_SCREEN, {
                duration: 600,
            });
            cardAbove_TranslationY.value = withTiming(20);
            rotateCardAbove.value = withTiming('-15deg');

            runOnJS(handleClickSkipIcon)();
        },
    });

    const uas_SkipIcon = useAnimatedStyle(() => {
        return {
            borderColor: Colors.skipIcon,
            backgroundColor: interpolateColor(skip_backgroundColor.value, [0, 0.3, 1], ['transparent', 'rgba(241,53,97,0.5)', 'rgba(241,53,97,1)']),
            borderWidth: skip_borderWidth.value,
            transform: [
                { scale: skip_Scale.value },
                { translateY: skip_TranslationY.value },
            ]
        };
    });

    const handleClickRecoverIcon = () => {
        takeBackCard();
    }

    const onClickRecoverIcon = useAnimatedGestureHandler({
        onStart: (event) => {
            recover_Opacity.value = withTiming(0.7, {
                duration: 50,
            });

            recover_Rotate.value = '0deg';
        },
        onFinish: (event) => {
            recover_Opacity.value = withTiming(1, {
                duration: 200,
            });

            recover_Rotate.value = withTiming('360deg', {
                duration: 800,
            })

            runOnJS(handleClickRecoverIcon)();
        },
    });

    const uas_RecoverIcon = useAnimatedStyle(() => {
        return {
            transform: [
                { translateY: leftButtons_TranslationY.value },
                { rotate: recover_Rotate.value }
            ],
            opacity: recover_Opacity.value,
        };
    });

    const onClickChatIcon = useAnimatedGestureHandler({
        onStart: (event) => {
            chat_Opacity.value = withTiming(0.5, {
                duration: 50,
            });
        },
        onFinish: (event) => {
            chat_Opacity.value = withTiming(1, {
                duration: 200,
            });
        },
    });

    const uas_ChatIcon = useAnimatedStyle(() => {
        return {
            transform: [
                { translateY: leftButtons_TranslationY.value, },
            ],
            opacity: chat_Opacity.value,
        };
    });

    const swipeCard = () => {
        scaleBellowBackground.value = withTiming(1, {
            duration: 200,
        });

        setTimeout(() => {

            if (userIndex >= data.length - 1) {
                dataUserTest[0].imageIndexDisplay = 0; // thực tế thì có thể xóa dòng này hoặc không
                setUserIndex(0);
            } else {
                dataUserTest[userIndex + 1].imageIndexDisplay = 0; // thực tế thì có thể xóa dòng này hoặc không
                setUserIndex(userIndex + 1);
            }
            setCurrentImageIndex(0);
            cardAbove_TranslationX.value = 0;
            cardAbove_TranslationY.value = 0;
            rotateCardAbove.value = '0deg';
            scaleBellowBackground.value = 0.97;
            opacityLikeIcon.value = 0;
            opacityNopeIcon.value = 0;
        }, 200)
    }

    const takeBackCard = () => {

        isTakeBackCard.current = {
            indexOfImage: currentImageIndex,
        };

        scaleBellowBackground.value = 1;

        setTimeout(() => {
            setUserIndex(userIndex - 1);
            setCurrentImageIndex(0);
            cardAbove_TranslationX.value = -2 * WIDTH_SCREEN;
            cardAbove_TranslationY.value = -100;
            rotateCardAbove.value = '-15deg';

            cardAbove_TranslationX.value = withTiming(0, {
                duration: 600,
            });
            cardAbove_TranslationY.value = withTiming(0, {
                duration: 600,
            });
            rotateCardAbove.value = withTiming('0deg', {
                duration: 600,
            });
            scaleBellowBackground.value = withTiming(0.97, {
                duration: 300,
            })

            setTimeout(() => {
                isTakeBackCard.current = null;
                setReload(!reload);
            }, 600)
        }, 100);
    }

    const eventMoveHandler = useAnimatedGestureHandler({
        onStart: (event) => {
            if (event.y < heightCard.current / 2) { // nếu là phần trên
                isTouchAbove.value = true;
            } else {
                isTouchAbove.value = false;
            }
        },
        onActive: (event) => {
            cardAbove_TranslationX.value = event.translationX;
            cardAbove_TranslationY.value = event.translationY;

            if (isTouchAbove.value) {
                rotateCardAbove.value = Math.floor(event.translationX * 20 / WIDTH_SCREEN) + 'deg';
            } else {
                rotateCardAbove.value = -Math.floor(event.translationX * 20 / WIDTH_SCREEN) + 'deg';
            }

            let ratio = Math.abs(event.translationX / REACH_THRESHOLD * 0.5);
            if (ratio > 1) {
                ratio = 1;
            }
            if (event.translationX > 0) {
                favourite_borderWidth.value = 0 + ratio * (1 - 0);
                favourite_iconColor.value = 1 + ratio * (0 - 1);
                favourite_backgroundColor.value = 1 + ratio * (0 - 1);
                favourite_Scale.value = 0.85 + ratio * (1 - 0.85);
                opacityLikeIcon.value = 0 + ratio * (1 - 0);

                skip_borderWidth.value = withTiming(1);
                skip_iconColor.value = withTiming(0);
                skip_backgroundColor.value = withTiming(0);
                skip_Scale.value = withTiming(1);
                skip_TranslationY.value = 0 + ratio * (300 - 0);

                opacityNopeIcon.value = withTiming(0);

                leftButtons_TranslationY.value = 0 + ratio * (300 - 0);

                recover_Opacity.value = 1 + ratio * (0 - 1);
                chat_Opacity.value = 1 + ratio * (0 - 1);

            } else if (event.translationX < 0) {
                skip_borderWidth.value = 0 + ratio * (1 - 0);
                skip_iconColor.value = 1 + ratio * (0 - 1);
                skip_backgroundColor.value = 1 + ratio * (0 - 1);
                skip_Scale.value = 0.85 + ratio * (1 - 0.85);
                opacityNopeIcon.value = 0 + ratio * (1 - 0);

                favourite_borderWidth.value = withTiming(1);
                favourite_iconColor.value = withTiming(0);
                favourite_backgroundColor.value = withTiming(0);
                favourite_Scale.value = withTiming(1);
                favourite_TranslationY.value = 0 + ratio * (300 - 0);

                opacityLikeIcon.value = withTiming(0);

                leftButtons_TranslationY.value = 0 + ratio * (300 - 0);

                recover_Opacity.value = 1 + ratio * (0 - 1);
                chat_Opacity.value = 1 + ratio * (0 - 1);
            }
        },
        onEnd: (event) => {
            if (Math.abs(event.translationX) < REACH_THRESHOLD) {
                cardAbove_TranslationX.value = withTiming(0);
                cardAbove_TranslationY.value = withTiming(0);
                rotateCardAbove.value = withTiming('0deg');
            } else {
                if (event.translationX > 0) {
                    cardAbove_TranslationX.value = withTiming(2 * WIDTH_SCREEN, {
                        duration: 600,
                    });
                    runOnJS(handleClickFavouriteIcon)();
                } else {
                    cardAbove_TranslationX.value = withTiming(- 2 * WIDTH_SCREEN, {
                        duration: 600,
                    });
                    runOnJS(handleClickSkipIcon)();
                }
            }

            favourite_borderWidth.value = withTiming(1);
            favourite_iconColor.value = withTiming(0);
            favourite_backgroundColor.value = withTiming(0);
            favourite_Scale.value = withTiming(1);
            favourite_TranslationY.value = withTiming(0);

            skip_borderWidth.value = withTiming(1);
            skip_iconColor.value = withTiming(0);
            skip_backgroundColor.value = withTiming(0);
            skip_Scale.value = withTiming(1);
            skip_TranslationY.value = withTiming(0);

            opacityLikeIcon.value = withTiming(0);
            opacityNopeIcon.value = withTiming(0);

            leftButtons_TranslationY.value = withTiming(0);

            recover_Opacity.value = withTiming(1);
            chat_Opacity.value = withTiming(1);
        },
    });

    const uas_ImageBackground_Above = useAnimatedStyle(() => {
        return {
            transform: [
                { translateX: cardAbove_TranslationX.value },
                { translateY: cardAbove_TranslationY.value },
                { rotate: rotateCardAbove.value },
                { rotateY: rotateY.value },
            ],
        };
    });

    const uas_ImageBackground_Bellow = useAnimatedStyle(() => {
        return {
            width: widthCard.current * scaleBellowBackground.value,
            height: heightCard.current * scaleBellowBackground.value,
        };
    }, []);

    const onLayoutCard = (e) => {
        let height = e.nativeEvent.layout.height;
        let width = height * (2 / 3);
        if (width > (WIDTH_SCREEN - 40)) {
            width = WIDTH_SCREEN - 40;
            height = width * (3 / 2);
        }

        if (width !== widthCard.current || height !== heightCard.current) {
            widthCard.current = width;
            heightCard.current = height;
            setReload(!reload);
        }
    }

    const WithHOC = gestureHandlerRootHOC(() => { // phải bọc trong cái này thì mới move đc

        if (isLoading) {
            return (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#00444E' }} >
                    <CircleSnail
                        color={['white']}
                        size={40}
                        thickness={2}
                    />

                    <Text style={{ fontSize: 17, marginTop: 20, color: 'rgba(255,255,255,0.8)' }} >Đang tải dữ liệu...</Text>
                </View>
            )
        }
        // position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 
        return (
            <View style={styles.containerStyle} >

                {/* {
                    !imageLoaded && (
                        <View style={[styles.containerStyle, { zIndex: 2, width: WIDTH_CARDS, height: HEIGHT_CARDS, backgroundColor: 'rgba(0,0,0,0)', position: 'absolute', borderRadius: WIDTH_SCREEN * 0.05, flexDirection: 'row' }]}>
                            <CircleSnail color={['blue']} size={40} />
                        </View>
                    )
                } */}

                <View style={{ alignItems: 'flex-end', width: '100%', }} >
                    <TouchableOpacity
                        activeOpacity={0.7}
                        style={styles.filterStyle}
                        onPress={() => {
                            setShowFilterModal(true);
                        }}
                    >
                        <FilterIcon width={20.32} height={25.39} />
                    </TouchableOpacity>
                </View>

                <View
                    style={{ flex: 1, width: '100%', justifyContent: 'center', alignItems: 'center' }}
                    onLayout={onLayoutCard}
                >
                    <Animated.View style={[{ zIndex: 0, width: widthCard.current, height: heightCard.current, backgroundColor: 'rgba(0,0,0,0)', position: 'absolute' }, uas_ImageBackground_Bellow]}>
                        {
                            renderCardBellow()
                        }
                    </Animated.View>

                    <PanGestureHandler onGestureEvent={eventMoveHandler} >
                        <Animated.View style={[{ zIndex: 1, width: widthCard.current, height: heightCard.current, backgroundColor: 'rgba(0,0,0,0)', }, uas_ImageBackground_Above]}>
                            {
                                renderCardAbove()
                            }
                        </Animated.View>
                    </PanGestureHandler>
                </View>

                <View style={styles.buttonWrapper} >
                    <View style={styles.buttonWrapperInner} >
                        <TapGestureHandler onGestureEvent={onClickRecoverIcon} enabled={userIndex == 0 ? false : true}>
                            <Animated.View
                                style={[
                                    styles.itemLeftButtons,
                                    { borderColor: '#CBFE87', marginRight: 15, },
                                    uas_RecoverIcon,
                                ]}
                            >
                                <RecoverIcon width={26.41} height={26.41} />
                            </Animated.View>
                        </TapGestureHandler>

                        <TapGestureHandler onGestureEvent={onClickChatIcon}>
                            <Animated.View
                                style={[
                                    styles.itemLeftButtons,
                                    { borderColor: '#6EFFC5' },
                                    uas_ChatIcon,
                                ]}
                            >
                                <ChatIcon width={26.41} height={26.41} />
                            </Animated.View>
                        </TapGestureHandler>

                    </View>

                    <View style={styles.buttonWrapperInner} >
                        <TapGestureHandler onGestureEvent={onClickSkipIcon}>
                            <Animated.View
                                style={[
                                    styles.itemRightButtons,
                                    { borderColor: '#AEBCB9', marginRight: 15, },
                                    uas_SkipIcon,
                                ]}
                            >
                                <SkipIcon width={18.5} height={18.5} />
                            </Animated.View>
                        </TapGestureHandler>

                        <TapGestureHandler onGestureEvent={onClickFavouriteIcon}>
                            <Animated.View
                                style={[
                                    styles.itemRightButtons,
                                    { borderColor: '#FF84B1' },
                                    uas_FavouriteIcon,
                                ]}
                            >
                                <FavouriteIcon width={22.5} height={20} />
                            </Animated.View>
                        </TapGestureHandler>

                    </View>
                </View>

                <Modal
                    animationType="node"
                    visible={showFilter}
                    transparent={true}
                >
                    <Filter setShowFilterModal={setShowFilterModal} />
                </Modal>
            </View>
        )
    })

    return (
        <View style={{ flex: 1, }} >
            <WithHOC />
        </View>
    )
}

const styles = StyleSheet.create({
    containerStyle: {
        backgroundColor: '#00444E',
        flex: 1,
        alignItems: 'center',
    },
    backgroundStyle: {
        borderRadius: 20,
        borderColor: 'white',
        borderWidth: 2,
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'gray'
    },
    barsImageStyle: {
        width: '100%',
        height: 2,
        flexDirection: 'row',
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonStyle: {
        width: 50,
        height: 50,
        borderRadius: 50,
        borderColor: 'yellow',
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    filterStyle: {
        width: 40,
        height: 32,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(125,125,125,0.2)',
        borderRadius: 6,
        margin: 8,
        marginTop: 11,
        marginRight: 11,
    },
    buttonWrapper: {
        width: '100%',
        height: 55,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 50,
        marginBottom: 25,
        marginTop: 15,
        justifyContent: 'space-between'
    },
    buttonWrapperInner: {
        height: '100%',
        flexDirection: 'row',
        alignItems: 'center',
    },
    itemLeftButtons: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 13,
        borderWidth: 1,
        width: 42,
        height: 42,
    },
    itemRightButtons: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 55,
        borderWidth: 1,
        width: 55,
        height: 55,
    },
    inforWrapper: {
        width: '100%',
        height: '16%',
        backgroundColor: 'rgba(0,0,0,0.6)',
        borderBottomLeftRadius: 17,
        borderBottomRightRadius: 17,
        flexDirection: 'row',
        paddingHorizontal: '5%',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    nameStyle: {
        fontSize: 44,
        color: 'white',
        fontWeight: 'bold',
        letterSpacing: 1,
    },
    rightInforContent: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    ageStyle: {
        fontSize: 35,
        color: 'white',
        fontWeight: 'bold',
    },
    addressStyle: {
        fontSize: 15,
        color: 'white',
        fontWeight: '500',
    },
})