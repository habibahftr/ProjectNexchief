import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '../../component/button';
import Icon from '../../component/icon';
import "./style.css"

class Password extends Component {
    constructor(props) {
        super(props);
        this.state = {
            passType:"password",
            // username: "",
            // oldPass: "",
            newPass: "",
            newPass1: "",
        }
    }
    setValue = el => {
        this.setState({
            [el.target.name]: el.target.value
        })
    }

    changePass = (changePass) => {
        console.log("idChange", this.props.dataLoginUser.id);
        const {newPass, newPass1} = changePass
        // console.log("changePass", changePass);
        // console.log("newPass1", newPass1);
        // console.log("newPass", newPass);
        if (newPass === "" || newPass1 === "") {
            alert(`Insert all data!`)
        }
        else if (newPass !== newPass1) {
            alert(`validation Password wrong`)
        }else{
            const objPass={
                password: newPass
            }
            fetch(`http://localhost:8080/nexchief/changePass/`+this.props.dataLoginUser.id,{
                method: "put",
                headers: {
                    "Content-Type": "application/json; ; charset=utf-8",
                    "Access-Control-Allow-Headers": "Authorization, Content-Type",
                    "Access-Control-Allow-Origin": "*"
                },
                body: JSON.stringify(objPass)
            })
            .then((response)=>{
                return response.json()
            })
            .then((json)=>{
                if(typeof json.errorMessage !== 'undefined'){
                    alert(json.errorMessage)
                }else if (typeof json.successMessage !== 'undefined'){
                    alert(json.successMessage)
                    this.props.logout()
                    this.setClear()
                }
            })
            .catch((e)=>{
                alert(e);
            })

        }
    }

    setClear=()=>{
        this.setState({
            newPass: "",
            newPass1: "",
        })
    }

    passClick = () => {
        console.log("pass");
        const passTypeTemp = this.state.passType
        if (passTypeTemp === "password") {
            this.setState({
                passType: "text"
            })
        } else {
            this.setState({
                passType: "password"
            })
        }

    }


render() {
    const { newPass, newPass1 } = this.state
    if (this.props.checkLogin === false) {
        this.props.history.push("/")
    }
    return (
        <div className="bodyPass">
            <div className="detailHeader">
                <Button className="backSales" onClick={() => this.props.history.push("/home")}>Back to Home</Button>
            </div>
            <div className="containerPass">
                <i className="fa fa-lock" aria-hidden="true" style={{ color: "white", marginRight: "8px", width: "50px", fontSize: "-webkit-xxx-large" }}></i>
                <div className="passlabel">CHANGE PASSWORD</div>
                <div className="form">
                    {/* <div className="label2">
                            <div className="labelPass">Username</div>
                            <input className="inputPass" type="text" name="username" onChange={this.setValue}></input>
                        </div> */}
                    {/* <div className="label2">
                        <div className="labelPass">Old Password</div>
                        <input className="inputPass" type={this.state.passType} value={this.state.oldPass} name="oldPass" onChange={this.setValue} placeholder="Write your old Password.."></input>
                        <Icon className={this.state.passType === "password" ? 'fa fa-eye-slash' : 'fa fa-eye'} onClick={() => this.passClick()} style={{ color: "grey", marginLeft: "-25px" }}></Icon>
                    </div> */}
                    <div className="label1">
                        <div className="labelPass">New Password</div>
                        <input className="inputPass" type={this.state.passType} value={this.state.newPass} name="newPass" onChange={this.setValue} placeholder="Write your new Password.."></input>
                        <Icon className={this.state.passType === "password" ? 'fa fa-eye-slash' : 'fa fa-eye'} onClick={() => this.passClick()} style={{ color: "grey", marginLeft: "-25px" }}></Icon>
                    </div>
                    <div className="label1">
                        <div className="labelPass">Validation New Password</div>
                        <input className="inputPass" type={this.state.passType} value={this.state.newPass1} name="newPass1" onChange={this.setValue} placeholder="Confirm your new Password.."></input>
                        <Icon className={this.state.passType === "password" ? 'fa fa-eye-slash' : 'fa fa-eye'} onClick={() => this.passClick()} style={{ color: "grey", marginLeft: "-25px" }}></Icon>
                    </div>
                    <div>
                        <button className="pass" onClick={() => this.changePass({newPass, newPass1})}>CHANGE</button>
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
        logout: () => dispatch({ type: "LOGOUT" }),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Password);