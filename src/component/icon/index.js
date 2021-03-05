import React, { Component } from 'react';

class Icon extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <i className={this.props.className} onClick={this.props.onClick} style={this.props.style}></i>
         );
    }
}
 
export default Icon;