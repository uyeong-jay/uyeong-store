import connectDB from "../../../utils/connectDB";
import Products from "../../../models/productModel";
import auth from "../../../middleware/auth";

connectDB();

export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await getProducts(req, res);
      break;
    case "POST":
      await createProduct(req, res);
      break;
  }
};

class APIfeatures {
  //객체 생성
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  //필터링 해주는 함수
  filtering() {
    console.log("filtering 함수/");

    const queryObj = { ...this.queryString };
    console.log("1. queryObj:", queryObj);
    //{ limit: '3', category: 'all', sort: '', title: 'all' }

    const excludeFields = ["page", "sort", "limit"];
    excludeFields.forEach((el) => delete queryObj[el]);
    console.log("2. excludeFields:", excludeFields);
    //[ 'page', 'sort', 'limit' ]

    if (queryObj.category !== "all")
      this.query.find({ category: queryObj.category });
    console.log("2-1 queryObj.category:", queryObj.category);
    //queryObj.category: all

    if (queryObj.title !== "all")
      this.query.find({ title: { $regex: queryObj.title } });
    console.log("2-2 queryObj.title:", queryObj.title);
    //queryObj.title: all

    this.query.find();
    return this;
  }

  //정렬해주는 함수
  sorting() {
    console.log("sorting 함수/");

    if (this.queryString.sort) {
      console.log("4. this.queryString.sort:", this.queryString.sort);

      const sortBy = this.queryString.sort.split(",").join("");
      console.log("5. sortBy:", sortBy);

      this.query = this.query.sort(sortBy);
      console.log("6(7,8). this.query:", this.query);
    } else {
      this.query = this.query.sort("-createdAt");
      //7. this.query: Query { ~ }
    }
    return this;
  }

  //페이지 매기는 함수
  paginating() {
    console.log("paginating 함수/");
    const page = this.queryString.page * 1 || 1;
    console.log("9. page:", page); // 1

    const limit = this.queryString.limit * 1 || 3;
    console.log("10. limit:", limit); // 3

    const skip = (page - 1) * limit;
    console.log("11(12). skip:", skip); // 0

    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}

const getProducts = async (req, res) => {
  try {
    const features = new APIfeatures(Products.find(), req.query)
      .filtering()
      .sorting()
      .paginating();

    // 12+. features(=return this): APIfeatures {
    //   query: Query { ~ }
    //   queryString: { limit: '6', category: 'all', sort: '', title: 'all' }
    // }
    // 12-1+. features.query: Query { ~ }

    const products = await features.query;
    //products:
    // [{
    //   _id: new ObjectId("61ac73f2a34c5e87623a196f"),
    //   title: '123',
    //   price: 123,
    //   description: '123',
    //   content: '123',
    //   images: [ [Object] ],
    //   category: '61a767670d208d123219aa42',
    //   checked: false,
    //   inStock: 123,
    //   sold: 0,
    //   createdAt: 2021-12-05T08:10:26.768Z,
    //   updatedAt: 2021-12-05T08:10:26.768Z,
    //   __v: 0
    // }]

    res.json({
      status: "success",
      result: products.length,
      products,
    });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};

const createProduct = async (req, res) => {
  try {
    const result = await auth(req, res);
    if (result.role !== "admin")
      return res.status(400).json({ err: "Authentication is not valid." });

    const { title, price, inStock, description, content, category, images } =
      req.body;

    if (
      !title ||
      !price ||
      !inStock ||
      !description ||
      !content ||
      category === "all" ||
      images.length <= 0
    )
      return res.status(400).json({ err: "Please add all the fields." });

    const newProduct = new Products({
      title: title.toLowerCase(),
      price,
      inStock,
      description,
      content,
      category,
      images,
    });

    await newProduct.save();

    res.json({ msg: "Create Success!" });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};
