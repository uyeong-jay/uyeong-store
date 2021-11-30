import React from "react";
import { TYPES } from "../../store/types";

const Category = ({ category, state, dispatch, onClickEditCategory }) => {
  const { categories } = state;

  return (
    // bootstrap 4 - card
    <div className="card">
      {/* card - body */}
      <div className="card-body d-flex justify-content-between">
        {category.name}

        {/* icon - edit, trash */}
        <div style={{ cursor: "pointer" }}>
          {/* font awesome - edit */}
          <i
            className="fas fa-edit mr-3 text-info"
            onClick={() => onClickEditCategory(category)}
          ></i>
          {/* font awesome - trash */}
          <i
            className="fas fa-trash-alt text-danger"
            style={{ fontSize: "18px" }}
            // delete modal
            data-toggle="modal"
            data-target="#exampleModal"
            onClick={() =>
              dispatch({
                type: TYPES.ADD_MODAL,
                payload: {
                  data: categories,
                  id: category._id,
                  title: category.name,
                  type: TYPES.ADD_CATEGORIES,
                },
              })
            }
          ></i>
        </div>
      </div>
    </div>
  );
};

export default Category;
