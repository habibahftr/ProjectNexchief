import React, { Component} from 'react';
import Icon from '../../component/icon';
import Input from "../../component/input"
import Label from '../../component/label';
import Pagination from '@material-ui/lab/Pagination';
import "./style.css"
import { connect } from 'react-redux';
import Swal from 'sweetalert2';
import ComponentToPrint from './componentToPrint'
import ReactToPrint from 'react-to-print';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import { TrendingUpRounded } from '@material-ui/icons';
const styles = (theme) => ({
    root: {
      margin: 0,
      padding: theme.spacing(2),
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
  });
  
  const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
      <MuiDialogTitle disableTypography className={classes.root} {...other}>
        <Typography variant="h6">{children}</Typography>
        {onClose ? (
          <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
            <CloseIcon />
          </IconButton>
        ) : null}
      </MuiDialogTitle>
    );
  });
  
  const DialogContent = withStyles((theme) => ({
    root: {
      padding: theme.spacing(2),
    },
  }))(MuiDialogContent);
  
  const DialogActions = withStyles((theme) => ({
    root: {
      margin: 0,
      padding: theme.spacing(1),
    },
  }))(MuiDialogActions);

class Sales extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sales: [],
            salesClick: {},
            salesPrint: [],
            productList:[],
            limit: 10,
            count: 0,
            page: 1,
            pageNow: 1,
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
            date2: "",
            open:false

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
        const searchTemp = this.state.search
        const optionTemp = this.state.optionPrint
        const optionSearchTemp = this.state.optionSearch
        if (optionSearchTemp === "Product Name") {
            if (searchTemp !== "") {
                if (optionTemp === "paid") {
                    this.getAllFilter(this.state.pageNow, this.state.limit, "paid", searchTemp)
                    this.getAllSearchFilter("paid", searchTemp)
                } else if (optionTemp === "unpaid") {
                    this.getAllFilter(this.state.pageNow, this.state.limit, "unpaid", searchTemp)
                    this.getAllSearchFilter("unpaid", searchTemp)
                } else if (optionTemp === "all") {
                    console.log("object heiiiiiii");
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
                this.getAllSalesStatus(this.state.pageNow, this.state.limit, "paid")
                this.getSalesStatusPrint("paid")
            } else if (optionTemp === "unpaid") {
                this.getAllSalesStatus(this.state.pageNow, this.state.limit, "unpaid")
                this.getSalesStatusPrint("unpaid")
            } else if (optionTemp === "all") {
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
                this.getAllSalesStatus(this.state.pageNow, this.state.limit, "paid")
                this.getSalesStatusPrint("paid")
            } else if (optionTemp === "unpaid") {
                this.getAllSalesStatus(this.state.pageNow, this.state.limit, "unpaid")
                this.getSalesStatusPrint("unpaid")
            } else if (optionTemp === "all") {
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
       
    }

    // -----------------------------------------GET SALES STATUS (PRINT)---------------------------------------------------------------S
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

    // --------------------------------------------GET ALL SEARCH AND FILTER (PRINT)-------------------------------------------------
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
                this.getAllSalesStatus(value, this.state.limit, "paid")
            } else if (optionTemp === "unpaid") {
                this.getAllSalesStatus(value, this.state.limit, "unpaid")
                this.getSalesStatusPrint("unpaid")
            } else if (optionTemp === "all") {
                this.getAllSales(value, this.state.limit)
                this.getAllPrint();
            }
        }
        if (searchTemp === "" && optionTemp === "all") {
            this.getAllSales(value, this.state.limit);
        }
        else if (searchTemp === "" && optionTemp === "paid") {
            this.getAllSalesStatus(value, this.state.limit, "paid")
        } else if (searchTemp === "" && optionTemp === "unpaid") {
            this.getAllSalesStatus(value, this.state.limit, "unpaid")
        } else if (searchTemp !== "" && optionTemp === "all") {
            this.getAllSalesProd(value, this.state.limit, searchTemp)
        } else if (searchTemp !== "" && optionTemp === "paid") {
            this.getAllFilter(value, this.state.limit, "paid", searchTemp)
        } else if (searchTemp !== "" && optionTemp === "unpaid") {
            this.getAllFilter(value, this.state.limit, "unpaid", searchTemp)
        }
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
                let limitPage = json.count/this.state.limit
                this.setState({
                    sales: json.salesList,
                    count: Math.ceil(limitPage)
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
                let limitPage = json.count/this.state.limit
                this.setState({
                    sales: json.salesList,
                    count: Math.ceil(limitPage)
                });
                this.props.salesData({ list: json })
                console.log("ini data sales", this.state.sales);
            })
            .catch(() => {
                alert("Failed fetching")
            })
    }

    // ----------------------------------------GET ALL  PRODUCT-----------------------------------------------
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
                let limitPage = json.count/this.state.limit
                this.setState({
                    sales: json.salesList,
                    count: Math.ceil(limitPage)
                });
                console.log("ini data sales", this.state.sales);
            })
            .catch((e) => {
                alert(e)
            })

    }

    // ----------------------------------------GET ALL (PRINT)--------------------------------------------------
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


    // ---------------------------------------------PRICE FORMAT-------------------------------------------------
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
//------------------------------------------------------------------HANDLE Dialog----------------------------------------------------------

