import React, { Component } from 'react';
import {
    TextInput,
} from 'react-native';

export default class AppTextInput extends Component {
    constructor(props) {
        super(props)
        this.style = [];
        if (props.style) {
            if (Array.isArray(props.style)) {
                this.style = this.style.concat(props.style)
            } else {
                this.style.push(props.style)
            }
        }
        this.style.push(
            {
                //fontStyle: 'italic',
            }
        )
    }

    render() {
        return (
            <TextInput {...this.props} style={this.style}>
                {this.props.children}
            </TextInput>
        )
    }
}