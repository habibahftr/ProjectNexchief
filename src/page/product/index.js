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
            displayTemp: "flexbox",
            disableInput: true,
            disableCode: true,
            disableProd: false,
            disableBtn: true,
            search: "",
            searchIcon: true,
            limit: 3,
            count: 0,
            page: 1,
            pageNow:1,
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
        // this.getAllProduct();
        this.getAPICount();
        this.getPaging(this.state.page, this.state.limit)
    }

    //------------------------------------SET VALUE------------------------------------------------------
    setValue = el => {
        this.setState({
            [el.target.name]: el.target.value
        })
    }

    //-----------------------------------------------------GET ALL PRODUCT SESUAI DENGAN USER LOGIN-----------------------------------
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
                    productList: json
                });
                this.props.productData({ list: json })
                console.log("product", this.state.productList);
            })
            .catch(() => {
                alert("Failed fetching")
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

        })
        console.log("coba: ", this.state.created_at);
        console.log("coba2", this.state.updated_by);

    }

    //-------------------------EDIT CLICK---------------------------------------------------------
    editClick = () => {
        console.log("addclick");
        this.setState({
            displayTemp: "none",
            displayUpdate: "",
            displayCancel: "",
            displaySubmit: "none",
            disableInput: false,
            disableCode: true,
            disableProd: true,
        })
    }


    //-----------------------------------UPDATED CLICK-----------------------------------------------------------------
    updateClick = (obj) => {
        console.log("updateClick");
        const { nameProduct, packaging, product_desc, category, launch_date, status, price, stock, updated_at, updated_by } = obj;
        if (nameProduct === "" || packaging === "" || category === "") {
            Swal.fire({
                title: 'Insert Product name, Packaging, and Category!',
                icon: 'warning'
            })
        } else {
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
                            displayUpdate: "none",
                            displayCancel: "none",
                            displaySubmit: "none",
                            disableInput: true,
                            disableCode: true,
                            disableProd: false,
                            disableBtn: true,
                        })
                        // this.getAllProduct();
                        this.getPaging(this.state.page, this.state.limit)
                    }
                })

        }

    }

    //-------------------------------------------CANCEL CLICK-------------------------------------------------
    cancelClick = () => {
        console.log("addclick");
        this.setState({
            displayTemp: "",
            displayUpdate: "none",
            displayCancel: "none",
            displaySubmit: "none",
            disableInput: true,
            disableCode: true,
            disableProd: false,
            disableBtn: true,
        })
        this.setClear();
    }


    //-----------------------------------------------SAVE CLICK--------------------------------------------------------------------------------------
    saveClick = (obj) => {
        const { code, nameProduct, packaging, product_desc, category, launch_date, status, price, stock, created_at, created_by, updated_at, updated_by } = obj
        console.log("obj", obj);
        let objProduct;
        if (nameProduct === "" || packaging === "" || category === "") {
            Swal.fire({
                title: 'Insert Product name, Packaging, and Category!',
                icon: 'warning'
            })
        } else {
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
                            displayUpdate: "none",
                            displayCancel: "none",
                            displaySubmit: "none",
                            disableInput: true,
                            disableCode: true,
                            disableProd: false,
                            disableBtn: true,
                        })
                        this.setClear();
                        // this.getAllProduct();
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
                        text: "You won't be able to revert this!",
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Yes, delete it!'
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

                });

            })
            .catch(() => {
                alert("Failed fetching")
            })
    }

    //---------------------------------------------------GET COUNT UNTUK MENGETAHUI JUMLAH DATA-----------------------------------------------
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

    // ------------------------------------------------GET COUNT UNTUK MENGETAHUI JUMLAH DATA SEARCH-----------------------------------------
    getAPICountSearch = () => {
        fetch(`http://localhost:8080/nexchief/search/count/?updated_by=` + this.props.dataLoginUser.id + `&nameProduct=` + this.state.search, {
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
                this.setState({
                    productList: json,
                    searchIcon: false,
                });
                console.log("search name", json);
            })
            .catch(() => {
                alert("Failed fetching")
            })
    }


    //------------------------------------------------SEARCH CLICK---------------------------------------------------------
    searchClick = () => {
        console.log("src");
        const searchIconTemp = this.state.searchIcon
        if (searchIconTemp === true) {
            if (this.state.search !== "") {
                this.getAPICountSearch();
                this.searchName(this.state.pageNow, this.state.limit)
                this.setState({
                    page: 1,
                    searchIcon: false,
                });
            } else {
                Swal.fire({
                    title: 'Input product name for searching!',
                    icon: 'warning'
                })
            }
        } else {
            this.setState({
                search: "",
                searchIcon: true,
            })
            this.getAPICount();
            this.getPaging(this.state.page, this.state.limit)
        }

    }

    //------------------------------------------------------INI PAGINATION---------------------------------------------------------------------
    handleChange = (event, value) => {
        this.setState({
            page: value
        })
        if (this.state.search === "") {
            this.getAPICount();
            this.getPaging(value, this.state.limit);
        } else {
            this.getAPICountSearch();
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
                this.setState({
                    productList: json,
                });
            })
    };


    //============================================================R E N D E R===============================================================
    render() {
        // console.log("ini page : ", this.state.page);
        // console.log("INI CREATED AT : ", this.state.created_at);
        // console.log("code", this.state.code);
        // console.log("productname", this.state.nameProduct);
        // console.log("productlist: ", this.state.productList);
        // console.log("count", this.state.count);
        const { code, nameProduct, packaging, product_desc, category, launch_date, status, price, stock, created_at, created_by, updated_at, updated_by } = this.state
        if (this.props.checkLogin === false) {
            this.props.history.push("/")
        }
        return (
            <div className="productPage">
                <div className="headerproduct">
                    <Icon onClick={() => this.props.history.push("/home")} className="fas fa-home" style={{ color: "white", display: 'inline-block', marginTop: "2vh", marginRight: "20%", marginLeft: "5%", fontSize: "40px", cursor: "pointer" }}></Icon>
                    <div className="buttonProduct">
                        <Button className="addBtn" onClick={() => this.addClick()} style={{ display: this.state.displayTemp }}>Add</Button>
                        <Button className="addBtn" disabled={this.state.disableBtn} onClick={() => this.editClick()} style={{ display: this.state.displayTemp }}>Edit</Button>
                        <Button className="addBtn" disabled={this.state.disableBtn} onClick={() => this.delClick()} style={{ display: this.state.displayTemp }}>Delete</Button>
                        <Button className="hiddenBtn" onClick={() => this.saveClick({ code, nameProduct, packaging, product_desc, category, launch_date, status, price, stock, created_at, created_by, updated_at, updated_by })} style={{ display: this.state.displaySubmit }}>Save</Button>
                        <Button className="hiddenBtn" onClick={() => this.updateClick({ nameProduct, packaging, product_desc, category, launch_date, status, price, stock, updated_at, updated_by })} style={{ display: this.state.displayUpdate }}>Update</Button>
                        <Button className="hiddenBtn" onClick={() => this.cancelClick()} style={{ display: this.state.displayCancel }}>Cancel</Button>
                    </div>
                </div>
                <div className="bodyProduct">
                    <div className="tableProduct">
                        <div className="searchProduct">
                            <Input className="search1" name="search" onChange={this.setValue} value={this.state.search} placeholder="product name.."></Input>
                            <Icon className={this.state.searchIcon === true ? "fas fa-search" : "fas fa-window-close"} onChange={this.setValue} onClick={() => this.searchClick()} style={{ cursor: "pointer", marginLeft: "2vh", fontSize: "20px", marginTop: "2vh" }}></Icon>

                        </div>
                        <div className="listProduct">
                            {
                                this.state.productList.map((prod, index) => {
                                    return (
                                        <div key={index} className="listProd" disabled={this.state.disableProd} onClick={() => this.prodClick(prod.code)}>
                                            <span>{prod.code}</span>
                                            <span className="spanProd">{prod.nameProduct}</span>
                                            <span className="spanProd">{prod.packaging}</span>
                                            <div>Price(Rp.)</div><div>{prod.price}</div>
                                        </div>
                                    )
                                })
                            }

                        </div>
                        <div className="paginationProd">
                            <Pagination style={{ background: 'white', marginTop: '0' }} page={this.state.page} onChange={this.handleChange} count={this.state.count} />
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
                            <Input disabled={this.state.disableInput} type="number" name="stock" value={this.state.stock} className="inputProd" style={{ width: "30%", marginTop: "0.6vh" }} placeholder="Product stock.." onChange={this.setValue}></Input><br />
                            <Input disabled={this.state.disableInput} type="number" name="price" value={this.state.price} className="inputProd" style={{ width: "30%", marginTop: "0.6vh" }} placeholder="Product price.." onChange={this.setValue}></Input><br />
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