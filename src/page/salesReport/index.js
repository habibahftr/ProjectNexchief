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
import Swal from 'sweetalert2';
import ComponentToPrint from "../sales/componentToPrint";

class SalesReport extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sales: [],
            salesClick: {},
            salesPrint:[],
            limit: 5,
            count: 0,
            page: 1,
            pageNow: 1,
            checkedPaid:false,
            checkedUnpaid: false,
            actPaid: 0,
            actUnpaid: 0,
            search: "",
            searchIcon: true,
        }
    }
    componentDidMount() {
        this.getCountSales();
        this.getAllSales(this.state.page, this.state.limit)
        this.getAllPrint();
    }

    setValue = el => {
        this.setState({
            [el.target.name]: el.target.value
        })
    }

    searchClick=()=>{
        const iconTemp = this.state.searchIcon
        const searchTemp = this.state.search
        const checkedPaid = this.state.checkedPaid
        const checkedUnpaid = this.state.checkedUnpaid
        if (iconTemp === true) {
            if (searchTemp !== "") {
                if(checkedPaid=== true && checkedUnpaid===false){
                    this.getCountFilter("paid", searchTemp)
                    this.getAllFilter(this.state.pageNow, this.state.limit, "paid", searchTemp)
                    this.getAllSearchFilter("paid", searchTemp)
                }else if(checkedPaid===false && checkedUnpaid=== true){
                    this.getCountFilter("unpaid", searchTemp)
                    this.getAllFilter(this.state.pageNow, this.state.limit, "unpaid", searchTemp)
                    this.getAllSearchFilter("unpaid", searchTemp)
                }else if(checkedPaid=== true && checkedUnpaid=== true){
                    Swal.fire({
                        title: 'Empty data',
                        icon: 'warning'
                    })
                }else if(checkedPaid===false && checkedUnpaid===false){
                    this.getCountProd(searchTemp);
                    this.getAllSalesProd(this.state.pageNow, this.state.limit, searchTemp)
                    this.getSearchPrint(searchTemp)
                }
                this.setState({
                    searchIcon: false
                })
            } else {
                Swal.fire({
                    title: 'Input product name for searching!',
                    icon: 'warning'
                })
            }
        } else {
            this.setState({
                search: "",
                searchIcon: true,
            })
            this.getCountSales();
            this.getAllSales(this.state.page, this.state.limit)
            this.getAllPrint();
        }

    }

    // -------------------------------------------GET PRINT SEARCH BY PRODUCT-----------------------------------------
    getSearchPrint=(search)=>{
        console.log("stsussssss", search);
        fetch(`http://localhost:8080/nexchief/sales/filter/print/?distributor=`+this.props.dataLoginUser.id+`&nameproduct=`+search, {
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
                    salesPrint: json,
                });
                console.log("ini data sales", this.state.sales);
            })
            .catch(() => {
                alert("Failed fetching 00")
            })
    }

    // -------------------------------------------GET ALL PRINT--------------------------------------------------------
    getAllPrint=()=>{
    fetch(`http://localhost:8080/nexchief/sales/all/`+this.props.dataLoginUser.id, {
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
                    salesPrint: json,
                });
                console.log("ini data sales", this.state.sales);
            })
            .catch(() => {
                alert("Failed fetching")
            })

    }

    // ------------------------------------------GET ALL SEARCH&FILTER PRINT-------------------------------------------
    getAllSearchFilter=(status, search)=>{
        fetch(`http://localhost:8080/nexchief/sales/search/filter/print/?distributor=`+this.props.dataLoginUser.id+`&status=`+status+`&nameProduct=`+search, {
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
                    salesPrint: json,
                });
                console.log("ini data sales print", this.state.salesPrint);
            })
            .catch(() => {
                alert("Failed fetching")
            })
        
    }

     // -----------------------------------------GET ALL SEARCH AND FILTER BY TOGGLE----------------------------------
     getAllFilter = (value, limit, status, seacrh) => {
        console.log("stsussssss", status);
        fetch(`http://localhost:8080/nexchief/sales/filter/search/?page=` + value + `&limit=` + limit + `&distributor=` + this.props.dataLoginUser.id + `&status=` + status + `&nameProduct=` + seacrh, {
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
            .catch((e) => {
                alert("Failed fetching 99")
                console.log(e);
            })
    }

    // ----------------------------------------GET COUNT SEARCH AND FILTER BY TOGGLE----------------------
    getCountFilter = (status, search) => {
        fetch(`http://localhost:8080/nexchief/sales/filter/toggle/?distributor=` + this.props.dataLoginUser.id + `&status=` + status + `&nameProduct=` + search, {
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
                alert("Failed fetching 77")
            })
    }




    // -------------------------------------------GET ALL FILTER-------------------------------------------------------
    getSalesStatusPrint=(status)=>{
        // const tempPrint= this.state.salesPrint
        // const print = tempPrint.filter(el=> el.status.toUpperCase() === status.toUpperCase());
        // console.log("data print",print);
        // this.setState({
        //     salesPrint: print
        // })

        fetch(`http://localhost:8080/nexchief/sales/filter?distributor=`+this.props.dataLoginUser.id+`&status=`+status, {
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
                    salesPrint: json,
                });
                console.log("ini data sales print", this.state.salesPrint);
            })
            .catch(() => {
                alert("Failed fetching")
            })

    }

    // -------------------------------------------GET PRODUCT SEACRH--------------------------------------------------
    getAllSalesProd=(value, limit, search)=>{
        console.log("stsussssss", search);
        fetch(`http://localhost:8080/nexchief/sales/filter/prod/?page=`+value+`&limit=`+limit+`&distributor=`+this.props.dataLoginUser.id+`&nameProduct=`+search, {
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
                alert("Failed fetching")
            })

    }

    // ------------------------------------------------COUNT ALL SALES---------------------------------------------
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

    // -----------------------------------------------GET COUNT PRODUCT SEARCH--------------------------------------
    getCountProd=(search)=>{
        fetch(`http://localhost:8080/nexchief/sales/product/count/?distributor=`+this.props.dataLoginUser.id+`&nameProduct=`+search, {
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

    // -----------------------------------------------HANDLE CHANGE-------------------------------------------------
    handleChange = (event, value) => {
        console.log("actpaid", this.state.actPaid);
        console.log("actUnpaid", this.state.actUnpaid);
        this.setState({
            page: value,
        })
        let searchTemp = this.state.search
        let paid = this.state.checkedPaid
        let unpaid = this.state.checkedUnpaid
        if (searchTemp === "" && paid === false && unpaid === false) {
            this.getCountSales();
            this.getAllSales(value, this.state.limit);
        }
        else if (paid === true && searchTemp === "" && unpaid === false) {
            this.getCountStatus("paid");
            this.getAllSalesStatus(value, this.state.limit, "paid")
        } else if (paid === false && searchTemp === "" && unpaid === true) {
            this.getCountStatus("unpaid");
            this.getAllSalesStatus(value, this.state.limit, "unpaid")
        } else if (paid === false && searchTemp !== "" && unpaid === false) {
            this.getCountProd(searchTemp)
            this.getAllSalesProd(value, this.state.limit, searchTemp)
        }else if(paid===true && searchTemp !=="" && unpaid===false){
            this.getCountFilter("paid", searchTemp)
            this.getAllFilter(value, this.state.limit, "paid", searchTemp)
        }else if(paid===false && searchTemp !=="" && unpaid===true){
            this.getCountFilter("unpaid", searchTemp)
            this.getAllFilter(value, this.state.limit, "unpaid", searchTemp)
        }
    }

    // ---------------------------------------------GET ALL SALES PAGINATION----------------------------------------
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

    // ----------------------------------------GET COUNT ALL STATUS----------------------------------------
    getCountStatus = (status) => {
       
        fetch(`http://localhost:8080/nexchief/sales/status/count/?distributor=` + this.props.dataLoginUser.id + `&status=` + status, {
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
                alert("Failed fetching2")
            })

    }

    // --------------------------------------GET ALL STATUS------------------------------------------------------
    getAllSalesStatus = (value, limit, status) => {
        console.log("stsussssss", status);
        fetch(`http://localhost:8080/nexchief/sales/filter/status/?page=` + value + `&limit=` + limit + `&distributor=` + this.props.dataLoginUser.id + `&status=` + status, {
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
                alert("Failed fetching1")
            })
    }

    // ------------------------------------------------CONTROLLER TOGGLE---------------------------------------------
    paidController = () => {
        let tempUn = this.state.actUnpaid
        const searchTemp = this.state.search
        if (tempUn === 0) {
            this.setState({
                status: "paid",
                actPaid: 1,
            })
            if (searchTemp === "") {
                console.log("1");
                this.getCountStatus("paid")
                this.getAllSalesStatus(this.state.pageNow, this.state.limit, "paid")
                this.getSalesStatusPrint("paid")
            } else {
                console.log("2");
                this.getCountFilter("paid", searchTemp)
                this.getAllFilter(this.state.pageNow, this.state.limit, "paid", searchTemp)
                this.getAllSearchFilter("paid", searchTemp)
            }

            console.log("paid", this.state.status);
        } else if (tempUn === 1) {
            this.setState({
                sales: [],
                actPaid: 1,
                count: 0,
            })
        }
    }

    paidFalse = () => {
        let tempUn = this.state.actUnpaid
        const searchTemp = this.state.search
        if (tempUn === 1) {
            this.setState({
                actPaid: 0,
                status: "unpaid"
            })
            if (searchTemp === "") {
                console.log("3");
                this.getCountStatus("unpaid")
                this.getAllSalesStatus(this.state.pageNow, this.state.limit, "unpaid")
                this.getSalesStatusPrint("unpaid")
            } else {
                console.log("4");
                this.getCountFilter("unpaid", searchTemp)
                this.getAllFilter(this.state.pageNow, this.state.limit, "unpaid", searchTemp)
                this.getAllSearchFilter("unpaid", searchTemp)
            }
        } else {
            this.setState({
                actPaid: 0,
                actUnpaid: 0,
            })
            if (searchTemp === "") {
                console.log("5");
                this.getCountSales();
                this.getAllSales(this.state.pageNow, this.state.limit)
                this.getAllPrint();
            } else {
                console.log("6");
                this.getCountProd(searchTemp);
                this.getAllSalesProd(this.state.pageNow, this.state.limit, searchTemp)
                this.getSearchPrint(searchTemp);
            }
        }
    }

    unpaidController = () => {
        console.log("object", this.state.actPaid);
        let temp = this.state.actPaid
        const searchTemp = this.state.search
        if (temp === 0) {
            this.setState({
                status: "unpaid",
                actUnpaid: 1,
            })
            if (searchTemp === "") {
                this.getCountStatus("unpaid")
                this.getAllSalesStatus(this.state.pageNow, this.state.limit, "unpaid")
                this.getSalesStatusPrint("unpaid")
            } else {
                console.log("7");
                this.getCountFilter("unpaid", searchTemp)
                this.getAllFilter(this.state.pageNow, this.state.limit, "unpaid", searchTemp)
                this.getAllSearchFilter("unpaid", searchTemp);
            }

        } else if (temp === 1) {
            this.setState({
                sales: [],
                actUnpaid: 1,
                count: 0,
            })
        }

    }

    unpaidFalse = () => {
        console.log("object", this.state.actPaid);
        let temp = this.state.actPaid
        const searchTemp = this.state.search
        if (temp === 1) {
            this.setState({
                actUnpaid: 0,
                status: "paid"
            })
            if (searchTemp === "") {
                this.getCountStatus("paid")
                this.getAllSalesStatus(this.state.pageNow, this.state.limit, "paid")
                this.getSalesStatusPrint("paid");
            } else {
                this.getCountFilter("paid", searchTemp)
                this.getAllFilter(this.state.pageNow, this.state.limit, "paid", searchTemp)
                this.getAllSearchFilter("paid", searchTemp);
            }
        } else {
            this.setState({
                actUnpaid: 0,
                actPaid: 0
            })
            if (searchTemp === "") {
                this.getCountSales();
                this.getAllSales(this.state.pageNow, this.state.limit)
                this.getAllPrint();
            } else {
                console.log("0");
                this.getCountProd(searchTemp);
                this.getAllSalesProd(this.state.pageNow, this.state.limit, searchTemp)
                this.getSearchPrint(searchTemp)
            }
        }
    }

    // --------------------------------------------HADLE CHANGE TOGGLE-------------------------------------------------
    handleChangeStatus = (event) => {
        this.setState({
            checkedPaid: event.target.checked,
        })
        const paid = event.target.checked
        if (paid) {
            this.paidController()
        } else {
            this.paidFalse()
        }
    }

    handleChangeStatus2 = (event) => {
        this.setState({
            checkedUnpaid: event.target.checked,
        })
        const unpaid = event.target.checked
        if (unpaid) {
            this.unpaidController()

        } else {
            this.unpaidFalse();
        }
    }

    render() {
        if (this.props.checkLogin === false) {
            this.props.history.push("/")
        }
        const { checkedPaid, checkedUnpaid } = this.state
        return (
            <div className="salesReportPage">
                <div className="headerSalesReport">
                    <div className="titleProductReport">
                        <Label className="monthly">SALES</Label>
                        <Label className="salesact">REPORT</Label>
                    </div>
                    <div className="reportHeaderSales">
                        <button className="backReportSls" onClick={() => this.props.history.push("/report")}>Back to Report Page</button>
                    </div>
                </div>
                <div className="bodySalesReport">
                    <div className="container5">
                        <div className="searchSales">
                            <Input className="searchSales2" name="search" onChange={this.setValue} value={this.state.search} placeholder="seacrh by name product.."></Input>
                            <Icon className={this.state.searchIcon === true ? "fas fa-search" : "fas fa-window-close"} onClick={() => this.searchClick()} style={{ color: "black", fontSize: "17px", border: "solid", padding: "2px", height: "17px", backgroundColor: "white" }}></Icon>
                        </div>
                        <div className="toggleSales">
                            <div>
                                <FormControlLabel
                                    control={<Switch checked={checkedPaid} color="primary" className="toogle" onChange={this.handleChangeStatus} name="checkedPaid" />}
                                    label="PAID" style={{color:"white"}}
                                />
                            </div>
                            <div>
                                <FormControlLabel
                                    control={<Switch checked={checkedUnpaid} color="primary" className="toogle" onChange={this.handleChangeStatus2} name="checkedUnpaid" />}
                                    label="UNPAID" style={{color:"white"}}
                                />
                            </div>
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
                        <ComponentToPrint ref={el => (this.componentRef = el)} salesPrint={this.state.salesPrint} />
                    </div>
                    <div className="containerTableSales">
                        <center>
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
                                        this.state.sales.map((sales, index) => {
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


                    </div>
                    <div className="paginationReportSales">
                        <Pagination style={{ background: 'white', marginTop: '0' }} page={this.state.page} onChange={this.handleChange} count={this.state.count} />
                    </div>

                </div>
            </div >
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