import { Link } from "react-router-dom";
import { Button, Input, Table } from "antd";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { message } from "antd";
import { useState, useEffect } from "react";
import DummyPostingList from "../../dummy/dummyPostingList";
import "./css/holderPostingList.css"


function HolderPostingList() {
    //const navigate = useNavigate()
    const [postingList, setPostingList] = useState([])
    useEffect(() => {
        setPostingList(DummyPostingList)
    },[])

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
    //         navigate("/holder")
    //     });
    // })
    // function messageError(msg) {
    //     message.error(msg);
    // };


    function makePostingList() {
        
        const lengthCounter = postingList.length
        const PLdata = []
        for (let i=0; i < lengthCounter; i++) {
            PLdata.push({
                key: postingList[i].postId,
                num: i+1,
                verifier: postingList[i].verifier,
                detail: 
                    <div>
                        요구사항: {postingList[i].requirement}<br />
                        모집기간: {postingList[i].expired}<br />
                        세부사항: <Link to={postingList[i].url}>{postingList[i].url}</Link>
                    </div>,
                link: 
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
                        <Button className="holderPL_btn">지원하기</Button>
                    </Link>
            })
        }

        const columns = [
            {
                title: "번호",
                dataIndex: "num",
                key: "num",
            },
            {
                title: "채용기관",
                dataIndex: "verifier",
                key: "verifier",
            },
            {
                title: "채용정보",
                dataIndex: "detail",
                key: "detail",
            },
            // {
            //     title: "지원여부",
            //     dataIndex: null,
            //     key: "issuer",
            // },
            {
                title: "지원여부",
                dataIndex: "link",
                key: "link",
            }
        ]

        return <Table pagination={{position: ["bottomCenter"]}} className="holderPL_PLtext" columns={columns} dataSource={PLdata} />
    }

    return(
        <div className="holderPL_bg">
            <div className="holderPL_headLineBox">
                <div className="holderPL_headLine"><span style={{color: "#0bb38e"}}>입사지원</span></div>
            </div>
            <div className="holderPL_searchBox">
                <p style={{maxWidth: '35vw'}}>
                    여러분의 증명, 인증서를 제출 할 수 있습니다.
                    키워드를 입력하여 검색해보세요.
                </p>
                <p>
                    <Input className="holderPL_search"/>
                    <button className="holderPL_searchBtn">검색</button>
                </p>
            </div>
            <div className="holderPL_PLbox">
                {makePostingList()}
            </div>
        </div>
    )
}

export default HolderPostingList