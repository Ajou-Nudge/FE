import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { actionCreators } from "../../component/store";

function SignIn ({userTypeInStore, SignInToStore}) {
    //const [user, setUser] = useState("");

    function handleclick(userType){
        SignInToStore(userType)
    }
    
    console.log(userTypeInStore)
    //useEffect(()=>{SignInToStore(user)},[user])

    return (
        <div>
            <h1>signIn</h1>
            <button onClick={()=>{handleclick("holder")}}>개인</button>
            <button onClick={()=>{handleclick("issuer")}}>발급자</button>
            <button onClick={()=>{handleclick("verifier")}}>검증자</button>
        </div>
    )

}

function mapStateToProps(state) {
    return {userTypeInStore: state}
}
function mapDispatchToProps(dispatch) {
    return {
        SignInToStore: (userType) => dispatch(actionCreators.SignIn(userType))
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (SignIn);