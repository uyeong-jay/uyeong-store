import connectDB from "../../../utils/connectDB";
import Users from "../../../models/userModel";
import auth from "../../../middleware/auth";

connectDB();

export default async (req, res) => {
  switch (req.method) {
    case "PATCH":
      await updateRole(req, res);
      break;
    case "DELETE":
      await deleteUser(req, res);
      break;
  }
};

const updateRole = async (req, res) => {
  try {
    const result = await auth(req, res);
    //result >> { id: user._id, role: user.role, root: user.root }

    //admin(root)인증
    if (result.role !== "admin" || !result.root)
      return res.status(400).json({ err: "Authentication is not valid" });

    const { id } = req.query;
    const { role } = req.body; //전달받은 role

    await Users.findOneAndUpdate({ _id: id }, { role }); //role 변경

    res.json({ msg: "Update Success!" });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const result = await auth(req, res);
    //result >> { id: user._id, role: user.role, root: user.root }

    //admin(root)인증
    if (result.role !== "admin" || !result.root)
      return res.status(400).json({ err: "Authentication is not valid" });

    const { id } = req.query;

    await Users.findByIdAndDelete(id);

    res.json({ msg: "Deleted Success!" });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};
