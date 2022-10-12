import { connect } from "react-redux";
import { actionCreators } from "../../component/store";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { message } from "antd";
import DummyContextList from "../../dummy/dummyContextList";


function IssuerIssue(userObjInStore) {

    // contests는 받아온 formList에서 context만 추출한 것, TheContext는 유저가 고른 것.
    const [ formList, setFormList ] = useState([])
    const [ contextList, setContextList ] = useState([])
    const [ theContext, setTheContext ] = useState('')
    const [ theForm, setTheForm ] = useState({})
    const navigate = useNavigate()
    

    // 서버에서 issuer의 context정보 불러오기
    useEffect(() => {
        axios({
            url: `/issuer/context-list/:${userObjInStore}`,
            method: "GET",
            withCredentials: true,
        })
        .then((res) => {
            setFormList(res)
        })
        .catch(() => {
            messageError("자격증 양식 가져오기 실패");
            navigate("/issuer")
        });
    })

    useEffect(() => {
        const Dummy = DummyContextList
        setFormList([...Dummy])
        //console.log(Dummy)
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
    
    function messageError(msg) {
        message.error(msg);
    };

    async function onchange (e) { 
        async function SetTheContext(value){
            setTheContext(value)
        }
        async function SetTheForm(theForm){
            setTheForm(theForm)
        }
        await SetTheContext(e.target.value)  
        await SetTheForm(formList.find((form) => {return form.context === `${theContext}`}))
        
    }


    return(
        <div>
            <h1>IssuerIssue</h1>
            <select
            style={{ width: "50%", height: "100%" }}
            onChange={onchange}
            value={theContext}
            >   
                <option>인증서를 선택해주세요.</option>
                {contextList.map((context) => {
                    return <option key={context}>{context}</option>;
                })}
            </select>
            <h2>{theContext}</h2>
            <h2>{JSON.stringify(theForm)}</h2>
        </div>
    )
}
function mapStateToProps(state) {
    return {userObjInStore: state._id}
}
function mapDispatchToProps(dispatch) {
    return {
        SignInToStore: (userObj) => dispatch(actionCreators.SignIn(userObj))
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (IssuerIssue)