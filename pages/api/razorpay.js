const Razorpay = require("razorpay");
const shortid = require("shortid");

export default async function handler(req, res) {
  if (req.method === "POST") {
    // Initialize razorpay object
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY,
      key_secret: process.env.RAZORPAY_SECRET,
    });

    // Create an order -> generate the OrderID -> Send it to the Front-end
    // Also, check the amount and currency on the backend (Security measure)
    const payment_capture = 1;
    const jsonString  = req.body;
    console.log ( "JSON is " + JSON.stringify(jsonString) ); 
    const data = JSON.parse(JSON.stringify(jsonString));
    const amount = data.amount;
    //const order_id = data.order_id; 
    const order_id= shortid.generate(); 

    console.log( "got amount as " + amount + "order id a ",order_id   ) ; 
    const currency = "INR";
    const options = {
      amount: (amount * 100).toString(),
      currency,
      receipt: order_id,
     // receipt: shortid.generate(),
      payment_capture,
    };

    try {
      const response = await razorpay.orders.create(options);
      res.status(200).json({
        id: response.id,
        currency: response.currency,
        amount: response.amount,
        order_id : order_id 
      });
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  } else {
    // Handle any other HTTP method
  }
}
