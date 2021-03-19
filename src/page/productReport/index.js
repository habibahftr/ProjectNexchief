import React, { Component } from 'react';
import Icon from '../../component/icon';
import Label from '../../component/label';
import Input from "../../component/input"
import "./style.css"
import ComponentToPrint from "./componentToPrint";
import Button from '../../component/button';
import { connect } from 'react-redux';
import ReactToPrint from 'react-to-print';
// import Toggle from 'react-toggle'
import Pagination from '@material-ui/lab/Pagination';
import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
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
            checkedA: true,


        }
    }

    componentDidMount() {
        this.getAPICount();
        this.getActiveProduct(this.state.page, this.state.limit)
    }
// ----------------------------------------------------HANDLE CHANGE-----------------------------------------------------
    handleChange = (event, value) => {
        this.setState({
            page: value
        })
        if (this.state.checkedA === false) {
            this.getAPICount();
            this.getAllProduct(value, this.state.limit);
        } else {
            this.getFilterCount();
            this.getActiveProduct(value, this.state.limit)
        }

    }

    // ---------------------------------------------------GET COUNT ALL-----------------------------------------------
    getAPICount = () => {
        fetch(`http://localhost:8080/nexchief/product/count/` + this.props.dataLoginUser.id, {
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
                console.log("INI RESPON COUNT ", json)
            })
            .catch(() => {
                alert("Failed fetching")
            })
    }
// ------------------------------------------------------GET FILTER ACTIVE COUNT-------------------------------------------------------------
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
                let limitPage = json / this.state.limit
                this.setState({
                    count: Math.ceil(limitPage)
                })
                console.log("INI RESPON COUNT ", json)
            })
            .catch(() => {
                alert("Failed fetching")

            })
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
                this.setState({
                    productList: json
                });
                console.log("product", this.state.productList);
            })
            .catch(() => {
                alert("Failed fetching")
            })

    }

    // ---------------------------------------------GET ALL PAGING-------------------------------------------------------------------------------
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
                this.setState({
                    productListPrint: json
                });
                console.log("product", this.state.productList);
            })
            .catch(() => {
                alert("Failed fetching")
            })
    }

    // ------------------------------------------------GET FILTER PRINT--------------------------------------------------------
    getFilterPrint=()=>{
        console.log("filter", this.state.productList);
        this.getAllPrint()
        let print= this.state.productList.filter(el=> el.status==="active");
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
                    productList: json
                });
                this.props.productData({ list: json })
                console.log("product", this.state.productList);
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
            this.getFilterCount();
            this.getActiveProduct(this.state.page, this.state.limit)
        } else {
            this.getAllPrint();
            this.getAPICount();
            this.getAllProduct(this.state.page, this.state.limit);
        }
    };



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
        return (
            <div className="prodReportPage">
                <div className="headerProdReport">
                    <div className="titleProductReport">
                        <Label className="monthly">PRODUCT</Label>
                        <Label className="salesact">REPORT</Label>
                    </div>
                    <div className="detailHeader">
                        <Button className="backReport" onClick={() => this.props.history.push("/report")}>Back to Report Page</Button>
                    </div>
                </div>
                <div className="bodyProdReport">
                    <div className="container3">
                        {/* <div className="seacrhProd1">
                                <Input className="searchProdReport" ></Input>
                                <Icon className="fas fa-search" style={{ color: "grey", marginLeft: "-5vh", fontSize: "15px", marginTop: "2vh" }}></Icon>
                            </div> */}
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
                                trigger={() => <Icon className="fas fa-file-pdf" style={{ color: "grey", marginLeft: "-5vh", fontSize: "30px", marginTop: "2vh" }}></Icon>}
                                content={() => this.componentRef}
                            ></ReactToPrint>
                            <div>Print Report</div>
                        </div>
                    </div>
                    <div className="container4">
                        <ComponentToPrint ref={el => (this.componentRef = el)} print={this.state.print} id={this.props.dataLoginUser.id} productList={this.state.productListPrint} limit={this.state.limit} />

                    </div>
                    <div className="onPage">
                        <center>
                            {/* <h1>INI REPORT </h1> */}
                            <table id="tableProdReport1" cellspasing="0" border="1 white">
                                <thead>
                                    <tr className="tableProdReport2" >
                                        <th className="tDate">Code</th>
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
                                <tbody className="tbodySales">
                                    {
                                        this.state.productList.map((prod, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td>{prod.code}</td>
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