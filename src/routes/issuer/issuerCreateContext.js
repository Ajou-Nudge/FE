import { message } from "antd";
import { useState } from "react"
import axios from "axios";
import { Link } from "react-router-dom";

function IssuerCreateContext() {

    const [context, setContext] = useState([])
    const [inputCount, setInputCount] = useState(3)
    function handleInputCount(e) {
        setInputCount(e.target.value)
    }
    let rawContext = {}

    // 받아온 inputCount만큼 input 생성
    function makeInput() {
        rawContext = {}
        const inputs = []
        for (let i=0; i < inputCount; i++){
            inputs.push(
                <div style={{display:"flex"}} key={i} id={i}>
                    <input value={rawContext[`value${i}`]} onChange={handleValue} key={`value${i}`} type="text"></input>
                    <div>필수여부</div>
                    <input value={rawContext[`isEssential${i}`]} onChange={handleCheck} key={`isEssential${i}`} type="checkbox"></input>
                </div>
            )
            // rawContext[i]=[]
        }
        return inputs
        
    }

    // input에 받아온 값 각각 rawContext에 넣기
    function handleValue(e) {
        rawContext[`value${e.target.parentElement.id}`] = e.target.value
    }
    function handleCheck(e) {
        const isEssentialNum = e.target.checked ? "1" : "0"
        rawContext[`isEssential${e.target.parentElement.id}`] = isEssentialNum
    }

    // rawContext가공하여 Context 생성
    function submit() {
        let credentialSubject = {}
        for (let i=0; i < inputCount; i++){
            let value = rawContext[`value${i}`]
            let isEssential = rawContext[`isEssential${i}`]
            const aCredentialSubject =   {[value] : isEssential}
            credentialSubject = {...credentialSubject, ...aCredentialSubject}
        }
        const Context = {
            context,
            credentialSubject
        }
        
        return sendingRequest(Context)
    }
    
    // BE에 Request 보내기
    function sendingRequest(Context) {
        console.log(Context)
        axios({
            url: `/issuer/create`,
            method: "POST",
            data: {
              ...Context
            },
        })
            .then((res) => {
                messageInfo("양식생성 성공");
            })
            .catch(() => {
                messageError("양식생성 실패");
            });
    }

    const messageInfo = (msg) => {
        message.success(msg);
    };

    const messageError = (msg) => {
        message.error(msg);
    };

    return(
        <div>
            <h1>IssuerCreateContext</h1>
            <div>자격증이름</div>
            <input value={context} onChange={(event) => { setContext(event.target.value) }}></input>
            <div>자격증 기재 정보 개수</div>
            <input type={"number"} value={inputCount} onChange={handleInputCount}></input>
            <hr />
            <div>{makeInput()}</div>
            <hr />
            <button onClick={submit}>양식 생성하기</button>
            <Link to="/issuer">
                <button>홈으로</button>
            </Link>
        </div>      
    )
}

export default IssuerCreateContext