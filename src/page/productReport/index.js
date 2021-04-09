import React, { Component } from 'react';
import Icon from '../../component/icon';
import Label from '../../component/label';
import Input from "../../component/input"
import "./style.css"
import ComponentToPrint from "./componentToPrint";
import Button from '../../component/button';
import { connect } from 'react-redux';
import ReactToPrint from 'react-to-print';
import Pagination from '@material-ui/lab/Pagination';
import Switch from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid';


class ProductReport extends Component {
    constructor(props) {
        super(props);
        this.state = {
            productList: [],
            productListPrint:[],
            print: false,
            limit: 10,
            count: 0,
            page: 1,
            pageNow:1,
            checkedA: false,


        }
    }
// ----------------------------------------------------COMPONENT DID MOUNT----------------------------------------------------------
    componentDidMount() {
        this.getAllProduct(this.state.page, this.state.limit);
        this.getAllPrint();
    }
// ----------------------------------------------------HANDLE CHANGE-----------------------------------------------------
    handleChange = (event, value) => {
        this.setState({
            page: value
        })
        if (this.state.checkedA === false) {
            this.getAllProduct(value, this.state.limit);
        } else {
            this.getActiveProduct(value, this.state.limit)
        }

    }


    // -----------------------------------------GET PRODUCT ACTIVE----------------------------------------------------------------------------------------------------
    getActiveProduct = (value, limit) => {
        fetch(`http://localhost:8080/nexchief/product/filter/?page=` + value + `&limit=` + limit + `&id=` + this.props.dataLoginUser.id + `&status=ACTIVE`, {
            method: "get",
            headers: {
                "Content-Type": "application/json; ; charset=utf-8",
                "Access-Control-Allow-Headers": "Authorization, Content-Type",
                "Access-Control-Allow-Origin": "*"
            }
        })
            .then(response => response.json())
            .then(json => {
                let limitPage = json.count / this.state.limit
                this.setState({
                    productList: json.productList,
                    count: Math.ceil(limitPage)
                });
                console.log("product", this.state.productList);
            })
            .catch(() => {
                alert("Failed fetching")
            })

    }

    // ---------------------------------------------GET ALL WITH PAGINATION-------------------------------------------------------------------------------
    getAllProduct = (value, limit) => {
        fetch(`http://localhost:8080/nexchief/product/paging/?page=` + value + "&limit=" + limit + "&id=" + this.props.dataLoginUser.id, {
            method: "get",
            headers: {
                "Content-Type": "application/json; ; charset=utf-8",
                "Access-Control-Allow-Headers": "Authorization, Content-Type",
                "Access-Control-Allow-Origin": "*"
            }
        })
            .then(response => response.json())
            .then(json => {
                let limitPage = json.count / this.state.limit
                this.setState({
                    productList: json.productList,
                    count: Math.ceil(limitPage)
                });
                console.log("product", this.state.productList);
            })
            .catch(() => {
                alert("Failed fetching")
            })
    }

    // ------------------------------------------------GET FILTER PRINT--------------------------------------------------------
    getFilterPrint=()=>{
        console.log("ceek", this.state.productListPrint);
        const productPrint = this.state.productListPrint
        const print= productPrint.filter(el=> el.status==="ACTIVE");
        console.log("print", print);
        this.setState({
            productListPrint: print
        })

    }

    // -----------------------------------------------GET ALL PRINT----------------------------------------------------------
    getAllPrint=()=>{
        fetch(`http://localhost:8080/nexchief/products/` + this.props.dataLoginUser.id, {
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
                    productListPrint: json
                });
                this.props.productData({ list: json })
                console.log("product", this.state.productListPrint);
            })
            .catch(() => {
                alert("Failed fetching")
            })
    }

    // ---------------------------------------------HANDLE CHANGE TOGGLE----------------------------------------
    handleChangeMinus = (event) => {
        this.setState({
            [event.target.name]: event.target.checked,
        })
        const minus = event.target.checked
        console.log(minus)
        if (minus) {  
            this.getFilterPrint();    
            this.getActiveProduct(this.state.pageNow, this.state.limit)
        } else {
            this.getAllPrint();
            this.getAllProduct(this.state.page, this.state.limit);
        }
    };


// ------------------------------------------------price format----------------------------------------------------------------
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


    render() {
        if (this.props.checkLogin === false) {
            this.props.history.push("/")
        }
        const { checkedA } = this.state
        console.log("render product report", this.state.productListPrint);
        return (
            <div className="prodReportPage">
                <div className="headerProdReport">
                    <div className="titleProductReport">
                        <Label className="monthly">PRODUCT</Label>
                        <Label className="salesact">REPORT</Label>
                    </div>
                    <div className="backToProduct">
                        <Button className="backProduct" onClick={() => this.props.history.push("/product")}>Back</Button>
                    </div>
                </div>
                <div className="bodyProdReport">
                    <div className="container3">
                        <label className="toggleProd">
                            <Grid component="label" container alignItems="center" spacing={1}>
                                <Grid item style={{ color: "white" }}>ALL</Grid>
                                <Grid item>
                                    <Switch checked={checkedA} color="primary" className="toogle" onChange={this.handleChangeMinus} name="checkedA" />
                                </Grid>
                                <Grid item style={{ color: "white" }}>ACTIVE</Grid>
                            </Grid>
                        </label>

                        <div className="printProdReport">
                            <ReactToPrint
                                trigger={() => <Icon className="fas fa-file-pdf" style={{ color: "white", marginLeft: "-5vh", fontSize: "30px", marginTop: "2vh" }}></Icon>}
                                content={() => this.componentRef}
                            ></ReactToPrint>
                            <div>Print Report</div>
                        </div>
                    </div>
                    <div className="container4">
                        <ComponentToPrint ref={el => (this.componentRef = el)} productListPrint={this.state.productListPrint} />
                    </div>
                    <div className="onPage">
                        <center>
                            <table id="tableProdReport1" cellspasing="0" border="1 white">
                                <thead>
                                    <tr className="tableProdReport2" >
                                        <th className="tText">Code</th>
                                        <th className="tText">Name</th>
                                        <th className="tText">Packaging</th>
                                        <th className="tText">Description</th>
                                        <th className="tText">Category</th>
                                        <th className="tText">Launch Date</th>
                                        <th className="tText">Status</th>
                                        <th className="tText">Stock</th>
                                        <th className="tText">Price(Rp.)</th>
                                    </tr>
                                </thead>
                                <tbody className="tbodyProd">
                                    {
                                        this.state.productList.map((prod, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td>{prod.code.substring(0,15)}</td>
                                                    <td>{prod.nameProduct}</td>
                                                    <td>{prod.packaging}</td>
                                                    <td>{prod.product_desc}</td>
                                                    <td>{prod.category}</td>
                                                    <td>{prod.launch_date}</td>
                                                    <td>{prod.status}</td>
                                                    <td>{prod.stock}</td>
                                                    <td>{this.priceFormat(prod.price)}</td>
                                                </tr>
                                            )
                                        })

                                    }

                                </tbody>
                            </table>
                        </center>

                    </div>
                    <div className="paginationReportProd">
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

export default connect(mapStateToProps, mapDispatchToProps)(ProductReport);