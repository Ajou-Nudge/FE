import { useState } from "react";
import SignUpChoice from "./component/signupChoice";
import HolderSignUp from "./component/holderSignUp";
import IssuerSignUp from "./component/issuerSignUp";
import VerifierSignUp from "./component/verifierSignUp";

function SignUp() {
  const [way, setWay] = useState("");

  let renderByWay = "";
  if (way === "" || way === "company") {
    renderByWay = <SignUpChoice setWay={setWay} />;
  } else if (way === "holder") {
    renderByWay = <HolderSignUp />;
  } else if (way === "issuer") {
    renderByWay = <IssuerSignUp />;
  } else if (way === "verifier") {
    renderByWay = <VerifierSignUp />;
  } else {
    <>오류 발생</>;
  }

  return (
    <div>
        {renderByWay}
    </div>
  );
};


export default SignUp