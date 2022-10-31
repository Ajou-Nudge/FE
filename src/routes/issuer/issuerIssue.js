import { connect } from "react-redux";
import { actionCreators } from "../../component/store";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Empty, message } from "antd";
import Headline from "../../component/headline";
import issuerI_headline from "../../img/headline/issuerI_headline.png"
import DummyContextList from "../../dummy/dummyContextList";
import "./css/issuerIssue.css"


function IssuerIssue(userIdInStore) {

    // contextList는 받아온 formList에서 context만 추출한 것
    const [ formList, setFormList ] = useState([])
    const [ contextList, setContextList ] = useState([])
    const [ theForm, setTheForm ] = useState(undefined)
    const [ issueVcs, setIssueVcs ] = useState([{
        holderId: "1",
        vc: {
            context: "",
            issuer: "",
            CredentialSubject:{}
        }
    }])
    const navigate = useNavigate()

    // 창 가로크기 측정 코드, inner 850px 기준, className으로 반응
    const[ widthHandle, setWidthHandle ] = useState("")
    function handleResize() {
        if (window.innerWidth > 850) {
            setWidthHandle("")
        } else {
            setWidthHandle("_minmize")
        }
    }
    useEffect(() => {
        return window.addEventListener("resize", handleResize)
    })

    // 서버에서 issuer의 context정보 불러오기
    // useEffect(() => {
    //     axios({
    //         url: `/issuer/context-list/:${userIdInStore}`,
    //         method: "GET",
    //         withCredentials: true,
    //     })
    //     .then((res) => {
    //         setFormList(res)
    //     })
    //     .catch(() => {
    //         message.error("자격증 양식 가져오기 실패");
    //         navigate("/issuer")
    //     });
    // }, [navigate, userIdInStore])

    useEffect(() => {
        const Dummy = DummyContextList
        setFormList([...Dummy])
    },[])

    // 받아온 List 내부의 form에서 context만 추출
    useEffect(() => {
        let contexts = []
        formList.map((form) => {
            contexts=[...contexts, form.context]
            return contexts
        })
        setContextList(contexts)

    }, [formList])
    

    // 유저가 선택한 자격증 종류 핸들링
    function contextSelect (e) { 

        
        // 필터링하여 theForm에 넣어주기
        const theContext = e.target.value
        const form = formList.filter((form) => {
            return theContext === form.context
        })
        setTheForm(...form)
        
        // context 이름 넣어주기
        const issueVc = issueVcs
        issueVc[0].vc.context = e.target.value
        setIssueVcs(issueVc)
    }
    
    // 선택한 자격증에 따라 input 생성
    function makeInput() {

        // 선택된 값이 없으면 작동 정지, 빈값 반환
        if (theForm === undefined) {
            return <Empty />
        } 
        // 디폴트값 아니면 input뿌려주기
        const formSubject = theForm.credentialSubject
        const inputs = []
        for (let i in formSubject){
            inputs.push(
                <div className={`issuerI_row${widthHandle}`} key={i}>
                    <div className={`issuerI_tag${widthHandle}`}>{i}{(formSubject[i] === "1") ? <span style={{color: "red"}}> *</span> : ""}</div>
                    <input className={`issuerI_input${widthHandle}`} id={i} onChange={inPutChange}></input>
                </div>
            )
        }
        return inputs   



    }
    
    // 사용자 입력값따라 body 작성
    function inPutChange(e) {
        const issueVc = issueVcs
        const id = e.target.id
        issueVc[0].vc.CredentialSubject[`${id}`] = e.target.value
        setIssueVcs(issueVc)
    }

    // BE 제출
    function submit() {
        axios({
            url: `/issuer/issue`,
            method: "POST",
            data: issueVcs,
        })
        .then((res) => {
            message.success("양식생성 성공");
            navigate("/issuer")
        })
        .catch(() => {
            message.error("양식생성 실패");
        });
    }

    const subtitle = "발급 대상자에게 인증서를 발급할 수 있습니다."

    return(
        <div className="issuerI_bg">
            {Headline(issuerI_headline, 700, subtitle, 9999)}
            <div className="issuerI_form_bg">
                <div className="issuerI_form_outterBox">
                    <div className="issuerI_form_innerBox">
                        <div className="issuerI_title">
                            <p style={{lineHeight: "60px"}}>인증서 기재정보 입력</p>
                            <p style={{fontSize: "14px", lineHeight: "60px"}}><span style={{color: "red"}}>*</span>필수 입력항목</p>
                        </div>
                        <div className={`issuerI_row${widthHandle}`}>
                            <div className={`issuerI_tag${widthHandle}`}>자격증이름<span style={{color: "red"}}> *</span></div>
                            <select
                            onChange={contextSelect}
                            className={`issuerI_input${widthHandle}`}
                            >   
                                <option>인증서를 선택해주세요.</option>
                                {contextList.map((context) => {
                                    return <option key={context}>{context}</option>;
                                })}
                            </select>
                        </div>
                        <hr />
                        <div>{makeInput()}</div>
                        <hr />
                        <div className="issuerI_submitBox">
                            <button className="issuerI_submitBtn" onClick={submit}>인증서 생성하기</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
function mapStateToProps(state) {
    return {userIdInStore: state._id}
}
function mapDispatchToProps(dispatch) {
    return {
        SignInToStore: (userObj) => dispatch(actionCreators.SignIn(userObj))
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (IssuerIssue)