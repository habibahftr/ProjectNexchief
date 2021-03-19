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
            idSales: "",
            dateSales: "",
            distributor: "",
            customer: "",
            discount: "",
            status: "",
            grossArray: [],
            gross: 0,
            tax: 0,
            invoice: 0,
            productData: [],
            productList: [],
            product: {
                code: "",
                nameProduct: "",
                qty: "",
                price: 0,
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

    // ------------------------------------------------COMPONENT DID MOUNT----------------------------------------------------
    componentDidMount() {
        console.log("sales detail", this.props.salesClick);
        this.getAllProduct();
        if (this.props.act === 1) {
            this.setState({
                idSales: this.props.salesClick.idSales,
                dateSales: this.props.salesClick.dateSales,
                distributor: this.props.dataLoginUser.name,
                status: this.props.salesClick.status,
                customer: this.props.salesClick.customer,
                productList: this.props.salesClick.productList,
                gross: this.props.salesClick.gross,
                discount: this.props.salesClick.discount,
                tax: this.props.salesClick.tax,
                invoice: this.props.salesClick.invoice,
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
                discount: "",
                status: "UNPAID",
                gross: 0,
                tax: 0,
                invoice: 0,
                disableInput: false,
            })

        }
    }

    // -------------------------------------------------SET VALUE-------------------------------------------------------
    setValue = el => {
        this.setState({
            [el.target.name]: el.target.value
        })
    }

    // -----------------------------------------SET CLEAR(RESET)---------------------------------------------------------
    setClear = () => {
        this.setState({
            dateSales: "",
            distributor: "",
            status: "",
            customer: "",
            productList: [],
        })
    }

    // -------------------------------------ADD CLICK(ADD BOTTOM)----------------------------------------------------------
    addClick = () => {
        let prodList = this.state.productList
        if (prodList.length < 5) {
            this.setState({
                displayAdd: "none",
                displayBtn: "",
                disableTable: true,
                displayDel: "none",
                displayEdit: "none",
            })
            prodList.push(this.state.product);
        } else {
            Swal.fire("Maximum product quantity 5")
        }

    }

    // --------------------------------------------------CANCEL CLICK------------------------------------------------------
    cancelClick = () => {
        this.setState({
            displayAdd: "",
            displayBtn: "none",
            disableTable: true,
            displaySave: "none",
            displayDel: "",
            displayEdit: "",
            displayCancel: "none",
            gross: 0,

        })
        let prodList = this.state.productList
        prodList.pop();
    }

    // -------------------------------------------------TAX HANDLER---------------------------------------------------------
    taxhandler = () => {
        let taxTemp = this.state.tax
        taxTemp = (this.state.gross - this.state.discount) * 0.1;
        this.setState({
            tax: taxTemp,
        }, () => this.invoiceHandler())
    }


    // -------------------------------------------INVOICE HANDLER----------------------------------------------------------
    invoiceHandler = () => {
        let invoiceTemp = this.state.invoice
        invoiceTemp = ((this.state.gross - this.state.discount) + this.state.tax)
        this.setState({
            invoice: invoiceTemp,
        })
    }

    // -------------------------------------------SUBMIT CLICK-----------------------------------------------------------------
    submitClick = () => {
        let prodList = this.state.productList
        if (prodList[prodList.length - 1].code === "") {
            Swal.fire('Choose Product Code!')
            // prodList.splice(i,1)
        }
        else{
            let temp = this.state.productList.map(el => ({ ...el, submit: true }))
            this.setState({
                productList: temp,
                displayAdd: "",
                displayBtn: "none",
                displayEdit: "",
                displayDel: "",
            })

            let grossTemp = 0;
            for (let i = 0; i < this.state.productList.length; i++) {
                grossTemp = grossTemp + this.state.productList[i].totalPrice
            }
            this.setState({
                gross: grossTemp,
            }, () => this.taxhandler())
            
        }
        for (let i = 0; i < prodList.length; i++) {
        }

        console.log("gross", this.state.grosss);
    }

    // --------------------------------------------------------BACK TO SALES PAGE-------------------------------------------------
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
                } else {
                    objSales = {
                        dateSales: dateSales,
                        distributor: this.props.dataLoginUser.id,
                        customer: customer,
                        discount: discount,
                        status: status,
                        productList: productList,
                    }
                    if (this.props.act === 1) {
                        fetch(`http://localhost:8080/nexchief/update/sales/` + this.state.idSales, {
                            method: "put",
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
                            .then((json) => {
                                if (typeof json.errorMessage !== 'undefined') {
                                    alert(json.errorMessage)
                                } else if (typeof json.successMessage !== 'undefined') {
                                    this.setClear();
                                    this.props.backSales();
                                    this.props.history.push("/sales")
                                    Swal.fire('Saved!', '', 'success')
                                }
                            })


                    } else {
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

    // --------------------------------------------------QTY HANDLER-----------------------------------------------------------
    handleQty = (el, idx, key) => {
        let temp = this.state.productList
        let product = this.state.productData.find(elm => elm.code === temp[idx].code);
        if (product !== undefined) {
            if (product.stock < el.target.value) {
                Swal.fire('lack of stock!')
            } else {
                let priceTemp = temp[idx].price * el.target.value
                temp[idx] = {
                    ...temp[idx],
                    [key]: el.target.value,
                    totalPrice: priceTemp,
                }
                console.log("pricetemp", priceTemp);
                this.setState({
                    productList: temp,
                })
            }
        } else {
            Swal.fire('Choose Product Code!')
        }
    }


    // --------------------------------------------------------PROD HANDLER----------------------------------------------------------
    handleProd = (el, idx, key) => {
        let temp = this.state.productList
        let product = this.state.productData.find(elm => elm.code === el.target.value);
        if (product !== undefined) {
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
        } else {
            Swal.fire('Choose Product Code!')
        }

    }

    delClick = (idx) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                console.log(idx);
                let temp = this.state.productList
                temp.splice(idx, 1)
                this.setState({
                    prodList: temp
                })
                this.submitClick()
                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                )
            }
        })
    }

    editClick = () => {
        this.setState({
            displaySave: "",
            displayCancel: ""
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
                    <center>
                        <table id="tableDetail1" cellspasing="0" border="2 black">
                            <thead>
                                <tr className="tableDetail2" >
                                    <th className="tText">Product Code</th>
                                    <th className="tText">Product Name</th>
                                    <th className="tText">Quantity</th>
                                    <th className="tText">Price (Rp)</th>
                                    <th className="tText">Sub Total (Rp)</th>
                                    {/* <th className="tText" style={{ border: "none", backgroundColor:"#333333" }}></th> */}
                                </tr>
                            </thead>
                            <tbody className="tbodyDetail">
                                {
                                    this.state.productList.map((detail, index) => {
                                        return (
                                            <tr key={index} className="detailList">
                                                {/* <td><input disabled={this.state.disableTable} value={detail.code} onChange={this.setValue}></input></td> */}
                                                <td>
                                                    <select disabled={detail.submit ? true : false} name="code" onChange={(el) => { this.handleProd(el, index, "code") }} value={detail.code} defaultValue="Product Code">
                                                        <option defaultValue>Product Code</option>
                                                        {
                                                            this.state.productData.map((prod) => {
                                                                return (
                                                                    <option value={prod.code}>{prod.code} (stock: {prod.stock})</option>
                                                                )
                                                            })
                                                        }
                                                    </select>
                                                </td>
                                                <td><input name="nameProduct" disabled={this.state.disableTable} value={detail.nameProduct}></input></td>
                                                <td><input name="qty" disabled={detail.submit ? true : false} onChange={(el) => { this.handleQty(el, index, "qty") }} value={detail.qty}></input></td>
                                                <td><input disabled={this.state.disableTable} value={detail.price}></input></td>
                                                <td><input disabled={this.state.disableTable} value={detail.totalPrice}></input></td>
                                                <td onClick={() => this.delClick(index)} style={{ display: this.state.displayDel, border: "none", color: "white", backgroundColor: "#333333" }}><Icon className="fas fa-trash-alt"></Icon></td>
                                                <td style={{ display: this.state.displayEdit, border: "none", color: "white", backgroundColor: "#333333" }}><Icon className="far fa-edit"></Icon></td>
                                                <td style={{ display: this.state.displaySave, border: "none", color: "white", backgroundColor: "#333333" }}><Icon className="fas fa-check-square"></Icon></td>
                                                <td style={{ display: this.state.displayCancel, border: "none", color: "white", backgroundColor: "#333333" }}><Icon className="fas fa-window-close"></Icon></td>
                                            </tr>
                                        )
                                    })
                                }
                                <tr>
                                    <td colSpan="3"></td>
                                    <th style={{ backgroundColor: "#DCDCDC", color: "black" }}>Total Item</th>
                                    <th style={{ backgroundColor: "#DCDCDC", color: "black" }}>{this.state.gross}</th>
                                </tr>
                                <tr>
                                    <td colSpan="3"></td>
                                    <th style={{ backgroundColor: "#DCDCDC", color: "black" }}>Discount</th>
                                    <th style={{ backgroundColor: "#DCDCDC", color: "black" }}>{this.state.discount}</th>
                                </tr>
                                <tr>
                                    <td colSpan="3"></td>
                                    <th style={{ backgroundColor: "#DCDCDC", color: "black" }}>Tax (10%)</th>
                                    <th style={{ backgroundColor: "#DCDCDC", color: "black" }}>{this.state.tax}</th>
                                </tr>
                                <tr>
                                    <td colSpan="3"></td>
                                    <th style={{ backgroundColor: "#DCDCDC", color: "black" }}>Total</th>
                                    <th style={{ backgroundColor: "#DCDCDC", color: "black" }}>{this.state.invoice}</th>
                                </tr>



                            </tbody>
                        </table>
                    </center>


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