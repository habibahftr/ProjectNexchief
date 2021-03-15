import React, { Component } from 'react';
import Icon from '../../component/icon';
import Label from '../../component/label';
import Input from "../../component/input"
import "./style.css"
import Button from '../../component/button';
import { connect } from 'react-redux';
import ReactToPrint from 'react-to-print';
import Toggle from 'react-toggle'
import Pagination from '@material-ui/lab/Pagination';

class ComponentToPrint extends Component {
    constructor(props) {
        super(props);
        this.state = {
            productList: [],

        }
    }
    componentDidMount() {
        this.getAllProduct();
    }

    handleChange = (event, value) => {
        this.setState({
            page: value
        })
        this.getAPICount();
        this.getPaging(value, this.props.limit);
    }

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
                let limitPage = json / this.props.limit
                this.setState({
                    count: Math.ceil(limitPage)
                })
                console.log("INI RESPON COUNT ", json)
            })
            .catch(() => {
                alert("Failed fetching")
            })
    }

    getAllProduct = (value, limit) => {
        // fetch(`http://localhost:8080/nexchief/products/` + this.props.id, {
        //     method: "get",
        //     headers: {
        //         "Content-Type": "application/json; ; charset=utf-8",
        //         "Access-Control-Allow-Headers": "Authorization, Content-Type",
        //         "Access-Control-Allow-Origin": "*"
        //     }
        // })
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
                    productList: json
                });
                console.log("product", this.state.productList);
            })
            .catch(() => {
                alert("Failed fetching")
            })
    }
    render() {
        return (
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
                                    <td>{prod.price}</td>
                                </tr>
                            )
                        })

                    }

                </tbody>
            </table>
        );
    }
}


class ProductReport extends Component {
    constructor(props) {
        super(props);
        this.state = {
            productList: [],
            limit: 5,
            count: 0,
            page: 1,

        }
    }




    render() {
        if (this.props.checkLogin === false) {
            this.props.history.push("/")
        }
        return (
            <div className="prodReportPage">
                <div className="headerProdReport">
                    <div className="titleSales">
                        <Label className="monthly">PRODUCT</Label>
                        <Label className="salesact">REPORT</Label>
                    </div>
                    <div className="detailHeader">
                        <Button className="backReport" onClick={() => this.props.history.push("/report")}>Back to Report Page</Button>
                    </div>
                </div>
                <div className="bodyProdReport">
                    <div className="container3">
                        <div className="seacrhProd1">
                            <Input className="searchProdReport" ></Input>
                            <Icon className="fas fa-search" style={{ color: "grey", marginLeft: "-5vh", fontSize: "15px", marginTop: "2vh" }}></Icon>
                        </div>
                        <label>
                            <Toggle
                                defaultChecked={this.state.aubergineIsReady}
                                className='custom-toggle'
                                onChange={this.handleAubergineChange} />
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
                        <ComponentToPrint ref={el => (this.componentRef = el)} id={this.props.dataLoginUser.id} limit={this.state.limit} />

                    </div>
                    {/* <div className="paginationProd">
                        <Pagination style={{ background: 'white', marginTop: '0' }} page={this.state.page} onChange={this.props.handleChange} count={this.state.count} />
                    </div> */}

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