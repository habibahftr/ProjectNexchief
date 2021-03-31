import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import "./style.css"


class Error404 extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }


    render() {
        return (
            <div className="error">
                <div className="maincontainer">
                    <div className="bat">
                        <img className="wing leftwing" 
                            src="https://www.blissfullemon.com/wp-content/uploads/2018/09/bat-wing.png"/>
                        <img className="body"
                            src="https://www.blissfullemon.com/wp-content/uploads/2018/09/bat-body.png" alt="bat"/>
                        <img className="wing rightwing"
                            src="https://www.blissfullemon.com/wp-content/uploads/2018/09/bat-wing.png"/>
                    </div>
                    <div className="bat">
                        <img className="wing leftwing" 
                            src="https://www.blissfullemon.com/wp-content/uploads/2018/09/bat-wing.png"/>
                        <img className="body"
                            src="https://www.blissfullemon.com/wp-content/uploads/2018/09/bat-body.png" alt="bat"/>
                        <img className="wing rightwing"
                            src="https://www.blissfullemon.com/wp-content/uploads/2018/09/bat-wing.png"/>
                    </div>
                    <div className="bat">
                        <img className="wing leftwing" 
                            src="https://www.blissfullemon.com/wp-content/uploads/2018/09/bat-wing.png"/>
                        <img className="body"
                            src="https://www.blissfullemon.com/wp-content/uploads/2018/09/bat-body.png" alt="bat"/>
                        <img className="wing rightwing"
                            src="https://www.blissfullemon.com/wp-content/uploads/2018/09/bat-wing.png"/>
                    </div>
                        <img className="foregroundimg" src="https://www.blissfullemon.com/wp-content/uploads/2018/09/HauntedHouseForeground.png" alt="haunted house"/>
  
                    </div>
                        <h1 className="errorcode">ERROR 404</h1>
                            <div className="errortext">This page not found.</div>
                            <Link to="/home">
                            <div className="turnBack" > Turn back now!</div>
                            </Link>

            </div>
        );
    }
}

export default Error404;