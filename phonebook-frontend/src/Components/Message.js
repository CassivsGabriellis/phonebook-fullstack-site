const Message = ({ message, className }) => (
  <div className={message ? className : "hidden"}>{message}</div>
);

export default Message;
