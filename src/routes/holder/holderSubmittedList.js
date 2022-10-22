
import { connect } from "react-redux";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom"
import DummySubmittedList from "../../dummy/dummySubmittedList";
import { Input } from "antd"
import { CheckCircleOutlined } from '@ant-design/icons';
import "./css/holderSubmittedList.css"
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
    //     const lengthCounter = vcList.length
    //     const List = []
    //     for (let i=0; i < lengthCounter; i++){
    //         List.push(
    //             // <Link
    //             //     key={i} 
    //             //     state={
    //             //         vcList[i]
    //             //     }
    //             // >
    //                 <li key={i}>
    //                     {vcList[i].title}  제출일: {vcList[i].date}  제출상태: {vcList[i].status}
    //                 </li>
    //             // </Link>
    //         )
    //     }
    //     return List
        
        const lengthCounter = vcList.length
        const List = []
        for (let i=0; i < lengthCounter; i++){
            List.push(
                <div key={i} className="holderSVL_SVlist">
                    <div><CheckCircleOutlined className="holderSVL_icon" /></div>
                    <div className="holderSVL_verifierAndDate">
                        <p>{vcList[i].verifier}</p>
                        <p>{vcList[i].date}</p>
                    </div>
                    <div className="holderSVL_titleAndState">
                        <p>{vcList[i].title}</p>
                        <p>{vcList[i].status}</p>
                    </div>
                </div>
            )
        }
        return List
    }
    
    return(
        <div>
            <div className="holderSVL_headLineBox">
                <div className="holderSVL_headLine">내지갑{">"} <span style={{color: "#0bb38e"}}>제출이력</span></div>
            </div>
            <div className="holderSVL_searchBox">
                <p style={{maxWidth: '35vw'}}>
                    여러분의 증명, 인증서 제출이력을 관리할 수 있습니다.
                </p>
                <p>
                    <Input className="holderSVL_search"/>
                    <button className="holderSVL_searchBtn">검색</button>
                </p>
            </div>
            <div className="holderSVL_SVLbox">
            <hr />
            <div>{makeVcList()}</div>
            </div>
            
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