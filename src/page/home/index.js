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
                            <div>WELCOME</div>
                            <div>{this.props.dataLoginUser.name}</div>
                        </div>
                        <div className="logout">
                            <Icon onClick={()=> this.logoutBtn()} className="fas fa-sign-out-alt" style={{ color: "#B22222", display: 'inline-block', fontSize: "40px", cursor: "pointer" }}></Icon>
                            <div>Logout</div>
                        </div>
                    </div>
                    <div className="containerHome">
                        <div className="menuicon" >
                            <div className="producticon" onClick={() => this.props.history.push("/product")}>
                                <Icon className="fa fa-archive" style={{ color: "white", display: 'inline-block', fontSize: "100px", border:"solid", cursor: "pointer", padding:"6px" }}></Icon><br/>
                                <div className="product" style={{ color: "white", display: 'inline-block', fontSize: "20px" }} >PRODUCTS</div>
                            </div>
                            <div className="salesicon" onClick={() => this.props.history.push("/sales")}>
                                <Icon className="fas fa-dollar-sign" style={{ color: "white", display: 'inline-block', fontSize: "100px", cursor: "pointer", border:"solid", padding:"6px" }}></Icon><br/>
                                <div className="sales" style={{ color: "white", display: 'inline-block', fontSize: "20px" }}>SALES</div>
                            </div>
                        </div>
                        <div className="menuicon" >
                            <div className="reporticon" onClick={() => this.props.history.push("/report")}>
                                <Icon className="far fa-file-alt" style={{ color: "white", display: 'inline-block', fontSize: "100px", cursor: "pointer", border:"solid", padding:"5px" }}></Icon><br/>
                                <div className="report" style={{ color: "white", display: 'inline-block', fontSize: "20px" }} >REPORTS</div>
                            </div>
                            <div className="dashboardicon">
                                <Icon className="fas fa-tachometer-alt" style={{ color: "white", display: 'inline-block', fontSize: "100px", cursor: "pointer", border:"solid", padding:"6px" }}></Icon><br/>
                                <div className="dashboard" style={{ color: "white", display: 'inline-block', fontSize: "20px" }}>DASHBOARD</div>
                            </div>
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