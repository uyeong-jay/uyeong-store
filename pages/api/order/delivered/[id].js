import connectDB from "../../../../utils/connectDB";
import Orders from "../../../../models/orderModel";
import auth from "../../../../middleware/auth";

connectDB();

export default async (req, res) => {
  switch (req.method) {
    case "PATCH":
      await deliveredOrder(req, res);
      break;
  }
};

const deliveredOrder = async (req, res) => {
  try {
    const result = await auth(req, res);

    if (result.role !== "admin")
      return res.status(400).json({ err: "Authentication is not valid." });

    //admin일때만
    const { id } = req.query;
    const order = await Orders.findOne({ _id: id });

    if (order.paid) {
      //paypal로 결제시의 result
      await Orders.findOneAndUpdate({ _id: id }, { delivered: true });

      res.json({
        msg: "Update Success!",
        result: {
          paid: true, //배송완료 >> 돈을 이미 낸 상태
          dateOfPayment: order.dateOfPayment,
          method: order.method, //paypal
          delivered: true,
        },
      });
    } else {
      //현금으로 결제시의 result
      await Orders.findOneAndUpdate(
        { _id: id },
        {
          paid: true,
          dateOfPayment: new Date().toISOString(), //현시점 날짜
          method: "Receive Cash",
          delivered: true,
        }
      );

      //result 보내주기
      res.json({
        msg: "Update Success!",
        result: {
          paid: true,
          dateOfPayment: new Date().toISOString(),
          method: "Receive Cash",
          delivered: true,
        },
      });
    }
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};
