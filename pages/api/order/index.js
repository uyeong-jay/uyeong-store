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

//주문 정보 만들어 주는 함수
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

    cart.filter((item) =>
      sold(item._id, item.quantity, item.inStock, item.sold)
    );

    await newOrder.save();

    res.json({
      msg: "Order success! We will contact you to confirm the order.",
      newOrder,
    });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};

//재고, 팔린갯수 업데이트 함수
const sold = async (id, quantity, oldInStock, oldSold) => {
  await Products.findOneAndUpdate(
    { _id: id },
    {
      inStock: oldInStock - quantity,
      sold: oldSold + quantity,
    }
  );
};
