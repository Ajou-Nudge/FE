
function NavigateToHome(userObjInStore, navigate) {

    const { memberRole } = userObjInStore
    console.log(memberRole)

    if (memberRole === "HOLDER") {
        return navigate("/holder");
    } else if (memberRole === "ISSUER") {
        return navigate("/issuer");
    } else if (memberRole === "VERIFIER") {
        return navigate("/verifier")
    } else {
        return navigate("/")
    }
}


export default NavigateToHome