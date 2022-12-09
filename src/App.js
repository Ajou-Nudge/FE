// react-router-dom v6로 업데이트 하여 오류발생, Router지우지말것
// eslint-disable-next-line
import {HashRouter as Router, Routes, Route, BrowserRouter} from "react-router-dom"
import { actionCreators } from "./component/store.js";
import { connect } from "react-redux";
import { useCookies } from "react-cookie";
import 'antd/dist/antd.min.css';

import { useEffect } from "react";
import axios from "axios";

// Main
import Home from "./routes/home/home";
import SignIn from "./routes/home/signIn";
import SignUp from "./routes/home/signUp";
import Terms from "./routes/home/terms.js";
import Privacy from "./routes/home/privacy.js";
import FAQ from "./routes/home/FAQ.js";

// issuer
// import IssuerHome from "./routes/issuer/issuerHome";
import IssuerCreateContext from "./routes/issuer/issuerCreateContext";
import IssuerContextList from "./routes/issuer/issuerContextList.js";
import IssuerIssue from "./routes/issuer/issuerIssue";
import IssuerVcList from "./routes/issuer/issuerVcList.js";

import IssuerPostingList from "./routes/issuer/issuerPostingList.js";
import IssuerPost from "./routes/issuer/issuerPost.js";
import IssuerVerifiy from "./routes/issuer/issuerVerifiy.js";

// Holder
// import HolderHome from "./routes/holder/holderHome";
import HolderPostingList from "./routes/holder/holderPostingList";
import HolderSubmit from "./routes/holder/holderSubmit";
import HolderSubmittedList from "./routes/holder/holderSubmittedList.js";
import HolderVcList from "./routes/holder/holderVcList";
import HolderVcDetail from "./routes/holder/holderVcDetail";
import HolderIssue from "./routes/holder/holderIssue.js";

// Verifier
import VerifierHome from "./routes/verifier/verifierHome";
import VerifierVerifiy from "./routes/verifier/verifierVerifiy";
import VerifierPost from "./routes/verifier/verifierPost";
import VerifierPostingList from "./routes/verifier/verifierPostingList";
import VerifierVerifiyDetail from "./routes/verifier/verifierVerifiyDetail";

// component
import NotFound from "./component/notFound";
import Footer from "./component/footer.js";
// import Nav from "./component/navBar/nav.js";
import HomeNav from "./component/navBar/homeNav.js";
import IssuerNav from "./component/navBar/issuerNav.js";
import HolderNav from "./component/navBar/holderNav.js";
import VerifierNav from "./component/navBar/verifierNav.js";


function App({userObjInStore, SignInToStore}) {

  const [ cookie ] = useCookies()

  // jwt토큰쿠키로 로그인 관리
  useEffect(() => {
    axios({
      url: `http://localhost:8080/user/info`,
      method: "GET",
      withCredentials: true,
      headers: {authorization: `Bearer ${cookie.Authorization}`},
    })
    .then((userObj) => {
      // 리덕스기반으로 메모리에 저장
      SignInToStore(userObj.data);
    })
      .catch(() => {
        console.log("로그인관리 에러");
      });
  },[SignInToStore, cookie])

  // // 리덕스 더미데이터 주입
  // useEffect(() => {
  //   const userObj = {userType: "holder"}
  //   SignInToStore(userObj)
  // })

  // 라우터별로 분리, Main/Issuer/Holder/Verifier
  function Main() {
    return(
      <div>
        <HomeNav/>
        <Routes>
          <Route index element={<Home />}></Route>
          <Route path="signIn" element={<SignIn />}></Route>
          <Route path="signUp" element={<SignUp />}></Route>
          <Route path="terms" element={<Terms />}></Route>
          <Route path="privacy" element={<Privacy />}></Route>
          <Route path="FAQ" element={<FAQ />}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </div>
    )
  }
  function Issuer(){
    return(
      <div>
        <IssuerNav/>
        <Routes>
          <Route index element={<IssuerIssue />}></Route>
          <Route path="createContext" element={<IssuerCreateContext />}></Route>
          <Route path="contextList" element={<IssuerContextList />}></Route>
          <Route path="issue" element={<IssuerIssue />}></Route>
          <Route path="vcList" element={<IssuerVcList />}></Route>
          <Route path="postingList" element={<IssuerPostingList />}></Route>
          <Route path="post" element={<IssuerPost />}></Route>
          <Route path="verifiy/*" element={<IssuerVerifiy />}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
        <Footer />
      </div>
    )
  }
  function Holder(){
    return(
      <div>
        <HolderNav/>
        <Routes>
          <Route index element={<HolderSubmittedList />}></Route>
          <Route path="vcList" element={<HolderVcList />}></Route>
          <Route path="vcDetail/:vcId" element={<HolderVcDetail />}></Route>
          <Route path="submit/:postId" element={<HolderSubmit />}></Route>
          <Route path="submittedList" element={<HolderSubmittedList />}></Route>
          <Route path="postingList" element={<HolderPostingList />}></Route>
          <Route path="issue" element={<HolderIssue />}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
        <Footer />
      </div>
    )
  }
  function Verifier(){
    return(
      <div>
        <VerifierNav/>
        <Routes>
          <Route index element={<VerifierHome />}></Route>
          <Route path="verifiy/:postId" element={<VerifierVerifiy />}></Route>
          <Route path="verifiy/detail/:vcId" element={<VerifierVerifiyDetail />}></Route>
          <Route path="post" element={<VerifierPost />}></Route>
          <Route path="postingList" element={<VerifierPostingList />}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </div>
    )
  }

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<Main />}/>
          <Route path="/issuer/*" element={<Issuer />}/>
          <Route path="/holder/*" element={<Holder />}/>
          <Route path="/verifier/*" element={<Verifier />}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

function mapDispatchToProps(dispatch) {
  return {
      SignInToStore: (userObj) => dispatch(actionCreators.SignIn(userObj))
  }
}

export default connect(null, mapDispatchToProps) (App);