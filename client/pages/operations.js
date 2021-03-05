import React from 'react'
const axios = require('axios');



class OperationsPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            product_upc: "",
            product_category: "",
            product_name: "",
            product_price: "",
            product_quantity: 0,
            product_id: "",
            product_order_qty: "",
            min_order_qty: 0
        };
        this.qual_subtract = this
            .qual_subtract
            .bind(this);

        this.qual_add = this
            .qual_add
            .bind(this);


    }

    componentDidMount() {
        window.addEventListener("keydown", this.keyHandling);

        axios
            .get('http://localhost:7000/products/')
            .then(response => {
                this.setState({ products: response.data });
                console.log(this.state.products)
            })
            .catch(function (error) {
                console.log(error);
            })

    }


    componentWillUnmount() {
        window.removeEventListener("keydown", this.keyHandling);
    }



    qual_subtract = () => {

        const info = {

            "product_upc": this.refs.product_upc.value,
            "product_name": this.refs.product_name.value,
            "product_category": this.refs.product_category.value,
            "product_quantity": this.refs.product_quantity.value,
            "product_price": this.refs.product_price.value,
            "quantity_sold": this.refs.quantity_sold,
            "order_qty": this.refs.order_qty,
            "order_subtotal": this.refs.order_subtotal,
            "place_order": true

        };

        if (info.product_quantity > 0 && info.product_price > 0) {


            axios
                .post('http://localhost:7000/products/add', info)
                .then(res => {
                    console.log('POSTRESULTSDATA:' + res.data);
                    //console.log(JSON.stringify(info))
                })
                .catch(function (error) {
                    console.log(error);
                })
        }

        else alert('Quantity already 0!');
    };


    qual_add = () => {

        const info = {

            "product_upc": this.refs.product_upc.value,
            "product_name": this.refs.product_name.value,
            "product_category": this.refs.product_category.value,
            "product_quantity": this.refs.product_quantity.value+1,
            "product_price": this.refs.product_price.value,
            "quantity_sold": this.refs.quantity_sold,
            "order_qty": this.refs.order_qty,
            "order_subtotal": this.refs.order_subtotal,
            "place_order": true

        };



            axios
                .post('http://localhost:7000/products/add', info)
                .then(res => {
                    console.log('POSTRESULTSDATA:' + res.data);
                    //console.log(JSON.stringify(info))
                })
                .catch(function (error) {
                    console.log(error);
                })
        };


    keyHandling = (key) => {
        console.log("Key code: " + key.keyCode);
        var ENTER_KEY = 13;

        switch (key.keyCode) {
            case ENTER_KEY:
                key.preventDefault();
                return false;
            default:
                break;
        }

    };


    render() {
        let products = this.state.products

        return (
            <div className="body-container">
                <header
                    className="App-header"
                >
                    <link
                        rel="stylesheet"
                        href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
                        integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
                        crossorigin="anonymous" />


                            Operations [Update Product Quantity and Price]

                    </header>
                <div className="operations">
                    <br /><br />


                    <div>
                        <table
                            className="table table-striped"
                            id="ops-table"
                        >

                            <thead>
                                <tr>
                                    <th scope="col">UPC</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Category</th>
                                    <th scope="col">Quantity</th>
                                    <th scope="col"></th>
                                    <th scope="col">Price</th>
                                    <th scope="col"></th>


                                </tr>
                            </thead>
                            <tbody>
                                {products.map((product => <tr>
                                    <td>{product.product_upc}</td>
                                    <td>{product.product_name}</td>
                                    <td>{product.product_category}</td>
                                    <td>{product.product_quantity}</td>
                                    <td>
                                        <div class="number">
                                            <button class="minus" onClick={this.qual_subtract.bind(this)}>-</button>
                                            <input type="numeric" value={product.product_quantity} />
                                            <button class="plus" onClick={this.qual_add.bind(this)}>+</button>
                                        </div>
                                    </td>
                                    <td>{product.product_price}</td>
                                    <td>
                                        <div class="number">
                                            <button class="minus">-</button>
                                            <input type="double" value={product.product_price} />
                                            <button class="plus">+</button>
                                        </div>
                                    </td>

                                </tr>))}
                            </tbody>
                        </table>

                    </div>
                </div>
            </div>
        );
    }
}


        export default OperationsPage;
