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
    case "GET":
      await getOrder(req, res);
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
      msg: "Order Success! Please check the order list and make a payment.",
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

//주문 했던 목록 내보내 주는 함수
const getOrder = async (req, res) => {
  try {
    const result = await auth(req, res);

    let orders;
    //사용자 권한 선 체크
    if (result.role !== "admin") {
      orders = await Orders.find({ user: result.id }).populate(
        "user",
        "-password"
      );
    } else {
      orders = await Orders.find().populate("user", "-password");
    }

    res.json({ orders }); //주문했던 목록
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};