handleClickOpen = (idSales) => {
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
                console.log("ini json",json.productList );
                this.setState({
                    salesClick:json,
                    // productList:json.productList
                }, ()=>{this.productListMaker()})
            })
            .catch(() => {
                alert("Failed fetching")
            })
            this.setState({
                open:true
            })
    
  };

 productListMaker=()=>{
     let temp = this.state.salesClick
     console.log(temp.productList);
     this.setState({
         productList: temp.productList
     })
 }
  
  handleClose = () => {
    this.setState ({
        open:false
    })
  };

    render() {
        console.log("BACOT :", this.state.salesClick)
        if (this.props.checkLogin === false) {
            this.props.history.push("/")
        }
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
                                                <td><button style={{ cursor: "pointer" }} onClick={() => this.handleClickOpen(sales.idSales)}>Detail</button>
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
                <div>
      
      <Dialog onClose={()=>{this.handleClose()}} aria-labelledby="customized-dialog-title" open={this.state.open}>
        <DialogTitle id="customized-dialog-title" onClose={()=>{this.handleClose()}}>
          Sales Detail
        </DialogTitle>
        <DialogContent dividers>
          <div>
          <div className="detailModal">
                    <div className="detailModal2" style={{display:"flex", flexDirection:"row"}}>
                        <div >
                            <div className="labelModal">
                                <Label style={{ height: "10px", marginBottom: "10px" }}>Date</Label>
                            </div>
                            <div className="labelModal">
                                <Label>Distributor</Label><br />
                            </div>
                            <div className="labelModal">
                                <Label>Customer</Label>
                            </div>
                            <div className="labelModal">
                                <Label>Discount</Label>
                            </div>
                            <div className="labelModal">
                                <Label style={{ margintop: "10px" }}>Status</Label><br />
                            </div>
                        </div>
                        <div className="inputsModal" style={{marginLeft:"3vh"}}>
                            <Input value={this.state.salesClick.dateSales} disabled={true} type="Date"></Input><br />
                            <Input disabled={true}  value={this.state.salesClick.distributor} type="text"></Input><br />
                            <Input disabled={true} value={this.state.salesClick.customer} type="text" ></Input><br />
                            <Input disabled={true} value={this.state.salesClick.discount} type="number" ></Input><br />
                            <select value={this.state.salesClick.namestatus} disabled={true} >
                                <option value="unpaid">Unpaid</option>
                                <option value="paid">Paid</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="detailModal3">
                    <center>
                        <table id="tableModal" cellspasing="0" border="2 black" style={{ cursor: "pointer" }}>
                            <thead>
                                <tr className="tableModal2" >
                                    <th className="tText">Product Code</th>
                                    <th className="tText">Product Name</th>
                                    <th className="tText">Quantity</th>
                                    <th className="tText">Price (Rp)</th>
                                    <th className="tText">Sub Total (Rp)</th>
                                </tr>
                            </thead>
                            <tbody className="tbodyModal">
                                {
                                    this.state.productList.map((detail, index) => {
                                        console.log(this.state.productList[index].code);
                                        return (
                                            <tr key={index} className="detailList" >
                                                <td>{detail.code}</td>
                                                <td>{detail.nameProduct}</td>
                                                <td>{detail.qty}</td>
                                                <td>{this.priceFormat(detail.price)}</td>
                                                <td>{this.priceFormat(detail.totalPrice)}</td>
                                            </tr>
                                        )
                                    })
                                }
                                {
                                    (this.state.productList.length > 0) ?
                                    ""
                                    :
                                    <div>
                                       
                                    </div>
                                }
                                <tr>
                                    <td colSpan="3"></td>
                                    <th style={{ backgroundColor: 'white', color: "black" }}>Gross</th>
                                    <th style={{ backgroundColor: 'white', color: "black" }}>{this.priceFormat(this.state.salesClick.gross)}</th>
                                </tr>
                                <tr>
                                    <td colSpan="3"></td>
                                    <th style={{ backgroundColor: 'white', color: "black" }}>Discount</th>
                                    <th style={{ backgroundColor: 'white', color: "black" }}>{this.priceFormat(this.state.salesClick.discount)}</th>
                                </tr>
                                <tr>
                                    <td colSpan="3"></td>
                                    <th style={{ backgroundColor: 'white', color: "black" }}>Tax (10%)</th>
                                    <th style={{ backgroundColor: 'white', color: "black" }}>{this.priceFormat(this.state.salesClick.tax)}</th>
                                </tr>
                                <tr>
                                    <td colSpan="3"></td>
                                    <th style={{ backgroundColor: 'white', color: "black" }}>Total</th>
                                    <th style={{ backgroundColor: 'white', color: "black" }}>{this.priceFormat(this.state.salesClick.invoice)}</th>
                                </tr>
                            </tbody>
                        </table>
                    </center>
                </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={()=>{this.handleClose()}} color="primary">
            CLOSE
          </Button>
        </DialogActions>
      </Dialog>
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