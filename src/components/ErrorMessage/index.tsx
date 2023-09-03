import { useSelector } from "react-redux";
import { selector } from "../../store/selectors";
import { Error } from "./styles";

function ErrorMessage() {
    const { error } = useSelector(selector);

    return error
        ? <Error>{error}</Error>
        : null;
}

export default ErrorMessage;
