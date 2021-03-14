import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '../../component/button';
import Icon from '../../component/icon';
import Input from '../../component/input';
import Label from '../../component/label';
import "./style.css"

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            passType: "password",
            username: "",
            password: "",
            user: {},
            users: [],
        }
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

    setValue = el => {
        this.setState({
            [el.target.name]: el.target.value
        })
    }

    doLogin = (obj) => {
        const { username, password } = obj
        console.log("user", obj);
        if (username === "" || password === "") {
            alert(`Insert all data!`)
        } else {
            fetch(`http://localhost:8080/nexchief/login/?username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`, {
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
                        user: json
                    });
                    console.log("Data", this.state.user)


                    if (typeof json.errorMessage !== 'undefined') {
                        alert(json.errorMessage);
                    } else {
                        this.props.submitLogin({ dataLogin: json })
                        alert(`Login Success`)
                        this.props.history.push("/home")
                    }


                })
                .catch((e) => {
                    console.log(e);
                    alert("Failed fetching data!!");
                });

        }

    }

    // componentDidMount() {
    //     fetch("http://localhost:8080/nexchief/users/")
    //         .then(response => response.json())
    //         .then(json => {
    //             this.setState({
    //                 users: json
    //             })
    //         })
    //         .catch(() => {
    //             alert("failed fetching data!")
    //         })
    // }

    render() {
        const { username, password } = this.state;
        console.log("user", this.state.user);
        console.log("statuslogin", this.props.checkLogin);
        if (this.props.checkLogin === true) {
            this.props.history.push("/home")
        }
        return (
            <div className="bodyLogin">
                <div className="containerLogin">
                    <Label className="labelNex">Nex</Label>
                    <Label className="labelChief">Chief</Label>
                    <hr className="garisAtas" />
                    <div>
                        <Label className="power">Powerred By Habibah</Label>
                    </div>
                    <div className="form">
                        <div className="usernameDiv">
                            <Icon className="fa fa-user-circle" style={{ border: "solid", padding: "1px", color: "white", fontSize: "30px" }}></Icon>
                            <Input className="userName" type="text" name="username" onChange={this.setValue} placeholder="username.."></Input>
                        </div>
                        <div className="passDiv">
                            <Icon className="fa fa-lock" style={{ border: "solid", padding: "1.5px", color: "white", fontSize: "30px" }}></Icon>
                            <div className="passDiv2">
                                <Input className="password" type={this.state.passType} name="password" placeholder="******" onChange={this.setValue}></Input>
                                <Icon className={this.state.passType === "password" ? 'fa fa-eye-slash' : 'fa fa-eye'} onClick={() => this.passClick()} style={{ color: "grey", marginTop: "1.5vh", marginLeft:"-5vh" }}></Icon>
                            </div>
                        </div>
                        <div>
                            <Button onClick={() => this.doLogin({ username, password })} className="login">LOGIN</Button>
                        </div>
                        <div className="buatAkun">
                            <a onClick={() => this.props.history.push("/regis")}>Don't have account? Register</a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    checkLogin: state.authReducer.isLogin,

})

const mapDispatchToProps = dispatch => {
    return {
        submitLogin: (data) => dispatch({ type: "LOGIN", payload: data }),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);