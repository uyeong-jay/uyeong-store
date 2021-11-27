import connectDB from "../../../utils/connectDB";
import Categories from "../../../models/categoriesModel";
import auth from "../../../middleware/auth";

connectDB();

export default async (req, res) => {
  switch (req.method) {
    case "POST":
      await createCategory(req, res);
      break;
    case "GET":
      await getCategories(req, res);
      break;
  }
};

//카테고리 만들기
const createCategory = async (req, res) => {
  try {
    const result = await auth(req, res);
    if (result.role !== "admin")
      return res.status(400).json({ err: "Authentication is not valid." });

    const { name } = req.body;

    if (!name)
      return res.status(400).json({ err: "Please fill in the name field" });

    const newCategory = new Categories({ name });

    await newCategory.save();

    res.json({
      msg: "Create Success!",
      newCategory, // newCategory: {  name: "", _id: "", createdAt: "", updatedAt: "", __v: 0 }
    });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};

//카테고리 내보내기
const getCategories = async (req, res) => {
  try {
    const categories = await Categories.find();

    res.json({ categories });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};
