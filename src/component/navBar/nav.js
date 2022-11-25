import { connect } from "react-redux";
import { actionCreators } from "../../component/store";

import HolderNav from "./holderNav";
import HomeNav from "./homeNav";
import IssuerNav from "./issuerNav";
import VerifierNav from "./verifierNav";

function Nav({userObjInStore, SignOutToStore}) {

    const { userType } = userObjInStore

    switch (userType) {
        case "holder":            
            return <HolderNav />
        case "issuer":            
            return <IssuerNav />
        case "verifier":            
            return <VerifierNav />
        default:
            return <HomeNav />
    }
}

function mapStateToProps(state) {
    return {userObjInStore: state}
}
function mapDispatchToProps(dispatch) {
    return {
        SignOutToStore: (userObj) => dispatch(actionCreators.SignOut(userObj))
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (Nav)