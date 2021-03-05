import React from 'react'

const axios = require('axios');


class ShoppingPage extends React.Component {

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
        this.onSubmit = this
            .onSubmit
            .bind(this);



    }


    getDataFromDb = () => {
        axios
            .get('http://localhost:7000/products/')
            .then(response => {
                this.setState({ products: response.data });
                console.log(this.state.products)
            })
            .catch(function (error) {
                console.log(error);
            })  

    };

    onSubmit = () => {

        const info = {

            "product_upc": this.refs.product_upc.value,
            "product_name": this.state.product_name.value,
            "product_category": this.state.product_category.value,
            "product_quantity": this.refs.product_quantity.value,
            "product_price": this.state.product_price.value,
            "place_order": true

        };

        if (info.product_upc != "" && info.product_quantity == 0) {


            axios
                .put('http://localhost:7000/products/update_quantity/' + info.product_upc, { "product_quantity": info.product_quantity })
                .then(res => {
                    console.log('updated qty!');
                })
                .catch(err => {
                    console.log(err);
                });
        }
        else if (info.product_quantity < 0) { alert('Quantity cannot be negative'); }

        else alert('Fill in all fields!');
    };



    componentDidMount() {
        this.getDataFromDb();
    }

    componentWillUnmount()
    {
    }

    render() {

        
        return (
            <div>
                <header
                    className="App-header"
                    >
                    <link
                        rel="stylesheet"
                        href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
                        integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
                        crossorigin="anonymous"/>

                    
                        Inventory Order List
                    
                </header>
                <body>


                    <form>


                        <div id="product-forms">
                            <label>
                                <pre>
                                    UPC:
                                <input
                                        type="text"
                                        placeholder="UPC"
                                        ref="product_upc" />
                                </pre>

                            </label>


                            <label>
                                <pre>
                                    Order Quantity:
                                <input
                                        type="text"
                                        placeholder="Quantity"
                                        ref="product_quantity" />
                                </pre>

                            </label>


                        </div>
                        <button onClick={this.onSubmit} type="submit">Register Order
                                    </button>


                    </form>


<table class="table" id="shopping-table">
                                    <thead>

                                        <tr>
                                            <th scope="col">UPC</th>
                                            <th scope="col">Category</th>
                                            <th scope="col">Name</th>
                                            <th scope="col">Qty</th>

                                        </tr>
                                    </thead>
                                    <tbody>


                                    {this.state.products.map((item, index) => (
        <tr>
        <td>{item.product_upc}</td>
        <td>{item.product_category}</td>
        <td>{item.product_name}</td>
        <td>{item.product_quantity}</td>
        </tr>
    ))}



                                

                                    </tbody>
                                </table>




                </body>
            </div>
        )
    }
}

export default ShoppingPage;
