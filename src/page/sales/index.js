import React, { Component, useDebugValue } from 'react';
import Button from '../../component/button';
import Icon from '../../component/icon';
import Input from "../../component/input"
import Label from '../../component/label';
import Pagination from '@material-ui/lab/Pagination';
import "./style.css"
import { connect } from 'react-redux';
import Switch from '@material-ui/core/Switch';
import Swal from 'sweetalert2';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import ComponentToPrint from './componentToPrint'
import ReactToPrint from 'react-to-print';
import { withStyles } from '@material-ui/core';
import { green, purple } from '@material-ui/core/colors';

class Sales extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sales: [],
            salesClick: {},
            salesPrint: [],
            limit: 10,
            count: 0,
            page: 1,
            pageNow: 1,
            checkedPaid: false,
            checkedUnpaid: false,
            status: "paid",
            actPaid: 0,
            actUnpaid: 0,
            search: "",
            searchIcon: true,
            disableToggle: false,
            optionPrint: "all",
            dateFirst: "",
            dateLast: "",
            optionSearch: "",
            displaySearch: "none",
            displaySearch2: "none",
            date1: "",
            date2: ""

        }
    }

    componentDidMount() {
        this.getDateHandler();
    }

    setValue = el => {
        this.setState({
            [el.target.name]: el.target.value
        })
    }

    setValueSearch=el=>{
        if(el.target.value===""){
            this.getDateHandler();
        }
        this.setState({
            search: el.target.value
        })
    }

    setOptionSearch = el => {
        this.setState({
            optionSearch: el.target.value,
        }, () => this.displaySearchHandler())
    }

    displaySearchHandler = () => {
        let temp = this.state.optionSearch
        if (temp === "Product Name") {
            this.setState({
                displaySearch: "",
                displaySearch2: "none",
            },()=> this.getDateHandler())
        }
        else if (temp === "Date") {
            this.setState({
                displaySearch: "none",
                displaySearch2: "",
            })
        }
        else {
            this.setState({
                displaySearch: "none",
                displaySearch2: "none",
            })
            this.getDateHandler()
        }
    }
    // --------------------------------------------GET DATE ---------------------------------------------------------
    getDateHandler = () => {
        let current_datetime = new Date()
        let year = current_datetime.getFullYear();
        let monthTwoDigit = ("0" + (current_datetime.getMonth() + 1)).slice(-2)
        let dateTwoDigit = ("0" + current_datetime.getDate()).slice(-2)
        let dateFirst = year + "-" + monthTwoDigit + "-01"
        let dateLast = year + "-" + monthTwoDigit + "-" + dateTwoDigit
        console.log("uji tanggal:", dateFirst)
        this.setState({
            dateFirst: dateFirst,
            dateLast: dateLast,
            page: 1,
        }, () => this.getAllSales(this.state.page, this.state.limit))
    }

    // ------------------------------------------SEARCH CLICK--------------------------------------------------------
    searchClick = () => {
        this.setState({
            page:1
        })
        const datetemp1 = this.state.date1
        const datetemp2 = this.state.date2
        const iconTemp = this.state.searchIcon
        const searchTemp = this.state.search
        const optionTemp = this.state.optionPrint
        const optionSearchTemp = this.state.optionSearch
        if (optionSearchTemp === "Product Name") {
            if (searchTemp !== "") {
                if (optionTemp === "paid") {
                    this.getCountFilter("paid", searchTemp)
                    this.getAllFilter(this.state.pageNow, this.state.limit, "paid", searchTemp)
                    this.getAllSearchFilter("paid", searchTemp)
                } else if (optionTemp === "unpaid") {
                    this.getCountFilter("unpaid", searchTemp)
                    this.getAllFilter(this.state.pageNow, this.state.limit, "unpaid", searchTemp)
                    this.getAllSearchFilter("unpaid", searchTemp)
                } else if (optionTemp === "all") {
                    console.log("object heiiiiiii");
                    this.getCountProd(searchTemp);
                    this.getAllSalesProd(this.state.pageNow, this.state.limit, searchTemp)
                    this.getAllPrintProduct(searchTemp);
                } else {
                    Swal.fire({
                        title: 'choose the option filter',
                        icon: 'warning'
                    })
                }
                this.setState({
                    searchIcon: false
                })
            }
        }
        else if (optionSearchTemp === "Date") {
            if (optionTemp === "paid") {
                this.getCountStatus("paid")
                this.getAllSalesStatus(this.state.pageNow, this.state.limit, "paid")
                this.getSalesStatusPrint("paid")
            } else if (optionTemp === "unpaid") {
                this.getCountStatus("unpaid")
                this.getAllSalesStatus(this.state.pageNow, this.state.limit, "unpaid")
                this.getSalesStatusPrint("unpaid")
            } else if (optionTemp === "all") {
                this.getCountSales();
                this.getAllSales(this.state.pageNow, this.state.limit)
                this.getAllPrint();
            }
            else {
                Swal.fire({
                    title: 'Insert Enter start date and end date',
                    icon: 'warning'
                })
            }
        }
        else if(optionSearchTemp !== "Date" || optionSearchTemp !== "Product Name"){
            if (optionTemp === "paid") {
                this.getCountStatus("paid")
                this.getAllSalesStatus(this.state.pageNow, this.state.limit, "paid")
                this.getSalesStatusPrint("paid")
            } else if (optionTemp === "unpaid") {
                this.getCountStatus("unpaid")
                this.getAllSalesStatus(this.state.pageNow, this.state.limit, "unpaid")
                this.getSalesStatusPrint("unpaid")
            } else if (optionTemp === "all") {
                this.getCountSales();
                this.getAllSales(this.state.pageNow, this.state.limit)
                this.getAllPrint();
            }
            else {
                Swal.fire({
                    title: 'Input product name or option filter for searching!',
                    icon: 'warning'
                })
            }
        }
    }


