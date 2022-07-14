import React, { useEffect, useRef, useState } from 'react';
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    Modal,
    FlatList,
    Dimensions,
} from 'react-native';

import Animated, {
    runOnJS,
    useAnimatedGestureHandler,
    useAnimatedStyle,
    useSharedValue,
    interpolateColor,
    withTiming,
} from 'react-native-reanimated';

import {
    TapGestureHandler
} from 'react-native-gesture-handler';

import { CircleSnail } from 'react-native-progress';

import FilterIcon from '../../../assets/vectors/filter-icon.svg';
import Filter from '../../components/Filter';
import LikedIcon from '../../../assets/vectors/liked.svg';
import BeLikedIcon from '../../../assets/vectors/favourite.svg';
import { ListUsersLikedByMe, ListUsersLikedMe } from '../../DataTest';

import SmallCard from '../../components/SmallCard';
import UserProfile from '../UserProfile';
import MaskedView from '@react-native-masked-view/masked-view';

const WIDTH_SCREEN = Dimensions.get('window').width;
const HEIGHT_SCREEN = Dimensions.get('window').height;

export default function FavouriteTab(props) {

    const animDuration = useRef(300).current;
    //const refList = useRef();

    const [data, setData] = useState();
    const [optionSelecting, setOptionSelecting] = useState("beLiked");
    const [headerTitle, setHeaderTitle] = useState();
    const [showFilter, setShowFilter] = useState(false);
    const [widthFlatList, setWidthFlatList] = useState(0);
    const [isScroll, setIsScroll] = useState(false);

    const [isLoading, setIsLoading] = useState(true);

    const beLikedOption_BackgroundColor = useSharedValue(0);
    const beLikedOption_BorderRadius = useSharedValue(30);
    const beLikeOption_BorderWidth = useSharedValue(3);

    const likedOption_BackgroundColor = useSharedValue(1);
    const likedOption_BorderRadius = useSharedValue(10);
    const likeOption_BorderWidth = useSharedValue(0);

    const [isShowModal, setShowModal] = useState(false);
    const [cloneCard, setCloneCard] = useState();

    const translationX = useSharedValue(0);
    const translationY = useSharedValue(0);
    const scaleX = useSharedValue(1);
    const scaleY = useSharedValue(1);
    const opacity = useSharedValue(1);

    const borderRadius = useSharedValue();

    const translationX_UserProfile = useSharedValue(0);
    const translationY_UserProfile = useSharedValue(0);
    const scaleX_UserProfile = useSharedValue(1);
    const scaleY_UserProfile = useSharedValue(1);
    const opacity_UserProfile = useSharedValue(1);

    const setShowFilterModal = (isShow) => {
        setShowFilter(isShow);
    }

    useEffect(() => {
        loadDataFromServer('beLiked');
    }, [])

    const loadDataFromServer = (optionSelecting) => {

        setIsLoading(true);

        switch (optionSelecting) {
            case "liked": {
                setHeaderTitle("Tôi đã thích ( ? )");

                setTimeout(() => {
                    setHeaderTitle("Tôi đã thích ( " + ListUsersLikedByMe.length + " )");
                    setData(ListUsersLikedByMe);
                    setIsLoading(false);
                }, 1000);
                break;
            }
            case "beLiked": {
                setHeaderTitle("Đã thích tôi ( ? )");

                setTimeout(() => {
                    setHeaderTitle("Đã thích tôi ( " + ListUsersLikedMe.length + " )");
                    setData(ListUsersLikedMe);
                    setIsLoading(false);
                }, 2000);
                break;
            }
        }
    }

    const handleClickBeLiked = () => {
        setData(null);
        setOptionSelecting('beLiked');
        loadDataFromServer('beLiked');
    }

    const onClickBeLiked = useAnimatedGestureHandler({
        onFinish: () => {

            beLikedOption_BackgroundColor.value = withTiming(0);
            beLikedOption_BorderRadius.value = withTiming(30);
            beLikeOption_BorderWidth.value = withTiming(3);

            likedOption_BackgroundColor.value = withTiming(1);
            likedOption_BorderRadius.value = withTiming(10);
            likeOption_BorderWidth.value = withTiming(0);

            runOnJS(handleClickBeLiked)();
        }
    });

    const handleClickLiked = () => {
        setData(null);
        setOptionSelecting('liked');
        loadDataFromServer('liked');
    }

    const onClickLiked = useAnimatedGestureHandler({
        onFinish: () => {

            likedOption_BackgroundColor.value = withTiming(0);
            likedOption_BorderRadius.value = withTiming(30);
            likeOption_BorderWidth.value = withTiming(3);

            beLikedOption_BackgroundColor.value = withTiming(1);
            beLikedOption_BorderRadius.value = withTiming(10);
            beLikeOption_BorderWidth.value = withTiming(0);

            runOnJS(handleClickLiked)();
        }
    });

    const uas_BeLiked = useAnimatedStyle(() => {
        return {
            backgroundColor: interpolateColor(beLikedOption_BackgroundColor.value, [0, 1], ['#706DC3', '#40646A']),
            borderRadius: beLikedOption_BorderRadius.value,
            borderWidth: beLikeOption_BorderWidth.value,
        }
    });

    const uas_Liked = useAnimatedStyle(() => {
        return {
            backgroundColor: interpolateColor(likedOption_BackgroundColor.value, [0, 1], ['#706DC3', '#40646A']),
            borderRadius: likedOption_BorderRadius.value,
            borderWidth: likeOption_BorderWidth.value,
        }
    });

    // const uas_Mask = useAnimatedStyle(() => {
    //     return {
    //         borderRadius: (borderRadius.value / scaleX_UserProfile.value) * 2 || 0,
    //         transform: [
    //             {
    //                 translateX: translationX.value,
    //             },
    //             {
    //                 translateY: translationY.value,
    //             },
    //             {
    //                 scaleX: scaleX_UserProfile.value,
    //             },
    //             {
    //                 scaleY: scaleY_UserProfile.value,
    //             }
    //         ]
    //     }
    // })

    const uas_SwitchScreen = useAnimatedStyle(() => {
        return {
            opacity: opacity.value,
            transform: [
                {
                    translateX: translationX.value,
                },
                {
                    translateY: translationY.value, // 45 là chiều cao của Header
                },
                {
                    scaleX: scaleX.value,
                },
                {
                    scaleY: scaleY.value,
                }
            ]
        }
    })

    const uas_UserProfile = useAnimatedStyle(() => {
        return {
            opacity: opacity_UserProfile.value,
            transform: [
                {
                    translateX: translationX_UserProfile.value,
                },
                {
                    translateY: translationY_UserProfile.value,
                },
                {
                    scaleX: scaleX_UserProfile.value,
                },
                {
                    scaleY: scaleY_UserProfile.value,
                }
            ]
        }
    })

    const onPressCard = async (cloneCard) => {
        translationX.value = cloneCard.positionX - (WIDTH_SCREEN - cloneCard.width) / 2;
        translationY.value = cloneCard.positionY - (HEIGHT_SCREEN - 45 - cloneCard.height) / 2 - 45 / 2;  // 45 là chiều cao của Header
        scaleX.value = 1;
        scaleY.value = 1;
        opacity.value = 1;

        translationX_UserProfile.value = cloneCard.positionX - (WIDTH_SCREEN - cloneCard.width) / 2;
        translationY_UserProfile.value = cloneCard.positionY - (HEIGHT_SCREEN - 45 - cloneCard.height) / 2 - 45 / 4;  // 45 là chiều cao của Header
        scaleX_UserProfile.value = (cloneCard.width - 20) / WIDTH_SCREEN;
        scaleY_UserProfile.value = ((cloneCard.width - 20) * 1.5) / (HEIGHT_SCREEN - 24);
        opacity_UserProfile.value = 0;

        borderRadius.value = cloneCard.borderRadius;

        await setCloneCard(cloneCard);
        await setShowModal(true);

        scaleX_UserProfile.value = withTiming(1, { duration: animDuration });
        scaleY_UserProfile.value = withTiming(1, { duration: animDuration });
        translationX_UserProfile.value = withTiming(0, { duration: animDuration });
        translationY_UserProfile.value = withTiming(0, { duration: animDuration });
        opacity_UserProfile.value = withTiming(1, { duration: animDuration });

        borderRadius.value = withTiming(0, { duration: animDuration });

        translationX.value = withTiming(0, { duration: animDuration });
        translationY.value = withTiming(0, { duration: animDuration });
        scaleX.value = withTiming(WIDTH_SCREEN / (cloneCard.width - 30), { duration: animDuration });
        scaleY.value = withTiming(HEIGHT_SCREEN / (cloneCard.height - 30), { duration: animDuration });
        opacity.value = withTiming(0, { duration: animDuration });
    }

    const onBack = async () => {

        translationX.value = withTiming(cloneCard.positionX - (WIDTH_SCREEN - cloneCard.width) / 2, { duration: animDuration });
        translationY.value = withTiming(cloneCard.positionY - (HEIGHT_SCREEN - 45 - cloneCard.height) / 2 - 45 / 2, { duration: animDuration });  // 45 là chiều cao của Header
        scaleX.value = withTiming(1, { duration: animDuration });
        scaleY.value = withTiming(1, { duration: animDuration });
        opacity.value = withTiming(1, { duration: animDuration });

        borderRadius.value = withTiming(cloneCard.borderRadius, { duration: animDuration });

        translationX_UserProfile.value = withTiming(cloneCard.positionX - (WIDTH_SCREEN - cloneCard.width) / 2, { duration: animDuration });
        translationY_UserProfile.value = withTiming(cloneCard.positionY - (HEIGHT_SCREEN - 45 - cloneCard.height) / 2 - 45 / 2, { duration: animDuration });  // 45 là chiều cao của Header
        scaleX_UserProfile.value = withTiming((cloneCard.width - 20) / WIDTH_SCREEN, { duration: animDuration });
        scaleY_UserProfile.value = withTiming(((cloneCard.width - 20) * 1.5) / (HEIGHT_SCREEN - 24), { duration: animDuration });
        opacity_UserProfile.value = withTiming(0, { duration: animDuration });

        setTimeout(() => {
            setShowModal(false);
            setCloneCard(null);
        }, animDuration);
    }

    // const setRefList = (ref) => {
    //     refList.current = ref;
    // }

    // const onScrollToIndex = (itemIndex) => {
    //     if (refList.current) {
    //         refList.current.scrollToIndex({
    //             index: Math.floor(itemIndex / 2), // chia 2 vì có 2 cột
    //             viewPosition: 0.5,
    //             animated: false
    //         })
    //     }
    // }

    const onClickFilterIcon = () => {
        setShowFilterModal(true);
    }

    const onLayouFlatlist = (event) => {
        if (borderRadius.value == null) {
            borderRadius.value = 13 * (event.nativeEvent.layout.width / 2 - 30) / 130;
        }
        setWidthFlatList(event.nativeEvent.layout.width);
    }

    const onScrollBeginDrag = () => {
        setIsScroll(true);
    }

    const onScrollEndDrag = () => {
        setIsScroll(false);
    }

    const renderItem = (item) => {

        if (widthFlatList <= 0) {
            return null;
        }

        return (
            <SmallCard
                {...item.item}
                //index={item.index}
                widthFlatList={widthFlatList}
                isScroll={isScroll}
                onPress={onPressCard}
            //onScrollToIndex={onScrollToIndex}
            />
        )
    }

    return (
        <View style={styles.containerStyle} >
            <View style={styles.optionsWrapper} >

                <TapGestureHandler onGestureEvent={onClickBeLiked} >
                    <Animated.View
                        style={[
                            styles.optionsItem,
                            uas_BeLiked
                        ]}
                    >
                        <BeLikedIcon height={25} width={25} style={{ color: optionSelecting === "beLiked" ? '#F779A2' : '#588289' }} />
                    </Animated.View>
                </TapGestureHandler>

                <TapGestureHandler onGestureEvent={onClickLiked} >
                    <Animated.View
                        style={[
                            styles.optionsItem,
                            uas_Liked
                        ]}
                    >
                        <LikedIcon height={25} width={25} style={{ color: optionSelecting === "liked" ? '#F779A2' : '#588289' }} />
                    </Animated.View>
                </TapGestureHandler>
            </View>

            <View style={styles.contentContainer} >
                <View style={styles.headerContent} >
                    <Text style={styles.headerTitle} >{headerTitle}</Text>
                    <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={onClickFilterIcon}
                    >
                        <FilterIcon width={20.32} height={25.39} />
                    </TouchableOpacity>
                </View>

                {
                    isLoading ? (
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
                            <CircleSnail
                                color={['white']}
                                size={40}
                                thickness={2}
                            />
                        </View>
                    ) : (
                        <FlatList
                            data={data}
                            onLayout={onLayouFlatlist}
                            onScrollBeginDrag={onScrollBeginDrag}
                            onScrollEndDrag={onScrollEndDrag}
                            contentContainerStyle={styles.scrollStyle}
                            numColumns={2}
                            //ref={setRefList}
                            renderItem={renderItem}
                        />
                    )
                }
            </View>

            <Modal
                animationType="node"
                visible={showFilter}
                transparent={true}
            >
                <Filter setShowFilterModal={setShowFilterModal} />
            </Modal>

            <Modal
                transparent
                visible={isShowModal}
            >
                {/* <MaskedView
                    style={StyleSheet.absoluteFill}
                    androidRenderingMode='software' // this line can enable anim in maskElement but reduce performance ( https://github.com/react-native-masked-view/masked-view/pull/127 )
                    maskElement={
                        <Animated.View
                            style={[
                                {
                                    ...StyleSheet.absoluteFillObject,
                                    backgroundColor: "black",
                                    width: undefined,
                                    height: undefined,
                                },
                                uas_Mask
                            ]}
                        ></Animated.View>
                    }
                >
                    
                </MaskedView> */}
                {
                    cloneCard && (
                        <Animated.View
                            style={[{
                                position: 'absolute',
                                top: 0,
                                bottom: 0,
                                left: 0,
                                right: 0,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }, uas_SwitchScreen]}
                        >
                            <SmallCard
                                {...cloneCard}
                            //radius={0}
                            />
                        </Animated.View>
                    )
                }

                <Animated.View
                    style={[{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }, uas_UserProfile]}
                >
                    <UserProfile
                        navigation={props.navigation}
                        onBack={onBack}
                    ></UserProfile>
                </Animated.View>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    containerStyle: {
        backgroundColor: '#00444E',
        flex: 1,
        flexDirection: 'row',
        paddingVertical: 10,
    },
    optionsWrapper: {
        paddingHorizontal: 10,
        marginTop: 42,
    },
    optionsItem: {
        width: 55,
        height: 55,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        borderColor: '#FE94D9'
    },
    contentContainer: {
        flex: 1,
        marginVertical: 5,
        marginRight: 10,
        borderRadius: 20,
        backgroundColor: 'rgba(84,167,170,0.3)',
    },
    headerContent: {
        width: '100%',
        height: 42,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        backgroundColor: 'rgba(108,196,198,0.3)',
    },
    headerTitle: {
        fontSize: 19,
        fontWeight: 'bold',
        letterSpacing: 1,
        color: 'white',
    },
    scrollStyle: {
        flexGrow: 1,
        padding: 10,
    },
    backgroundOfCard: {
        borderWidth: 1,
        borderColor: 'white',
        backgroundColor: 'rgba(255,255,255,0.5)',
    },
    inforWrapper: {
        height: 42,
        width: '100%',
        backgroundColor: 'rgba(0,0,0,0.6)',
        alignItems: 'center',
    },
    nameLabel: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
        letterSpacing: 0.5,
    },
    addressLabel: {
        fontSize: 11,
        color: 'rgba(255,255,255,0.7)',
        letterSpacing: 0.5
    }
})

