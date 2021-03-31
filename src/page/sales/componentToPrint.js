import React, { Component } from 'react';
import Label from '../../component/label';

class ComponentToPrint extends Component {
    constructor(props) {
        super(props);
        this.state = {
            limit: 25
        }
    }

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
        let page = Math.ceil(this.props.salesPrint.length/this.state.limit)
        let printPage= []
        for(let i=0;i<page; i++){
            printPage.push(
                <div className="boxPrint">
                <center>
                <div className="headerPrint">
                    <div className="NClogo">
                        <div className="logoPrint">
                            <Label className="logoNex">Nex</Label>
                            <Label className="logoChief">Chief</Label>
                        </div>
                    </div>
                    <div className="headerPrint2">
                        <div className="textBoxPrint">
                            <div style={{fontWeight:"bolder"}}>PT. PARAMADAKSA TEKNOLOGI NUSANTARA</div>
                            <div>MONTHLY SALES REPORT</div>
                            <div>Scientia Business Park Tower 2 Lt 2, Boulevard Gading Serpong</div>
                            <div>Tangerang, 15810 Indonesia</div>
                        </div>


                    </div>

                </div>

                <div>
                    <table id="tablePrint" cellspasing="0" border="1 white">
                        <thead>
                            <tr className="tableSalesprint" >
                                <th className="tDate">Date</th>
                                <th className="tText">Customer</th>
                                <th className="tText">Gross Amount (Rp)</th>
                                <th className="tText">Discount (Rp)</th>
                                <th className="tText">Tax (Rp)</th>
                                <th className="tText">Invoice (Rp)</th>
                                <th className="tText">Status</th>
                            </tr>
                        </thead>
                        <tbody className="tbodySales" >
                            {
                                this.props.salesPrint.slice(i*this.state.limit,(i*this.state.limit)+this.state.limit).map((sales, index) => {
                                    return (
                                        <tr key={index} className="salesList">
                                            <td className="tdPrint">{sales.dateSales}</td>
                                            <td className="tdPrint">{sales.customer}</td>
                                            <td className="tdPrint">{this.priceFormat(sales.gross)}</td>
                                            <td className="tdPrint">{this.priceFormat(sales.discount)}</td>
                                            <td className="tdPrint">{this.priceFormat(sales.tax)}</td>
                                            <td className="tdPrint">{this.priceFormat(sales.invoice)}</td>
                                            <td className="tdPrint">{sales.status}</td>
                                        </tr>

                                    )
                                })
                            }

                        </tbody>
                    </table>
                </div>
            </center>
            </div>
            )

        }
        return (
            <div>
                {printPage.map(e=>e)}
            </div>
            // <center>
            //     <div className="headerPrint">
            //         <div className="NClogo">
            //             <div className="logoPrint">
            //                 <Label className="logoNex">Nex</Label>
            //                 <Label className="logoChief">Chief</Label>
            //             </div>
            //         </div>
            //         <div className="headerPrint2">
            //             <div className="textBoxPrint">
            //                 <div style={{fontWeight:"bolder"}}>PT. PARAMADAKSA TEKNOLOGI NUSANTARA</div>
            //                 <div>MONTHLY SALES REPORT</div>
            //                 <div>Scientia Business Park Tower 2 Lt 2, Boulevard Gading Serpong</div>
            //                 <div>Tangerang, 15810 Indonesia</div>
            //             </div>


            //         </div>

            //     </div>

            //     <div>
            //         <table id="tablePrint" cellspasing="0" border="1 white">
            //             <thead>
            //                 <tr className="tableSalesprint" >
            //                     <th className="tDate">Date</th>
            //                     <th className="tText">Customer</th>
            //                     <th className="tText">Gross Amount (Rp)</th>
            //                     <th className="tText">Discount (Rp)</th>
            //                     <th className="tText">Tax (Rp)</th>
            //                     <th className="tText">Invoice (Rp)</th>
            //                     <th className="tText">Status</th>
            //                 </tr>
            //             </thead>
            //             <tbody className="tbodySales" >
            //                 {
            //                     this.props.salesPrint.map((sales, index) => {
            //                         return (
            //                             <tr key={index} className="salesList">
            //                                 <td className="tdPrint">{sales.dateSales}</td>
            //                                 <td className="tdPrint">{sales.customer}</td>
            //                                 <td className="tdPrint">{this.priceFormat(sales.gross)}</td>
            //                                 <td className="tdPrint">{this.priceFormat(sales.discount)}</td>
            //                                 <td className="tdPrint">{this.priceFormat(sales.tax)}</td>
            //                                 <td className="tdPrint">{this.priceFormat(sales.invoice)}</td>
            //                                 <td className="tdPrint">{sales.status}</td>
            //                             </tr>

            //                         )
            //                     })
            //                 }

            //             </tbody>
            //         </table>
            //     </div>
            // </center>


        );
    }
}

export default ComponentToPrint;