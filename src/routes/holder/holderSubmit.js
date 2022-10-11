import { connect } from "react-redux"
import {useLocation} from "react-router-dom";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { message } from "antd";
// import DummyVcList from "../../dummy/dummyVcList";

function HolderSubmit( userIdInStore ) {
    const location = useLocation()
    const posting = location.state

    const [vcList, setVcList] = useState([])

    // store.js에서 id 가져와 BE에 요청보내기
    useEffect(() => {
        axios({
            url: `/holder/vc-list/:${userIdInStore}`,
            method: "GET",
            withCredentials: true,
        })
        .then((res) => {
            setVcList(res)
        })
        .catch(() => {
            messageError("자격증 가져오기 실패");
            Navigate("/holder")
        });
    })
    function messageError(msg) {
        message.error(msg);
    };

    // // 더미 데이터 주입
    // useEffect( () => {
    //     setVcList(DummyVcList)
    // }, [] )

    function makePostingDetail() {
        const List = []
        for (let key in posting) {
            List.push(<li key={key}>{key} : {posting[key]}</li>)
        }
        return List      
    }

    // 사용자의 vcList에서 요구 vc 추출
    function onClick(){
        let targetVc = []
        const requirement = posting.requirement
        targetVc = vcList.filter((vc) => {
            return vc.context === `${requirement}`
        })


    // if 구문으로 추출된 vc 있는지 확인, 이후 제출
        if (targetVc.length === 0) {
            axios({
                url: `/holder/submit`,
                method: "POST",
                data: {
                    postId: posting["postId"],
                    vc: targetVc
                },
                withCredentials: true,
            })
            .then((res) => {
                message.success("자격증 제출 성공")
                Navigate("/holder/postingList")
            })
            .catch(() => {
                messageError("자격증 제출 실패"); 
            })
        } else message.error("요구 증명서가 없습니다.")
        
    }

    return (
        <div>
            <h1>HolderSubmit</h1>
            <hr />
            <ul>{makePostingDetail()}</ul>
            <hr />
            <button onClick={onClick}>요구 증명서 제출</button>
            <Link to="/holder/postingList">
                <button>리스트로</button>
            </Link>
        </div>
    )
}

function mapStateToProps(state) {
    return {userIdInStore: state._id}
}
export default connect(mapStateToProps, null) (HolderSubmit)