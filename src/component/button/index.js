import React, { Component } from 'react';

class Button extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <button onClick={this.props.onClick} disabled={this.props.disabled} className={this.props.className} style={this.props.style}>{this.props.children}</button>
         );
    }
}
 
export default Button;