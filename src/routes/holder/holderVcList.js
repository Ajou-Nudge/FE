import { connect } from "react-redux"
import { useState, useEffect } from "react";
import DummyVcList from "../../dummy/dummyVcList";
import { Link } from "react-router-dom";
//import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { message } from "antd";

function HolderVcList(userIdInStore) {

    //const navigate = useNavigate()
    const [vcList, setVcList] = useState([])

    // store.js에서 id 가져와 BE에 요청보내기
    // useEffect(() => {
    //     axios({
    //         url: `/holder/vc-list/:${userIdInStore}`,
    //         method: "GET",
    //         withCredentials: true,
    //     })
    //     .then((res) => {
    //         setVcList(res)
    //     })
    //     .catch(() => {
    //         messageError("자격증 가져오기 실패");
    //         navigate("/holder")
    //     });
    // })
    // function messageError(msg) {
    //     message.error(msg);
    // };

    // 더미데이터 주입
    useEffect( () => {
        setVcList(DummyVcList)
    }, [] )

    // 받아온 vc 개수만큼 화면에 뿌려주기
    function makeVcList() {
        const lengthCounter = vcList.length
        const List = []
        for (let i=0; i < lengthCounter; i++){
            List.push(
                <Link
                    key={i} 
                    to={`/holder/vcDetail/:${i}`}
                    state={
                        vcList[i]
                    }
                >
                    <li key={i}>
                        {vcList[i].context}, {vcList[i].credentialSubject.title}
                    </li>
                </Link>
            )
        }
        return List
        
    }

    return(
        <div>
            <h1>HolderVcList</h1>
            <hr />
            <ul>{makeVcList()}</ul>
            <hr />
            <Link to="/holder">
                <button>홈으로</button>
            </Link>
        </div>
    )
}

function mapStateToProps(state) {
    return {userIdInStore: state._id}
}
export default connect(mapStateToProps, null) (HolderVcList)