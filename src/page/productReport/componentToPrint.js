import React, { Component } from 'react';


class ComponentToPrint extends Component {
    constructor(props) {
        super(props);
        this.state = {
            productList: [],

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
        console.log("buat di print", this.props.productListPrint);
        return (
            <center>
                <h1>INI REPORT </h1>
                <table id="tableProdReport1" cellspasing="0" border="1 white">
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
                            this.props.productListPrint.map((prod, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{prod.code}</td>
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
            </center>
        );
    }
}

export default ComponentToPrint;