// react-router-dom v6로 업데이트 하여 오류발생, Router지우지말것
// eslint-disable-next-line
import {HashRouter as Router, Routes, Route, BrowserRouter} from "react-router-dom"

// Main
import Home from "./routes/home/home";
import SignIn from "./routes/home/signIn";
import SignUp from "./routes/home/signUp";
import SignUpComplete from "./routes/home/signUpComplete";

// issuer
import IssuerCreateContext from "./routes/issuer/issuerCreateContext";
import IssuerHome from "./routes/issuer/issuerHome";
import IssuerIssue from "./routes/issuer/issuerIssue";
import IssuerIssueComplete from "./routes/issuer/issuerIssueComplete";

// Holder
import HolderHome from "./routes/holder/holderHome";
import HolderPostingList from "./routes/holder/holderPostingList";
import HolderSubmit from "./routes/holder/holderSubmit";
import HolderSubmitComplete from "./routes/holder/holderSubmitComplete";
import HolderVcList from "./routes/holder/holderVcList";

// Verifier
import VerifierHome from "./routes/verifier/verifierHome";
import VerifierVerifiy from "./routes/verifier/verifierVerifiy";
import VerifierPost from "./routes/verifier/verifierPost";
import NotFound from "./component/notFound";



function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Home />}></Route>
          <Route path="signIn" element={<SignIn />}></Route>
          <Route path="signUp" element={<SignUp />}></Route>
          <Route path="signUpComplete" element={<SignUpComplete />}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Route>
        <Route path="/issuer">
          <Route index element={<IssuerHome />}></Route>
          <Route path="createContext" element={<IssuerCreateContext />}></Route>
          <Route path="issue" element={<IssuerIssue />}></Route>
          <Route path="issueComplete" element={<IssuerIssueComplete />}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Route>
        <Route path="/holder">
          <Route index element={<HolderHome />}></Route>
          <Route path="vcList" element={<HolderVcList />}></Route>
          <Route path="submit/:postId" element={<HolderSubmit />}></Route>
          <Route path="submitComplete" element={<HolderSubmitComplete />}></Route>
          <Route path="postingList" element={<HolderPostingList />}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Route>
        <Route path="/verifier">
          <Route index element={<VerifierHome />}></Route>
          <Route path="verifiy" element={<VerifierVerifiy />}></Route>
          <Route path="post" element={<VerifierPost />}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
