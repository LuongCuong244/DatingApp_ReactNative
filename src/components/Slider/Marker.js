import React from 'react';
import { View, StyleSheet, Platform, TouchableHighlight } from 'react-native';

const sliderRadius = 3;
const width = 50;
export default class Marker extends React.Component {

  render() {
    return (
      <View
        style={[
          styles.markerStyle,
          this.props.pressed && styles.pressedMarkerStyle,
        ]}
      />
    );
  }
}

const styles = StyleSheet.create({
  markerStyle: {
    ...Platform.select({
      ios: {
        height: 20,
        width: 20,
        borderRadius: 30,
        borderWidth: 1,
        borderColor: '#DDDDDD',
        backgroundColor: '#FFFFFF',
        shadowColor: '#000000',
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowRadius: 1,
        shadowOpacity: 0.2,
      },
      android: {
        height: 18,
        width: 18,
        borderRadius: 12,
        backgroundColor: 'white',
      },
      web: {
        height: 20,
        width: 20,
        borderRadius: 30,
        borderWidth: 1,
        borderColor: '#DDDDDD',
        backgroundColor: '#FFFFFF',
        shadowColor: '#000000',
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowRadius: 1,
        shadowOpacity: 0.2,
      },
    }),
  },
  pressedMarkerStyle: {
    ...Platform.select({
      web: {},
      ios: {},
      android: {
        height: 22,
        width: 22,
        borderRadius: 20,
        backgroundColor: '#4DE6C0'
      },
    }),
  },
  disabled: {
    backgroundColor: '#d3d3d3',
  },
});