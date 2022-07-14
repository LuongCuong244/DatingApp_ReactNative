import React, { useState, useEffect, useRef } from "react";
import {
    View,
    StyleSheet,
    TouchableOpacity,
    Text,
    FlatList,
    Modal,
    Dimensions,
    ScrollView
} from 'react-native';

import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';
import MaskedView from '@react-native-masked-view/masked-view';
import { CircleSnail } from 'react-native-progress';

import { ListUsersLikedByMe } from "../DataTest";
import ArrowIcon from '../../assets/vectors/arrow-left-ios.svg';
import Filter from '../../src/components/Filter';

import UserProfile from '../screens/UserProfile';

import SameCountrysideIcon from '../../assets/vectors/Filter/countryside.svg';
import VerifiedIcon from '../../assets/vectors/Filter/verified.svg';
import RecentActiveIcon from '../../assets/vectors/Filter/recent-active.svg';

const WIDTH_SCREEN = Dimensions.get('window').width;
const HEIGHT_SCREEN = Dimensions.get('window').height;

const listOptions = [
    {
        icon: SameCountrysideIcon,
        label: "Cùng quê",
    },
    {
        icon: VerifiedIcon,
        label: "Đã xác thực",
    },
    {
        icon: RecentActiveIcon,
        label: "Hoạt động gần đây",
    },
]

export default QuickSearch = (props) => {

    const animDuration = useRef(300).current;

    const [data, setData] = useState();
    const [isScroll, setIsScroll] = useState(false);

    const [isLoading, setIsLoading] = useState(true);

    const [showFilter, setShowFilter] = useState(false);
    const [isShowModal, setShowModal] = useState(false);
    const [cloneCard, setCloneCard] = useState();
    const [filterBy, setFilterBy] = useState();

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

    useEffect(() => {
        setTimeout(() => {
            setData(ListUsersLikedByMe);
            setIsLoading(false);
        }, 1000);
    }, []);

    const setShowFilterModal = (isShow) => {
        setShowFilter(isShow);
    }

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

        if (!cloneCard.positionX || !cloneCard.positionY) {
            return;
        }

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
            setCloneCard(null);
            setShowModal(false);
        }, animDuration);
    }

    const handleGoBack = () => {
        props.navigation.goBack();
    }

    const renderFilterItem = ({ item, index }) => {
        const Icon = item.icon;
        const isFocus = item.label === filterBy;
        const color = isFocus ? '#1D553E' : '#BDBDBD';

        const onSelected = () => {
            setFilterBy(item.label)
        }

        return (
            <TouchableOpacity
                activeOpacity={0.7}
                onPress={onSelected}
                key={index}
            >
                <View
                    style={[
                        styles.filterByStyle,
                        {
                            backgroundColor: isFocus ? '#34B4FF' : 'rgba(0,0,0,0.15)',
                            borderWidth: isFocus ? 0 : 1,
                        }
                    ]}
                >
                    <Icon width={20} height={20} style={{ color }} />
                    <Text
                        style={[
                            styles.label,
                            {
                                color,
                                paddingHorizontal: 8,
                            }
                        ]}
                    >
                        {item.label}
                    </Text>
                </View>
            </TouchableOpacity>
        )
    }

    const renderCardItem = (item) => {
        return (
            <SmallCard
                {...item.item}
                widthFlatList={WIDTH_SCREEN}
                isScroll={isScroll}
                onPress={onPressCard}
            />
        )
    }

    const onScrollBeginDrag = () => {
        setIsScroll(true);
    }

    const onScrollEndDrag = () => {
        setIsScroll(false);
    }

    const Header = () => {
        return (
            <View
                style={styles.headerContainer}
            >
                <TouchableOpacity
                    activeOpacity={0.7}
                    style={styles.backButton}
                    onPress={handleGoBack}
                >
                    <ArrowIcon width={11} height={17} style={{ color: 'gray' }} />
                </TouchableOpacity>

                <View style={styles.headerTitleWrapper} >
                    <Text style={styles.headerTitle} >Tìm kiếm nhanh</Text>
                </View>
            </View>
        )
    }

    return (
        <View style={styles.screenStyle} >
            <Header />

            <View style={styles.scrollStyle} >
                <FlatList
                    data={listOptions}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    renderItem={renderFilterItem}
                />
            </View>

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
                        showsHorizontalScrollIndicator={false}
                        style={{ paddingHorizontal: 5, marginTop: 15, }}
                        renderItem={renderCardItem}
                        onScrollBeginDrag={onScrollBeginDrag}
                        onScrollEndDrag={onScrollEndDrag}
                        numColumns={2}
                    />
                )
            }

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
    screenStyle: {
        flex: 1,
        backgroundColor: '#00444E',
    },
    headerContainer: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
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
    scrollStyle: {
        paddingHorizontal: 8,
        paddingVertical: 12,
        borderBottomColor: 'rgba(255,255,255, 0.2)',
        borderBottomWidth: 1,
        borderTopColor: 'rgba(255,255,255,0.2)',
        borderTopWidth: 1,
        alignItems: 'center',
        flexDirection: 'row',
    },
    filterByStyle: {
        height: 30,
        borderRadius: 15,
        flexDirection: 'row',
        paddingLeft: 10,
        paddingRight: 2,
        alignItems: 'center',
        borderColor: 'rgba(255,255,255,0.5)',
        marginRight: 20,
    },
    label: {
        fontSize: 13,
        fontWeight: 'bold',
        color: '#BDBDBD'
    },
})