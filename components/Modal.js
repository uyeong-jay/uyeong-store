import { useContext, useMemo } from "react";
import { DataContext } from "../store/globalState";
import { deleteItem } from "../store/actions";
import { TYPES } from "../store/types";
import { deleteData } from "../utils/fetchData";
import { useRouter } from "next/router";
const baseUrl = process.env.BASE_URL;

const Modal = () => {
  const { state, dispatch } = useContext(DataContext);
  const { auth, modal } = state; // modal: { data: [], id: "", title: "" }

  const router = useRouter();

  let res;

  const message = () => {
    if (res.err)
      return dispatch({ type: TYPES.NOTIFY, payload: { error: res.err } }); //에러
    if (res.msg)
      return dispatch({ type: TYPES.NOTIFY, payload: { success: res.msg } }); //성공
  };

  //카트 삭제
  const deleteCart = (item) => {
    dispatch(deleteItem(item.data, item.id, item.type)); //item.data중 일치id 외 나머지만 남겨두기
  };
  //유저 삭제
  const deleteUsers = async (item) => {
    res = await deleteData(`user/${item.id}`, auth.token);
    dispatch(deleteItem(item.data, item.id, item.type));
    message();
  };
  //카테고리 삭제
  const deleteCategories = async (item) => {
    res = await deleteData(`categories/${item.id}`, auth.token);
    dispatch(deleteItem(item.data, item.id, item.type));
    message();
  };
  //제품 삭제
  const deleteProduct = async (item) => {
    dispatch({ type: "NOTIFY", payload: { loading: true } }); //로딩
    res = await deleteData(`product/${item.id}`, auth.token);
    message();
  };

  const onClickDelete = async () => {
    if (modal.length !== 0) {
      modal.forEach((item) => {
        if (item.type === TYPES.CART) deleteCart(item);
        if (item.type === TYPES.USERS) deleteUsers(item);
        if (item.type === TYPES.CATEGORIES) deleteCategories(item);
        if (item.type === TYPES.PRODUCT) deleteProduct(item);
      });
    }

    // if (modal[0].type === TYPES.PRODUCT) {
    //   router.reload(window.location.pathname); //강제 새로고침 (cause server side rendering)
    //   // router.replace(router.asPath); //not workging... 아놔 ㅜㅡㅜ..
    //   console.log("a");
    // }

    return dispatch({ type: TYPES.MODAL, payload: [] }); //modal 초기화
  };

  return (
    // bootstrap 4 modal - live demo
    <div
      className="modal fade"
      id="exampleModal"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          {/* modal-header */}
          <div className="modal-header">
            <h5 className="modal-title text-capitalize" id="exampleModalLabel">
              {modal.length > 0 && modal[0].title}
            </h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>

          {/* modal-body */}
          <div className="modal-body">
            {modal.length > 0 && modal[0].content}
          </div>

          {/* modal-footer (+ data-dismiss="modal")*/}
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-dismiss="modal"
              onClick={onClickDelete}
            >
              Yes
            </button>
            <button
              type="button"
              className="btn btn-primary"
              data-dismiss="modal"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
