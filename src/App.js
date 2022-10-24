// react-router-dom v6로 업데이트 하여 오류발생, Router지우지말것
// eslint-disable-next-line
import {HashRouter as Router, Routes, Route, BrowserRouter} from "react-router-dom"
import { actionCreators } from "./component/store.js";
// import { useEffect } from "react";
// import { useCookies } from 'react-cookie'
// import axios from "axios";
import { connect } from "react-redux";
import 'antd/dist/antd.min.css';

// Main
import Home from "./routes/home/home";
import SignIn from "./routes/home/signIn";
import SignUp from "./routes/home/signUp";

// issuer
import IssuerCreateContext from "./routes/issuer/issuerCreateContext";
import IssuerContextList from "./routes/issuer/issuerContextList.js";
import IssuerHome from "./routes/issuer/issuerHome";
import IssuerIssue from "./routes/issuer/issuerIssue";
import IssuerVcList from "./routes/issuer/issuerVcList.js";

// Holder
import HolderHome from "./routes/holder/holderHome";
import HolderPostingList from "./routes/holder/holderPostingList";
import HolderSubmit from "./routes/holder/holderSubmit";
import HolderSubmittedList from "./routes/holder/holderSubmittedList.js";
import HolderVcList from "./routes/holder/holderVcList";
import HolderVcDetail from "./routes/holder/holderVcDetail";

// Verifier
import VerifierHome from "./routes/verifier/verifierHome";
import VerifierVerifiy from "./routes/verifier/verifierVerifiy";
import VerifierPost from "./routes/verifier/verifierPost";
import VerifierPostingList from "./routes/verifier/verifierPostingList";
import VerifierVerifiyDetail from "./routes/verifier/verifierVerifiyDetail";

// component
import NotFound from "./component/notFound";
import HomeNav from "./component/navBar/homeNav.js";
import IssuerNav from "./component/navBar/issuerNav.js";
import HolderNav from "./component/navBar/holderNav.js";
import VerifierNav from "./component/navBar/verifierNav.js";
import Footer from "./component/footer.js";


function App({SignInToStore}) {
  // // jwt토큰쿠키로 로그인 관리
  // const [cookie] = useCookies(["jwtCookie"])
  // useEffect(() => {
  //   axios({
  //     url: `${process.env.REACT_APP_AUTH}/aut/api/v1/accesstoken`,
  //     method: "GET",
  //     data: cookie.jwtCookie,
  //     withCredentials: true,
  //   })
  //   .then((userObj) => {
  //     // 받아온 user정보 직렬화
  //     const userData = JSON.stringify({
  //         _id: userObj.data.user._id,
  //         email: userObj.data.user.email,
  //         username: userObj.data.user.username,
  //         walletAddress: userObj.data.user.walletAddress,
  //         title: userObj.data.user.title,
  //         desc: userObj.data.user.desc,
  //         type: userObj.data.type,
  //     });
  //     // 리덕스기반으로 메모리에 저장
  //     SignInToStore(JSON.parse(userData));
  //   })
  //     .catch(() => {
  //       console.log("로그인관리 에러");
  //     });
  // },[cookie.jwtCookie, SignInToStore])

  // 라우터별로 분리, Main/Issuer/Holder/Verifier
  function Main() {
    return(
      <div>
        <HomeNav />
        <Routes>
          <Route index element={<Home />}></Route>
          <Route path="signIn" element={<SignIn />}></Route>
          <Route path="signUp" element={<SignUp />}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </div>
    )
  }
  function Issuer(){
    return(
      <div>
        <IssuerNav />
        <Routes>
          <Route index element={<IssuerHome />}></Route>
          <Route path="createContext" element={<IssuerCreateContext />}></Route>
          <Route path="contextList" element={<IssuerContextList />}></Route>
          <Route path="issue" element={<IssuerIssue />}></Route>
          <Route path="vcList" element={<IssuerVcList />}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </div>
    )
  }
  function Holder(){
    return(
      <div>
        <HolderNav />
        <Routes>
          <Route index element={<HolderHome />}></Route>
          <Route path="vcList" element={<HolderVcList />}></Route>
          <Route path="vcDetail/:vcId" element={<HolderVcDetail />}></Route>
          <Route path="submit/:postId" element={<HolderSubmit />}></Route>
          <Route path="submittedList" element={<HolderSubmittedList />}></Route>
          <Route path="postingList" element={<HolderPostingList />}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </div>
    )
  }
  function Verifier(){
    return(
      <div>
        <VerifierNav />
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
      <Footer />
    </div>
  )
}

function mapDispatchToProps(dispatch) {
  return {
      SignInToStore: (userObj) => dispatch(actionCreators.SignIn(userObj))
  }
}

export default connect(null, mapDispatchToProps) (App);