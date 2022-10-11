import { useNavigate } from "react-router-dom";


function NavigateToHome(userType) {
    const navigate = useNavigate()
    if (userType === "holder") {
        navigate("/holder");
    } else if (userType === "issuer") {
        navigate("/issuer");
    } else if (userType === "verifier") {
        navigate("/verifier")
    } else {
        navigate("/")
    }
}

export default NavigateToHome