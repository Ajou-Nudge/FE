import { useLocation, Link } from "react-router-dom";
import { connect } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { message } from "antd";
import { useState, useEffect } from "react";
import DummyVcList from "../../dummy/dummyVcList";

function VerifierVerifiy(userIdInStore) {

    // const navigate = useNavigate()
    const location = useLocation()
    const posting = location.state
    const [vcList, setVcList] = useState([])
    console.log(posting)

    // // BE에서 제출된 vc 리스트 가져오기
    // useEffect(() => {
    //     axios({
    //         url: `/verifier/submit-list//:${userIdInStore}/:${posting.postId}`,
    //         method: "GET",
    //         withCredentials: true,
    //     })
    //     .then((res) => {
    //         setVcList(res)
    //     })
    //     .catch(() => {
    //         messageError("검증목록 가져오기 실패");
    //         navigate("/verifier/postingList")
    //     });
    // })
    // function messageError(msg) {
    //     message.error(msg);
    // };

    // 더미 vc가져오기
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
                        지원번호: {i+1}번 {vcList[i].credentialSubject.name} {vcList[i].context}
                    </li>
                </Link>
            )
        }
        return List
        
    }

    function onClick() {
        console.log(
            {
                url: `/verifier/verify`,
                method: "POST",
                data: vcList,
                withCredentials: true,
            }
        )
        // axios({
        //     url: `/verifier/verify`,
        //     method: "POST",
        //     data: vcList,
        //     withCredentials: true,
        // })
        // .then((res) => {
        //     setVcList(res)
        // })
        // .catch(() => {
        //     messageError("검증 실패");
        //     navigate("/verifier/postingList")
        // });

    }

    return(
        <div>
            <h1>VerifierVerifiy</h1>
            <hr />
            <ul>{makeVcList()}</ul>
            <hr />
            <button onClick={onClick}>검증</button>
        </div>
    )
}

function mapStateToProps(state) {
    return {userIdInStore: state._id}
}

export default connect(mapStateToProps, null) (VerifierVerifiy)