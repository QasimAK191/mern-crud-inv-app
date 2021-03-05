import React from 'react';
import ReactDOM from 'react-dom';

import { Route, Link, BrowserRouter as Router } from 'react-router-dom';


import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import logo from './logo.svg';

import ReportPage from './pages/report';
import ProductsPage from './pages/stock';
import OperationsPage from './pages/operations';
import { Button } from 'react-bootstrap';
import ShoppingPage from './pages/report/orders';


var Icon = require('react-fontawesome');




const routing = (
    <Router>

        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <div class="d-lg-flex" id="wrapper">

    <div class="border-right toggle" id="sidebar-wrapper" data-toggle="collapse">
                <div class="list-group list-group-flush" id="Side">
                    <div class="list-group-item list-group-item-action" id="Sidebar-Menu">Menu</div>
                    <a href="/" class="list-group-item" id="Sidebar">Sales</a>
                    <a href="/products" class="list-group-item" id="Sidebar">Stock</a>
                    <a href="/operations" class="list-group-item" id="Sidebar">Operations</a>
                    <br />
                    <a href="https://www.github.com/QasimAK191" rel="noopener noreferrer" target="_blank">
                        <div className="github">
                            <img src={logo} alt="My logo" width="20%" />
                            <br />
                            <p className="github">Site by Qasim Khan</p>
                            <p className="github">Code on Github</p>
                        </div>
                    </a>
                    <div className="github"><div id="spaceFiller"></div></div>
                </div>
            </div>

   

  


        <script src="vendor/jquery/jquery.min.js"></script>
        <script src="vendor/bootstrap/js/bootstrap.bundle.min.js"></script>



    <div className="container">
    <link
                        rel="stylesheet"
                        href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
                        integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
                crossorigin="anonymous" />

        <Route exact path="/" component={App} />
        <Route path="/products" component={ProductsPage} />
        <Route path="/reports" component={ReportPage} />
        <Route path="/shopping" component={ShoppingPage} />
        
        <Route path="/operations" component={OperationsPage} />
            </div>
    </div>
    </Router>
  )
  


ReactDOM.render(routing, document.getElementById('root'));

serviceWorker.unregister();
