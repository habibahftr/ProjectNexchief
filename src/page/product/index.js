import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '../../component/button';
import Icon from '../../component/icon';
import Input from '../../component/input';
import Pagination from '@material-ui/lab/Pagination';
import "./style.css";
import Swal from 'sweetalert2';

class Product extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displaySubmit: "none",
            displayCancel: "none",
            displayUpdate: "none",
            displayTemp: "",
            displayDel: "",
            disableInput: true,
            disableCode: true,
            disableProd: false,
            disableBtn: true,
            disableBtnDel: true,
            search: "",
            searchIcon: true,
            limit: 5,
            count: 0,
            page: 1,
            pageNow: 1,
            disableSearch: false,
            // -----------------------INI STATE PRODUCT-------------------------------
            productList: [],
            product: {},
            code: "",
            nameProduct: "",
            packaging: "",
            product_desc: "",
            category: "",
            launch_date: "",
            status: "",
            price: "",
            stock: "",
            created_at: "",
            created_by: "",
            updated_at: "",
            updated_by: "",


        }
    }

    //----------------------------------------COMPONENT DID MOUNT--------------------------------------------------
    componentDidMount() {
        this.getPaging(this.state.page, this.state.limit)
    }

    //------------------------------------SET VALUE------------------------------------------------------
    setValue = el => {
        this.setState({
            [el.target.name]: el.target.value
        })
    }

    setValueSearch = el => {
        if (el.target.value === "") {
            this.getPaging(this.state.page, this.state.limit)
        }
        this.setState({
            search: el.target.value
        })
    }

    //------------------------------------------------------ADD CLICK---------------------------------------------
    addClick = () => {
        console.log("addclick");
        let current_datetime = new Date()
        let yearTwoDigit = current_datetime.getFullYear();
        let monthTwoDigit = ("0" + (current_datetime.getMonth() + 1)).slice(-2)
        let dateTwoDigit = ("0" + current_datetime.getDate()).slice(-2)
        let formatted_date = yearTwoDigit + "-" + monthTwoDigit + "-" + dateTwoDigit
        console.log("uji tanggal:", formatted_date)
        this.setState({
            displayTemp: "none",
            displayDel: "none",
            displaySubmit: "",
            displayCancel: "",
            displayUpdate: "none",
            disableInput: false,
            disableCode: false,
            disableProd: true,
            created_by: this.props.dataLoginUser.name,
            updated_by: this.props.dataLoginUser.name,
            updated_at: formatted_date,
            created_at: formatted_date,
            code: "",
            nameProduct: "",
            packaging: "",
            product_desc: "",
            category: "",
            launch_date: "",
            status: "",
            price: "",
            stock: "",
            disableSearch: true,

        })
        console.log("coba: ", this.state.created_at);
        console.log("coba2", this.state.updated_by);

    }

    //-------------------------EDIT CLICK---------------------------------------------------------
    editClick = () => {
        console.log("addclick");
        this.setState({
            displayTemp: "none",
            displayDel: "none",
            displayUpdate: "",
            displayCancel: "",
            displaySubmit: "none",
            disableInput: false,
            disableCode: true,
            disableProd: true,
            disableSearch: true,
        })
    }


    //-----------------------------------UPDATED CLICK-----------------------------------------------------------------
    updateClick = (obj) => {
        console.log("updateClick");
        const { nameProduct, packaging, product_desc, category, launch_date, status, price, stock } = obj;
        if (nameProduct === "" || packaging === "" || category === "") {
            Swal.fire({
                title: 'Insert Product name, Packaging, and Category!',
                icon: 'warning'
            })
        } else if (price < 0 || stock < 0) {
            Swal.fire({
                title: 'stock and price must be greater than 0!',
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
                    const objEdit = {
                        nameProduct: nameProduct,
                        packaging: packaging,
                        product_desc: product_desc,
                        category: category,
                        launch_date: launch_date,
                        status: status,
                        price: price,
                        stock: stock,
                        updated_at: new Date(),
                        updated_by: this.props.dataLoginUser.id,
                    }
                    fetch(`http://localhost:8080/nexchief/updateProduct/` + this.state.code, {
                        method: "put",
                        headers: {
                            "Content-Type": "application/json; ; charset=utf-8",
                            "Access-Control-Allow-Headers": "Authorization, Content-Type",
                            "Access-Control-Allow-Origin": "*"
                        },
                        body: JSON.stringify(objEdit)
                    })
                        .then((response) => {
                            return response.json()
                        })
                        .then((json) => {
                            if (typeof json.errorMessage !== 'undefined') {
                                Swal.fire({
                                    title: json.errorMessage,
                                    icon: 'warning'
                                })
                            } else if (typeof json.successMessage !== 'undefined') {
                                Swal.fire({
                                    position: 'center',
                                    icon: 'success',
                                    title: json.successMessage,
                                    showConfirmButton: false,
                                    timer: 1500
                                })
                                this.setClear();
                                this.setState({
                                    displayTemp: "",
                                    displayDel: "",
                                    displayUpdate: "none",
                                    displayCancel: "none",
                                    displaySubmit: "none",
                                    disableInput: true,
                                    disableCode: true,
                                    disableProd: false,
                                    disableBtn: true,
                                    disableBtnDel: true,
                                    disableSearch: false,
                                })
                                this.getPaging(this.state.page, this.state.limit)
                            }
                        })
                }
            })

        }

    }

    //-------------------------------------------CANCEL CLICK-------------------------------------------------
    cancelClick = () => {
        console.log("addclick");
        this.setState({
            displayTemp: "",
            displayDel: "",
            displayUpdate: "none",
            displayCancel: "none",
            displaySubmit: "none",
            disableInput: true,
            disableCode: true,
            disableProd: false,
            disableBtn: true,
            disableBtnDel: true,
            disableSearch: false,
        })
        this.setClear();
    }


    //-----------------------------------------------SAVE CLICK--------------------------------------------------------------------------------------
    saveClick = (obj) => {
        const { code, nameProduct, packaging, product_desc, category, launch_date, status, price, stock} = obj
        console.log("obj", obj);
        let objProduct;
        if (nameProduct === "" || packaging === "" || category === "") {
            Swal.fire({
                title: 'Insert Product name, Packaging, and Category!',
                icon: 'warning'
            })
        } else if (price < 0 || stock < 0) {
            Swal.fire({
                title: 'stock and price must be greater than 0!',
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
                    if (code === "") {
                        objProduct = {
                            code: null,
                            nameProduct: nameProduct,
                            packaging: packaging,
                            product_desc: product_desc,
                            category: category,
                            launch_date: launch_date,
                            status: status,
                            price: price,
                            stock: stock,
                            created_at: new Date(),
                            created_by: this.props.dataLoginUser.id,
                            updated_at: new Date(),
                            updated_by: this.props.dataLoginUser.id,
                        }

                    }
                    else {
                        objProduct = {
                            code: code,
                            nameProduct: nameProduct,
                            packaging: packaging,
                            product_desc: product_desc,
                            category: category,
                            launch_date: launch_date,
                            status: status,
                            price: price,
                            stock: stock,
                            created_at: new Date(),
                            created_by: this.props.dataLoginUser.id,
                            updated_at: new Date(),
                            updated_by: this.props.dataLoginUser.id,
                        }
                    }
                    fetch(`http://localhost:8080/nexchief/product/`, {
                        method: "post",
                        headers: {
                            "Content-Type": "application/json; ; charset=utf-8",
                            "Access-Control-Allow-Headers": "Authorization, Content-Type",
                            "Access-Control-Allow-Origin": "*"
                        },
                        body: JSON.stringify(objProduct)
                    })
                        .then((response) => {
                            return response.json()
                        })
                        .then((result) => {
                            if (result.successMessage === "New product successfully created") {
                                Swal.fire({
                                    position: 'top',
                                    icon: 'success',
                                    title: result.successMessage,
                                    showConfirmButton: false,
                                    timer: 1500
                                })
                                this.setState({
                                    displayTemp: "",
                                    displayDel: "",
                                    displayUpdate: "none",
                                    displayCancel: "none",
                                    displaySubmit: "none",
                                    disableInput: true,
                                    disableCode: true,
                                    disableProd: false,
                                    disableBtn: true,
                                    disableBtnDel: true,
                                    disableSearch: false,
                                })

                                this.setClear();
                                this.getPaging(this.state.page, this.state.limit)
                            } else {
                                Swal.fire({
                                    title: result.errorMessage,
                                    icon: 'warning'
                                })
                            }
                        })
                        .catch((e) => {
                            Swal.fire({
                                title: e,
                                icon: 'warning'
                            })
                        })

                }
            })


        }

    }

    //------------------------------------------------DELETE CLICK--------------------------------------------------------------------------
    delClick = () => {
        fetch(`http://localhost:8080/nexchief/product/` + this.state.code, {
            method: "delete",
            headers: {
                "Content-Type": "application/json; ; charset=utf-8",
                "Access-Control-Allow-Headers": "Authorization, Content-Type",
                "Access-Control-Allow-Origin": "*"
            }
        })
            .then((result) => {
                if (result.successMessage !== "undefined") {
                    Swal.fire({
                        title: 'Are you sure?',
                        text: "you want to change the product status to inactive?",
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Yes!'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            Swal.fire(
                                'Deleted!',
                                result.successMessage,
                                'success'
                            )
                            this.setClear();
                            this.getPaging(this.state.page, this.state.limit)
                            this.setState({
                                disableBtn: true,
                                disableBtnDel: true,
                            })
                        }else{
                            this.setState({
                                disableBtn: true,
                                disableBtnDel: true
                            })
                        }
                    })


                }
                else if (result.errorMessage !== 'undefined') {
                    Swal.fire(
                        result.errorMessage,
                        'warning'
                    )
                }
            })
            .catch((e) => {
                alert(e);
            })


    }

    //-------------------------------------SET CLEAR (RESET)---------------------------------------------------------------
    setClear = () => {
        this.setState({
            code: "",
            nameProduct: "",
            packaging: "",
            product_desc: "",
            category: "",
            launch_date: "",
            status: "",
            price: "",
            stock: "",
            created_at: "",
            created_by: "",
            updated_at: "",
            updated_by: "",
        })

    }

    //------------------------------------------------PRODUCT CLICK---------------------------------------------------------------
    prodClick = (code) => {
        fetch(`http://localhost:8080/nexchief/product/` + code, {
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
                    disableBtn: false,
                    disableBtnDel:false,
                    code: json.code,
                    nameProduct: json.nameProduct,
                    packaging: json.packaging,
                    product_desc: json.product_desc,
                    category: json.category,
                    launch_date: json.launch_date,
                    status: json.status,
                    price: json.price,
                    stock: json.stock,
                    created_at: json.created_at,
                    created_by: json.created_by,
                    updated_at: json.updated_at,
                    updated_by: json.updated_by,

                }, () => this.statusHandler());

            })
            .catch(() => {
                alert("Failed fetching")
            })
    }

    statusHandler = () => {
        let statusTemp = this.state.status
        if (statusTemp === "INACTIVE") {
            this.setState({
                displayDel: "none"
            })
        } else {
            this.setState({
                displayDel: ""
            })
        }
    }


    // --------------------------------------PAGINATION SEARCH--------------------------------------------------------------
    searchName = (value, limit) => {
        fetch(`http://localhost:8080/nexchief/product/search/?page=` + value + "&limit=" + limit + "&id=" + this.props.dataLoginUser.id + "&nameProduct=" + this.state.search, {
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
                    searchIcon: false,
                    count: Math.ceil(limitPage)
                });
                console.log("search name", json);
            })
            .catch(() => {
                alert("Failed fetching")
            })
    }


    //------------------------------------------------SEARCH CLICK---------------------------------------------------------
    searchClick = () => {
        if (this.state.search !== "") {
            this.searchName(this.state.pageNow, this.state.limit)
            this.setState({
                page: 1,
            });
        } else {
            Swal.fire({
                title: 'Input product name for searching!',
                icon: 'warning'
            })
        }
    }

    closeClick = () => {
        this.setState({
            search: "",
        })
        this.getPaging(this.state.page, this.state.limit)
    }

    //------------------------------------------------------INI PAGINATION---------------------------------------------------------------------
    handleChange = (event, value) => {
        this.setState({
            page: value
        })
        if (this.state.search === "") {
            this.getPaging(value, this.state.limit);
        } else {
            this.searchName(value, this.state.limit)
        }
    }


    getPaging = (value, limit) => {
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
            })
    };

    backHome = () => {
        if (this.state.displayTemp === "none") {
            Swal.fire({
                text: 'Finish or cancel your activity',
                icon: 'warning'
            })
        } else {
            this.props.history.push("/home")
        }
    }

    printClick = () => {
        if (this.state.displayTemp === "none") {
            Swal.fire({
                text: 'Finish or cancel your activity',
                icon: 'warning'
            })
        } else {
            this.props.history.push("/report/product")
        }

    }


    //============================================================R E N D E R===============================================================
    render() {
        const { code, nameProduct, packaging, product_desc, category, launch_date, status, price, stock, created_at, created_by, updated_at, updated_by } = this.state
        if (this.props.checkLogin === false) {
            this.props.history.push("/")
        }
        console.log(this.state.search);
        return (
            <div className="productPage">
                <div className="headerproduct">
                    <Icon onClick={() => this.backHome()} className="fas fa-home" style={{ color: "white", display: 'inline-block', marginTop: "2vh", marginRight: "20%", marginLeft: "5%", fontSize: "40px", cursor: "pointer" }}></Icon>
                    <div className="buttonProduct">
                        <Button className="addBtn" onClick={() => this.addClick()} style={{ backgroundColor: "green", display: this.state.displayTemp }}>Add</Button>
                        <Button className="addBtn" disabled={this.state.disableBtn} onClick={() => this.editClick()} style={{ backgroundColor: "#f2d230", cursor: this.state.disableBtn === true ? "text" : "pointer", display: this.state.displayTemp }}>Edit</Button>
                        <Button className="addBtn" disabled={this.state.disableBtnDel} onClick={() => this.delClick()} style={{ backgroundColor: "red", cursor: this.state.disableBtnDel === true ? "text" : "pointer", display: this.state.displayDel }}>Delete</Button>
                        <Button className="hiddenBtn" onClick={() => this.saveClick({ code, nameProduct, packaging, product_desc, category, launch_date, status, price, stock, created_at, created_by, updated_at, updated_by })} style={{ backgroundColor: "green", display: this.state.displaySubmit }}>Save</Button>
                        <Button className="hiddenBtn" onClick={() => this.updateClick({ nameProduct, packaging, product_desc, category, launch_date, status, price, stock, updated_at, updated_by })} style={{ backgroundColor: "blue", display: this.state.displayUpdate }}>Update</Button>
                        <Button className="hiddenBtn" onClick={() => this.cancelClick()} style={{ backgroundColor: "red", display: this.state.displayCancel }}>Cancel</Button>
                    </div>
                    <div className="gotoReport" style={{ cursor: "pointer" }}>
                        <Icon onClick={() => this.printClick()} className="fas fa-file-import" ></Icon>
                        <div>Go To Report</div>
                    </div>
                </div>
                <div className="bodyProduct">
                    <div className="tableProduct">
                        <div disabled={this.state.disableSearch} className="searchProduct">
                            <Input className="search1" name="search" onChange={this.setValueSearch} value={this.state.search} placeholder="product name.."></Input>
                            <Icon className="far fa-window-close" onClick={() => this.closeClick()} style={{ marginLeft: "-25px", marginTop: "2px" }}></Icon>
                            <Icon className="fas fa-search" onChange={this.setValue} onClick={() => this.searchClick()} style={{ cursor: "pointer", marginLeft: "2vh", border: "solid", padding: "1.5px", fontSize: "16px", marginTop: "1.5vh" }}></Icon>

                        </div>
                        <div className="listProduct">
                            {
                                this.state.productList.map((prod, index) => {
                                    return (
                                        <div key={index} className="listProd" disabled={this.state.disableProd} onClick={() => this.prodClick(prod.code)}>
                                            <span>{prod.code.substring(0, 10)}</span>
                                            <span className="spanProd">{prod.nameProduct}</span>
                                            <span className="spanProd">{prod.packaging}</span>
                                            <div>Price(Rp.)</div><div>{prod.price}</div>
                                        </div>
                                    )
                                })
                            }
                            {
                                (this.state.productList.length > 0) ?
                                    ""
                                    :
                                    <div className="listProd" style={{ textAlign: "center" }} >
                                        <span style={{ margin: "auto", textAlign: "center" }}>Data empty</span>
                                    </div>
                            }

                        </div>
                        <div className="paginationProd">
                            <Pagination color="secondary" style={{ background: 'white', marginTop: '0' }} page={this.state.page} onChange={this.handleChange} count={this.state.count} />
                        </div>
                    </div>
                    <div className="formProduct">
                        <div className="labelProduct">
                            <div className="labelProd" style={{ height: "3.5vh", paddingTop: "2vh" }}>Product Code</div>
                            <div className="labelProd" style={{ height: "3.5vh", paddingTop: "2vh" }}>Product Name*</div>
                            <div className="labelProd" style={{ height: "4vh", paddingTop: "2vh" }}>Packaging*</div>
                            <div className="labelProd" style={{ height: "6vh", paddingTop: "9vh" }}>Product Description</div>
                            <div className="labelProd" style={{ height: "3.5vh", paddingTop: "2vh" }}>Product Category*</div>
                            <div className="labelProd" style={{ height: "3.5vh", paddingTop: "2vh" }}>Market Launch Date*</div>
                            <div className="labelProd" style={{ height: "3.5vh", paddingTop: "2vh" }}>Product Status</div>
                            <div className="labelProd" style={{ height: "3.5vh", paddingTop: "2vh" }}>Stock</div>
                            <div className="labelProd" style={{ height: "3.5vh", paddingTop: "2vh", marginBottom: "0px" }}>Price</div>
                            <div className="blueline" style={{ height: "0.75vh", width: "200%", backgroundColor: 'blue' }}></div>
                            <div className="labelProd" style={{ height: "3.5vh", paddingTop: "2vh", marginTop: "0vh" }}>Created At</div>
                            <div className="labelProd" style={{ height: "3.5vh", paddingTop: "2vh" }}>Created By</div>
                            <div className="labelProd" style={{ height: "3.5vh", paddingTop: "2vh" }}>Updated At</div>
                            <div className="labelProd" style={{ height: "3.5vh", paddingTop: "2vh" }}>Updated By</div>
                            <div className="labelProd" style={{ height: "1.8vh", paddingTop: "2vh" }}></div>

                        </div>
                        <div className="inputProduct">
                            <Input disabled={this.state.disableCode} name="code" value={this.state.code} className="inputProd" style={{ marginTop: "0.5vh" }} onChange={this.setValue} placeholder="write Product Code.."></Input>
                            <Input disabled={this.state.disableInput} name="nameProduct" value={nameProduct} className="inputProd" style={{ marginTop: "0.7vh" }} onChange={this.setValue} placeholder="write Product Name.."></Input>
                            <Input disabled={this.state.disableInput} name="packaging" value={this.state.packaging} className="inputProd" style={{ marginTop: "1vh", width: "40%" }} onChange={this.setValue} placeholder="write Product Packaging.."></Input><br />
                            <textarea disabled={this.state.disableInput} name="product_desc" value={this.state.product_desc} rows="5" cols="40" style={{ marginTop: "1vh", marginLeft: "5vh", padding: "1vh", resize: "none" }} onChange={this.setValue} placeholder="write Product Description.."></textarea><br />
                            <select disabled={this.state.disableInput} name="category" value={this.state.category} className="inputProd" style={{ height: "5vh", marginTop: "0.7vh", width: "50%" }} onChange={this.setValue}>
                                <option defaultValue>Product Category</option>
                                <option value="TOPITEM">TOP ITEM</option>
                                <option value="STANDARD">STANDARD</option>
                            </select><br />
                            <Input disabled={this.state.disableInput} type="date" name="launch_date" value={this.state.launch_date} className="inputProd" style={{ width: "30%", marginTop: "0.7vh" }} onChange={this.setValue}></Input><br />
                            <select disabled={this.state.disableInput} name="status" value={this.state.status} className="inputProd" style={{ height: "5vh", marginTop: "0.6vh", width: "50%" }} onChange={this.setValue}>
                                <option defaultValue>Product Status</option>
                                <option value="ACTIVE">ACTIVE</option>
                                <option value="INACTIVE">INACTIVE</option>
                            </select><br />
                            <Input min={0} disabled={this.state.disableInput} type="number" name="stock" value={this.state.stock} className="inputProd" style={{ width: "30%", marginTop: "0.6vh" }} placeholder="Product stock.." onChange={this.setValue}></Input><br />
                            <Input min={0} disabled={this.state.disableInput} type="number" name="price" value={this.state.price} className="inputProd" style={{ width: "30%", marginTop: "0.6vh" }} placeholder="Product price.." onChange={this.setValue}></Input><br />
                            <Input disabled={true} type="date" name="created_at" value={created_at} className="inputProd" style={{ width: "30%", marginTop: "1vh" }} onChange={this.setValue}></Input> <br />
                            <Input disabled={true} type="text" className="inputProd" name="created_by" value={this.state.created_by} style={{ width: "30%", marginTop: "0.7vh" }} onChange={this.setValue}></Input><br />
                            <Input disabled={true} type="date" className="inputProd" name="updated_at" value={this.state.updated_at} style={{ width: "30%", marginTop: "0.7vh" }} onChange={this.setValue}></Input> <br />
                            <Input disabled={true} type="text" className="inputProd" name="updated_by" value={this.state.updated_by} style={{ width: "30%", marginTop: "0.7vh" }} onChange={this.setValue}></Input>

                        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Product);