// -----------------------------------------CLOSE CLICK--------------------------------------------------------------------------------
    closeClick = () => {
        this.setState({
            search: "",
            optionPrint: "all",
            page: 1
        }, ()=> this.getAllSales(this.state.page, this.state.limit))
        this.getCountSales();
        
    }

    // -----------------------------------------GET SALES STATUS PRINT---------------------------------------------------------------S
    getSalesStatusPrint = (status) => {
        fetch(`http://localhost:8080/nexchief/sales/filter?distributor=` + this.props.dataLoginUser.id + `&status=` + status+`&dateFirst=`+this.state.dateFirst+`&dateLast=`+this.state.dateLast, {
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
                alert("Failed fetching status print")
            })

    }

    // --------------------------------------------GET ALL SEARCH AND FILTER-------------------------------------------------
    getAllSearchFilter = (status, search) => {
        fetch(`http://localhost:8080/nexchief/sales/search/filter/print/?distributor=` + this.props.dataLoginUser.id + `&status=` + status + `&nameProduct=` + search, {
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

    // -----------------------------------------------EDIT CLICK-----------------------------------------------------
    editClick = (idSales) => {
        fetch(`http://localhost:8080/nexchief/sales/` + idSales, {
            method: "get",
            headers: {
                "Content-Type": "application/json; ; charset=utf-8",
                "Access-Control-Allow-Headers": "Authorization, Content-Type",
                "Access-Control-Allow-Origin": "*"
            }
        })
            .then(response => response.json())
            .then(json => {
                this.props.salesClick(json, 1)
                this.props.history.push("/sales/detail")
            })
            .catch(() => {
                alert("Failed fetching")
            })
    }

    // -----------------------------------------DETAIL CLICK-----------------------------------------------------
    detailClick = (idSales) => {
        fetch(`http://localhost:8080/nexchief/sales/` + idSales, {
            method: "get",
            headers: {
                "Content-Type": "application/json; ; charset=utf-8",
                "Access-Control-Allow-Headers": "Authorization, Content-Type",
                "Access-Control-Allow-Origin": "*"
            }
        })
            .then(response => response.json())
            .then(json => {
                this.props.salesClick(json, 2)
                this.props.history.push("/sales/detail")
            })
            .catch(() => {
                alert("Failed fetching")
            })
    }

    // -----------------------------------------HANDLE CHANGE----------------------------------------------------------
    handleChange = (event, value) => {
        console.log("actpaid", this.state.optionPrint);
        console.log("actUnpaid", this.state.actUnpaid);
        this.setState({
            page: value,
        })
        let searchTemp = this.state.search
        let optionTemp = this.state.optionPrint
        const optionSearchTemp = this.state.optionSearch
        if (optionSearchTemp === "Date") {
            if (optionTemp === "paid") {
                this.getCountStatus("paid")
                this.getAllSalesStatus(value, this.state.limit, "paid")
            } else if (optionTemp === "unpaid") {
                this.getCountStatus("unpaid")
                this.getAllSalesStatus(value, this.state.limit, "unpaid")
                this.getSalesStatusPrint("unpaid")
            } else if (optionTemp === "all") {
                this.getCountSales();
                this.getAllSales(value, this.state.limit)
                this.getAllPrint();
            }
        }
        if (searchTemp === "" && optionTemp === "all") {
            // this.getCountSales();
            this.getAllSales(value, this.state.limit);
        }
        else if (searchTemp === "" && optionTemp === "paid") {
            this.getCountStatus("paid");
            this.getAllSalesStatus(value, this.state.limit, "paid")
        } else if (searchTemp === "" && optionTemp === "unpaid") {
            this.getCountStatus("unpaid");
            this.getAllSalesStatus(value, this.state.limit, "unpaid")
        } else if (searchTemp !== "" && optionTemp === "all") {
            this.getCountProd(searchTemp)
            this.getAllSalesProd(value, this.state.limit, searchTemp)
        } else if (searchTemp !== "" && optionTemp === "paid") {
            this.getCountFilter("paid", searchTemp)
            this.getAllFilter(value, this.state.limit, "paid", searchTemp)
        } else if (searchTemp !== "" && optionTemp === "unpaid") {
            this.getCountFilter("unpaid", searchTemp)
            this.getAllFilter(value, this.state.limit, "unpaid", searchTemp)
        }
    }

    // ---------------------------------------GET COUNT ALL DATA--------------------------------------------
    getCountSales = () => {
        fetch(`http://localhost:8080/nexchief/sales/count/?distributor=` + this.props.dataLoginUser.id + `&dateFirst=` + this.state.dateFirst + `&dateLast=` + this.state.dateLast, {
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
                }, () => this.getAllSales(this.state.page, this.state.limit))
                console.log("INI RESPON COUNT Sales ", json)
            })
            .catch(() => {
                alert("Failed fetching")
            })

    }

    // ----------------------------------------GET COUNT SEARCH AND FILTER BY Status----------------------
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
                alert("Failed fetching")
            })
    }

    // ----------------------------------------GET COUNT ALL STATUS----------------------------------------
    getCountStatus = (status) => {

        fetch(`http://localhost:8080/nexchief/sales/status/count/?distributor=` + this.props.dataLoginUser.id + `&status=` + 
        status+`&dateFirst=`+this.state.dateFirst+`&dateLast=`+this.state.dateLast, {
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
                alert("Failed fetching count status")
            })

    }

    // ----------------------------------------GET COUNT ALL PRODUCT-----------------------------------------------
    getCountProd = (search) => {
        fetch(`http://localhost:8080/nexchief/sales/product/count/?distributor=` + this.props.dataLoginUser.id + `&nameProduct=` + search, {
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
                alert("Failed fetching 7")
            })
    }


    // ----------------------------------------GET ALL DATA---------------------------------------------
    getAllSales = (value, limit) => {
        fetch(`http://localhost:8080/nexchief/sales/paging/?page=` + value + `&limit=` + limit + `&id=` + this.props.dataLoginUser.id + `&dateFirst=` + this.state.dateFirst + `&dateLast=` + this.state.dateLast, {
            method: "get",
            headers: {
                "Content-Type": "application/json; ; charset=utf-8",
                "Access-Control-Allow-Headers": "Authorization, Content-Type",
                "Access-Control-Allow-Origin": "*"
            }
        })
            .then(response => response.json())
            .then(json => {
                let limitPage = json.count/this.state.limit
                this.setState({
                    sales: json.salesList,
                    count: Math.ceil(limitPage)
                }, () => this.getAllPrint());
                this.props.salesData({ list: json })
                console.log("ini data sales", this.state.sales);
            })
            .catch(() => {
                alert("Failed fetching")
            })

    }

    // --------------------------------------GET ALL STATUS------------------------------------------------------
    getAllSalesStatus = (value, limit, status) => {
        console.log("stsussssss", status);
        fetch(`http://localhost:8080/nexchief/sales/filter/status/?page=` + value + `&limit=` + limit + `&distributor=` + this.props.dataLoginUser.id + `&status=` + status+`&dateFirst=`+this.state.dateFirst+`&dateLast=`+this.state.dateLast, {
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
                this.props.salesData({ list: json })
                console.log("ini data sales", this.state.sales);
            })
            .catch(() => {
                alert("Failed fetching get all")
            })
    }

    // -----------------------------------------GET ALL SEARCH AND FILTER BY Status----------------------------------
    getAllFilter = (value, limit, status, seacrh) => {
        console.log("stsussssss", status);
        fetch(`http://localhost:8080/nexchief/sales/filter/search/?page=` + value + `&limit=` + limit + `&distributor=` + this.props.dataLoginUser.id +
         `&status=` + status + `&nameProduct=` + seacrh, {
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
                this.props.salesData({ list: json })
                console.log("ini data sales", this.state.sales);
            })
            .catch(() => {
                alert("Failed fetching")
            })
    }

    // ----------------------------------------GET ALL PRODUCT-----------------------------------------------
    getAllSalesProd = (value, limit, search) => {
        console.log("stsussssss", search);
        fetch(`http://localhost:8080/nexchief/sales/filter/prod/?page=` + value + `&limit=` + limit + `&distributor=` + this.props.dataLoginUser.id +
         `&nameProduct=` + search, {
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
                alert(e)
            })

    }

    // ----------------------------------------GET ALL PRINT--------------------------------------------------
    getAllPrint = () => {
        fetch(`http://localhost:8080/nexchief/sales/all/` + this.props.dataLoginUser.id + `?dateFirst=` + this.state.dateFirst +
         `&dateLast=` + this.state.dateLast, {
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
                console.log("ini data sales", this.state.salesPrint);
            })
            .catch(() => {
                alert("Failed fetching 1")
            })

    }

    // ------------------------------------------------GET ALL SALES FILTER BY NAME PRODUCT(PRINT)-----------------
    getAllPrintProduct = (search) => {
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
                console.log("ini data sales", this.state.salesPrint);
            })
            .catch(() => {
                alert("Failed fetching 1")
            })

    }


    priceFormat = price => {
        var bilangan = price;

        var number_string = '' + bilangan + '',
            sisa = number_string.length % 3,
            rupiah = number_string.substr(0, sisa),
            ribuan = number_string.substr(sisa).match(/\d{3}/g);

        if (ribuan) {
            var separator = sisa ? '.' : '';
            rupiah += separator + ribuan.join('.');
        }
        return rupiah;
    }

    closeDate=()=>{
        this.setState({
            optionSearch:"Select Option Search",
            optionPrint: "all"
        },()=>  this.displaySearchHandler())
    }

    render() {
        if (this.props.checkLogin === false) {
            this.props.history.push("/")
        }
        const { checkedPaid, checkedUnpaid } = this.state
        console.log("option", this.state.search);
        console.log("sales click", this.state.sales);
        console.log("optionSearch", this.state.optionSearch);
        return (
            <div className="salesPage">
                <div className="headerSales">
                    <Icon onClick={() => this.props.history.push("/home")} className="fas fa-home" 
                            style={{ color: "white", display: 'inline-block', marginTop: "2vh", fontSize: "40px", cursor: "pointer" }}>
                    </Icon>
                    <div className="titleSalesPage">
                        <Label className="monthly">MONTHLY</Label>
                        <Label className="salesact">SALES ACTIVITY</Label>
                    </div>
                </div>
                <div className="bodySales">
                    <div className="container1">
                        <div className="optionStatus">
                            <select className="optionSearch" name="optionSearch" onChange={this.setOptionSearch} value={this.state.optionSearch} >
                                <option defaultValue>Select Option Search</option>
                                <option value="Product Name">Product Name</option>
                                <option value="Date">Date</option>
                            </select>
                            <div className="seacrhSales1" style={{ display: this.state.displaySearch }}>
                                <Input className="searchSales2" name="search" onChange={this.setValueSearch} value={this.state.search} placeholder="seacrh by name product.."></Input>
                                <Icon className="far fa-window-close" onClick={() => this.closeClick()} style={{ marginLeft: "-50px", marginTop: "35px" }}></Icon>
                                {/* <Icon className="far fa-times-circle" onClick={()=>this.closeDate()}></Icon> */}
                            </div>
                            <div className="searchDate" style={{ display: this.state.displaySearch2 }}>
                                <input className="searchDate1" name="dateFirst" type="date" value={this.state.dateFirst} onChange={this.setValue}></input>
                                <span style={{ color: "white", marginRight: "2vh", marginTop: "6vh" }}> to </span>
                                <input type="date" name="dateLast" className="searchDate2" value={this.state.dateLast} onChange={this.setValue}></input>
                                <Icon className="far fa-times-circle" onClick={()=>this.closeDate()}></Icon>
                            </div>
                            <select className="optionStatus2" name="optionPrint" onChange={this.setValue} value={this.state.optionPrint} >
                                <option value="all">All</option>
                                <option value="paid">Status : Paid</option>
                                <option value="unpaid">Status : Unpaid</option>
                            </select>
                            <Icon className="fas fa-search" onClick={() => this.searchClick()} 
                                style={{ color: "black", marginLeft: "2vh", marginTop: "5vh", fontSize: "19px", border: "solid", padding: "2px", height: "23px", backgroundColor: "white", }}>
                            </Icon>
                        </div>
                        <div className="addButton" onClick={() => this.props.history.push("/sales/detail")}>
                            <Icon className="fas fa-file-invoice-dollar" ></Icon>
                            <div className="labeladd">Add new Sales</div>
                        </div>
                        <div className="printSales">
                            <ReactToPrint
                                trigger={() => <Icon className="fas fa-file-pdf" style={{ color: "white", margin: "auto", fontSize: "40px", marginTop: "3vh" }}></Icon>}
                                content={() => this.componentRef}
                            ></ReactToPrint>
                            <div className="labelPrint">Print Report</div>
                        </div>
                    </div>
                    <div className="container6">
                        <ComponentToPrint ref={el => (this.componentRef = el)} salesPrint={this.state.salesPrint} />
                    </div>
                    <div className="container2">
                        <table id="tableSales1" cellspasing="0" border="1 white">
                            <thead>
                                <tr className="tableSales2" style={{ textAlign: "center" }} >
                                    <th className="tText">Date</th>
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
                                                <td>{this.priceFormat(sales.gross)}</td>
                                                <td>{this.priceFormat(sales.discount)}</td>
                                                <td>{this.priceFormat(sales.tax)}</td>
                                                <td>{this.priceFormat(sales.invoice)}</td>
                                                <td>{sales.status}</td>
                                                <td><button style={{ cursor: "pointer" }} onClick={() => this.detailClick(sales.idSales)}>Detail</button>
                                                    <button className="buttonSales" style={{ cursor: "pointer", display:(sales.status==="UNPAID" ? "" : "none") }} onClick={() => this.editClick(sales.idSales)}>Edit</button></td>
                                            </tr>

                                        )
                                    })
                                }
                                {
                                    (this.state.sales.length >0)?
                                    ""
                                    :
                                    <tr>
                                        <td className="dataEmpty" colSpan="8" style={{textAlign:"center"}}> Data Empty</td>
                                    </tr>

                                }

                            </tbody>
                        </table>
                        <div className="paginationSales">
                            <Pagination color="secondary"  style={{ background: 'white', marginTop: '0' }} page={this.state.page} onChange={this.handleChange} count={this.state.count} />
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
        salesClick: (data, edit) => dispatch({ type: "SALES_CLICK", payload: { data, edit } }),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Sales);