import { useContext } from "react";
import { DataContext } from "../store/globalState";
import Loading from "./Loading";
import Toast from "./Toast";
import { TYPES } from "../store/types";

const Notify = () => {
  const { state, dispatch } = useContext(DataContext); //global state
  const { notify } = state;

  return (
    <>
      {notify.loading && <Loading />}
      {notify.error && (
        <Toast
          onClickClose={() => dispatch({ type: TYPES.NOTIFY, payload: {} })} //토스트 메세지 초기화
          msg={{ title: "Error", msg: notify.error }}
          bgColor="bg-danger"
        />
      )}
      {notify.success && (
        <Toast
          onClickClose={() => dispatch({ type: TYPES.NOTIFY, payload: {} })} //토스트 메세지 초기화
          msg={{ title: "Success", msg: notify.success }}
          bgColor="bg-success"
        />
      )}
    </>
  );
};

export default Notify;
