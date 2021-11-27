import React, { useContext } from "react";
import { DataContext } from "../store/globalState";
import { deleteItem } from "../store/actions";
import { TYPES } from "../store/types";

const Modal = () => {
  const { state, dispatch } = useContext(DataContext);
  const { modal } = state; // modal: { data: [], id: "", title: "" }

  const onClickDelete = () => {
    dispatch(deleteItem(modal.data, modal.id, modal.type)); //modal.data(cart전체)중 일치id 외 나머지만 cart에 남겨두기
    return dispatch({ type: TYPES.ADD_MODAL, payload: {} }); //modal 초기화
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
          <div className="modal-body">Do you want to delete this item?</div>

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
