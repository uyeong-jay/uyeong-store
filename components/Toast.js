const Toast = ({ onClickClose, msg, bgColor }) => {
  return (
    // Bootstrap 4 Toast - W3Schools >> Show and Hide a Toast
    // className >> show 추가
    <div
      className={`toast show ${bgColor} text-light`}
      style={{
        position: "fixed",
        top: "5px",
        right: "5px",
        zIndex: 9,
        minWidth: "280px",
      }}
    >
      <div className={`toast-header ${bgColor} text-light`}>
        {/* 토스트 메세지 */}
        <strong className="mr-auto text-light">{msg.title}</strong>

        {/* close 버튼 */}
        <button
          type="button"
          className="ml-2 mb-1 close text-light"
          data-dismiss="toast"
          style={{ outline: "none" }}
          onClick={onClickClose}
        >
          x
        </button>
      </div>

      <div className="toast-body">{msg.msg}</div>
    </div>
  );
};

export default Toast;
