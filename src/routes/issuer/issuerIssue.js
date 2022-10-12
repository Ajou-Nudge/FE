import { connect } from "react-redux";
import { actionCreators } from "../../component/store";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { message } from "antd";
//import DummyContextList from "../../dummy/dummyContextList";


function IssuerIssue(userIdInStore) {

    // contextList는 받아온 formList에서 context만 추출한 것
    const [ formList, setFormList ] = useState([])
    const [ contextList, setContextList ] = useState([])
    const [ theForm, setTheForm ] = useState({})
    const [ issueVcs, setIssueVcs ] = useState([])
    const navigate = useNavigate()
    

    // 서버에서 issuer의 context정보 불러오기
    useEffect(() => {
        axios({
            url: `/issuer/context-list/:${userIdInStore}`,
            method: "GET",
            withCredentials: true,
        })
        .then((res) => {
            setFormList(res)
        })
        .catch(() => {
            message.error("자격증 양식 가져오기 실패");
            navigate("/issuer")
        });
    }, [navigate, userIdInStore])

    // useEffect(() => {
    //     const Dummy = DummyContextList
    //     setFormList([...Dummy])
    // },[])

    // 받아온 List 내부의 form에서 context만 추출
    useEffect(() => {
        
        let contexts = []
        formList.map((form) => {
            contexts=[...contexts, form.context]
            return contexts
        })
        setContextList(contexts)

    }, [formList])
    

    function contextSelect (e) { 
        const theContext = e.target.value
        const form = formList.filter((form) => {
            return theContext === form.context
        })
        setTheForm(...form)
        
    }

    function makeInput() {
        const formSubject = theForm.credentialSubject
        const inputs = []
        for (let i in formSubject){
            inputs.push(
                <div key={i}>
                    <div>{i}{(formSubject[i] === "1") ? "(필수)" : ""}</div>
                    <input id={i} onChange={inPutChange}></input>
                </div>
            )
        }
        return inputs   
    }

    // BE에 요청보낼 body 초기값 생성
    useEffect(() => {
        const issueVc = [{
            holderId: "1",
            vc: {
                context: theForm.context,
                issuer: userIdInStore,
                CredentialSubject:{}
            }
        }]
        setIssueVcs(issueVc)
    },[ theForm.context, userIdInStore ])
    
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

    return(
        <div>
            <h1>IssuerIssue</h1>
            <select
            style={{ width: "50%", height: "100%" }}
            onChange={contextSelect}
            >   
                <option>인증서를 선택해주세요.</option>
                {contextList.map((context) => {
                    return <option key={context}>{context}</option>;
                })}
            </select>
            <hr />
            <div>{makeInput()}</div>
            <hr />
            <button onClick={submit}>증명서생성</button>
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