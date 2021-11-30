import React, { useContext, useState } from "react";
import Head from "next/head";
import { DataContext } from "../../store/globalState";
import { TYPES } from "../../store/types";

//[[...id]]: Catch all routes - /create, /create/a, /create/a/b
const ProductsManager = () => {
  const initialState = {
    title: "",
    price: 0,
    inStock: 0,
    description: "",
    content: "",
    category: "",
  };

  const [product, setProduct] = useState(initialState);
  const { title, price, inStock, description, content, category } = product;

  const { state, dispatch } = useContext(DataContext);
  const { auth, categories } = state;

  const [images, setImages] = useState([]);

  //input 데이터 저장
  const onChangeInput = (e) => {
    const { name, value } = e.currentTarget;
    setProduct({ ...product, [name]: value }); //상태 저장
    dispatch({ type: TYPES.NOTIFY, payload: {} }); //메세지 초기화
  };

  //이미지 업로드
  const onChangeUpload = (e) => {
    dispatch({ type: TYPES.NOTIFY, payload: {} });

    let selectedImages = [];
    let num = 0;
    let err = "";

    //선택한 파일들
    const files = [...e.currentTarget.files];

    //파일 유무 에러
    if (files.length <= 0)
      return dispatch({
        type: TYPES.NOTIFY,
        payload: { error: "No files selected!." },
      });

    files.forEach((file) => {
      //파일 사이즈 에러
      if (file.size > 1024 * 1024)
        return (err = "The image size must be less than 1MB.");

      //파일 확장자 에러
      if (file.type !== "image/jpg" && file.type !== "image/png")
        return (err = "Image format is incorrect.");

      //파일 선택 갯수 제한
      num += 1;
      if (num <= 5) selectedImages.push(file);
      else return (err = "You can upload up to 5 images.");

      return selectedImages;
    });

    if (err) dispatch({ type: TYPES.NOTIFY, payload: { error: err } });
  };

  return (
    <div>
      <Head>
        <title>Products Manager</title>
      </Head>

      <form className="row">
        <div className="col-md-6">
          {/* title */}
          <input
            className="d-block w-100 my-4 p-2"
            type="text"
            name="title"
            value={title}
            onChange={onChangeInput}
            placeholder="Title"
          />

          {/* price , inStock */}
          <div className="row">
            {/* price */}
            <div className="col-sm-6">
              <input
                className="d-block w-100 p-2"
                type="number"
                name="price"
                value={title}
                onChange={onChangeInput}
                placeholder="Price"
              />
            </div>

            {/* inStock */}
            <div className="col-sm-6">
              <input
                className="d-block w-100 p-2"
                type="number"
                name="inStock"
                value={title}
                onChange={onChangeInput}
                placeholder="Stock"
              />
            </div>
          </div>

          {/* description */}
          <textarea
            className="d-block w-100 my-4 p-2"
            name="description"
            id="description"
            cols="30"
            rows="4"
            placeholder="Description"
            onChange={onChangeInput}
          />

          {/* content */}
          <textarea
            className="d-block w-100 my-4 p-2"
            name="content"
            id="content"
            cols="30"
            rows="6"
            placeholder="Content"
            onChange={onChangeInput}
          />

          {/* category (+ bootstrap 4 - custom select) */}
          <select
            className="custom-select mb-4 text-capitalize"
            name="category"
            id="category"
            value={category}
            onChange={onChangeInput}
          >
            <option value="all">All Products</option>
            {categories.map((item) => (
              <option key={item._id} value={item._id}>
                {item.name}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-6">
          {/* bootstrap 4 - custom file input */}
          <div className="input-group my-4">
            {/* upload */}
            <div className="input-group-prepend">
              <span className="input-group-text" id="inputGroupFileAddon01">
                Upload
              </span>
            </div>

            {/* choose file */}
            <div className="custom-file border-0 rounded-lg">
              <input
                className="custom-file-input"
                type="file"
                id="inputGroupFile01"
                aria-describedby="inputGroupFileAddon01"
                multiple
                accept="image/*"
                onChange={onChangeUpload}
              />
              <label className="custom-file-label" htmlFor="inputGroupFile01">
                Choose file
              </label>
            </div>

            {/* images */}
            <div className="row">
              {images.map((image) => (
                <div>
                  <img
                    className="img-thumbnail rounded-lg"
                    src={image.url ? image.url : URL.createObjectURL(image)}
                    onLoad={() => URL.revokeObjectURL(image)}
                    alt={image.url}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProductsManager;
