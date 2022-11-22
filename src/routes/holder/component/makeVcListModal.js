import { Table } from "antd"

// 받아온 vc 개수만큼 화면에 뿌려주기
function MakeVcListModal(vcList, vcIds, setVcIds) {
    
    function onChange(e) {
        let buffer = vcIds
        console.log(e)
        if (e.target.checked === true) {
            buffer.push(vcList.id)
            return setVcIds(buffer)
        } else if (e.target.checked === false) {
            buffer.filter(vcId => vcId !== vcList.id)
            return setVcIds(buffer)
        } else {
            return console.log("vcId filtering err in modal vc list")
        }

    }


    const data = []
    // title, date는 필수적으로 있을 것이라 가정하고 진행
    for (let i=0; i < vcList.length; i++) {
        data.push({
            key: i,
            num: i+1,
            title: vcList[i].credentialSubject.title,
            date: vcList[i].credentialSubject.date,
            issuer: vcList[i].issuer,
            // pdf 인쇄버튼 란 추가, component로 분리하려했으나, useRef 훅 사용 제약으로 통합하여 진행함.
            check: <input onChange={onChange} type={"checkbox"} />
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
        },
        {
            title: "선택",
            dataIndex: "check",
            key: "check",
        }
    ]

    return <Table pagination={{position: ["bottomCenter"]}} columns={columns} dataSource={data} scroll={{y: 500}}/>
    
}

export default MakeVcListModal