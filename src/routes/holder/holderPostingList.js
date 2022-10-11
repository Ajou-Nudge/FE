import { Link } from "react-router-dom";
// import { Navigate } from "react-router-dom";
// import axios from "axios";
// import { message } from "antd";
import { useState, useEffect } from "react";
import DummyPostingList from "../../dummy/dummyPostingList";


function HolderPostingList() {

    const [postingList, setPostingList] = useState([])

    // // BE에서 posting 가져오기
    // useEffect(() => {
    //     axios({
    //         url: `/holder/posting-list`,
    //         method: "GET",
    //         withCredentials: true,
    //     })
    //     .then((res) => {
    //         setPostingList(res)
    //     })
    //     .catch(() => {
    //         messageError("채용공고 목록 가져오기 실패");
    //         Navigate("/holder")
    //     });
    // })
    // function messageError(msg) {
    //     message.error(msg);
    // };

    useEffect(() => {
        setPostingList(DummyPostingList)
    },[])

    function makePostingList() {
        const lengthCounter = postingList.length
        const List = []
        for (let i=0; i < lengthCounter; i++){
            List.push(
                <Link 
                    key={i} 
                    to={`/holder/submit/:${postingList[i].postId}`}
                    state={{
                        postId: postingList[i].postId,
                        verifier: postingList[i].verifier,
                        requirement: postingList[i].requirement,
                        expired: postingList[i].expired,
                        url: postingList[i].url
                    }}

                >
                    <li key={i}>{JSON.stringify(postingList[i].verifier)}의 채용공고</li>
                </Link>
            )
        }
        return List
        
    }

    return(
        <div>
            <h1>HolderPostingList</h1>
            <hr />
            <ul>{makePostingList()}</ul>
            <hr />
            <Link to="/holder">
                <button>홈으로</button>
            </Link>
        </div>
    )
}

export default HolderPostingList