import React, { useState } from "react";
import HolderSignUp from "./component/holderSignUp";
import CompanySignUp from "./component/companySignUp";
import "./css/SignUp.css"

function SignUp() {
  const [way, setWay] = useState("holder");

  let renderByWay = "";
  if (way === "holder") {
    renderByWay = <HolderSignUp />;
  } else if (way === "company") {
    renderByWay = <CompanySignUp />;
  } else {
    <>오류 발생</>;
  }

  function handleWay(e) {
    switch (e.target.id) {
      case "holder":
        setWay("holder")
        return
      case "company":
        setWay("company")
        return
      default :
        console.log("handleWay err")
        return
    }
  }

  return (
    <div className="signUp_bg">
      <div className="signUp_bgMargin">
        <h3 className="signUp_title">회원가입</h3>
        <div className="signUp_typeBox">
          <button id="holder" onClick={handleWay} className={`signUp_typeBtn_left_${way === "holder"}`}>개인회원</button>
          <button id="company" onClick={handleWay} className={`signUp_typeBtn_right_${way === "company"}`}>기관회원</button>
        </div>
        <div>
          {renderByWay}
        </div>
      </div>
    </div>
  );
};


export default SignUp