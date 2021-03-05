import React, { Component } from 'react';
import Button from '../../component/button';
import Icon from '../../component/icon';
import Input from "../../component/input"
import Label from '../../component/label';
import "./style.css"

class Sales extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    detailClick=()=>{
        this.props.history.push("/sales/detail")
    }
    
    render() {
        return (
            <div className="salesPage">
                <div className="headerSales">
                    <Icon onClick={() => this.props.history.push("/home")} className="fas fa-home" style={{ color: "white", display: 'inline-block', marginTop: "2vh", marginRight: "20%", marginLeft: "5%", fontSize: "40px", cursor: "pointer" }}></Icon>
                    <div className="titleSales">
                        <Label className="monthly">MONTHLY</Label>
                        <Label className="salesact">SALES ACTIVITY</Label>
                    </div>
                </div>
                <div className="bodySales">
                    <div className="container1">
                        <div className="seacrhSales1">
                            <Input className="searchSales2" ></Input>
                            <Icon className="fas fa-search" style={{color:"grey", marginLeft:"-5vh", fontSize:"15px", marginTop:"2vh"}}></Icon>
                        </div>
                        <div className="addButton">
                            <Button className="addSales" onClick={()=>this.props.history.push("/sales/detail")}>Add</Button>
                        </div>
                    </div>
                    <div className="container2">
                        <table id="tableSales1" cellspasing="0" border="1 white">
                            <thead>
                                <tr className="tableSales2" >
                                    <th className="tDate">Date</th>
                                    <th className="tText">Customer</th>
                                    <th className="tText">Gross Amount (Rp)</th>
                                    <th className="tText">Discount (Rp)</th>
                                    <th className="tText">Tax (Rp)</th>
                                    <th className="tText">Invoice (Rp)</th>
                                    <th className="tText">Status</th>
                                    <th className="tText">Action</th>
                                </tr>
                            </thead>
                            <tbody className="tbodySales">
                                <tr>
                                    <td>01-01-2021</td>
                                    <td>Budi</td>
                                    <td>1000000</td>
                                    <td>200000</td>
                                    <td>80000</td>
                                    <td>880000</td>
                                    <td>Unpaid</td>
                                    <td><button onClick={()=>this.detailClick()}>Detail</button></td>
                                </tr>
                            </tbody>
                        </table>

                    </div>
                    <div className="paginationSales">

                    </div>
                </div>
            </div>
        );
    }
}

export default Sales;