import { Link } from "react-router-dom";
import { Button, Table } from "antd";
import { useState, useEffect } from "react";
import Headline from "../../component/headline";
import holderPL_headline from "../../img/headline/holderPL_headline.png"
import "./css/holderPostingList.css"

import { useNavigate } from "react-router-dom";
import { message } from "antd";
import axios from "axios";

// import DummyPostingList from "../../dummy/dummyPostingList";

function HolderPostingList() {
    const [postingList, setPostingList] = useState([])
    
    // useEffect(() => {
    //     setPostingList(DummyPostingList)
    // },[])
    
    
    const navigate = useNavigate()
    // BE에서 posting 가져오기
    useEffect(() => {
        axios({
            url: `http://localhost:8080/holder/post-list`,
            method: "GET",
            withCredentials: true,
        })
        .then((res) => {
            setPostingList(res.data)
            console.log(res)
        })
        .catch(() => {
            messageError("채용공고 목록 가져오기 실패");
            navigate("/holder")
        });
    }, [navigate])
    function messageError(msg) {
        message.error(msg);
    };


    function makePostingList() {
        
        const lengthCounter = postingList.length
        const PLdata = []
        for (let i=0; i < lengthCounter; i++) {
            PLdata.push({
                key: postingList[i].id,
                num: i+1,
                verifierId: postingList[i].verifierId,
                detail: 
                    <div>
                        제목: {postingList[i].title}<br />
                        요구사항: {postingList[i].required}<br />
                        모집기간: {postingList[i].expired}<br />
                        세부사항: <Link to={postingList[i].url}>{postingList[i].url}</Link>
                    </div>,
                link: 
                    <Link 
                        key={i} 
                        to={`/holder/submit/${postingList[i].id}`}
                        state={{
                            title: postingList[i].title,
                            id: postingList[i].id,
                            verifierId: postingList[i].verifierId,
                            required: postingList[i].required,
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
                dataIndex: "verifierId",
                key: "verifierId",
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

    const subtitle = "여러분의 증명, 인증서를 제출 할 수 있습니다. 키워드를 입력하여 검색해보세요."

    return(
        <div className="holderPL_bg">
            {Headline( holderPL_headline, 300, subtitle, 870 )}
            <div className="holderPL_PLbox">
                {makePostingList()}
            </div>
        </div>
    )
}

export default HolderPostingList