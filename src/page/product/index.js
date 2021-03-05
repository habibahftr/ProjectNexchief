import React, { Component } from 'react';
import Button from '../../component/button';
import Icon from '../../component/icon';
import Input from '../../component/input';
import "./style.css";

class Product extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displaySubmit:"none",
            displayCancel:"none",
            displayUpdate:"none",
            displayTemp: "flexbox",
            disableInput: true,
            
        }
    }

    addClick=()=>{
        console.log("addclick");
        this.setState({
            displayTemp:"none",
            displaySubmit:"",
            displayCancel:"",
            displayUpdate:"none",
            disableInput: false,
        })
    }

    editClick=()=>{
        console.log("addclick");
        this.setState({
            displayTemp:"none",
            displayUpdate:"",
            displayCancel:"",
            displaySubmit:"none",
            disableInput: false,
        })
    }

    cancelClick=()=>{
        console.log("addclick");
        this.setState({
            displayTemp:"",
            displayUpdate:"none",
            displayCancel:"none",
            displaySubmit:"none",
            disableInput: true,
        })
    }

    render() {
        return (
            <div className="productPage">
                <div className="headerproduct">
                    <Icon onClick={()=>this.props.history.push("/home")} className="fas fa-home" style={{ color: "white", display: 'inline-block', marginTop: "2vh", marginRight: "20%", marginLeft: "5%", fontSize: "40px", cursor: "pointer" }}></Icon>
                    <div className="buttonProduct">
                        <Button className="addBtn"  onClick={()=>this.addClick()} style={{display: this.state.displayTemp}}>Add</Button>
                        <Button className="addBtn" onClick={()=>this.editClick()} style={{display: this.state.displayTemp}}>Edit</Button>
                        <Button className="addBtn" style={{display: this.state.displayTemp}}>Delete</Button>
                        <Button className="hiddenBtn" style={{display: this.state.displaySubmit}}>Submit</Button>
                        <Button className="hiddenBtn" style={{display: this.state.displayUpdate}}>Update</Button>
                        <Button className="hiddenBtn" onClick={()=>this.cancelClick()} style={{display: this.state.displayCancel}}>Cancel</Button>
                    </div>
                </div>
                <div className="bodyProduct">
                    <div className="tableProduct">
                        <div className="searchProduct">
                            <Input className="search1" placeholder="product name.."></Input>
                            <Icon className="fas fa-search" style={{marginLeft:"2vh", fontSize:"20px", marginTop:"2vh"}}></Icon>

                        </div>
                        <div className="listProduct">
                            <div className="listProd">ini Product 1</div>
                            <div className="listProd">ini product 2</div>
                            <div className="listProd">ini Product 1</div>
                            <div className="listProd">ini product 2</div>
                            <div className="listProd">ini Product 1</div>
                            <div className="listProd">ini product 2</div>
                            <div className="listProd">ini Product 1</div>
                            <div className="listProd">ini product 2</div>
                        </div>
                        <div className="paginationProd">
                            <div>untuk pagination</div>
                        </div>
                    </div>
                    <div className="formProduct">
                        <div className="labelProduct">
                            <div className="labelProd" style={{height:"4vh", paddingTop:"2vh"}}>Product Code</div>
                            <div className="labelProd" style={{height:"4vh", paddingTop:"4vh"}}>Product Name*</div>
                            <div className="labelProd" style={{height:"4vh", paddingTop:"4vh"}}>Packaging*</div>
                            <div className="labelProd" style={{height:"8vh", paddingTop:"9vh"}}>Product Description</div>
                            <div className="labelProd" style={{height:"4vh", paddingTop:"2vh"}}>Product Category*</div>
                            <div className="labelProd"  style={{height:"4vh", paddingTop:"2vh"}}>Market Launch Date</div>
                            <div className="labelProd" style={{height:"4vh", paddingTop:"2vh"}}>Product Status</div>
                            <div className="labelProd" style={{height:"4vh", paddingTop:"2vh",  marginBottom: "0px"}}>Price</div>
                            <div className="blueline" style={{height:"0.75vh", width:"200%", backgroundColor:'blue'}}></div>
                            <div className="labelProd" style={{height:"4vh", paddingTop:"2vh", marginTop:"0vh"}}>Created At</div>
                            <div className="labelProd" style={{height:"4vh", paddingTop:"2vh"}}>Created By</div>
                            <div className="labelProd" style={{height:"4vh", paddingTop:"2vh"}}>Updated At</div>
                            <div className="labelProd" style={{height:"4vh", paddingTop:"2vh"}}>Updated By</div>

                        </div>
                        <div className="inputProduct">
                            <Input disabled={this.state.disableInput} className="inputProd" style={{marginTop:"1vh"}} placeholder="write Product Code.."></Input>
                            <Input disabled={this.state.disableInput} className="inputProd" style={{marginTop:"2.5vh"}} placeholder="write Product Name.."></Input>
                            <Input disabled={this.state.disableInput} className="inputProd" style={{marginTop:"2vh", width:"40%"}} placeholder="write Product Packaging.."></Input><br/>
                            <textarea disabled={this.state.disableInput} rows="6" cols="40" style={{marginTop:"2vh", marginLeft:"5vh", padding:"1vh", resize:"none"}} placeholder="write Product Description.."></textarea><br/>
                            <select disabled={this.state.disableInput} className="inputProd" style={{height:"5vh", marginTop:"1.5vh", width:"50%"}}>
                                <option  defaultValue>Product Category</option>
                                <option value="topItem">Top Item</option>
                                <option value="standard">Standard</option>
                            </select><br/>
                            <Input disabled={this.state.disableInput} type="date" className="inputProd" style={{width:"30%", marginTop:"1.5vh"}} ></Input><br/>
                            <select disabled={this.state.disableInput} className="inputProd" style={{height:"5vh", marginTop:"1vh", width:"50%"}}>
                                <option  defaultValue>Product Status</option>
                                <option value="topItem">Active</option>
                                <option value="standard">Inactive</option>
                            </select><br/>
                            <Input disabled={this.state.disableInput} type="number" className="inputProd" style={{width:"30%", marginTop:"1vh"}}></Input><br/>
                            {/* <div disabled={this.state.disableInput} className="blueline" style={{height:"1vh", width:"20%", backgroundColor:'blue'}}></div> */}
                            <Input disabled={this.state.disableInput} type="date" className="inputProd" style={{width:"30%", marginTop:"1vh"}}></Input> <br/>
                            <Input disabled={this.state.disableInput} className="inputProd" value="admin" style={{width:"30%", marginTop:"1.5vh"}}></Input><br/>
                            <Input disabled={this.state.disableInput} type="date" className="inputProd" style={{width:"30%", marginTop:"1.5vh"}}></Input> <br/>
                            <Input disabled={this.state.disableInput} className="inputProd" value="admin" style={{width:"30%", marginTop:"1.5vh"}}></Input>

                        </div>
                    </div>
                </div>


            </div>
        );
    }
}

export default Product;