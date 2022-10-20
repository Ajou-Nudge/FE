import { connect } from "react-redux";
import { useState, useEffect } from "react";
import DummyVcList from "../../dummy/dummyVcList";
import { Link } from "react-router-dom"
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { message } from "antd";

function IssuerVcList({userIdInStore}) {

    const [ vcList, setVcList ] = useState([])
    // const navigate = useNavigate()

    // useEffect(() => {
    //     // redux에 저장되어있는 issuer 아이디로 발행된 vc 요청
    //     axios({
    //         url: `/issuer/vc-list/:${userIdInStore}`,
    //         method: "GET",
    //         withCredentials: true,
    //     })
    //     // setVcList에 저장
    //     .then((res) => {
    //         setVcList(res)
    //     })
    //     // 오류핸들링
    //     .catch(() => {
    //         message.error("자격증 가져오기 실패");
    //         navigate("/issuer")
    //     });
    // }, [navigate, userIdInStore])

    useEffect(() => {
        setVcList(DummyVcList)
    }, [])
    
    function makeVcList() {
        const lengthCounter = vcList.length
        const List = []
        for (let i=0; i < lengthCounter; i++){
            List.push(
                <Link
                    key={i} 
                    to={`/verifier/verifiy/detail/:${i}`}
                    state={
                        vcList[i]
                    }
                >
                    <li key={i}>
                        발행번호: {i+1}번 {vcList[i].credentialSubject.name} {vcList[i].context}
                    </li>
                </Link>
            )
        }
        return List
        
    }
    
    return(
        <div>
            <h1>IssuerVcList</h1>
            <hr />
            <ul>{makeVcList()}</ul>
        </div>
    )
}

function mapStateToProps(state) {
    return {userIdInStore: state._id}
}

export default connect(mapStateToProps, null) (IssuerVcList)