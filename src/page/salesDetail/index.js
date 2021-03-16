import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '../../component/button';
import Icon from '../../component/icon';
import Input from '../../component/input';
import Label from '../../component/label';
import Swal from 'sweetalert2';
import "./style.css"
import product from '../product';

class SalesDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displayAdd: "",
            displayBtn: "none",
            disableInput: true,
            dateSales: "",
            distributor: "",
            customer: "",
            discount:"",
            status: "",
            gross:"",
            tax:"",
            invoice:"",
            productData: [],
            productList: [],
            product: {
                code: "",
                nameProduct: "",
                qty: "",
                price: "",
                totalPrice: "",
                submit: false
            },
            disableTable: true,
            displaySave: "none",
            displayDel: "none",
            displayEdit: "none",
            displayCancel: "none",

        }
    }

    componentDidMount() {
        console.log("sales detail", this.props.salesClick);
        this.getAllProduct();
        if (this.props.act === 1) {
            this.setState({
                dateSales: this.props.salesClick.dateSales,
                distributor: this.props.dataLoginUser.name,
                status: this.props.salesClick.status,
                customer: this.props.salesClick.customer,
                productList: this.props.salesClick.productList,
                gross: this.props.salesClick.gross,
                discount: this.props.salesClick.discount,
                tax: this.props.salesClick.tax,
                invoice:this.props.salesClick.invoice,
                displayDel: "",
                displayEdit: "",
            })
        } else {
            this.setState({
                dateSales: "",
                distributor: this.props.dataLoginUser.name,
                status: "",
                customer: "",
                productList: [],
                disableInput: false,
            })

        }
    }

    setValue = el => {
        this.setState({
            [el.target.name]: el.target.value
        })
    }

    setClear = () => {
        this.setState({
            dateSales: "",
            distributor: "",
            status: "",
            customer: "",
            productList: [],
        })
    }

    addClick = () => {
        this.setState({
            product:{
                submit: false
            },
            displayAdd: "none",
            displayBtn: "",
            disableTable: true,
            displayDel: "none",
            displayEdit: "none",
        })
        let prodList = this.state.productList
        prodList.push(this.state.product);

    }

    cancelClick = () => {
        this.setState({
            displayAdd: "",
            displayBtn: "none",
            disableTable: true,
            displaySave: "none",
            displayDel: "",
            displayEdit: "",
            displayCancel: "none",

        })
        let prodList = this.state.productList
        prodList.pop();
    }

    submitClick = () => {
        let temp = this.state.productList.map(el => ({...el, submit:true}))
        this.setState({
            productList : temp,
            displayAdd: "",
            displayBtn: "none",
            displayEdit:"",
            displayDel:""
            
        })
    }

    backSales = () => {
        Swal.fire({
            title: 'Do you want to save the changes?',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: `Save`,
            denyButtonText: `Don't save`,
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                const { dateSales, distributor, customer, discount, status, productList } = this.state
                let objSales;
                if (dateSales === null || customer === "" || status === "") {
                    Swal.fire('Insert All Data')
                    console.log("dateSales", dateSales);
                    console.log("status", status);
                } else {
                    objSales = {
                        dateSales: dateSales,
                        distributor: this.props.dataLoginUser.id,
                        customer: customer,
                        discount: discount,
                        status: status,
                        productList: productList,
                    }
                fetch(`http://localhost:8080/nexchief/sales/`, {
                    method: "post",
                    headers: {
                        "Content-Type": "application/json; ; charset=utf-8",
                        "Access-Control-Allow-Headers": "Authorization, Content-Type",
                        "Access-Control-Allow-Origin": "*"
                    },
                    body: JSON.stringify(objSales)
                })
                    .then((response) => {
                        return response.json()
                    })
                    .then((result) => {
                        if (result.successMessage === "New Sales succesfully cretaed") {
                            alert(result.successMessage)
                            this.setClear();
                            this.props.backSales();
                            this.props.history.push("/sales")
                            Swal.fire('Saved!', '', 'success')
                        } else {
                            alert(result.errorMessage)
                        }
                    })
                    .catch((e) => {
                        // alert(e);
                    })
                }


            } else if (result.isDenied) {
                this.props.backSales();
                this.props.history.push("/sales")
                Swal.fire('Changes are not saved', '', 'info')
            }
        })
    }

    // ---------------------------------------GET ALL DATA PRODUCT-----------------------------------------------------
    getAllProduct = () => {
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
                    productData: json
                });
                // this.props.productData({ list: json })
                console.log("product", this.state.productData);
            })
            .catch(() => {
                alert("Failed fetching")
            })
    }

    handleQty = (el, idx, key) => {
        let temp = this.state.productList
        let priceTemp = temp[idx].price*el.target.value 
        temp[idx] = {
            ...temp[idx],
            [key]: el.target.value,
            totalPrice: priceTemp,
        }
        console.log("pricetemp",priceTemp);
        this.setState({
            productList: temp
        })
    }

    handleProd = (el, idx, key) => {
        let temp = this.state.productList
        let product = this.state.productData.find(elm => elm.code === el.target.value);
        console.log(temp[0]);
        temp[idx] = {
            ...temp[idx],
            [key]: el.target.value,
            nameProduct: product.nameProduct,
            price: product.price

        }
        this.setState({
            productList: temp
        })
    }

    saveClick = (obj) => {
        const { dateSales, distributor, customer, discount, status, productList } = obj
        let objSales;
        if (dateSales === "" || customer === "" || discount === "" || status === "") {
            alert(`Insert All data!`)
        } else {
            objSales = {
                dateSales: dateSales,
                distributor: this.props.dataLoginUser.id,
                customer: customer,
                discount: discount,
                status: status,
                productList: productList,
            }
        }
        fetch(`http://localhost:8080/nexchief/sales/`, {
            method: "post",
            headers: {
                "Content-Type": "application/json; ; charset=utf-8",
                "Access-Control-Allow-Headers": "Authorization, Content-Type",
                "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify(objSales)
        })
            .then((response) => {
                return response.json()
            })
            .then((result) => {
                if (result.successMessage === "New Sales succesfully cretaed") {
                    alert(result.successMessage)
                } else {
                    alert(result.errorMessage)
                }
            })
            .catch((e) => {
                alert(e);
            })
    }


    render() {
        const { dateSales, distributor, customer, discount, status, productList } = this.state
        console.log("sales click", this.props.salesClick.productList[0]);
        return (
            <div className="detailBody">
                <div className="detailHeader">
                    <Button className="backSales" onClick={() => this.backSales()}>Back to Sales Page</Button>
                </div>
                <div className="detailTop">
                    <div className="detailTop2">
                        <div className="labels">
                            <div className="labelDtl">
                                <Label style={{ height: "10px", marginBottom: "10px" }}>Date</Label>
                            </div>
                            <div className="labelDtl">
                                <Label>Distributor</Label><br />
                            </div>
                            <div className="labelDtl">
                                <Label>Customer</Label>
                            </div>
                            <div className="labelDtl">
                                <Label>Discount</Label>
                            </div>
                            <div className="labelDtl">
                                <Label style={{ margintop: "10px" }}>Status</Label><br />
                            </div>
                        </div>
                        <div className="inputs">
                            <Input disabled={this.state.disableInput} name="dateSales" onChange={this.setValue} value={this.state.dateSales} type="Date" className="dateSales"></Input><br />
                            <Input disabled={true} name="distributor" onChange={this.setValue} value={this.state.distributor} type="text" className="inputDtl"></Input><br />
                            <Input disabled={this.state.disableInput} name="customer" onChange={this.setValue} value={this.state.customer} type="text" className="inputDtl"></Input><br />
                            <Input disabled={this.state.disableInput} name="discount" onChange={this.setValue} value={this.state.discount} type="number" className="inputDtl"></Input><br />
                            <select name="status" onChange={this.setValue} value={this.state.status} className="inputDtl">
                                <option value="unpaid">Unpaid</option>
                                <option value="paid">Paid</option>
                            </select>
                        </div>
                    </div>
                    <div className="adddetail">
                        <Button className="detailButton" onClick={() => this.addClick()} style={{ display: this.state.displayAdd }}>Add Product</Button>
                        <Button className="submitDetail" onClick={() => this.submitClick()} style={{ display: this.state.displayBtn }}>Submit</Button>
                        <Button className="cancelDetail" onClick={() => this.cancelClick()} style={{ display: this.state.displayBtn }}>Cancel</Button>
                    </div>
                </div>
                <div className="detailBottom">
                    <table id="tableDetail1" cellspasing="0" border="1 white">
                        <thead>
                            <tr className="tableDetail2" >
                                <th className="tText">Product Code</th>
                                <th className="tText">Product Name</th>
                                <th className="tText">Quantity</th>
                                <th className="tText">Price (Rp)</th>
                                <th className="tText">Sub Total (Rp)</th>
                                <th className="tText" style={{ border: "none" }}></th>
                            </tr>
                        </thead>
                        <tbody className="tbodyDetail">
                            {
                                this.state.productList.map((detail, index) => {
                                    return (
                                        <tr key={index} className="detailList">
                                            {/* <td><input disabled={this.state.disableTable} value={detail.code} onChange={this.setValue}></input></td> */}
                                            <td>
                                                <select disabled={detail.submit ? true : false} name="code" onChange={(el) => { this.handleProd(el, index, "code") }} value={detail.code}>
                                                    {
                                                        this.state.productData.map((prod) => {
                                                            return (
                                                                <option value={prod.code}>{prod.code}</option>
                                                            )
                                                        })
                                                    }
                                                </select>
                                            </td>
                                            <td><input name="nameProduct" disabled={this.state.disableTable} value={detail.nameProduct}></input></td>
                                            <td><input name="qty" disabled={detail.submit ? true : false} onChange={(el) => { this.handleQty(el, index, "qty") }} value={detail.qty}></input></td>
                                            <td><input disabled={this.state.disableTable} value={detail.price}></input></td>
                                            <td><input disabled={this.state.disableTable} value={detail.totalPrice}></input></td>
                                            <td style={{ display: this.state.displayDel }}><Icon className="fas fa-trash-alt"></Icon></td>
                                            <td style={{ display: this.state.displayEdit }}><Icon className="far fa-edit"></Icon></td>
                                            {/* <td style={{ display: this.state.displaySave }}><Icon className="fas fa-check-square"></Icon></td>
                                            <td style={{ display: this.state.displayCancel }}><Icon className="fas fa-window-close"></Icon></td> */}
                                        </tr>
                                    )
                                })
                            }
                            <tr>
                                <td colSpan="3"></td>
                                <th>Total Item</th>
                                <td>{this.state.gross}</td>
                            </tr>
                            <tr>
                                <td colSpan="3"></td>
                                <th>Discount</th>
                                <td>{this.state.discount}</td>
                            </tr>
                            <tr>
                                <td colSpan="3"></td>
                                <th>Tax (10%)</th>
                                <td>{this.state.tax}</td>
                            </tr>
                            <tr>
                                <td colSpan="3"></td>
                                <th>Total</th>
                                <td>{this.state.invoice}</td>
                            </tr>



                        </tbody>
                    </table>


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
    act: state.salesReducer.act,

})

const mapDispatchToProps = dispatch => {
    return {
        salesData: (data) => dispatch({ type: "GETALL_SALES", payload: data }),
        backSales: () => dispatch({ type: "BACK_SALES" })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SalesDetail);