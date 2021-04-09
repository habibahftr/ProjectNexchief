import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '../../component/button';
import Icon from '../../component/icon';
import Input from '../../component/input';
import Label from '../../component/label';
import Swal from 'sweetalert2';
import "./style.css"
import product from '../product';
import { isThisQuarter } from 'date-fns';
import { TextareaAutosize } from '@material-ui/core';

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
            productActive:[],
            productList: [],
            qtyProduct: [],
            updated_by: "",
            indexEdit: "",
            product: {
                code: "",
                nameProduct: "",
                qty: "",
                price: 0,
                totalPrice: "",
                created_by: this.props.dataLoginUser.id,
                updated_by: this.props.dataLoginUser.id,
            },
            disableTable: true,
            displayDel: "none",
            dateFirst: "",
            dateLast: "",
            detail: false,
            edit: false,
            disabled: [],
            codeTarget: "",
            qty: "",

        }
    }

    // ------------------------------------------------COMPONENT DID MOUNT----------------------------------------------------
    componentDidMount() {
        console.log("sales detail", this.props.salesClick);
        console.log("act", this.props.act);
        this.getDate()
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
                disableInput: false,
                disableTable: true,
                detail: false,
            }, () => this.disabledSet())
        } else if (this.props.act === 2) {
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
                displayDel: "none",
                disableInput: true,
                disableTable: true,
                displayAdd: "none",
                detail: true
            }, () => this.disabledSet())
        }
        else {
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
                disableTable: false,
                detail: false,
            })

        }


    }


    disabledSet = () => {
        console.log("ini disabled", this.state.disabled);
        for (let i = 0; i < this.state.productList.length; i++) {
            let disabled = [];
            disabled = this.state.disabled;
            disabled.push(true);
            let qty = [];
            qty = this.state.qtyProduct
            qty.push(this.state.productList[i])
            this.setState({
                disabled: disabled,
                qtyProduct: qty
            });
        }
    }

    getDate = () => {
        let current_datetime = new Date()
        let year = current_datetime.getFullYear();
        let monthTwoDigit = ("0" + (current_datetime.getMonth() + 1)).slice(-2)
        let dateTwoDigit = ("0" + current_datetime.getDate()).slice(-2)
        let dateFirst = year + "-" + monthTwoDigit + "-01"
        let dateLast = year + "-" + monthTwoDigit + "-" + dateTwoDigit
        console.log("uji tanggal:", dateLast)
        this.setState({
            dateFirst: dateFirst,
            dateLast: dateLast
        })
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
        let temp = this.state.disabled
        console.log(temp);
        if (prodList.length < 5) {
            this.setState({
                disabled: temp,
                displayAdd: "none",
                displayBtn: "",
                displayDel: "none",
                displayEdit: "none",
            })
            prodList.push(this.state.product);
            temp.push(false)
            temp[temp.length - 1] = false
        } else {
            Swal.fire("Maximum product quantity 5")
        }

    }

    // --------------------------------------------------CANCEL CLICK------------------------------------------------------
    cancelClick = () => {
        console.log(this.state.disabled);
        let temp = this.state.productList
        let disabledTemp = this.state.disabled
        if (this.state.edit === true) {
            for (let i = 0; i < disabledTemp.length; i++) {
                if (disabledTemp[i] === false) {
                    temp[i] = {
                        ...temp[i],
                        code: this.state.codeTarget,
                        qty: this.state.qty
                    }
                }
                disabledTemp.splice(i, 1, true)
                this.setState({
                    disabled: disabledTemp,
                    productList: temp
                })
            }
            this.setState({
                displayAdd: "",
                edit: false,
                displayBtn: "none",
                disableTable: true,
                displaySave: "none",
                displayDel: "",
                displayEdit: "",
                displayCancel: "none",
                gross: 0,
            }, () => this.grossHandler())
            // disabledTemp.pop()
        }
        else {
            this.setState({
                displayAdd: "",
                displayBtn: "none",
                disableTable: true,
                displaySave: "none",
                displayDel: "",
                displayEdit: "",
                displayCancel: "none",
                gross: 0,

            }, () => this.grossHandler())
            let prodList = this.state.productList
            prodList.pop();
            disabledTemp.pop()
        }
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

    // ---------------------------------------------GROSS HANDLER---------------------------------------------------------
    grossHandler = () => {
        let grossTemp = 0;
        for (let i = 0; i < this.state.productList.length; i++) {
            grossTemp = grossTemp + this.state.productList[i].totalPrice
        }
        this.setState({
            gross: grossTemp,
        }, () => this.taxhandler())

    }


    // -------------------------------------------SUBMIT CLICK-----------------------------------------------------------------
    submitClick = () => {
        console.log("edit", this.state.edit);
        let prodList = this.state.productList
        let data = this.state.productData
        let disabledTemp = this.state.disabled
        let qtyTemp = this.state.qtyProduct
        console.log(qtyTemp);
        if (this.state.edit === true) {
            let index = this.state.indexEdit
            let arrayEdit = prodList.filter(el => el.code === prodList[index].code)
            console.log("array edit", arrayEdit.length);
            if (arrayEdit.length === 1) {
                if (prodList[index].code !== "" && prodList[index].qty !== "") {
                    for (let i = 0; i < disabledTemp.length; i++) {
                        disabledTemp.splice(i, 1, true)
                        this.setState({
                            disabled: disabledTemp
                        })
                    }
                    let productEdit = qtyTemp.find(el => el.code === prodList[index].code)
                    if (productEdit !== undefined) {
                        let stockTemp = parseInt(prodList[index].stock)
                        let qtycek = parseInt(productEdit.qty)
                        let plus = parseInt(stockTemp + qtycek)
                        console.log("PLUS", plus);
                        if (plus < prodList[index].qty) {
                            Swal.fire({
                                text: "lack of stock!",
                                icon: "warning"
                            })
                            prodList[index].qty = plus
                            this.setState({
                                productList: prodList,
                                index: ""
                            })

                        }
                    }
                    else if (productEdit === undefined) {
                        let temp = this.state.productData.find(elm => elm.code === prodList[index].code);
                        console.log("kesitu", temp.stock);
                        console.log("masuk sini", prodList[index].stock);
                        if (temp.stock < prodList[index].qty) {
                            console.log("lalalla", prodList[index].stock);
                            Swal.fire({
                                text: "lack of stock!",
                                icon: "warning"
                            })
                            prodList[index].qty = temp.stock
                            this.setState({
                                productList: prodList,
                                index: ""
                            })
                        }
                    }
                    this.setState({
                        edit: false,
                        displayAdd: "",
                        displayBtn: "none",
                        displayEdit: "",
                        displayDel: "",
                    })

                } else {
                    Swal.fire({
                        text: "Insert product code and product quantity!",
                        icon: "warning"
                    })
                }
            }else{
                Swal.fire({
                    text: "Product with code "+prodList[index].code+" already exist!",
                    icon: "warning"
                })
            }
        }
        else {
            let arrayEdit = prodList.filter(el => el.code === prodList[prodList.length - 1].code)
            console.log("array edit", arrayEdit.length);
            if(arrayEdit.length===1){
            if (prodList[prodList.length - 1].code !== "" && prodList[prodList.length - 1].qty !== "") {
                for (let i = 0; i < disabledTemp.length; i++) {
                    disabledTemp.splice(i, 1, true)
                    this.setState({
                        disabled: disabledTemp
                    })
                }
                let temp = this.state.productData.find(elm => elm.code === prodList[prodList.length - 1].code);
                console.log("kesitu", temp.stock);
                console.log("masuk sini", prodList[prodList.length - 1].stock);
                if (temp.stock < prodList[prodList.length - 1].qty) {
                    Swal.fire({
                        text: "lack of stock!",
                        icon: "warning"
                    })
                    prodList[prodList.length - 1].qty = temp.stock
                    this.setState({
                        productList: prodList,
                        index: ""
                    })
                }
                this.setState({
                    displayAdd: "",
                    displayBtn: "none",
                    displayEdit: "",
                    displayDel: "",
                })
            } else {
                console.log("kesini");
                Swal.fire({
                    text: "Insert product code and product quantity!",
                    icon: "warning"
                })
            }
        }else{
            Swal.fire({
                text: "Product with code "+prodList[prodList.length-1].code+" already exist!",
                icon: "warning"
            })
        }
    }
    }


    // --------------------------------------------------------UPDATE SALES---------------------------------------------------------------------
    updateSales = () => {
        const { dateSales, distributor, customer, discount, status, productList } = this.state
        let objSales;
        if (dateSales === null || customer === "" || status === "") {
            Swal.fire('Insert All Data')
        } else if (productList.length < 1) {
            Swal.fire('Insert minimum 1 product!')
        }
        else {
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
                            Swal.fire({
                                text: json.errorMessage,
                                icon: 'warning'
                            })

                        } else if (typeof json.successMessage !== 'undefined') {
                            this.setClear();
                            this.props.backSales();
                            this.props.history.push("/sales")
                            Swal.fire('Saved!', '', 'success')
                        }
                    })
                    .catch((e) => {
                        Swal.fire({
                            text: e + `lala`,
                            icon: 'warning'
                        })
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
                            // alert(result.successMessage)
                            this.setClear();
                            this.props.backSales();
                            this.props.history.push("/sales")
                            Swal.fire('Saved!', '', 'success')
                        } else {
                            Swal.fire({
                                text: result.errorMessage + `lulu`,
                                icon: 'warning'
                            })
                        }
                    })
                    .catch((e) => {
                        Swal.fire({
                            text: e + 'lili',
                            icon: 'warning'
                        })
                    })
            }
        }
    }
    // --------------------------------------------------------BACK TO SALES PAGE-------------------------------------------------
    backSales = () => {
        let detailTemp = this.state.detail
        if (detailTemp === true) {
            this.props.backSales();
            this.props.history.push("/sales")
        }
        else if (this.state.displayAdd === "none") {
            Swal.fire('Finish or cancel your activity')
        } else {
            Swal.fire({
                title: 'Do you want to save the changes?',
                showDenyButton: true,
                showCancelButton: true,
                confirmButtonText: `Save`,
                denyButtonText: `Don't save`,
            }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    this.updateSales()
                } else if (result.isDenied) {
                    this.props.backSales();
                    this.props.history.push("/sales")
                    Swal.fire('Changes are not saved', '', 'info')
                }
            })
        }
    }

    // -----------------------------------------------------Save click--------------------------------------------------------------
    saveClick = () => {
        const { dateSales, customer, status} = this.state
        if (this.state.displayAdd === "none") {
            Swal.fire({
                text: 'Finish or cancel your activity',
                icon: 'warning'

            })
        } else if (dateSales === null || customer === "" || status === "") {
            Swal.fire({
                text: 'Insert All Data',
                icon: 'warning'

            })
        }
        else {
            Swal.fire({
                title: 'Do you want to save the changes?',
                showCancelButton: true,
                confirmButtonText: `Save`,
            }).then((result) => {
                if (result.isConfirmed) {
                    this.updateSales()
                }
            })
        }
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
        let qtyTemp = el.target.value
        let qtyTemp2 = parseInt(qtyTemp)
        if (product !== undefined) {
            if (qtyTemp2 < 1) {
                Swal.fire('Quantity must be greater then 0')
            }
            else {
                let priceTemp = temp[idx].price * el.target.value
                temp[idx] = {
                    ...temp[idx],
                    [key]: el.target.value,
                    totalPrice: priceTemp,
                }
                console.log("pricetemp", priceTemp);
                this.setState({
                    productList: temp,
                }, this.grossHandler())
            }
        } else {
            Swal.fire('Choose Product Code!')
        }
    }


    // ------------------------------------------------------DISCOUNT HANDLER--------------------------------------------------------
    discountHandler = el => {
        if (el.target.value > this.state.gross) {
            Swal.fire('discount cannot be greater than gross!')
        }
        else {
            this.setState({
                discount: el.target.value
            }, () => this.taxhandler())
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
                price: product.price,
                status: product.status

            }
            this.setState({
                productList: temp
            })
        } else {
            Swal.fire('Choose Product Code!')
        }

    }

    // ---------------------------------------------------DELETE CLICK--------------------------------------------------------------
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
                let temp = this.state.productList
                let disabledTemp = this.state.disabled
                temp.splice(idx, 1)
                disabledTemp.splice(idx, 1)
                this.setState({
                    prodList: temp,
                    disabled: disabledTemp,
                })
                this.grossHandler()
                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                )
            }
        })
    }

    // ---------------------------------------EDIT CLICK------------------------------------------------
    editClick = (idx) => {
        if (this.state.edit === true) {
            Swal.fire({
                text: 'finish your work before with click submit or cancel!',
                icon: 'error'
            })

        } else {
            console.log("ini index", idx);
            let tempProd = this.state.productList[idx]
            console.log("tempProd", tempProd);
            console.log();
            let temp = this.state.disabled
            temp[idx] = false
            this.setState({
                displayAdd: "none",
                edit: true,
                displayBtn: "",
                disabled: temp,
                codeTarget: tempProd.code,
                qty: tempProd.qty,
                indexEdit: idx

            })
        }
    }

    // ----------------------------------------------------PRICE FORMAT----------------------------------------------
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
        const { dateSales, distributor, customer, discount, status, productList } = this.state
        console.log("qty", this.state.qtyProduct);
        console.log("prodList", this.state.productList);
        console.log("edit", this.state.edit);
        return (
            <div className="detailBody">
                <div className="detailHeader">
                    <Button style={{ display: this.state.detail === true ? "none" : "" }} className="saveSales" onClick={() => this.saveClick()}>Save</Button>
                    <Button className="backSales" onClick={() => this.backSales()}>Back</Button>
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
                            <Input min={this.state.dateFirst} max={this.state.dateLast} disabled={this.state.disableTable} name="dateSales" onChange={this.setValue} value={this.state.dateSales} type="Date" className="dateSales"></Input><br />
                            <Input disabled={true} name="distributor" onChange={this.setValue} value={this.state.distributor} type="text" className="inputDtl"></Input><br />
                            <Input placeholder="name customer.." disabled={this.state.disableTable} name="customer" onChange={this.setValue} value={this.state.customer} type="text" className="inputDtl"></Input><br />
                            <Input min={1} max={this.state.gross} placeholder="discount.." name="discount" onChange={this.discountHandler} disabled={this.state.disableInput} value={this.state.discount} type="number" className="inputDtl"></Input><br />
                            <select name="status" onChange={this.setValue} value={this.state.status} disabled={this.state.disableInput} className="inputDtl">
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
                        <table id="tableDetail1" cellspasing="0" border="2 black" style={{ cursor: "pointer" }}>
                            <thead>
                                <tr className="tableDetail2" >
                                    <th className="tText">Product Code</th>
                                    <th className="tText">Product Name</th>
                                    <th className="tText">Quantity</th>
                                    <th className="tText">Price (Rp)</th>
                                    <th className="tText">Sub Total (Rp)</th>
                                </tr>
                            </thead>
                            <tbody className="tbodyDetail">
                                {
                                    this.state.productList.map((detail, index) => {
                                        console.log(this.state.productList[index].code);
                                        return (
                                            <tr key={index} className="detailList" >
                                                <td>
                                                    <select disabled={this.state.disabled[index]} name="code" onChange={(el) => { this.handleProd(el, index, "code") }} value={detail.code}>
                                                        <option defaultValue>Product Code</option>
                                                        {
                                                            this.state.productData.map((prod) => {
                                                                return (
                                                                    <option style={{display:prod.status==="INACTIVE" ? "none":""}} value={prod.code}> {prod.code.substring(0, 5)} - {prod.nameProduct} (stock: {prod.stock}) </option>
                                                                )
                                                            })
                                                        }
                                                    </select>
                                                </td>
                                                <td><input name="nameProduct" disabled={true} value={detail.nameProduct}></input></td>
                                                <td><input type="number" min="1" name="qty" disabled={this.state.disabled[index]} onChange={(el) => { this.handleQty(el, index, "qty") }} value={detail.qty}></input></td>
                                                <td><input disabled={true} value={this.priceFormat(detail.price)}></input></td>
                                                <td><input disabled={true} value={this.priceFormat(detail.totalPrice)}></input></td>
                                                <td  onClick={() => this.delClick(index)} style={{ display: this.state.displayDel, border: "none", borderColor: "#A9A9A9", color: "black", backgroundColor: "#A9A9A9" }}><Icon className="fas fa-trash-alt"></Icon></td>
                                                <td onClick={() => this.editClick(index)} style={{ display:(this.state.displayDel==="" && detail.status==="ACTIVE" ? "" : "none"), border: "none", borderColor: "#A9A9A9", color: "black", backgroundColor: "#A9A9A9" }}><Icon className="fas fa-edit"></Icon></td>

                                            </tr>
                                        )
                                    })
                                }
                                <tr>
                                    <td colSpan="3"></td>
                                    <th style={{ backgroundColor: 'white', color: "black" }}>Gross</th>
                                    <th style={{ backgroundColor: 'white', color: "black" }}>{this.priceFormat(this.state.gross)}</th>
                                </tr>
                                <tr>
                                    <td colSpan="3"></td>
                                    <th style={{ backgroundColor: 'white', color: "black" }}>Discount</th>
                                    <th style={{ backgroundColor: 'white', color: "black" }}>{this.priceFormat(this.state.discount)}</th>
                                </tr>
                                <tr>
                                    <td colSpan="3"></td>
                                    <th style={{ backgroundColor: 'white', color: "black" }}>Tax (10%)</th>
                                    <th style={{ backgroundColor: 'white', color: "black" }}>{this.priceFormat(this.state.tax)}</th>
                                </tr>
                                <tr>
                                    <td colSpan="3"></td>
                                    <th style={{ backgroundColor: 'white', color: "black" }}>Total</th>
                                    <th style={{ backgroundColor: 'white', color: "black" }}>{this.priceFormat(this.state.invoice)}</th>
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