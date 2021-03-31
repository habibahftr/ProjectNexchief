import React, { Component } from 'react';
import { Route, Router, Switch, useHistory, useParams } from 'react-router-dom';
import Home from '../../page/home';
import Login from '../../page/login';
import Product from '../../page/product';
import Regis from '../../page/regis';
import Password from "../../page/password";
import Sales from '../../page/sales';
import SalesDetail from '../../page/salesDetail';
import Report from '../../page/report';
import ProductReport from '../../page/productReport';
import SalesReport from '../../page/salesReport';
import Dashboard from '../../page/dashboard';
import login from '../../page/login';

class Body extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <Switch>
                <Route exact path="/" component={
                    ()=>{
                        let history = useHistory()
                        return <Login history={history}/>
                    }
                }></Route>
                <Route exact path="/regis" component={
                    ()=>{
                        let history = useHistory()
                        return <Regis history={history}/>
                    }
                }></Route>
                <Route exact path="/home" component={
                    ()=>{
                        let history = useHistory()
                        return <Home history={history}/>
                    }
                }></Route>
                <Route exact path="/product" component={
                    ()=>{
                        let history = useHistory()
                        return <Product history={history}/>
                    }
                }></Route>
                <Route exact path="/changepass" component={
                    ()=>{
                        let history = useHistory()
                        return <Password history={history}/>
                    }
                }></Route>
                <Route exact path="/sales" component={
                    ()=>{
                        let history = useHistory()
                        return <Sales history={history}/>
                    }
                }></Route>
                <Route exact path="/sales/detail" component={
                    ()=>{
                        let history = useHistory()
                        return <SalesDetail history={history}/>
                    }
                }></Route>
                <Route exact path="/report" component={
                    ()=>{
                        let history = useHistory()
                        return <Report history={history}/>
                    }
                }></Route>
                <Route exact path="/report/product" component={
                    ()=>{
                        let history = useHistory()
                        return <ProductReport history={history}/>
                    }
                }></Route>
                <Route exact path="/report/sales" component={
                    ()=>{
                        let history = useHistory()
                        return <SalesReport history={history}/>
                    }
                }></Route>
                <Route exact path="/dashboard" component={
                    ()=>{
                        let history = useHistory()
                        return <Dashboard history={history}/>
                    }
                }></Route>
                <Route>
                    pppppppppppp
                </Route>
               

            </Switch>
         );
    }
}
 
export default Body;