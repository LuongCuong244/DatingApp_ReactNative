import React from 'react';
import {
  StyleSheet,
  PanResponder,
  View,
  Platform,
  I18nManager,
} from 'react-native';

import Marker from './Marker';
import Label from './Label';
import { createArray, valueToPosition, positionToValue } from './converters';

// copy về và chỉnh sửa từ thư viện @ptomasroos/react-native-multi-slider;

export default class MultiSlider extends React.Component {

  constructor(props) {
    super(props);

    this.optionsArray = createArray(this.props.min, this.props.max, 1);
    this.stepLength = this.props.sliderLength / (this.optionsArray.length - 1);

    var initialValues = this.props.values.map(value =>
      valueToPosition(
        value,
        this.optionsArray,
        this.props.sliderLength,
      ),
    );

    this.state = {
      pressedOne: true,
      valueOne: this.props.values[0],
      valueTwo: this.props.values[1],
      pastOne: initialValues[0],
      pastTwo: initialValues[1],
      positionOne: initialValues[0],
      positionTwo: initialValues[1],
    };

    this.subscribePanResponder();
  }

  subscribePanResponder = () => {
    let customPanResponder = (start, move, end) => {
      return PanResponder.create({
        onStartShouldSetPanResponder: (evt, gestureState) => true,
        onPanResponderGrant: (evt, gestureState) => start(),
        onPanResponderMove: (evt, gestureState) => move(gestureState),
        onPanResponderRelease: (evt, gestureState) => end(gestureState),
        onPanResponderTerminate: (evt, gestureState) => end(gestureState),
      });
    };

    this._panResponderOne = customPanResponder(
      this.startOne,
      this.moveOne,
      this.endOne,
    );
    this._panResponderTwo = customPanResponder(
      this.startTwo,
      this.moveTwo,
      this.endTwo,
    );
  };

  startOne = () => {
    this.setState({
      onePressed: !this.state.onePressed,
    });
  };

  startTwo = () => {
    this.setState({
      twoPressed: !this.state.twoPressed,
    });
  };

  moveOne = gestureState => {

    const accumDistance = gestureState.dx;
    const accumDistanceDisplacement = gestureState.dy;

    const unconfined = I18nManager.isRTL // right to left   - unconfined là giá trị khoảng cách tương ứng với value của marker
      ? this.state.pastOne - accumDistance
      : accumDistance + this.state.pastOne;

    var bottom = 0; // khoảng cách tối thiểu đối với đầu mút trái
    var top = this.state.positionTwo - this.stepLength*3; // khoảng cách tối thiểu đối với marker 2

    var confined =
      unconfined < bottom ? bottom : unconfined > top ? top : unconfined;

    if (Math.abs(accumDistanceDisplacement) < 400) { // khi nhấn giữ và di chuyển trong khoảng 200 thì không bị mất focus   
      var value = positionToValue(
        confined,
        this.optionsArray,
        this.props.sliderLength,
        this.props.markerSize,
      );

      this.setState({
        positionOne: confined,
      });

      if (value !== this.state.valueOne) {
        this.setState(
          {
            valueOne: value,
          },
          () => {
            this.props.onValuesChange([
              this.state.valueOne,
              this.state.valueTwo,
            ]);
          },
        );
      }
    }
  };

  moveTwo = gestureState => {
    const accumDistance = gestureState.dx;
    const accumDistanceDisplacement = gestureState.dy;

    const unconfined = I18nManager.isRTL
      ? this.state.pastTwo - accumDistance
      : accumDistance + this.state.pastTwo;
    var bottom = this.state.positionOne + this.stepLength*3;
    var top = this.props.sliderLength;
    var confined =
      unconfined < bottom ? bottom : unconfined > top ? top : unconfined;

    if (Math.abs(accumDistanceDisplacement) < 200) {
      var value = positionToValue(
        confined,
        this.optionsArray,
        this.props.sliderLength,
        this.props.markerSize,
      );

      this.setState({
        positionTwo: confined,
      });

      if (value !== this.state.valueTwo) {
        this.setState(
          {
            valueTwo: value,
          },
          () => {
            this.props.onValuesChange([
              this.state.valueOne,
              this.state.valueTwo,
            ]);
          },
        );
      }
    }
  };

  endOne = () => {
    this.setState(
      {
        pastOne: this.state.positionOne,
        onePressed: !this.state.onePressed,
      }
    );
  };

  endTwo = () => {
    this.setState(
      {
        pastTwo: this.props.smoothSnapped ? snapped : this.state.positionTwo,
        twoPressed: !this.state.twoPressed,
      }
    );
  };

