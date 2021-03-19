import React, { Component } from 'react';
import { connect } from 'react-redux';
import Icon from '../../component/icon';
import Input from '../../component/input';
import Pagination from '@material-ui/lab/Pagination';
import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Label from '../../component/label';
import { Button } from '@material-ui/core';
import ReactToPrint from 'react-to-print';
import "./style.css"


class ComponentToPrint extends Component{
    constructor(props) {
        super(props);
        this.state = {
            SalesList: [],

        }
    }
    render() {
        return (
            <center>
                <h1>INI REPORT </h1>
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
                                </tr>
                            </thead>
                            <tbody className="tbodySales">
                                {
                                    this.props.sales.map((sales, index) => {
                                        return (
                                            <tr key={index} className="salesList">
                                                <td>{sales.dateSales}</td>
                                                <td>{sales.customer}</td>
                                                <td>{sales.gross}</td>
                                                <td>{sales.discount}</td>
                                                <td>{sales.tax}</td>
                                                <td>{sales.invoice}</td>
                                                <td>{sales.status}</td>
                                            </tr>

                                        )
                                    })
                                }

                            </tbody>
                        </table>
            </center>
        );
    }


}
class SalesReport extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sales: [],
            salesClick:{},
            limit: 7,
            count: 0,
            page: 1,
        }
    }
    componentDidMount() {
        this.getCountSales();
        this.getAllSales(this.state.page, this.state.limit)
    }

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
                alert("Failed fetching count")
            })

    }

    handleChange = (event, value) => {
        this.setState({
            page: value,
        })
        this.getCountSales();
        this.getAllSales(value, this.state.limit);
    }

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
                console.log("ini data sales", this.state.sales);
            })
            .catch(() => {
                alert("Failed fetching get all")
            })

    }


    render() {
        if (this.props.checkLogin === false) {
            this.props.history.push("/")
        }
        return (
            <div className="salesReportPage">
                <div className="headerSalesReport">
                    <div className="tittleSalesReport">
                        <Label className="labelProduct">SALES</Label>
                        <Label className="labelReport">REPORT</Label>
                    </div>
                    <div className="backBtnSalesReport">
                        <Button className="backReport" onClick={() => this.props.history.push("/report")}>Back to Report Page</Button>
                    </div>
                </div>
                <div className="bodySalesReport">
                    <div className="container5">
                        <div className="searchSales">
                            <Input className="searchProdReport" ></Input>
                            <Icon className="fas fa-search" style={{ color: "grey", marginLeft: "-5vh", fontSize: "15px", marginTop: "2vh" }}></Icon>
                        </div>
                        <div className="printProdReport">
                            <ReactToPrint
                                trigger={() => <Icon className="fas fa-file-pdf" style={{ color: "grey", marginLeft: "-5vh", fontSize: "30px", marginTop: "2vh" }}></Icon>}
                                content={() => this.componentRef}
                            ></ReactToPrint>

                            <div>Print Report</div>
                        </div>
                    </div>
                    <div className="container6">
                        <ComponentToPrint ref={el => (this.componentRef = el)} sales={this.state.sales} />

                    </div>
                    <div className="paginationReportSales">
                        <Pagination style={{ background: 'white', marginTop: '0' }} page={this.state.page} onChange={this.handleChange} count={this.state.count} />
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
        productData: (data) => dispatch({ type: "GETALL_PRODUCT", payload: data }),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SalesReport);