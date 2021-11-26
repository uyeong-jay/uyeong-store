import connectDB from "../../../utils/connectDB";
import Users from "../../../models/userModel";
import auth from "../../../middleware/auth";

connectDB();

export default async (req, res) => {
  switch (req.method) {
    case "PATCH":
      await updateUserInfo(req, res);
      break;
    case "GET":
      await getUsers(req, res);
      break;
  }
};

//유저 정보 업데이트
const updateUserInfo = async (req, res) => {
  try {
    const result = await auth(req, res);
    const { name, avatar } = req.body;

    //name, avatar 업데이트
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

const getUsers = async (req, res) => {
  try {
    const result = await auth(req, res);

    //admin일때만
    if (result.role !== "admin")
      return res.status(400).json({ err: "Authentication is not valid" });

    //비번 제외
    const users = await Users.find().select("-password");

    //유저 정보 보내기
    res.json({ users });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};
