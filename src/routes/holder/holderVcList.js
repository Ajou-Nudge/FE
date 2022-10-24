import { connect } from "react-redux"
import { useState, useEffect } from "react";
import DummyVcList from "../../dummy/dummyVcList";
import { Button, Table, Input } from "antd";

// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { message } from "antd";

import "./css/holderVcList.css"

function HolderVcList(userIdInStore) {

    //const navigate = useNavigate()
    const [vcList, setVcList] = useState([])
    useEffect( () => {
        setVcList(DummyVcList)
    }, [] )



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

    // 받아온 vc 개수만큼 화면에 뿌려주기
    function makeVcList() {
        // 받아온 vc들 리스트로 뿌려주는 코드
        // const lengthCounter = vcList.length
        // const List = []
        // for (let i=0; i < lengthCounter; i++){
        //     List.push(
        //         <Link
        //             key={i} 
        //             to={`/holder/vcDetail/:${i}`}
        //             state={
        //                 vcList[i]
        //             }
        //         >
        //             <li key={i}>
        //                 {vcList[i].context}, {vcList[i].credentialSubject.title}
        //             </li>
        //         </Link>
        //     )
        // }
        // return List

        const lengthCounter = vcList.length
        const data = []
        for (let i=0; i < lengthCounter; i++) {
            data.push({
                key: i,
                num: i+1,
                title: vcList[i].credentialSubject.title,
                date: vcList[i].credentialSubject.date,
                issuer: vcList[i].issuer,
            })
        }

        const columns = [
            {
                title: "번호",
                dataIndex: "num",
                key: "num",
            },
            {
                title: "발급일자",
                dataIndex: "date",
                key: "date",
            },
            {
                title: "조회 인증서",
                dataIndex: "title",
                key: "title",
            },
            {
                title: "발급자",
                dataIndex: "issuer",
                key: "issuer",
            }
        ]

        return <Table columns={columns} dataSource={data} />
        
    }

    return(
        <div className="holderVL_bg">
            <div className="holderVL_headLineBox">
                <div className="holderVL_headLine">내지갑{">"} <span style={{color: "#0bb38e"}}>인증서 관리</span></div>
            </div>
            <div className="holderVL_searchBox">
                <p style={{maxWidth: '35vw'}}>
                    여러분의 증명, 인증서를 확인 및 다운로드 할 수 있습니다.
                    키워드를 입력하여 검색해보세요.
                </p>
                <p>
                    <Input className="holderVL_search"/>
                    <button className="holderVL_searchBtn">검색</button>
                </p>
            </div>
            <div className="holderVL_vcBox">
                {makeVcList()}
            </div>
            <div className="holderVL_btnBox">                
                <div style={{float: 'left'}}><Button className="holderVL_btn">삭제하기</Button></div>
                <div style={{float: 'left'}} />
                <div style={{float: 'right'}}><Button className="holderVL_btn">등록하기</Button></div>             
            </div>
        </div>
    )
}

function mapStateToProps(state) {
    return {userIdInStore: state._id}
}
export default connect(mapStateToProps, null) (HolderVcList)