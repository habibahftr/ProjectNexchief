import React, { Component } from 'react';
import { connect } from 'react-redux';
import Icon from '../../component/icon';
import "./style.css"
import Swal from 'sweetalert2';

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dateToday: "",
            countProdAct: 0,
            countSalesToday:0,
            countSalesMonth:0,
            countSalesUnpaidMonth:0,
            dateFirst:"",
            dateLast:"",
        }
    }

    componentDidMount() {
        this.getToday()
        this.getFilterCount()
        this.getSalesToday()
        this.getDate()
    }
    getToday = () => {
        let current_datetime = new Date()
        let dateNow = ("0" + current_datetime.getDate()).slice(-2)
        console.log(dateNow);
        this.setState({
            dateToday: dateNow,
        })

    }

    getDate=()=>{
        let current_datetime= new Date()
        let year = current_datetime.getFullYear();
        let monthTwoDigit = ("0" + (current_datetime.getMonth() + 1)).slice(-2)
        let endDate
        if(monthTwoDigit %2 ===1){
            endDate = "31"
        }else if(monthTwoDigit !== 2){
            endDate="30"
        }else{
            endDate="28"
        }
        let dateFirst =year+"-"+monthTwoDigit+"-01"
        let dateLast= year+"-"+monthTwoDigit+"-"+endDate
        console.log("uji tanggal:", dateLast)
        this.setState({
            dateFirst: dateFirst,
            dateLast: dateLast
        }, this.getSalesMonth(dateFirst, dateLast),
        this.getSalesUnpadiMonth(dateFirst, dateLast))
    }

    getSalesUnpadiMonth=(dateFirst, dateLast)=>{
        fetch(`http://localhost:8080/nexchief/sales/status/month/count/?distributor=`+this.props.dataLoginUser.id+`&dateFirst=`+dateFirst+`&dateLast=`+dateLast+'&status=unpaid', {
            method: "get",
            headers: {
                "Content-Type": "application/json; ; charset=utf-8",
                "Access-Control-Allow-Headers": "Authorization, Content-Type",
                "Access-Control-Allow-Origin": "*"
            }
        })
            .then(response => response.json())
            .then(json => {
                // let limitPage = json / this.state.limit
                this.setState({
                    countSalesUnpaidMonth: json
                })
                console.log("INI RESPON COUNT ", json)
            })
            .catch(() => {
                alert("Failed fetching")

            })

    }


    getSalesMonth=(dateFirst, dateLast)=>{
        fetch(`http://localhost:8080/nexchief/sales/month/count/?distributor=`+this.props.dataLoginUser.id+`&dateFirst=`+dateFirst+`&dateLast=`+dateLast, {
            method: "get",
            headers: {
                "Content-Type": "application/json; ; charset=utf-8",
                "Access-Control-Allow-Headers": "Authorization, Content-Type",
                "Access-Control-Allow-Origin": "*"
            }
        })
            .then(response => response.json())
            .then(json => {
                // let limitPage = json / this.state.limit
                this.setState({
                    countSalesMonth: json
                })
                console.log("INI RESPON COUNT ", json)
            })
            .catch(() => {
                alert("Failed fetching")

            })


    }

    getSalesToday=()=>{
        let current_datetime= new Date()
        let yearTwoDigit = current_datetime.getFullYear();
        let monthTwoDigit = ("0" + (current_datetime.getMonth() + 1)).slice(-2)
        let dateTwoDigit = ("0" + current_datetime.getDate()).slice(-2)
        let formatted_date = yearTwoDigit + "-" + monthTwoDigit + "-" + dateTwoDigit
        console.log("uji tanggal:", formatted_date)
        fetch(`http://localhost:8080/nexchief/sales/today/count/?distributor=`+this.props.dataLoginUser.id+`&date=`+ formatted_date, {
            method: "get",
            headers: {
                "Content-Type": "application/json; ; charset=utf-8",
                "Access-Control-Allow-Headers": "Authorization, Content-Type",
                "Access-Control-Allow-Origin": "*"
            }
        })
            .then(response => response.json())
            .then(json => {
                // let limitPage = json / this.state.limit
                this.setState({
                    countSalesToday: json
                })
                console.log("INI RESPON COUNT ", json)
            })
            .catch(() => {
                alert("Failed fetching")

            })


    }
    getFilterCount = () => {
        fetch(`http://localhost:8080/nexchief/filter/count/?updated_by=` + this.props.dataLoginUser.id + `&status=ACTIVE`, {
            method: "get",
            headers: {
                "Content-Type": "application/json; ; charset=utf-8",
                "Access-Control-Allow-Headers": "Authorization, Content-Type",
                "Access-Control-Allow-Origin": "*"
            }
        })
            .then(response => response.json())
            .then(json => {
                // let limitPage = json / this.state.limit
                this.setState({
                    countProdAct: json
                })
                console.log("INI RESPON COUNT ", json)
            })
            .catch(() => {
                alert("Failed fetching")

            })
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
        return (
            <div className="dashboardPage">
                <div className="dashboardHeader">
                    <Icon onClick={() => this.props.history.push("/home")} className="fas fa-home" style={{ color: "white", display: 'inline-block', marginTop: "4vh", fontSize: "40px", cursor: "pointer" }}></Icon>
                    <h1 className="dashboardLbl">DASHBOARD</h1>
                    <div className="logoutDashboard">
                        <Icon onClick={() => this.logoutBtn()} className="fas fa-sign-out-alt" style={{ color: "#B22222", display: 'inline-block', fontSize: "40px", cursor: "pointer" }}></Icon>
                        <div>Logout</div>
                    </div>
                </div>
                <div className="dashboardBody">
                    <div className="container1Dsh">
                        <div className="dshPoint">
                            <div className="textSales">
                                <div>Sales (Today) :</div>
                                <div className="numberSales">{this.state.countSalesToday}</div>
                            </div>
                            <div className="iconCalendar">
                                <label className="dateLbl">{this.state.dateToday}</label>
                                <Icon className="far fa-calendar"></Icon>
                            </div>
                        </div>
                        <div className="dshPoint">
                            <div className="textProduct">
                                <div>Total Product </div>
                                <div>(active) :</div>
                                <div className="numberProduct">{this.state.countProdAct}</div>
                            </div>
                            <div className="iconBox">
                                <Icon className="fas fa-box-open"></Icon>
                            </div>
                        </div>
                    </div>
                    <div className="container1Dsh">
                        <div className="dshPoint">
                            <div className="textProduct">
                                <div>Sales (this mounth): </div>
                                <div className="numberProduct">{this.state.countSalesMonth}</div>
                            </div>
                            <div className="iconBox">
                                <Icon className="fas fa-search-dollar"></Icon>
                            </div>

                        </div>
                        <div className="dshPoint">
                            <div className="textProduct">
                                <div>Sales Unpaid </div>
                                <div>(this mounth):</div>
                                <div className="numberProduct">{this.state.countSalesUnpaidMonth}</div>
                            </div>
                            <div className="iconBox">
                                <Icon className="fas fa-receipt"></Icon>
                            </div>
                        </div>
                    </div>
                    <div className="dahboardimg">

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

export default connect(mapStateToProps, mapDispatchToProps) (Dashboard);