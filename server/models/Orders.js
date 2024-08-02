import mongoose from "mongoose";

const { Schema } = mongoose;

const OrderSchema = new Schema({

    email: {
        type: String,
        required: true
    },
    order_data: {
        type: Array,
        required: true
    }
});
const OrderMessage = mongoose.model('Order', OrderSchema);
export default OrderMessage;