  componentDidUpdate(prevProps) {

    const { positionOne, positionTwo } = this.state;

    if (
      typeof positionOne === 'undefined' &&
      typeof positionTwo !== 'undefined'
    ) {
      return;
    }

    if (this.state.onePressed || this.state.twoPressed) {
      return;
    }

    let nextState = {};
    if (
      prevProps.min !== this.props.min ||
      prevProps.max !== this.props.max ||
      prevProps.step !== this.props.step ||
      prevProps.values[0] !== this.props.values[0] ||
      prevProps.sliderLength !== this.props.sliderLength ||
      prevProps.values[1] !== this.props.values[1] ||
      (prevProps.sliderLength !== this.props.sliderLength &&
        prevProps.values[1])
    ) {
      this.optionsArray =
        this.props.optionsArray ||
        createArray(this.props.min, this.props.max, this.props.step);

      this.stepLength = this.props.sliderLength / this.optionsArray.length;

      const positionOne = valueToPosition(
        this.props.values[0],
        this.optionsArray,
        this.props.sliderLength,
        this.props.markerSize,
      );
      nextState.valueOne = this.props.values[0];
      nextState.pastOne = positionOne;
      nextState.positionOne = positionOne;

      const positionTwo = valueToPosition(
        this.props.values[1],
        this.optionsArray,
        this.props.sliderLength,
        this.props.markerSize,
      );
      nextState.valueTwo = this.props.values[1];
      nextState.pastTwo = positionTwo;
      nextState.positionTwo = positionTwo;

      this.setState(nextState);
    }
  }

  render() {
    const { positionOne, positionTwo } = this.state;
    const {
      sliderLength,
    } = this.props;

    const trackOneLength = positionOne;
    const trackThreeLength = sliderLength - positionTwo;
    const trackTwoLength = sliderLength - trackOneLength - trackThreeLength;

    const markerContainerOne = {
      top: - 24,
      left: trackOneLength - 24,
    };

    const markerContainerTwo = {
      top: - 24,
      right: trackThreeLength - 24,
    };

    const body = (
      <React.Fragment>
        <View style={[styles.fullTrack, { width: sliderLength }]}>
          <View
            style={[
              styles.track,
              {
                backgroundColor: 'rgba(255,255,255,0.5)',
                width: trackOneLength
              },
            ]}
          />
          <View
            style={[
              styles.track,
              {
                backgroundColor: '#34B4FF',
                width: trackTwoLength
              },
            ]}
          />

          <View
            style={[
              styles.track,
              {
                backgroundColor: 'rgba(255,255,255,0.5)',
                width: trackThreeLength
              },
            ]}
          />

          <View
            style={[
              styles.markerContainer,
              markerContainerOne,
              positionOne > sliderLength / 2 && styles.topMarkerContainer,
            ]}
          >
            <View
              style={styles.touch}
              ref={component => (this._markerOne = component)}
              {...this._panResponderOne.panHandlers}
            >
              <Marker
                pressed={this.state.onePressed}
                currentValue={this.state.valueOne}
              />
            </View>
          </View>

          <View
            style={[
              styles.markerContainer,
              markerContainerTwo,
            ]}
          >
            <View
              style={styles.touch}
              ref={component => (this._markerTwo = component)}
              {...this._panResponderTwo.panHandlers}
            >
              <Marker
                pressed={this.state.twoPressed}
                currentValue={this.state.valueTwo}
              />
            </View>
          </View>
        </View>
      </React.Fragment>
    );

    return (
      <View testID={this.props.testID}>
        <Label
          oneMarkerValue={this.state.valueOne}
          twoMarkerValue={this.state.valueTwo}
          minValue={this.props.min}
          maxValue={this.props.max}
          oneMarkerLeftPosition={positionOne}
          twoMarkerLeftPosition={positionTwo}
        />
        <View style={styles.container}>{body}</View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    height: 33,
    justifyContent: 'center',
    transform: [
      {
        translateY: 20,
      }
    ]
  },
  fullTrack: {
    flexDirection: 'row',
  },
  track: {
    ...Platform.select({
      ios: {
        height: 2,
        borderRadius: 2,
        backgroundColor: '#A7A7A7',
      },
      android: {
        height: 2,
        backgroundColor: '#CECECE',
      },
      web: {
        height: 2,
        borderRadius: 2,
        backgroundColor: '#A7A7A7',
      },
    }),
  },
  selectedTrack: {
    ...Platform.select({
      ios: {
        backgroundColor: '#095FFF',
      },
      android: {
        backgroundColor: '#0D8675',
      },
      web: {
        backgroundColor: '#095FFF',
      },
    }),
  },
  markerContainer: {
    position: 'absolute',
    width: 48,
    height: 48,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  topMarkerContainer: {
    zIndex: 1,
  },
  touch: {
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
});