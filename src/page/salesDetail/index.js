import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '../../component/button';
import Icon from '../../component/icon';
import Input from '../../component/input';
import Label from '../../component/label';
import "./style.css"

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
            status: "",
            productList:[],

        }
    }

    componentDidMount() {
        console.log("sales detail", this.props.salesClick);
        if (this.props.act === 1) {
            this.setState({
                dateSales: this.props.salesClick.dateSales,
                distributor: this.props.dataLoginUser.name,
                status: this.props.salesClick.status,
                customer: this.props.salesClick.customer,
                productList:this.props.salesClick.productList,
            })
        }else{
            this.setState({
                dateSales: "",
                distributor: this.props.dataLoginUser.name,
                status: "",
                customer: "",
                productList:[],
                disableInput: false,
            })

        }
    }

    setValue = el => {
        this.setState({
            [el.target.name]: el.target.value
        })
    }

    setClear=()=>{
        this.setState({
            dateSales: "",
            distributor: "",
            status: "",
            customer: "",
            productList:[],
        })
    }

    addClick = () => {
        this.setState({
            displayAdd: "none",
            displayBtn: ""
        })
    }

    cancelClick = () => {
        this.setState({
            displayAdd: "",
            displayBtn: "none"
        })
    }

    submitClick = () => {
        this.setState({
            displayAdd: "",
            displayBtn: "none"
        })
    }

    backSales=()=>{
        this.setClear();
        this.props.backSales();
        this.props.history.push("/sales")

    }

    // totalPrice=(qty, price)=>{

    // }
    render() {
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
                                <Label style={{ margintop: "10px" }}>Status</Label><br />
                            </div>
                        </div>
                        <div className="inputs">
                            <Input disabled={this.state.disableInput} name="dateSales" onChange={this.setValue} value={this.state.dateSales} type="Date" className="dateSales"></Input><br />
                            <Input disabled={true} name="distributor" onChange={this.setValue} value={this.state.distributor} type="text" className="inputDtl"></Input><br />
                            <Input disabled={this.state.disableInput} name="customer" onChange={this.setValue} value={this.state.customer} type="text" className="inputDtl"></Input><br />
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
                                            <td>{detail.code}</td>
                                            <td>{detail.nameProduct}</td>
                                            <td>{detail.stock}</td>
                                            <td>{detail.price}</td>
                                            <td>{detail.totalPrice}</td>
                                            <td><Icon className="fas fa-window-close"></Icon></td>
                                        </tr>

                                    )
                                })
                            }

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
        backSales:()=>dispatch({type:"BACK_SALES"})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SalesDetail);