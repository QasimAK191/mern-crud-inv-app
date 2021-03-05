import React from 'react';

const axios = require('axios');

class ProductsPage extends React.Component {

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


    componentWillUnmount()
    {
        window.removeEventListener("keydown", this.keyHandling);
    }



    onSubmit = () => {
        
        const info = {

            "product_upc": this.refs.product_upc.value,
            "product_name": this.refs.product_name.value,
            "product_category": this.refs.product_category.value,
            "product_quantity": this.refs.product_quantity.value,
            "product_price": this.refs.product_price.value,
            "quantity_sold": 0,
            "order_qty": 0,
            "order_subtotal": 0,
            "place_order": true

        };

        if (info.product_upc != "" && info.product_name != "" && info.product_quantity > 0 && info.product_price > 0) {


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

        else alert('Fill in all fields!');
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
            <div>
                    <header
                        className="App-header"
                        >
                        <link
                            rel="stylesheet"
                            href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
                            integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
                            crossorigin="anonymous"/>

                        
                            Products Stocks
                       
                    </header>
                    <div className="products">
                        <br/>
                        
                            <form>
     

                                    <div id="product-forms">
                                        <label>
                                            <pre>
                                UPC:
                                <input
                                        type="text"
                                        placeholder="UPC"
                                        ref="product_upc"/>
                                </pre>

                                        </label>
                                      
                                        <label>
                                            <pre>
                                Name:
                                <input
                                        type="text"
                                        placeholder="name"
                                        ref="product_name"
                                        />
                                </pre>

                                        </label>
                                   
                                        <label>
                                            <pre>
                                Category:
                                <input
                                        type="text"
                                        placeholder="category"
                                        ref="product_category"/>
                                </pre>

                                        </label>
                                        

                                        <label>
                                            <pre>
                                Price: 
                                <input
                                        type="text"
                                        placeholder="price"
                                        ref="product_price"/>

                                </pre>

                                        </label>
                            <br /><br />


                                    </div>
                                    <button onClick={this.onSubmit} type="submit">Register Product
                                    </button>


                            </form>

                    <br />
                        <div>
                            <table
                                className="table table-striped"
                                id="prod-table"
                            >

                                <thead>
                                    <tr>
                                        <th scope="col">UPC</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Category</th>
                                        <th scope="col">Price</th>
       
            
                                    </tr>
                                </thead>
                                <tbody>
                                    {products.map((product => <tr>
                                        <td>{product.product_upc}</td>
                                        <td>{product.product_name}</td>
                                        <td>{product.product_category}</td>
                                        <td>{product.product_price}</td>
     
                                    </tr>))}
                                </tbody>
                            </table>

                        </div>
                    </div>
            </div>
        );
    }
}
export default ProductsPage;
