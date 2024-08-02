import OrderMessage from "../models/Orders.js";

export const postOrder = async (req, res) => {
    try {
        let data = req.body.order_data;
        await data.splice(0, 0, { Order_date: req.body.order_date });

        let eId = await OrderMessage.findOne({ email: req.body.email });

        if (eId === null) {
            try {
                await OrderMessage.create({
                    email: req.body.email,
                    order_data: [data],
                }).then(() => {
                    console.log("Order created successfully"); // Debugging log
                    res.json({ success: true });
                });
            } catch (error) {
                console.error("Error creating order:", error.message); // Debugging log
                res.status(500).send("SERVER Error: " + error.message);
            }
        } else {
            try {
                await OrderMessage.findOneAndUpdate(
                    { email: req.body.email },
                    { $push: { order_data: data } }
                ).then(() => {
                    console.log("Order updated successfully"); // Debugging log
                    res.json({ success: true });
                });
            } catch (error) {
                console.error("Error updating order:", error.message); // Debugging log
                res.status(500).send("SERVER Error: " + error.message);
            }
        }
    } catch (error) {
        console.error("Error processing request:", error.message); // Debugging log
        res.status(500).send("SERVER Error: " + error.message);
    }
};
export const getMyOrders = async (req, res) => {
    try {
        const myData = await OrderMessage.findOne({ email: req.body.email })
        res.json({ orderData: myData });
    }
    catch (error) {
        res.send("Server Error", error.message);
    }
}
