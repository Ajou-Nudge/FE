import {  message } from "antd";
import { useState } from "react";
import { connect } from "react-redux";
import { actionCreators } from "../../component/store";
import axios from "axios";
import "./css/SignIn.css"
import { useCookies } from 'react-cookie'
import NavigateToHome from "./component/navigateToHome.js";
import { useNavigate } from "react-router-dom";

function SignIn ({userObjInStore, SignInToStore}) {

    // jwt 토큰 쿠키에 저장하는 부분
    const [ , setCookie] = useCookies(["Authorization"])
    const navigate = useNavigate()


    const [signinObj, setSigninObj] = useState({
        email: "",
        password: "",
    });
    function onchange(e) {
        const SignInObj = signinObj
        SignInObj[e.target.id] = e.target.value;
        setSigninObj(SignInObj);
    };
    function messageInfo(msg) {
        message.success(msg);
    };
    
    // function messageError(msg) {
    //     message.error(msg);
    // };
    
    // 입력값 확인후 BE에 로그인 요청보내기
    function signin() {
        if (signinObj.email === "") {
          message.error("아이디를 입력해주세요.");
        } else if (signinObj.password === "") {
          message.error("비밀번호를 입력해주세요.");
        } else {
            axios({
                url: `http://localhost:8080/user/login`,
                method: "POST",
                data: {
                    memberId: signinObj.email,
                    password: signinObj.password,
                },
                withCredentials: true,
            })
            .then((data) => {
                const cookieValue =`${data.data.accessToken}`
                setCookie("Authorization", cookieValue, [])
                axios({
                    url: `http://localhost:8080/user/info`,
                    method: "GET",
                    withCredentials: true,
                    headers: {authorization: `Bearer ${cookieValue}`},
                })
                .then((data) => {
                    SignInToStore(data.data)
                    NavigateToHome(data.data, navigate)
                    messageInfo("로그인 성공!");
                })   
            })
            .catch((err) => {
                message.error("가입정보가 틀립니다.");
            });
        }
    }
    return (
        <div className='logIn_bgGray'>
            <div className='logIn_box'>
                <h1 className='logIn_headline'>로그인</h1>
                <dl>
                    <dt className='logIn_text'>아이디</dt>
                    <dd>
                        <input
                            className="logIn_input"
                            type="text"
                            placeholder="EMAIL"
                            onChange={onchange}
                            id="email"
                        />
                    </dd>
                </dl>
                <dl>
                    <dt className='logIn_text'>비밀번호</dt>
                    <dd>
                        <input
                            className="logIn_input"
                            type="password"
                            placeholder="PASSWORD"
                            onChange={onchange}
                            id="password"
                        />
                    </dd>
                </dl>
                <button className='logIn_button' onClick={signin}>
                    로그인
                </button>
            </div>
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