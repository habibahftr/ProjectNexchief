import React, { Component } from 'react';
import { connect } from 'react-redux';
import "./style.css"

class Password extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username:"",
            oldPass:"",
            newPass:"",
            newPass1:"",
        }
    }
    setValue = el => {
        this.setState({
            [el.target.name]: el.target.value
        })
    }

    changePass=()=>{

    }
    
    render() {
        if (this.props.checkLogin === false) {
            this.props.history.push("/")
        }
        return (
            <div className="bodyPass">
                <div className="containerPass">
                    <i className="fa fa-lock" aria-hidden="true" style={{ color: "white", marginRight: "8px", width: "50px", fontSize: "-webkit-xxx-large" }}></i>
                    <div className="passlabel">CHANGE PASSWORD</div>
                    <div className="form">
                        <div className="label2">
                            <div className="labelPass">Username</div>
                            <input className="inputPass" type="text" name="username" onChange={this.setValue}></input>
                        </div>
                        <div className="label2">
                            <div className="labelPass">Old Password</div>
                            <input className="inputPass" type="text" name="oldPass" onChange={this.setValue} placeholder="Write your old Password.."></input>
                        </div>
                        <div className="label1">
                            <div className="labelPass">New Password</div>
                            <input className="inputPass" type="text" name="newPass" onChange={this.setValue} placeholder="Write your new Password.."></input>
                        </div>
                        <div className="label1">
                            <div className="labelPass">Validation New Password</div>
                            <input className="inputPass" type="text" name="NewPass1" onChange={this.setValue} placeholder="Confirm your new Password.."></input>
                        </div>
                        <div>
                            <button className="pass" onClick={()=>this.changePass()}>CHANGE</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    checkLogin: state.authReducer.isLogin,
    dataLoginUser: state.authReducer.userLogin

})

const mapDispatchToProps = dispatch => {
    return {
        submitLogin: (data) => dispatch({ type: "LOGIN", payload: data }),
        logout: () => dispatch({ type: "LOGOUT" })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Password);