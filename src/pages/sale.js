import React from 'react'

const axios = require('axios');

class SalePage extends React.Component {

    constructor(props) {
        super(props);

        this.product_upc_ref = React.createRef();
        this.product_quantity_ref = React.createRef();
        this
            .onChangeUPC
            .bind(this);

        this.state = {
            transactions: [],
            products: [],
            product_upc: "?",
            product_category: "?",
            product_name: "?",
            product_quantity: 0,
            quantity_sold: 0,
            transaction_total: 0,
            new_quantity: 0,
            place_order: false,
            existingProduct: false,

        };
        this.onSubmit = this
            .onSubmit
            .bind(this);

    }

    componentDidMount() {
        window.addEventListener("keyup", this.keyHandling);

        axios
            .get('http://localhost:7000/transactions/')
            .then(response => {
                this.setState({transactions: response.data});

            })
            .catch(function (error) {
                console.log(error);
            })

    }

    componentWillUnmount()
    {
        window.removeEventListener("keyup", this.keyHandling);
    }

    onSubmit = () => {

        var new_qty = parseInt(this.state.product_quantity, 10) - 1;
        this.setState({ new_quantity: new_qty, transaction_total: this.state.transaction_total, quantity_sold: this.state.quantity_sold });

        const info = {
            product_upc: this.state.product_upc,
            product_quantity: this.state.new_quantity, //check            
            product_name: this.state.product_name,
            product_category: this.state.product_category,
            product_price: this.state.product_price,
            transaction_total: this.state.transaction_total,
            quantity_sold: this.state.quantity_sold
        };

        if (info.product_upc != "?") {
        axios
            .put('http://localhost:7000/products/update_quantity/' + this.state.product_id, { "product_quantity": this.state.new_quantity })
            .then(res => {
                console.log('updated qty!');
            })
            .catch(err => {
                console.log(err);
            });


        axios
            .put('http://localhost:7000/products/update_quantity_sold/' + this.state.product_id, { "quantity_sold": (this.state.quantity_sold += 1) })
            .then(res => {
                console.log('updated qty!');
            })
            .catch(err => {
                console.log(err);
            });


        axios
            .post('http://localhost:7000/transactions/add', info)
            .then(res => {
                alert('Transaction added successfully');
            })
            .catch(err => {
                console.log(err);
            });

        window.location.reload();
    } else alert('No UPC entered!')

    }

    keyHandling = (key) => {
        //console.log("Key code: " + key.keyCode);
        var ENTER_KEY = 13;

        switch (key.keyCode) {
            case ENTER_KEY:
                this.onSubmit();
                break;
            default:
                break;
        }

    };

    getDataFromDb = () => {
        fetch("http://localhost:7000/products")
            .then(data => data.json())
            .then(res => this.setState({products: res.data}));
    };

    onChangeUPC = (e) => {
        //console.log(e.target.value);
        if (e.target.value != null) {
            
            this.setState({product_upc: e.target.value})
        }



        axios
            .get('http://localhost:7000/products/sku/' + e.target.value)
            .then(response => {
                console.log(response.data);
                if (!response.data) {
                    this.setState({existingProduct:false})
                    console.log("NO ID FOUND");
                    alert("NO ID FOUND");
                } else {
                    this.setState({existingProduct:true});
                    var product_data = JSON.parse(JSON.stringify(response.data));
                    console.log("RESPONSE DATA" + JSON.stringify(response.data));
                    var upc = product_data['product_upc'];
                    var name = product_data['product_name'];
                    var category = product_data['product_category'];
                    var qty = product_data['product_quantity'];
                    var price = product_data['product_price'];
                    var id = product_data['_id'];
                    var quantity_sold = product_data['quantity_sold'];
                    var place_order_flag = product_data['place_order'];

                    if (upc == "") {
                        alert('Enter UPC number');
                    }

                    if (qty == 0) {
                        alert('[UPC: '+upc+', Product: '+name+'], is out of stock!');
                    }

                    if (qty <= 0) {
                        place_order_flag = true;
                        axios
                        .put('http://localhost:7000/products/update_order_flag/' + id, {"place_order": true})
                        .then(res => {
                            alert('[UPC: ' + upc + ', Product: ' + name + '], has ran out of stock! Please order more!');
                        })
                        .catch(err => {
                            console.log(err);
                        });
                    }

                    else {
                        place_order_flag = false;
                        axios
                        .put('http://localhost:7000/products/update_order_flag/' + id, {"place_order": false})
                        .then(res => {
                            //alert('PLACED ORDER FLAG');
                        })
                        .catch(err => {
                            console.log(err);
                        });

                    }
                    this.setState({product_name: name});
                    this.setState({product_quantity: qty});
                    this.setState({place_order: place_order_flag});

                    this.setState({product_category: category});
                    this.setState({product_price: price});
                    this.setState({quantity_sold: quantity_sold});
                    this.setState({product_id: id});


                }

            })
            .catch(function (error) {
                console.log("ERR NO UPC FOUND" + error);
            })
    };



    render() {

        let transactions = this.state.transactions;

        return (
            <div className="body-container">
                <body className="body-container">


                            <br/>
                            <h5>
                        <u>Enter Sale
                            </u>
                            </h5><br/>
                            <div id="sales-form">
                                <label>
                                    <pre>Name: {this.state.product_name}</pre>
                                </label>
                                <label>
                                    <pre>Category: {this.state.product_category}</pre>
                                </label>

                            <label>
                            <pre>Price: ${this.state.product_price}</pre>
                        </label>
                        <label>
                            <pre>Quantity: {this.state.product_quantity} left</pre>
                        </label>
                        <br />
                                <label>
                                    <div><p>UPC: </p>
                                        <input autoFocus onPointerLeave={this.onChangeUPC} ref={this.product_upc_ref}></input>
                                        </div>
                        </label>
                        <button
                            onClick={this
                                .onSubmit
                                .bind(this)}
                        >

                            Register Sale
                            
                            </button>
                                <br/><br /> <br />

                            </div>
                            <label><u>Order Total:</u></label>
                            <h3 ref="transaction_total">
                                <strong>
                                    ${this.state.transaction_total}
                                </strong>
                    </h3>
                    <br /><br/> <br/>


                    
                            <div class="col">
                                <table class="table" id="sales-table">
                                    <thead>
                                    <tr>
                                        <th style={{ background: "aquamarine" }}>
                                            <strong>Transaction Log</strong>
                                            <br />
                                        </th>
                                    </tr>
                                       

                                <tr style={{ background: "aquamarine" }}>
                                            <th scope="col">UPC</th>
                                            <th scope="col">Category</th>
                                            <th scope="col">Name</th>
                                            <th scope="col">Qty Sold</th>
                                            <th scope="col">Order Total ($)</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {transactions.map((product => <tr>
                                            <td>{product.product_upc}</td>
                                            <td>{product.product_category}</td>
                                            <td>{product.product_name}</td>
                                            <td>{this.state.quantity_sold}</td>
                                            <td>${this.state.transaction_total}</td>
                                        </tr>))}

                                    </tbody>
                                </table>
                            </div>



                </body>
            </div>
        )
    }
}

export default SalePage
