import React, { Component, useDebugValue } from 'react';
import Button from '../../component/button';
import Icon from '../../component/icon';
import Input from "../../component/input"
import Label from '../../component/label';
import Pagination from '@material-ui/lab/Pagination';
import "./style.css"
import { connect } from 'react-redux';

class Sales extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sales: [],
            salesClick:{},
            limit: 2,
            count: 0,
            page: 1,
        }
    }

    componentDidMount() {
        this.getCountSales();
        this.getAllSales(this.state.page, this.state.limit)
    }

    detailClick = (idSales) => {
        fetch(`http://localhost:8080/nexchief/sales/`+ idSales,{
            method: "get",
            headers: {
                "Content-Type": "application/json; ; charset=utf-8",
                "Access-Control-Allow-Headers": "Authorization, Content-Type",
                "Access-Control-Allow-Origin": "*"
            }
        })
        .then(response => response.json())
        .then(json=>{
            this.props.salesClick({sales:json})
            this.props.history.push("/sales/detail")
        })
        .catch(() => {
            alert("Failed fetching")
        })
    }

    handleChange = (event, value) => {
        this.setState({
            page: value,
        })
        this.getCountSales();
        this.getAllSales(value, this.state.limit);
    }

    // ---------------------------------------GET COUNT DATA--------------------------------------------
    getCountSales = () => {
        fetch(`http://localhost:8080/nexchief/sales/count/?distributor=` + this.props.dataLoginUser.id, {
            method: "get",
            headers: {
                "Content-Type": "application/json; ; charset=utf-8",
                "Access-Control-Allow-Headers": "Authorization, Content-Type",
                "Access-Control-Allow-Origin": "*"
            }
        })
            .then(response => response.json())
            .then(json => {
                let limitPage = json / this.state.limit
                this.setState({
                    count: Math.ceil(limitPage)
                })
                console.log("INI RESPON COUNT Sales ", json)
            })
            .catch(() => {
                alert("Failed fetching")
            })

    }

    // ----------------------------------------GET ALL DATA---------------------------------------------
    getAllSales = (value, limit) => {
        fetch(`http://localhost:8080/nexchief/sales/paging/?page=` + value + `&limit=` + limit + `&id=` + this.props.dataLoginUser.id, {
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
                    sales: json,
                });
                this.props.salesData({list: json})
                console.log("ini data sales", this.state.sales);
            })
            .catch(() => {
                alert("Failed fetching")
            })

    }
    render() {
        if (this.props.checkLogin === false) {
            this.props.history.push("/")
        }
        console.log("sales props", this.props.salesList);
        console.log("sales click", this.props.salesClick);
        return (
            <div className="salesPage">
                <div className="headerSales">
                    <Icon onClick={() => this.props.history.push("/home")} className="fas fa-home" style={{ color: "white", display: 'inline-block', marginTop: "2vh", fontSize: "40px", cursor: "pointer" }}></Icon>
                    <div className="titleSalesPage">
                        <Label className="monthly">MONTHLY</Label>
                        <Label className="salesact">SALES ACTIVITY</Label>
                    </div>
                </div>
                <div className="bodySales">
                    <div className="container1">
                        <div className="seacrhSales1">
                            <Input className="searchSales2" ></Input>
                            <Icon className="fas fa-search" style={{ color: "grey", marginLeft: "-5vh", fontSize: "15px", marginTop: "2vh" }}></Icon>
                        </div>
                        <div className="addButton">
                            <Button className="addSales" onClick={() => this.props.history.push("/sales/detail")}>Add</Button>
                        </div>
                    </div>
                    <div className="container2">
                        <table id="tableSales1" cellspasing="0" border="1 white">
                            <thead>
                                <tr className="tableSales2" >
                                    <th className="tDate">Date</th>
                                    <th className="tText">Customer</th>
                                    <th className="tText">Gross Amount (Rp)</th>
                                    <th className="tText">Discount (Rp)</th>
                                    <th className="tText">Tax (Rp)</th>
                                    <th className="tText">Invoice (Rp)</th>
                                    <th className="tText">Status</th>
                                    <th className="tText">Action</th>
                                </tr>
                            </thead>
                            <tbody className="tbodySales">
                                {
                                    this.state.sales.map((sales, index) => {
                                        return (
                                            <tr key={index} className="salesList">
                                                <td>{sales.dateSales}</td>
                                                <td>{sales.customer}</td>
                                                <td>{sales.discount}</td>
                                                <td>{sales.gross}</td>
                                                <td>{sales.tax}</td>
                                                <td>{sales.invoice}</td>
                                                <td>{sales.status}</td>
                                                <td><button onClick={() => this.detailClick(sales.idSales)}>Detail</button></td>
                                            </tr>

                                        )
                                    })
                                }

                            </tbody>
                        </table>
                        <div className="paginationSales">
                            <Pagination style={{ background: 'white', marginTop: '0' }} page={this.state.page} onChange={this.handleChange} count={this.state.count} />
                        </div>

                    </div>

                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    checkLogin: state.authReducer.isLogin,
    dataLoginUser: state.authReducer.userLogin,
    salesList: state.salesReducer.salesList,
    salesClick: state.salesReducer.sales,

})

const mapDispatchToProps = dispatch => {
    return {
        salesData: (data) => dispatch({ type: "GETALL_SALES", payload: data }),
        salesClick: (data)=> dispatch({type: "SALES_CLICK", payload: data}),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Sales);