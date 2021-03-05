import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Button } from 'react-bootstrap';
import Sale from './pages/sale'

var Icon = require('react-fontawesome');

function App() {
    return (
        <div className="App">
            <nav>
            <header className="App-header">
                      <strong>
                        MERN Inventory Management App
                    </strong>
                </header>
            </nav>
            <Sale />
            <footer className="App-header">
                Sales Chart
            </footer>
            
        </div>
    );
}

export default App;
