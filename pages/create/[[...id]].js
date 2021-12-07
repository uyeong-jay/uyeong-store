import { useContext, useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { DataContext } from "../../store/globalState";
import { TYPES } from "../../store/types";
import { imageUpload } from "../../utils/imageUpload";
import { getData, putData, postData } from "../../utils/fetchData";

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
  // console.log(typeof images); //object
  const [imgCount, setImgCount] = useState(0);
  const [onEdit, setOnEdit] = useState(false);

  const router = useRouter();
  const { id } = router.query;

  //[[...id]] >> create/ , create/id , create/id/...
  useEffect(() => {
    if (id) {
      // create/id , create/id/... (편집 페이지)
      setOnEdit(true);
      getData(`product/${id}`).then((res) => {
        // console.lg(res) //{ product: {제품정보} }
        setProduct(res.product); //제품정보 전체 저장
        setImages(res.product.images); //이미지 정보들만 저장 [ 0: { public_id: "", url: "" }, ... ]
      });
    } else {
      // create/ (생성 페이지)
      setOnEdit(false);
      setProduct(initialState); //초기화
      setImages([]); //초기화
    }
  }, []);

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
    const files = [...e.currentTarget.files];

    //파일 선택 에러
    if (files.length <= 0)
      return dispatch({
        type: TYPES.NOTIFY,
        payload: { error: "No files selected!" },
      });

    files.forEach((file) => {
      //파일 크기 에러
      if (file.size > 1024 * 1024)
        return (err = "The image size must be less than 1MB.");

      //파일 확장자 에러 (png, jpeg, gif O)
      if (!/^image\/(png|jpe?g|gif)$/.test(file.type))
        return (err = `Unsupported format ${file.type}: ${file.name}`);

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

  //제품 생성 (input데이터, images)
  const onSubmit = async (e) => {
    e.preventDefault();

    //api로 가기전에 미리 검사
    if (auth.user.role !== "admin")
      return dispatch({
        type: TYPES.NOTIFY,
        payload: { error: "Authentication is not valid." },
      });

    //api로 가기전에 미리 검사
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
      }); //에러

    dispatch({ type: "NOTIFY", payload: { loading: true } }); //로딩

    let media = [];

    //새 이미지들만 담기
    const newImages = images.filter((img) => !img.url);

    //이미 올라가 있는 이미지들만 담기
    const oldImages = images.filter((img) => img.url);

    //이미지 새로 올리기 >> cloud에 저장된후, 반환값을 media에 저장 by imageUpload
    //imageUpload 유틸에 newImages(객체) 전달
    if (newImages.length > 0) media = await imageUpload(newImages);
    // console.log(media); // [ {public_id: "" url: ""}, ... ]

    let res; //res를 활용하기 위해 fetch대신 async/await 사용

    //product(input)데이터와 images데이터 전달
    if (onEdit) {
      //편집시
      res = await putData(
        `product/${id}`,
        //oldImages: 이미 올라가 있는 이미지들, meida: 새이미지들
        { ...product, images: [...oldImages, ...media] },
        auth.token
      );
    } else {
      //생성시
      res = await postData(
        "product",
        { ...product, images: [...media] },
        auth.token
      );
    }

    if (res.err)
      return dispatch({ type: "NOTIFY", payload: { error: res.err } }); //에러

    return dispatch({ type: "NOTIFY", payload: { success: res.msg } }); //성공
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
              <label htmlFor="price">Price</label>
              <input
                className="d-block w-100 mb-4 p-2"
                type="number"
                name="price"
                id="price"
                value={price}
                onChange={onChangeInput}
                placeholder="Price"
              />
            </div>

            {/* inStock */}
            <div className="col-sm-6">
              <label htmlFor="inStock">Stock</label>
              <input
                className="d-block w-100 mb-4 p-2"
                type="number"
                name="inStock"
                id="inStock"
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
            <option value="all">Category</option>
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
                    style={{ width: "500px" }}
                    src={image.url ? image.url : URL.createObjectURL(image)}
                    onLoad={() => URL.revokeObjectURL(image)} //free some memory
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
            {onEdit ? "Update" : "Create"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductsManager;
