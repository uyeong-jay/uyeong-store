import React, { useContext, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { DataContext } from "../../store/globalState";
import { TYPES } from "../../store/types";
import { imageUpload } from "../../utils/imageUpload";
import { putData, postData } from "../../utils/fetchData";

//[[...id]]: Catch all routes - /create, /create/id1, /create/id1/id2
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
  const [imgCount, setImgCount] = useState(0);
  const [onEdit, setOnEdit] = useState(false);

  const router = useRouter();
  const { id } = router.query;

  //input 데이터 저장
  const onChangeInput = (e) => {
    const { name, value } = e.currentTarget;
    setProduct({ ...product, [name]: value }); //상태 저장
    dispatch({ type: TYPES.NOTIFY, payload: {} }); //메세지 초기화
  };

  //이미지 업로드
  const onChangeUpload = (e) => {
    let selectedImages = [];
    let err = "";

    dispatch({ type: TYPES.NOTIFY, payload: {} }); //메세지 초기화

    //선택한 파일들
    const files = [...e.currentTarget.files]; //배열 >> forEach

    //파일 선택 에러
    if (files.length <= 0)
      return dispatch({
        type: TYPES.NOTIFY,
        payload: { error: "No files selected!" },
      });

    files.forEach((file) => {
      //파일 크기 에러
      if (file.size > 400 * 300)
        return (err = "The image size must be less than 1KB.");

      //파일 확장자 에러 (jpg, png O)
      if (file.type !== "image/jpg" && file.type !== "image/png")
        return (err = "Image format is incorrect.");

      //파일 갯수 제한
      if (imgCount < 5) {
        setImgCount((imgCount += 1));
        selectedImages.push(file);
      } else {
        return (err = "You can upload up to 5 images.");
      }

      return selectedImages;
    });

    if (err) dispatch({ type: TYPES.NOTIFY, payload: { error: err } }); //에러
    setImages([...images, ...selectedImages]); //이미지 저장
  };

  //파일 삭제
  const onClickDelete = (index) => {
    images.splice(index, 1);
    setImgCount((imgCount -= 1));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    //백으로 가기전에 미리 검사
    if (auth.user.role !== "admin")
      return dispatch({
        type: TYPES.NOTIFY,
        payload: { error: "Authentication is not valid." },
      });

    //백으로 가기전에 미리 검사
    if (
      !title ||
      !price ||
      !inStock ||
      !description ||
      !content ||
      category === "all" ||
      images.length <= 0
    )
      return dispatch({
        type: TYPES.NOTIFY,
        payload: { error: "Please add all the fields." },
      });

    dispatch({ type: "NOTIFY", payload: { loading: true } }); //로딩

    let media = []; // [ {public_id: "" url: ""}, ... ]
    const imgNewURL = images.filter((img) => !img.url); //media배열에 존재하지 않는 image(객체)(url-x)
    const imgOldURL = images.filter((img) => img.url); //media배열에 이미 존재하는 imgae(객체)(url-o)
    // console.log(typeof imgNewURL, typeof imgOldURL); //object, object

    //imgNewURL(객체)존재시 imageUpload 유틸에 imgNewURL(객체) 전달
    if (imgNewURL.length > 0) media = await imageUpload(imgNewURL);
    // >> cloud에 저장된후, 반환값을 media에 저장 by imageUpload
    // console.log(media); // [ {public_id: "" url: ""}, ... ]

    let res; //res를 활용하기 위해 fetch대신 async/await 사용
    if (onEdit) {
      res = await putData(
        `product/${id}`,
        { ...product, images: [...imgOldURL, ...media] },
        auth.token
      );
      if (res.err)
        return dispatch({ type: "NOTIFY", payload: { error: res.err } });
    } else {
      res = await postData(
        "product",
        { ...product, images: [...imgOldURL, ...media] },
        auth.token
      );
      if (res.err)
        return dispatch({ type: "NOTIFY", payload: { error: res.err } });
    }

    return dispatch({ type: "NOTIFY", payload: { success: res.msg } });
  };

  return (
    <div>
      <Head>
        <title>Products Manager</title>
      </Head>

      <form className="row container" onSubmit={onSubmit}>
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
                className="d-block w-100 mb-4 p-2"
                type="number"
                name="price"
                value={price}
                onChange={onChangeInput}
                placeholder="Price"
              />
            </div>

            {/* inStock */}
            <div className="col-sm-6">
              <input
                className="d-block w-100 mb-4 p-2"
                type="number"
                name="inStock"
                value={inStock}
                onChange={onChangeInput}
                placeholder="Stock"
              />
            </div>
          </div>

          {/* description */}
          <textarea
            className="d-block w-100 p-2"
            name="description"
            id="description"
            cols="30"
            rows="4"
            value={description}
            onChange={onChangeInput}
            placeholder="Description"
          />

          {/* content */}
          <textarea
            className="d-block w-100 my-4 p-2"
            name="content"
            id="content"
            cols="30"
            rows="6"
            value={content}
            onChange={onChangeInput}
            placeholder="Content"
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
            <div className="product_images row mx-auto my-2">
              {images.map((image, index) => (
                <div className="porduct_image mb-2" key={index}>
                  {/* image */}
                  <img
                    className="img-thumbnail border-info"
                    src={image.url ? image.url : URL.createObjectURL(image)}
                    onLoad={() => URL.revokeObjectURL(image)}
                    alt={image.url}
                  />

                  {/* button - delete */}
                  <button type="button" onClick={() => onClickDelete(index)}>
                    X
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* button - update, create */}
          <button
            className="float-right btn btn-primary mb-4 px-4"
            type="submit"
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductsManager;
