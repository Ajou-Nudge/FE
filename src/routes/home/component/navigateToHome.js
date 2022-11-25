import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";


function NavigateToHome(userObjInStore) {
    const { userType } = userObjInStore
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

function mapStateToProps(state) {
    return {userObjInStore: state}
}

export default connect(mapStateToProps, null) (NavigateToHome)