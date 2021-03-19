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

class Sales extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sales: [],
            salesClick: {},
            limit: 7,
            count: 0,
            page: 1,
            pageNow:1,
            checkedPaid: false,
            checkedUnpaid: false,
            status: "paid",
            actPaid: 0,
            actUnpaid: 0,
            search: "",
            searchIcon: true,
        }
    }

    componentDidMount() {
        this.getCountSales();
        this.getAllSales(this.state.page, this.state.limit)
    }

    setValue = el => {
        this.setState({
            [el.target.name]: el.target.value
        })
    }

    // ------------------------------------------SEARCH CLICK--------------------------------------------------------
    searchClick=()=>{
        const iconTemp= this.state.searchIcon
        const searchTemp= this.state.search
        if(iconTemp === true){
            if(searchTemp !== ""){
                this.getCountProd();
                this.getAllSalesProd(this.state.pageNow, this.state.limit, searchTemp)
                this.setState({
                    searchIcon: false
                })
            }else{
                Swal.fire({
                    title: 'Input product name for searching!',
                    icon: 'warning'
                })
            }
        }else{
            this.setState({
                search: "",
                searchIcon: true,
            })
            this.getCountSales();
            this.getAllSales(this.state.page, this.state.limit)
        }

    }
    paidController = () => {
        let tempUn = this.state.actUnpaid
        if (tempUn === 0) {
            this.setState({
                status: "paid",
                actPaid: 1,
            }, this.getCountStatus("paid"),
                this.getAllSalesStatus(this.state.page, this.state.limit,"paid"))
            console.log("paid", this.state.status);
        } else if (tempUn === 1) {
            this.setState({
                sales: [],
                actPaid: 1,
            })
        }
    }

    paidFalse = () => {
        let tempUn = this.state.actUnpaid
        if (tempUn === 1) {
            this.setState({
                actPaid: 0,
                status: "unpaid"
            }, this.getCountStatus("unpaid"),
                this.getAllSalesStatus(this.state.page, this.state.limit,"unpaid"))
        } else {
            this.setState({
                actPaid: 0,
                actUnpaid:0,
            })
            this.getCountSales();
            this.getAllSales(this.state.page, this.state.limit)
        }
    }

    unpaidController = () => {
        console.log("object", this.state.actPaid);
        let temp = this.state.actPaid
        if (temp === 0) {
            this.setState({
                status: "unpaid",
                actUnpaid: 1,
            }, this.getCountStatus("unpaid"),
                this.getAllSalesStatus(this.state.page, this.state.limit,"unpaid"))
        } else if (temp === 1) {
            this.setState({
                sales: [],
                actUnpaid: 1,
            })
        }
    }

    unpaidFalse = () => {
        console.log("object", this.state.actPaid);
        let temp = this.state.actPaid
        if (temp === 1) {
            this.setState({
                actUnpaid: 0,
                status: "paid"
            }, this.getCountStatus("paid"),
                this.getAllSalesStatus(this.state.page, this.state.limit,"paid"))
        } else {
            this.setState({
                actUnpaid: 0,
                actPaid:0
            })
            this.getCountSales();
            this.getAllSales(this.state.page, this.state.limit)
        }
    }
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
    // -----------------------------------------------DETAIL CLICK-----------------------------------------------------
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
                this.props.salesClick({ sales: json })
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

    // ---------------------------------------GET COUNT ALL DATA--------------------------------------------
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
                alert("Failed fetching")
            })

    }

    // ----------------------------------------GET COUNT ALL PRODUCT-----------------------------------------------
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
                this.props.salesData({ list: json })
                console.log("ini data sales", this.state.sales);
            })
            .catch(() => {
                alert("Failed fetching")
            })
    }

    // ----------------------------------------GET ALL PRODUCT-----------------------------------------------
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
                this.props.salesData({ list: json })
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
        console.log("cek1",this.state.checkedPaid );
        console.log("cek2",this.state.checkedUnpaid );
        console.log("cek3",this.state.status ); 
        console.log("cek4",this.state.status ); 
            // actPaid: 0,
            // actUnpaid: 0,
        const { checkedPaid, checkedUnpaid } = this.state
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
                            <Input className="searchSales2" name="search" onChange={this.setValue} value={this.state.search} placeholder="seacrh by name product.."></Input>
                            <Icon className={this.state.searchIcon === true ? "fas fa-search" : "fas fa-window-close"} onClick={() => this.searchClick()} style={{ color: "black", fontSize: "17px", border:"solid", padding:"2px", height:"17px", backgroundColor:"white" }}></Icon>
                            {/* <label className="searchBtnSales">Search</label> */}
                        </div>
                        <div className="toggleSales">
                            <div>
                                <FormControlLabel
                                control={<Switch checked={checkedPaid} color="primary" className="toogle" onChange={this.handleChangeStatus} name="checkedPaid" />}
                                label="PAID"
                                />
                            </div>
                            <div>
                            <FormControlLabel
                                control={<Switch checked={checkedUnpaid} color="primary" className="toogle" onChange={this.handleChangeStatus2} name="checkedUnpaid" />}
                                label="UNPAID"
                                />
                                {/* <Grid component="label" container alignItems="center" spacing={1}>
                                    <Grid item>
                                        <Switch checked={checkedUnpaid} color="primary" className="toogle" onChange={this.handleChangeStatus2} name="checkedUnpaid" />
                                    </Grid>
                                    <Grid item>UNPAID</Grid>
                                </Grid> */}
                            </div>
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
                                                <td>{sales.gross}</td>
                                                <td>{sales.discount}</td>
                                                <td>{sales.tax}</td>
                                                <td>{sales.invoice}</td>
                                                <td>{sales.status}</td>
                                                <td><button style={{ cursor: "pointer" }} onClick={() => this.detailClick(sales.idSales)}>Detail</button></td>
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
        salesClick: (data) => dispatch({ type: "SALES_CLICK", payload: data }),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Sales);