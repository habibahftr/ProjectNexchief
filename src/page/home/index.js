import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Icon from '../../component/icon';
import Swal from 'sweetalert2';
import "./style.css"

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    logoutBtn=()=>{
        Swal.fire({
            title:  "Oh no! You are leaving...",
            text: 'Are you sure?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes!'
          }).then((result) => {
            if (result.isConfirmed) {
                this.props.logout()
              Swal.fire(
                'Log out!',
                'You have been logged out',
                'success'
              )
            }
          })

    }
    render() {
        if (this.props.checkLogin=== false) {
            this.props.history.push("/")   
        }
        console.log("status", this.props.checkLogin);
        console.log("username", this.props.dataLoginUser.username);
        return (
          
                <div className="bodyHome">
                    <div className="headerHome">
                        <a className="changePass" onClick={() => this.props.history.push("/changepass")} >Change Password?</a>
                        <div className="welcome">
                            <div className="spanHome">WELCOME</div>
                            <div className="spanHome">{this.props.dataLoginUser.name}</div>
                        </div>
                        <div className="logout"  onClick={()=> this.logoutBtn()}>
                            <Icon className="fas fa-sign-out-alt" style={{ color: "white", marginBottom:"0" ,display: 'inline-block', fontSize: "31px", cursor: "pointer" }}></Icon>
                            <div style={{marginTop:"0"}}>Logout</div>
                        </div>
                    </div>
                    <div className="containerHome">
                        <div className="menuBaru">
                            <div className="labelMenu" onClick={() => this.props.history.push("/product")}>
                                <div className="nameLabel">PRODUCTS</div>
                                <Icon className="fa fa-archive" style={{ margin: "auto", color: "white", display: 'inline-block', fontSize: "90px" }}></Icon><br/>
                            </div>
                            <div className="labelMenu" onClick={() => this.props.history.push("/sales")}>
                                <div className="nameLabel">SALES</div>
                                <Icon className="fas fa-dollar-sign" style={{ margin:"auto", color: "white", display: 'inline-block', fontSize: "90px" }}></Icon><br/>
                            </div>
                            <div className="labelMenu" onClick={() => this.props.history.push("/dashboard")}>
                                <div className="nameLabel">DASHBOARD</div>
                                <Icon className="fas fa-tachometer-alt" style={{ margin: "auto", color: "white", display: 'inline-block', fontSize: "90px" }}></Icon><br/>
                            </div>

                        </div>
                        <div className="gambarBaru">
                        </div>
                    </div>
                </div>
        );
    }
}
const mapStateToProps = state => ({
    checkLogin: state.authReducer.isLogin,
    dataLoginUser : state.authReducer.userLogin

})

const mapDispatchToProps = dispatch => {
    return {
        submitLogin: (data) => dispatch({ type: "LOGIN", payload: data }),
        logout: ()=>dispatch({type:"LOGOUT"})
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (Home);