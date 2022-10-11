import {  message } from "antd";
import { useState } from "react";
import { connect } from "react-redux";
import { actionCreators } from "../../component/store";
import axios from "axios";
import NavigateToHome from "./component/navigateToHome";

function SignIn ({userObjInStore, SignInToStore}) {

    // function handleclick(userType){
    //     SignInToStore(userType)
    // }
    
    // console.log(userTypeInStore)

    const [signinObj, setSigninObj] = useState({
        email: "",
        password: "",
    });
    function onchange(e) {
        signinObj[e.target.id] = e.target.value;
        setSigninObj(signinObj);
    };
    function isEnter(e) {  
        signin();   
    };
    function messageInfo(msg) {
        message.success(msg);
    };
    
    function messageError(msg) {
        message.error(msg);
    };
    
    
    function signin() {
        if (signinObj.email === "") {
          message.error("아이디를 입력해주세요.");
        } else if (signinObj.password === "") {
          message.error("비밀번호를 입력해주세요.");
        } else {
            axios({
                url: `${process.env.REACT_APP_AUTH}/aut/api/v1/login`,
                method: "POST",
                data: {
                    email: signinObj.email,
                    password: signinObj.password,
                },
                withCredentials: true,
            })
            .then((data) => {
                axios({
                    url: `${process.env.REACT_APP_AUTH}/aut/api/v1/accesstoken`,
                    method: "GET",
                    withCredentials: true,
                })
                .then((userObj) => {
                    const userData = JSON.stringify({
                        _id: userObj.data.user._id,
                        email: userObj.data.user.email,
                        username: userObj.data.user.username,
                        walletAddress: userObj.data.user.walletAddress,
                        title: userObj.data.user.title,
                        desc: userObj.data.user.desc,
                        type: userObj.data.type,
                    });
                    SignInToStore(JSON.parse(userData));
                    NavigateToHome(userObj.data.type);
                    messageInfo("로그인 성공!");
                })
                .then(()=>{
                    console.log(userObjInStore)
                })
                .catch(() => {
                  messageError("로그인 실패!!");
                });
            })
            .catch(() => {
              message.error("가입정보가 틀립니다.");
            });
        }
    }

    

    return (
        <div>
            <h1>signIn</h1>
            <input
                type="text"
                placeholder="EMAIL"
                onChange={onchange}
                id="email"
            />
            <input
                type="password"
                placeholder="PASSWORD"
                onChange={onchange}
                id="password"
                onKeyDown={isEnter}
            />
            <button onClick={signin}>
                로그인
            </button>
        </div>
    )

}

function mapStateToProps(state) {
    return {userObjInStore: state}
}
function mapDispatchToProps(dispatch) {
    return {
        SignInToStore: (userObj) => dispatch(actionCreators.SignIn(userObj))
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (SignIn);