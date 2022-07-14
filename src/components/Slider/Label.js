import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const width = 50;
export default class Label extends React.Component {

  render() {
    const {
      oneMarkerValue,
      twoMarkerValue,
      oneMarkerLeftPosition,
      twoMarkerLeftPosition,
    } = this.props;

    return (
      <View style={{ position: 'relative' }}>
        <View
          style={[
            styles.sliderLabel,
            { left: oneMarkerLeftPosition - width / 2 },
          ]}
        >
          <Text style={styles.sliderLabelText}>{oneMarkerValue}</Text>
        </View>

        <View
          style={[
            styles.sliderLabel,
            { left: twoMarkerLeftPosition - width / 2 },
          ]}
        >
          <Text style={styles.sliderLabelText}>{twoMarkerValue}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  sliderLabel: {
    position: 'absolute',
    bottom: 0,
    minWidth: width,
    transform: [
      {
        translateY: 20,
      }
    ]
  },
  sliderLabelText: {
    textAlign: 'center',
    fontSize: 15,
    fontWeight: 'bold',
    color: '#34B4FF',
  },
  markerPressed: {
    borderWidth: 2,
    borderColor: '#999',
  },
});