import React, { Component } from 'react';

class Input extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <input className={this.props.className} type={this.props.type} value={this.props.value} name={this.props.name} onChange={this.props.onChange} placeholder={this.props.placeholder} style={this.props.style} disabled={this.props.disabled} ></input>
         );
    }
}
 
export default Input;