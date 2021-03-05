import React, { Component } from 'react';
import Button from '../../component/button';
import Input from '../../component/input';
import Label from '../../component/label';
import "./style.css"

class SalesDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displayAdd:"",
            displayBtn:"none"
        }
    }
    addClick=()=>{
        this.setState({
            displayAdd:"none",
            displayBtn:""
        })
    }

    cancelClick=()=>{
        this.setState({
            displayAdd:"",
            displayBtn:"none"
        })
    }

    submitClick=()=>{
        this.setState({
            displayAdd:"",
            displayBtn:"none"
        })
    }
    render() {
        return (
            <div className="detailBody">
                <div className="detailHeader">
                    <Button className="backSales" onClick={()=> this.props.history.push("/sales")}>Back to Sales Page</Button>
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
                            <Input type="Date"></Input><br />
                            <Input className="inputDtl" type="text"></Input><br />
                            <Input className="inputDtl" type="text"></Input><br />
                            <select className="inputDtl">
                                <option value="unpaid">Unpaid</option>
                                <option value="paid">Paid</option>
                            </select>
                        </div>
                    </div>
                    <div className="adddetail">
                        <Button className="detailButton" onClick={()=>this.addClick()} style={{display: this.state.displayAdd}}>Add Product</Button>
                        <Button className="submitDetail" onClick={()=>this.submitClick()} style={{display: this.state.displayBtn}}>Submit</Button>
                        <Button className="cancelDetail" onClick={()=>this.cancelClick()} style={{display: this.state.displayBtn}}>Cancel</Button>
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
                            <tr>
                                <td>A-123</td>
                                <td>Chocolatos</td>
                                <td>10</td>
                                <td>15000</td>
                                <td>150000</td>
                                <td><i class="fas fa-window-close"></i></td>
                            </tr>
                        </tbody>
                    </table>


                </div>
            </div>
        );
    }
}

export default SalesDetail;