
import { connect } from "react-redux";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom"
import DummySubmittedList from "../../dummy/dummySubmittedList";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { message } from "antd";

function HolderSubmittedList({userIdInStore}) {

    const [ vcList, setVcList ] = useState([])
    // const navigate = useNavigate()

    // useEffect(() => {
    //     // redux에 저장되어있는 issuer 아이디로 발행된 vc 요청
    //     axios({
    //         url: `/holder/submit-list/:${userIdInStore}`,
    //         method: "GET",
    //         withCredentials: true,
    //     })
    //     // setVcList에 저장
    //     .then((res) => {
    //         setVcList(res)
    //     })
    //     // 오류핸들링
    //     .catch(() => {
    //         message.error("제출 이력 가져오기 실패");
    //         navigate("/issuer")
    //     });
    // }, [navigate, userIdInStore])

    useEffect(() => {
        setVcList(DummySubmittedList)
    }, [])
    
    function makeVcList() {
        const lengthCounter = vcList.length
        const List = []
        for (let i=0; i < lengthCounter; i++){
            List.push(
                // <Link
                //     key={i} 
                //     state={
                //         vcList[i]
                //     }
                // >
                    <li key={i}>
                        {vcList[i].title}  제출일: {vcList[i].date}  제출상태: {vcList[i].status}
                    </li>
                // </Link>
            )
        }
        return List
        
    }
    
    return(
        <div>
            <h1>IssuerVcList</h1>
            <hr />
            <ul>{makeVcList()}</ul>
            <hr />
            <Link to={'/holder'}>
                <button>홈으로</button>
            </Link>
        </div>
    )
}

function mapStateToProps(state) {
    return {userIdInStore: state._id}
}

export default connect(mapStateToProps, null) (HolderSubmittedList)