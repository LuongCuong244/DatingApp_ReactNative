import React, { useEffect, useState, useRef } from "react";
import {
    Dimensions,
    View,
    StyleSheet,
    Animated,
    TouchableOpacity,
    Text,
    ScrollView
} from 'react-native';

import MultiSlider from "./Slider/MultiSlider";

import CloseIcon from '../../assets/vectors/Filter/close.svg';
import ConfirmIcon from '../../assets/vectors/Filter/confirm.svg';

import SameCountrysideIcon from '../../assets/vectors/Filter/countryside.svg';
import VerifiedIcon from '../../assets/vectors/Filter/verified.svg';
import RecentActiveIcon from '../../assets/vectors/Filter/recent-active.svg';

const WIDTH_SCREEN = Dimensions.get('window').width;

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

const listGenders = [
    {
        key: 'male',
        label: 'Nam',
    },
    {
        key: 'female',
        label: 'Nữ',
    },
    {
        key: 'lgbt',
        label: 'LGBT',
    },
]

export default function Filter({ minValue = 18, maxValue = 80, setShowFilterModal, isFilterByDistance = false }) {

    const [filterBy, setFilterBy] = useState();
    const [gender, setGender] = useState();
    const [minAge, setMinAge] = useState(minValue);
    const [maxAge, setMaxAge] = useState(30);

    const slideAnim = useRef(new Animated.Value(300)).current;
    const opacityAnim = useRef(new Animated.Value(0)).current;

    const slideUp = () => {
        Animated.timing(slideAnim, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
        }).start();

        Animated.timing(opacityAnim, {
            toValue: 1,
            duration: 200,
            useNativeDriver: true,
        }).start();
    };

    const slideDown = () => {
        Animated.timing(slideAnim, {
            toValue: 300,
            duration: 200,
            useNativeDriver: true,
        }).start(() => {
            setShowFilterModal(false);
        });

        Animated.timing(opacityAnim, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
        }).start();
    };

    const onValuesChange = (values) => {
        setMinAge(values[0]);
        setMaxAge(values[1]);
    }

    useEffect(() => {
        slideUp();
    }, []);

    return (
        <Animated.View
            style={[
                styles.container,
                {
                    opacity: opacityAnim,
                }
            ]}
        >
            <TouchableOpacity
                style={{ flex: 1 }}
                onPress={slideDown}
            />

            <Animated.View
                style={[
                    styles.contentWrapper,
                    {
                        transform: [
                            {
                                translateY: slideAnim,
                            }
                        ]
                    }
                ]}
            >
                <View style={styles.header} >
                    <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={slideDown}
                    >
                        <CloseIcon width={32} height={32} />
                    </TouchableOpacity>

                    <Text style={styles.headerTitle} >Bộ lọc</Text>

                    <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={slideDown}
                    >
                        <ConfirmIcon width={32} height={32} />
                    </TouchableOpacity>
                </View>

                {
                    isFilterByDistance == false && (
                        <ScrollView
                            horizontal={true}
                        >
                            <View style={styles.scrollStyle} >
                                {
                                    listOptions.map((item, index) => {

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
                                    })
                                }
                            </View>
                        </ScrollView>
                    )
                }

                <Text
                    style={[
                        styles.label,
                        {
                            marginTop: 8,
                        }
                    ]}
                >Giới tính:</Text>

                <View style={styles.genderOptions} >
                    {
                        listGenders.map((item, index) => {

                            const buttonStyle = item.key === gender ? {
                                backgroundColor: '#34B4FF',
                                borderRadius: 8,
                                width: 110,
                                height: 30,
                                justifyContent: 'center',
                                alignItems: 'center',
                            } : {
                                backgroundColor: 'rgba(0,0,0,0.15)',
                                borderWidth: 1,
                                borderColor: 'rgba(255,255,255,0.5)',
                                borderRadius: 8,
                                width: 110,
                                height: 30,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }

                            const labelStyle = item.key === gender ? {
                                fontSize: 15,
                                fontWeight: '500',
                                color: '#164D37',
                            } : {
                                fontSize: 15,
                                fontWeight: 'bold',
                                color: '#fff',
                            }

                            const onSelected = () => {
                                setGender(item.key);
                            }

                            return (
                                <TouchableOpacity
                                    activeOpacity={0.7}
                                    style={buttonStyle}
                                    onPress={onSelected}
                                    key={index}
                                >
                                    <Text style={labelStyle} >{item.label}</Text>
                                </TouchableOpacity>
                            )
                        })
                    }
                </View>

                <Text
                    style={[
                        styles.label,
                        {
                            marginTop: 8,
                        }
                    ]}
                >{isFilterByDistance ? 'Khoảng cách: (km)' : 'Tuổi:'}</Text>

                <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', height: 50, }} >
                    <MultiSlider
                        sliderLength={WIDTH_SCREEN * 0.85}
                        values={[minAge, maxAge]}
                        min={minValue}
                        max={maxValue}
                        onValuesChange={onValuesChange}
                    />
                </View>

            </Animated.View>
        </Animated.View >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.4)',
        justifyContent: 'flex-end'
    },
    contentWrapper: {
        width: '100%',
        paddingHorizontal: 10,
        paddingBottom: 30,
        backgroundColor: '#2A5458',
    },
    header: {
        flexDirection: 'row',
        height: 50,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    headerTitle: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    },
    scrollStyle: {
        paddingHorizontal: 8,
        paddingVertical: 16,
        flexDirection: 'row',
        borderBottomColor: 'rgba(255,255,255, 0.2)',
        borderBottomWidth: 1,
        borderTopColor: 'rgba(255,255,255,0.2)',
        borderTopWidth: 1,
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
    genderOptions: {
        flexDirection: 'row',
        marginVertical: 14,
        justifyContent: 'space-between'
    },
})