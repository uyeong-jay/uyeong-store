import connectDB from "../../../utils/connectDB";
import Orders from "../../../models/orderModel";
import Products from "../../../models/productModel";
import auth from "../../../middleware/auth";

connectDB();

export default async (req, res) => {
  switch (req.method) {
    case "POST":
      await createOrder(req, res);
      break;
  }
};

const createOrder = async (req, res) => {
  try {
    const result = await auth(req, res);
    // console.log({ result }); >> { result: { id: '', role: '', root: false } }
    const { address, mobile, cart, totalPrice } = req.body;

    const newOrder = new Orders({
      user: result.id,
      address,
      mobile,
      cart,
      totalPrice,
    });

    await newOrder.save();

    res.json({
      msg: "Order success! We will contact you to confirm the order.",
      newOrder,
    });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};
