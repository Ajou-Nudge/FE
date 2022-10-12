import { connect } from "react-redux";
import { Link } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { message } from "antd";
import { useState, useEffect } from "react";
import DummyVerifierPostingList from "../../dummy/dummyVerifierPostingList";



function VerifierPostingList(userIdInStore) {

    // const navigate = useNavigate()
    const [postingList, setPostingList] = useState([])

    // BE에서 내 posting 가져오기
    // useEffect(() => {
    //     axios({
    //         url: `/verifier/postList/:${userIdInStore}`,
    //         method: "GET",
    //         withCredentials: true,
    //     })
    //     .then((res) => {
    //         setPostingList(res)
    //     })
    //     .catch(() => {
    //         messageError("목록 가져오기 실패");
    //         navigate("/verifier")
    //     });
    // })
    // function messageError(msg) {
    //     message.error(msg);
    // };

    useEffect(() => {
        setPostingList(DummyVerifierPostingList)
    },[])

    function makePostingList() {
        const lengthCounter = postingList.length
        const List = []
        for (let i=0; i < lengthCounter; i++){
            List.push(
                <Link 
                    key={i} 
                    to={`/verifier/verifiy/:${postingList[i].postId}`}
                    state={{
                        postId: postingList[i].postId,
                        name: postingList[i].name,
                    }}

                >
                    <li key={i}>{JSON.stringify(postingList[i].name)}의 지원자 검증</li>
                </Link>
            )
        }
        return List
        
    }

    return(
        <div>
            <h1>VerifierPostingList</h1>
            <hr />
            <ul>{makePostingList()}</ul>
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

export default connect(mapStateToProps, null) (VerifierPostingList)