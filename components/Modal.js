import React, { useContext, useMemo } from "react";
import { DataContext } from "../store/globalState";
import { deleteItem } from "../store/actions";
import { TYPES } from "../store/types";
import { deleteData } from "../utils/fetchData";

const Modal = () => {
  const { state, dispatch } = useContext(DataContext);
  const { auth, modal } = state; // modal: { data: [], id: "", title: "" }

  const onClickDelete = () => {
    if (modal.type === TYPES.ADD_USERS) {
      deleteData(`user/${modal.id}`, auth.token).then((res) => {
        if (res.err)
          return dispatch({ type: TYPES.NOTIFY, payload: { error: res.err } }); //에러
        return dispatch({ type: TYPES.NOTIFY, payload: { success: res.msg } }); //성공
      });
    }

    if (modal.type === TYPES.ADD_CATEGORIES) {
      deleteData(`categories/${modal.id}`, auth.token).then((res) => {
        if (res.err)
          return dispatch({ type: TYPES.NOTIFY, payload: { error: res.err } }); //에러
        return dispatch({ type: TYPES.NOTIFY, payload: { success: res.msg } }); //성공
      });
    }

    //ADD_CART, ADD_USERS, ADD_CATEGORIES
    dispatch(deleteItem(modal.data, modal.id, modal.type)); //modal.data중 일치id 외 나머지만 남겨두기
    return dispatch({ type: TYPES.ADD_MODAL, payload: {} }); //modal 초기화
  };

  //modal-body 내용
  const modalbodyMsg = useMemo(() => {
    if (modal.type === TYPES.ADD_CART)
      return "Do you want to delete this item?";
    if (modal.type === TYPES.ADD_USERS)
      return "Do you want to delete this user?";
    if (modal.type === TYPES.ADD_CATEGORIES)
      return "Do you want to delete this category?";
  }, [modal.type]);

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
              {modal.title}
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
          <div className="modal-body">{modalbodyMsg}</div>

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
