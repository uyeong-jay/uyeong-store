import connectDB from "../../../utils/connectDB";
import Users from "../../../models/userModel";
import auth from "../../../middleware/auth";

connectDB();

export default async (req, res) => {
  switch (req.method) {
    case "PATCH":
      await updateInfo(req, res);
      break;
  }
};

const updateInfo = async (req, res) => {
  try {
    const result = await auth(req, res);
    const { name, avatar } = req.body;

    //name, avatar 업데이트하기
    const newUser = await Users.findOneAndUpdate(
      { _id: result.id },
      { avatar, name }
    );

    res.json({
      msg: "Update Success!",
      user: {
        avatar,
        name,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};
