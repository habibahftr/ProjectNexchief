import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '../../component/button';
import Icon from '../../component/icon';
import "./style.css"
import Swal from 'sweetalert2';


class Regis extends Component {
    constructor(props) {
        super(props);
        this.state = {
            passType: "password",
            passType2:"password",
            name: "",
            email: "",
            phone: "",
            username: "",
            password: "",
            validationpwd: "",
        }
    }

    setValue = el => {
        this.setState({
            [el.target.name]: el.target.value
        })
    }

    doRegis = (obj) => {
        const { name, email, phone, username, password, validationpwd } = obj
        let regEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        let regUname = /^(?=.{6,8}$)(?![_.])[a-zA-Z0-9._]+(?<![_.])$/;
        let regPass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6}$/
        let regPhone = /^(^08)(\d{3,4}-?){2}\d{3,4}$/

        console.log("userRegis", obj);
        if (username === "" || password === "" || name === "" || email === "" || phone === "" || validationpwd === "") {
            Swal.fire({
                title: 'Insert all data!',
                icon: 'warning'
            })
        }
        else if (!regEmail.test(obj.email)) {
            Swal.fire({
                title: 'email get wrong. ex (xxx.xxx@xxx.com)',
                icon: 'warning'
            })
        }
        else if (!regPhone.test(obj.phone)) {
            Swal.fire({
                title: 'Phone number min. 11 number and max.14 number, must in Indonesia type (ex: 08134455555)',
                icon: 'warning'
            })
        }
        else if (!regUname.test(obj.username)) {
            Swal.fire({
                title: 'Username must be 6 to 8 in alphanumeric and without any symbol',
                icon: 'warning'
            })
        }
        else if (!regPass.test(obj.password)) {
            Swal.fire({
                title: 'Password must be 6 in alphanumeric and at least 1 uppercase letter',
                icon: 'warning'
            })
        }
        else if (password !== validationpwd) {
            Swal.fire({
                title: 'validation password get wrong!',
                icon: 'warning'
            })
        }
        else {
            const objRegis = {
                name: name,
                email: email,
                phone: phone,
                username: username,
                password: password,
            }
            fetch(`http://localhost:8080/nexchief/user/`, {
                method: "post",
                headers: {
                    "Content-Type": "application/json; ; charset=utf-8",
                    "Access-Control-Allow-Headers": "Authorization, Content-Type",
                    "Access-Control-Allow-Origin": "*"
                },
                body: JSON.stringify(objRegis)
            })
                .then((response) => {
                    return response.json()
                })

                .then((result) => {
                    if (result.successMessage === "New user successfully created") {
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: result.successMessage,
                            showConfirmButton: false,
                            timer: 1500
                        })
                        // alert(result.successMessage)
                        this.setClear();
                        this.props.history.push("/")
                    }
                    else if (result.errorMessage !== 'undefined') {
                        Swal.fire({
                            title: result.errorMessage,
                            icon: 'warning'
                        })
                        // alert(result.errorMessage)
                    }
                })
                .catch((e) => {
                    Swal.fire({
                        title: e,
                        icon: 'warning'
                    })
                });
        }
    }

    setClear = () => {
        this.setState({
            name: "",
            email: "",
            phone: "",
            username: "",
            password: "",
            validationpwd: "",
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

    passClick2= ()=>{
        const passTypeTemp2 = this.state.passType2
        if (passTypeTemp2 === "password") {
            this.setState({
                passType2: "text"
            })
        } else {
            this.setState({
                passType2: "password"
            })
        }
    }

    regisClick = () => {

    }
    render() {
        const { name, email, phone, username, password, validationpwd } = this.state
        if (this.props.checkLogin === true) {
            this.props.history.push("/home")
        }
        return (
            <div className="bodyRegis">
                <div className="containerRegis1">
                    <div className="containerRegis">
                        <Icon className="fa fa-user-circle" style={{ color: "white", backgroundColor: "blue", borderRadius: "50%", marginRight: "50px", marginTop: "-60px", fontSize: "17vh" }}></Icon>
                        <div className="regislabel">R E G I S T R A T I O N</div>
                        <div className="form">
                            <div className="label1">
                                <div className="labelRegis">Name</div>
                                <input className="inputRegis" pattern="" type="text" name="name" value={this.state.name} onChange={this.setValue} placeholder="Write your name.."></input>
                            </div>
                            <div className="label1">
                                <div className="labelRegis">Email</div>
                                <input className="inputRegis" type="text" name="email" value={this.state.email} onChange={this.setValue} placeholder="xxx@xxx.xxx"></input>
                            </div>
                            <div className="label1">
                                <div className="labelRegis">Phone Number</div>
                                <input className="inputRegis" type="text" name="phone" value={this.state.phone} onChange={this.setValue} placeholder="08** **** ***"></input>
                            </div>
                            <div className="label1">
                                <div className="labelRegis">Username</div>
                                <input className="inputRegis" type="text" name="username" value={this.state.username} onChange={this.setValue} placeholder="Write your username.."></input>
                            </div>
                            <div className="pass2">
                                <div className="labelPass" style={{ marginLeft: "20px" }}>
                                    <div className="labelRegis">Password</div>
                                    <input className="inputPass" type={this.state.passType} name="password" value={this.state.password} onChange={this.setValue} placeholder="Write password.."></input>
                                    <Icon className={this.state.passType === "password" ? 'fa fa-eye-slash' : 'fa fa-eye'} onClick={() => this.passClick()} style={{ color: "grey", marginLeft: "-25px" }}></Icon>
                                </div>
                                <div className="labelPass">
                                    <div className="labelRegis">Confirm Password</div>
                                    <input className="inputPass" type={this.state.passType2} name="validationpwd" value={this.state.validationpwd} onChange={this.setValue} placeholder="Confirm password.."></input>
                                    <Icon className={this.state.passType2 === "password" ? 'fa fa-eye-slash' : 'fa fa-eye'} onClick={() => this.passClick2()} style={{ color: "grey", marginLeft: "-25px" }}></Icon>
                                </div>
                            </div>
                        </div>
                        <div>
                            <Button className="regis" onClick={() => this.doRegis({ name, username, phone, email, password, validationpwd })}>REGISTER</Button>
                        </div>
                        <div className="backLogin">
                            <a onClick={() => this.props.history.push("/")}>Back to Login</a>
                        </div>
                    </div>
                </div>
                <div className="regisImg">

                </div>

            </div>
        );
    }
}

const mapStateToProps = state => ({
    checkLogin: state.authReducer.isLogin,

})


export default connect(mapStateToProps)(Regis);