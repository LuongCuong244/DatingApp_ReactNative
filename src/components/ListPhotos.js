import React, { useRef, useState, useEffect } from "react";
import { View, StyleSheet, TouchableOpacity, Image, Modal, Alert } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import PhotoIcon from '../../assets/vectors/photo-icon.svg';
import ActionSheet from "@alessiocancian/react-native-actionsheet";
import ImagePicker from "react-native-image-crop-picker";
import DisplayImageFullScreen from "../components/DisplayImageFullScreen";
import { listPhotos } from "../data/CurrentUser";

export default ListPhotos = ({ userId }) => {

    const PhotoActionSheet = useRef();
    const [data, setData] = useState([]);
    const [showImageFullScreen, setShowImageFullScreen] = useState(false);
    const [indexClick, setIndexClick] = useState();
    const [widthOfList, setWidthOfList] = useState(200);

    useEffect(() => {
        // get list photos base on userId
        setData(listPhotos);
    },[]);

    const showPhotoActionSheet = () => {
        if(PhotoActionSheet.current){
            PhotoActionSheet.current.show();
        }
    }

    const pickPhoto = (index) => {
        ImagePicker.openPicker({
            cropping: true,
            width: 400,
            height: 600,
            multiple: false,
        })
            .then(image => {
                let array = new Array(...data);
                console.log(index);
                array[index] = image.path;
                setData(array);
            })
            .catch(err => console.log(err))
    }

    const onGetLayout = (e) => {
        setWidthOfList(e.nativeEvent.layout.width);
    }

    const onClickedActionSheet = (index) => {
        switch (index) {
            case 0: {
                pickPhoto(indexClick);
                break;
            }
            case 1: {
                if (data[indexClick]) {
                    let array = [...data];
                    array[indexClick] = null;
                    setData(array);
                } else {
                    Alert.alert(null, "Bạn chưa thêm ảnh vào ô này !");
                }
                break;
            }
            case 2: {
                if (data[indexClick]) {
                    setShowImageFullScreen(true);
                } else {
                    Alert.alert(null, "Bạn chưa thêm ảnh vào ô này !");
                }
                break;
            }
        }
    }

    const onExitModal = () => {
        setShowImageFullScreen(false);
    }

    return (
        <View style={{ width: '100%' }} >
            <View
                style={styles.photosGroupStyle}
                onLayout={onGetLayout}
            >
                {
                    data.map((path, index) => {

                        const onClickedPhoto = async () => {
                            await setIndexClick(index);
                            showPhotoActionSheet();
                        }

                        return (
                            <TouchableOpacity
                                key={index}
                                activeOpacity={0.7}
                                onPress={onClickedPhoto}
                            >
                                <LinearGradient
                                    style={[
                                        styles.photoItem,
                                        { marginHorizontal: widthOfList * (6 / 360) },
                                        { width: widthOfList * (50 / 360), height: widthOfList * (150 / 720) },
                                        index == 0 && { marginLeft: 0 },
                                        index == 5 && { marginRight: 0 }
                                    ]}
                                    colors={['#9CC4C5', 'rgba(121,169,189,0.7)']}
                                >
                                    {
                                        path ? (
                                            <Image
                                                style={{ flex: 1, width: '100%', height: '100%', borderRadius: 7 }}
                                                source={{ uri: path }}
                                            />
                                        ) : (
                                            <PhotoIcon width={27} height={27} />
                                        )
                                    }
                                </LinearGradient>
                            </TouchableOpacity>
                        )
                    })
                }
            </View>

            <ActionSheet
                ref={o => PhotoActionSheet.current = o}
                title={'Bạn muốn làm gì ?'}
                options={data[indexClick] ? ['Thay thế ảnh', 'Xóa ảnh', 'Xem ảnh', 'Hủy'] : ['Thêm ảnh', 'Xóa ảnh', 'Xem ảnh', 'Hủy']}
                cancelButtonIndex={3}
                destructiveButtonIndex={1}
                onPress={onClickedActionSheet}
            />

            <Modal
                animationType="slide"
                visible={showImageFullScreen}
            >
                <DisplayImageFullScreen
                    image={{
                        width: 400,
                        height: 600,
                        uri: data[indexClick]
                    }}
                    onExit={onExitModal}
                />
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
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
})