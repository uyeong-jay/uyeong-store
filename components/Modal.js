import React, { useContext } from 'react';
import { DataContext } from '../store/globalState';
import { deleteItem } from '../store/actions';

const Modal = () => {
  const { state, dispatch } = useContext(DataContext);
  const { modal } = state;

  const onClickButton = () => {};


  return (
    // bootstrap 4 modal - live demo
    <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">

          <div class="modal-header">
            {/* modal-title */}
            <h5 class="modal-title" id="exampleModalLabel">{modal.title}</h5>
            {/* modal-close-button */}
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>

          <div class="modal-body">
            Do you really want to delete this item?
          </div>

          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal" onClick={onClickButton}>Yes</button>
            <button type="button" class="btn btn-primary" data-dismiss="modal">Cancel</button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Modal;
