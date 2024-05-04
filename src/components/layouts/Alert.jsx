import { useContext } from "react";
import AlertContext from "../../context/alert/AlertContext";
import { FaRegFrown } from "react-icons/fa";

const Alert = () => {
  const { alert } = useContext(AlertContext);

  return alert !== null ? (
    <div className="flex items-center mb-4 space-x-3">
      <FaRegFrown color="red" size="25px" />
      <strong className="text-red-500">{alert.msg}</strong>
    </div>
  ) : null;
};

export default Alert;
