import mongoose from 'mongoose';

const _ProductSchema = mongoose.Schema({
    _productID: ObjectId,
    productName: String,
    qty: Number,
    price: Number
})

const TransactionSchema = mongoose.Schema({
    transactionID: ObjectID,
    transactions: { type: Schema.Types.ObjectId, ref: '_Products' },
    transactionDate: { type: Date, default: Date() }
})

const UserSchema = mongoose.Schema({
    _userID: ObjectId,
    userName: String,
    password: String,
    role: String
})

const Orders = mongoose.Schema({
    _orderID: ObjectID,
    _productID: String,
    qty: Number
})


var _Products = mongoose.model('_Products', _ProductSchema)
var Transactions = mongoose.model('Transactions', TransactionSchema)
var _User = mongoose.model('_User', UserSchema)
var Orders = mongoose.model('Orders', OrderSchema)


export default User;
export default Transaction;
export default _Products;
export Orders;

