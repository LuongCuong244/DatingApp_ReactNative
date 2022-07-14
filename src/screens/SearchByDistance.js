import React, { useState, useEffect, useRef } from "react";
import {
    View,
    StyleSheet,
    TouchableOpacity,
    Text,
    FlatList,
    Image,
    Modal,
    Dimensions,
} from 'react-native';

import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';
import MaskedView from '@react-native-masked-view/masked-view';
import Geolocation from '@react-native-community/geolocation';

import { getDistance, convertDistance } from 'geolib';

import { ListUserNearMe } from "../DataTest";
import ArrowIcon from '../../assets/vectors/arrow-left-ios.svg';
import FilterIcon from '../../assets/vectors/filter-icon.svg';
import Filter from '../../src/components/Filter';

import RoundCard from "../components/RoundCard";
import UserProfile from '../screens/UserProfile';
import { CircleSnail } from "react-native-progress";

const WIDTH_SCREEN = Dimensions.get('window').width;
const HEIGHT_SCREEN = Dimensions.get('window').height;

export default SearchByDistance = (props) => {

    const animDuration = useRef(300).current;

    const [data, setData] = useState();
    const [isScroll, setIsScroll] = useState(false);

    const [isLoading, setIsLoading] = useState(true);

    const [showFilter, setShowFilter] = useState(false);
    const [isShowModal, setShowModal] = useState(false);
    const [cloneCard, setCloneCard] = useState();

    const translationX = useSharedValue(0);
    const translationY = useSharedValue(0);
    const scaleX = useSharedValue(1);
    const scaleY = useSharedValue(1);
    const opacity = useSharedValue(1);

    const borderRadius = useSharedValue(0);

    const translationX_UserProfile = useSharedValue(0);
    const translationY_UserProfile = useSharedValue(0);
    const scaleX_UserProfile = useSharedValue(1);
    const scaleY_UserProfile = useSharedValue(1);
    const opacity_UserProfile = useSharedValue(1);

    const scaleX_Mask = useSharedValue(1);
    const scaleY_Mask = useSharedValue(1);

    useEffect(() => {

        ListUserNearMe.forEach((item) => {

            item.distance = 0;

            Geolocation.getCurrentPosition((position) => {
                item.distance = getDistance(position.coords, {
                    latitude: item.latitude,
                    longitude: item.longitude,
                });
            });
        });

        setTimeout(() => {
            setData(ListUserNearMe);
            setIsLoading(false);
        }, 2000);
    }, []);

    const setShowFilterModal = (isShow) => {
        setShowFilter(isShow);
    }

    const uas_Mask = useAnimatedStyle(() => {
        return {
            borderRadius: borderRadius.value,
            transform: [
                {
                    translateX: translationX.value - (HEIGHT_SCREEN - WIDTH_SCREEN) / 2,  // (HEIGHT_SCREEN - WIDTH_SCREEN)/2 là để cho mask ở chính giữa màn hình. ( Vì mask là hình vuông cạnh HEIGHT_SCREEN )
                },
                {
                    translateY: translationY.value,
                },
                {
                    scaleX: scaleX_Mask.value,
                },
                {
                    scaleY: scaleY_Mask.value,
                },
            ]
        }
    })

    const uas_BorderRadius = useAnimatedStyle(() => {
        return {
            borderRadius: borderRadius.value,
        }
    })

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

        if (!cloneCard.positionX || !cloneCard.positionY) {
            return;
        }

        translationX.value = cloneCard.positionX - (WIDTH_SCREEN - cloneCard.size) / 2;
        translationY.value = cloneCard.positionY - (HEIGHT_SCREEN - 45 - cloneCard.size) / 2 - 45 / 2;  // 45 là chiều cao của Header
        scaleX.value = 1;
        scaleY.value = 1;
        opacity.value = 1;

        translationX_UserProfile.value = cloneCard.positionX - (WIDTH_SCREEN - cloneCard.size) / 2;
        translationY_UserProfile.value = cloneCard.positionY - (HEIGHT_SCREEN - 45 - cloneCard.size) / 2 - 45 / 2;  // 45 là chiều cao của Header
        scaleX_UserProfile.value = cloneCard.size / WIDTH_SCREEN;
        scaleY_UserProfile.value = cloneCard.size / HEIGHT_SCREEN;
        opacity_UserProfile.value = 0;

        scaleX_Mask.value = cloneCard.size / HEIGHT_SCREEN;
        scaleY_Mask.value = cloneCard.size / HEIGHT_SCREEN;

        borderRadius.value = HEIGHT_SCREEN / 2;

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
        scaleX.value = withTiming(WIDTH_SCREEN / cloneCard.size, { duration: animDuration });
        scaleY.value = withTiming(HEIGHT_SCREEN / cloneCard.size, { duration: animDuration });
        opacity.value = withTiming(1, { duration: animDuration });

        scaleX_Mask.value = withTiming(WIDTH_SCREEN / HEIGHT_SCREEN, { duration: animDuration });
        scaleY_Mask.value = withTiming(1, { duration: animDuration });
    }

    const onBack = async () => {

        translationX.value = withTiming(cloneCard.positionX - (WIDTH_SCREEN - cloneCard.size) / 2, { duration: animDuration });
        translationY.value = withTiming(cloneCard.positionY - (HEIGHT_SCREEN - 45 - cloneCard.size) / 2 - 45 / 2, { duration: animDuration });  // 45 là chiều cao của Header
        scaleX.value = withTiming(1, { duration: animDuration });
        scaleY.value = withTiming(1, { duration: animDuration });
        opacity.value = withTiming(1, { duration: animDuration });

        borderRadius.value = withTiming(HEIGHT_SCREEN / 2, { duration: animDuration });

        translationX_UserProfile.value = withTiming(cloneCard.positionX - (WIDTH_SCREEN - cloneCard.size) / 2, { duration: animDuration });
        translationY_UserProfile.value = withTiming(cloneCard.positionY - (HEIGHT_SCREEN - 45 - cloneCard.size) / 2 - 45 / 2, { duration: animDuration });  // 45 là chiều cao của Header
        scaleX_UserProfile.value = withTiming(cloneCard.size / WIDTH_SCREEN, { duration: animDuration });
        scaleY_UserProfile.value = withTiming(cloneCard.size / HEIGHT_SCREEN, { duration: animDuration });
        opacity_UserProfile.value = withTiming(0, { duration: animDuration });

        scaleX_Mask.value = withTiming(cloneCard.size / HEIGHT_SCREEN, { duration: animDuration });
        scaleY_Mask.value = withTiming(cloneCard.size / HEIGHT_SCREEN, { duration: animDuration });

        setTimeout(() => {
            setShowModal(false);
            setCloneCard(null);
        }, animDuration)
    }

    const Header = () => {
        return (
            <View
                style={styles.headerContainer}
            >
                <TouchableOpacity
                    activeOpacity={0.7}
                    style={styles.backButton}
                    onPress={() => {
                        props.navigation.goBack();
                    }}
                >
                    <ArrowIcon width={11} height={17} style={{ color: 'gray' }} />
                </TouchableOpacity>

                <View style={styles.headerTitleWrapper} >
                    <Text style={styles.headerTitle} >Gần bạn</Text>
                </View>

                <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => {
                        setShowFilterModal(true);
                    }}
                >
                    <FilterIcon width={24.38} height={30.46} />
                </TouchableOpacity>
            </View>
        )
    }

    const renderItem = (item) => {
        return (
            <RoundCard
                {...item.item}
                middle={item.index % 3 === 1}
                onPress={onPressCard}
                isScroll={isScroll}
            />
        )
    }

    const onScrollBeginDrag = () => {
        setIsScroll(true);
    }

    const onScrollEndDrag = () => {
        setIsScroll(false);
    }

    return (
        <View style={styles.screenStyle} >
            <Header />

            {
                isLoading ? (
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
                        <CircleSnail
                            color={['white']}
                            size={40}
                        />
                    </View>
                ) : (
                    <FlatList
                        data={data}
                        style={{ flex: 1, paddingHorizontal: 5, marginTop: 15 }}
                        renderItem={renderItem}
                        onScrollBeginDrag={onScrollBeginDrag}
                        onScrollEndDrag={onScrollEndDrag}
                        numColumns={3}
                    />
                )
            }

            <Modal
                transparent
                visible={isShowModal}
            >
                <MaskedView
                    style={StyleSheet.absoluteFill}
                    androidRenderingMode='software' // this line can enable anim in maskElement but reduce performance ( https://github.com/react-native-masked-view/masked-view/pull/127 )
                    maskElement={
                        <Animated.View
                            style={[
                                {
                                    ...StyleSheet.absoluteFillObject,
                                    backgroundColor: "black",
                                    width: HEIGHT_SCREEN,
                                    height: HEIGHT_SCREEN,
                                },
                                uas_Mask,
                                uas_BorderRadius,
                            ]}
                        ></Animated.View>
                    }
                >
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
                                <Animated.Image
                                    style={[
                                        {
                                            width: cloneCard.size,
                                            height: cloneCard.size,
                                            borderWidth: 1,
                                            borderColor: '#006A69',
                                            //borderRadius: cloneCard.size / 2,
                                        },
                                    ]}
                                    source={{ uri: cloneCard.photo }}
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
                </MaskedView>
            </Modal>

            <Modal
                animationType="node"
                visible={showFilter}
                transparent={true}
            >
                <Filter
                    setShowFilterModal={setShowFilterModal}
                    isFilterByDistance
                    minValue={0}
                    maxValue={100}
                />
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    screenStyle: {
        flex: 1,
        backgroundColor: '#00444E',
    },
    headerContainer: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 15,
        paddingHorizontal: 15,
        height: 45
    },
    backButton: {
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
        backgroundColor: 'white',
    },
    headerTitleWrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 20,
        color: '#fff',
        fontWeight: '500',
        letterSpacing: 1,
    },
})