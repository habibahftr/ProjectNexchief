import React, { Component } from 'react';
import Label from '../../component/label';


class ComponentToPrint extends Component {
    constructor(props) {
        super(props);
        this.state = {
            productList: [],
            limit: 30

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
        let page = Math.ceil(this.props.productListPrint.length / this.state.limit)
        let printPage = []
        for (let i = 0; i < page; i++) {
            printPage.push(
                <div>
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
                                    <div style={{ fontWeight: "bolder" }}>PT. PARAMADAKSA TEKNOLOGI NUSANTARA</div>
                                    <div>MONTHLY SALES REPORT</div>
                                    <div>Scientia Business Park Tower 2 Lt 2, Boulevard Gading Serpong</div>
                                    <div>Tangerang, 15810 Indonesia</div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <table id="tableProdPrint" cellspasing="0" border="1 white">
                                <thead>
                                    <tr className="tableProdReport2" >
                                        <th className="tDate">Code</th>
                                        <th className="tText">Name</th>
                                        <th className="tText">Packaging</th>
                                        <th className="tText">Description</th>
                                        <th className="tText">Category</th>
                                        <th className="tText">Launch Date</th>
                                        <th className="tText">Status</th>
                                        <th className="tText">Stock</th>
                                        <th className="tText">Price(Rp.)</th>
                                    </tr>
                                </thead>
                                <tbody className="tbodySales">
                                    {
                                        this.props.productListPrint.slice(i * this.state.limit, (i * this.state.limit) + this.state.limit).map((prod, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td>{prod.code.substring(0,15)}</td>
                                                    <td>{prod.nameProduct}</td>
                                                    <td>{prod.packaging}</td>
                                                    <td>{prod.product_desc}</td>
                                                    <td>{prod.category}</td>
                                                    <td>{prod.launch_date}</td>
                                                    <td>{prod.status}</td>
                                                    <td>{prod.stock}</td>
                                                    <td>{this.priceFormat(prod.price)}</td>
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
            //     <h1>INI REPORT </h1>
            //     <table id="tableProdReport1" cellspasing="0" border="1 white">
            //         <thead>
            //             <tr className="tableProdReport2" >
            //                 <th className="tDate">Code</th>
            //                 <th className="tText">Name</th>
            //                 <th className="tText">Packaging</th>
            //                 <th className="tText">Description</th>
            //                 <th className="tText">Category</th>
            //                 <th className="tText">Launch Date</th>
            //                 <th className="tText">Status</th>
            //                 <th className="tText">Stock</th>
            //                 <th className="tText">Price(Rp.)</th>
            //             </tr>
            //         </thead>
            //         <tbody className="tbodySales">
            //             {
            //                 this.props.productListPrint.map((prod, index) => {
            //                     return (
            //                         <tr key={index}>
            //                             <td>{prod.code}</td>
            //                             <td>{prod.nameProduct}</td>
            //                             <td>{prod.packaging}</td>
            //                             <td>{prod.product_desc}</td>
            //                             <td>{prod.category}</td>
            //                             <td>{prod.launch_date}</td>
            //                             <td>{prod.status}</td>
            //                             <td>{prod.stock}</td>
            //                             <td>{this.priceFormat(prod.price)}</td>
            //                         </tr>
            //                     )
            //                 })

            //             }

            //         </tbody>
            //     </table>
            // </center>
        );
    }
}

export default ComponentToPrint;