import Message from "./Message";

const ErrorMessage = ({ message }) => (
  <Message message={message} className="error" />
);
export default ErrorMessage;
