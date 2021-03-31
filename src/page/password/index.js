import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '../../component/button';
import Icon from '../../component/icon';
import "./style.css"
import Swal from 'sweetalert2';

class Password extends Component {
    constructor(props) {
        super(props);
        this.state = {
            passType1:"password",
            passType2:"password",
            passType3:"password",
            // username: "",
            truePass:"",
            oldPass: "",
            newPass: "",
            newPass1: "",
        }
    }

    componentDidMount(){
        fetch(`http://localhost:8080/nexchief/user/`+this.props.dataLoginUser.id, {
                method: "get",
                headers: {
                    "Content-Type": "application/json; ; charset=utf-8",
                    "Access-Control-Allow-Headers": "Authorization, Content-Type",
                    "Access-Control-Allow-Origin": "*"
                }
            })

                .then(response => response.json())
                .then(json => {
                    this.setState({
                        truePass: json.password
                    });
                    console.log("Data", this.state.truePass)


                    if (typeof json.errorMessage !== 'undefined') {
                        alert(json.errorMessage);
                    } 

                })
                .catch((e) => {
                    console.log(e);
                    alert("Failed fetching data!!");
                });

        }

    
    setValue = el => {
        this.setState({
            [el.target.name]: el.target.value
        })
    }

    changePass = (changePass) => {
        console.log("idChange", this.props.dataLoginUser.id);
        const {oldPass, newPass, newPass1} = changePass
        if (newPass === "" || newPass1 === ""|| oldPass==="") {
            Swal.fire('Insert all data!')
        }
        else if(oldPass !== this.state.truePass){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Invalid Old Password',
              })
        }
        else if (newPass !== newPass1) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'validation Password wrong!',
              })
        }
        else{
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
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: json.errorMessage,
                      })
                }else if (typeof json.successMessage !== 'undefined'){
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: json.successMessage,
                        showConfirmButton: false,
                        timer: 1500
                      })
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

    passClick1 = () => {
        console.log("pass");
        const passTypeTemp1 = this.state.passType1
        if (passTypeTemp1 === "password") {
            this.setState({
                passType1: "text",
            })
        }else if(passTypeTemp1==="text"){
            this.setState({
                passType1: "password",
            })
        }
    } 

    passClick2=()=>{
        const passTypeTemp2 = this.state.passType2
        if(passTypeTemp2==="password"){
            this.setState({
                passType2:"text",
            })
        } 
        else if(passTypeTemp2==="text"){
            this.setState({
                passType2:"password",
            })
        }
    }

    passClick3=()=>{
        const passTypeTemp3 = this.state.passType3
        if(passTypeTemp3==="password"){
            this.setState({
                passType3:"text"
            })
        }else if(passTypeTemp3==="text"){
            this.setState({
                passType3:"password",
            })
        } 
    }

render() {
    const {oldPass, newPass, newPass1 } = this.state
    if (this.props.checkLogin === false) {
        this.props.history.push("/")
    }
    return (
        <div className="bodyPass">
            <div className="detailHeader">
                <Button className="backPass" onClick={() => this.props.history.push("/home")}>Back to Home</Button>
            </div>
            <div className="containerPass">
                <i className="fa fa-lock" aria-hidden="true" style={{ color: "white", margin:"auto", width: "50px", fontSize: "-webkit-xxx-large" }}></i>
                <div className="passlabel">CHANGE PASSWORD</div>
                <div className="form">
                    <div className="label2">
                        <div className="labelPass">Old Password</div>
                        <input className="inputPass" type={this.state.passType1} value={this.state.oldPass} name="oldPass" onChange={this.setValue} placeholder="Write your old Password.."></input>
                        <Icon className={this.state.passType1 === "password" ? 'fa fa-eye-slash' : 'fa fa-eye'} onClick={() => this.passClick1()} style={{ color: "grey", marginLeft: "-25px" }}></Icon>
                    </div>
                    <div className="label1">
                        <div className="labelPass">New Password</div>
                        <input className="inputPass" type={this.state.passType2} value={this.state.newPass} name="newPass" onChange={this.setValue} placeholder="Write your new Password.."></input>
                        <Icon className={this.state.passType2 === "password" ? 'fa fa-eye-slash' : 'fa fa-eye'} onClick={() => this.passClick2()} style={{ color: "grey", marginLeft: "-25px" }}></Icon>
                    </div>
                    <div className="label1">
                        <div className="labelPass">Validation New Password</div>
                        <input className="inputPass" type={this.state.passType3} value={this.state.newPass1} name="newPass1" onChange={this.setValue} placeholder="Confirm your new Password.."></input>
                        <Icon className={this.state.passType3 === "password" ? 'fa fa-eye-slash' : 'fa fa-eye'} onClick={() => this.passClick3()} style={{ color: "grey", marginLeft: "-25px" }}></Icon>
                    </div>
                    <div>
                        <button className="pass" onClick={() => this.changePass({oldPass, newPass, newPass1})}>CHANGE</button>
                        <button className="cancelBtn" onClick={()=>this.setClear()}>CANCEL</button>
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