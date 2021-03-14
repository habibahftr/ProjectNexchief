import React, { Component } from 'react';
import Icon from '../../component/icon';
import Label from '../../component/label';
import "./style.css";

class Report extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <div className="reportPage">
                <div className="headerReport">
                    <Icon onClick={() => this.props.history.push("/home")} className="fas fa-home" style={{ color: "white", display: 'inline-block', marginTop: "4vh", marginRight: "20%", marginLeft: "5%", fontSize: "40px", cursor: "pointer" }}></Icon>
                    <div className="titleReport">
                        <Label className="reportLbl">REPORT</Label>
                        <Label className="prodsales">PRODUCT & SALES</Label>
                    </div>
                </div>
                <div className="bodyReport">
                    <div className="menuReport" >
                        <div className="prodReporticon">
                            <Icon onClick={() => this.props.history.push("/report/product")} className="fas fa-file-signature" style={{ color: "white", display: 'inline-block', fontSize: "100px", cursor: "pointer", border: "solid", padding: "6px" }}></Icon><br />
                            <div className="prodReport" style={{ color: "white", display: 'inline-block', fontSize: "20px" }} >PRODUCTS REPORT</div>
                        </div>
                        <div className="salesReporticon">
                            <Icon onClick={() => this.props.history.push("/sales")} className="fas fa-file-invoice-dollar" style={{ color: "white", display: 'inline-block', fontSize: "100px", cursor: "pointer", border: "solid", padding: "6px" }}></Icon><br />
                            <div className="salesReport" style={{ color: "white", display: 'inline-block', fontSize: "20px" }}>SALES REPORT</div>
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}

export default Report;