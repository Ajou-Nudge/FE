import {createStore} from "redux"

const signIn = "signIn"
const signOut = "signOut"

function SignIn(userType) {
    return{type: signIn, userType: userType}
}
function SignOut() {
    return{type: signOut}
}

const reducer = (state = "", action) => {
    switch(action.type){
        case signIn:
            return action.userType
        case signOut:
            return ""
        default:
            return state
    }
}

const store = createStore(reducer);

export default store;
export const actionCreators = {
    SignIn,
    SignOut,
}