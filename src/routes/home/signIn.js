import {  message } from "antd";
import { useState } from "react";
import { connect } from "react-redux";
import { actionCreators } from "../../component/store";
import axios from "axios";
// import NavigateToHome from "./component/navigateToHome";
import "./css/SignIn.css"
import { useCookies } from 'react-cookie'

function SignIn ({userObjInStore, SignInToStore}) {

    // function handleclick(userType){
    //     SignInToStore(userType)
    // }
    
    // console.log(userTypeInStore)

    // jwt 토큰 쿠키에 저장하는 부분
    const [cookie, setCookie] = useCookies(["jwtCookie"])


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
                // withCredentials: true,
            })
            .then((data) => {
                // axios({
                //     url: `${process.env.REACT_APP_AUTH}/aut/api/v1/accesstoken`,
                //     method: "GET",
                //     withCredentials: true,
                // })
                // .then((userObj) => {
                //     const userData = JSON.stringify({
                //         _id: userObj.data.user._id,
                //         email: userObj.data.user.email,
                //         username: userObj.data.user.username,
                //         walletAddress: userObj.data.user.walletAddress,
                //         title: userObj.data.user.title,
                //         desc: userObj.data.user.desc,
                //         type: userObj.data.type,
                //     });
                //     SignInToStore(JSON.parse(userData));
                //     NavigateToHome(userObj.data.type);
                //     messageInfo("로그인 성공!");
                // })
                // .then(()=>{
                //     console.log(userObjInStore)
                // })
                // .catch(() => {
                //   messageError("로그인 실패!!");
                // });
                messageInfo("로그인 성공!");
                setCookie("jwtCookie", data.data, [])
                SignInToStore({userId: signinObj.email})
                console.log(cookie)
            })
            .catch(() => {
                message.error("가입정보가 틀립니다.");
            });
        }
    }
    console.log(userObjInStore.userId)
    
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