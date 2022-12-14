import { connect } from "react-redux"
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { message, Form, Input, Radio, Modal } from "antd";
import "./css/holderSubmit.css"
import Headline from "../../component/headline"
import makeVcListModal from "./component/makeVcListModal"
import holderS_headline from "../../img/headline/holderS_headline.png"


// import DummyVcList from "../../dummy/dummyVcList";

function HolderSubmit( userObjInStore ) {

    const location = useLocation()
    const posting = location.state
    const navigate = useNavigate()
    const [vcList, setVcList] = useState([])
    const [modalOpen, setModalOpen] = useState(false)
    const [vcIds, setVcIds] = useState([1])

    // store.js에서 id 가져와 BE에 요청보내기
    useEffect(() => {
        axios({
            url: `http://localhost:8080/holder/vc-list/${userObjInStore.memberId}`,
            method: "GET",
            withCredentials: true,
        })
        .then((res) => {
            setVcList(res)
        })
        .catch(() => {
            messageError("자격증 가져오기 실패");
            navigate("/holder")
        });
    }, [navigate, userObjInStore.memberId])
    function messageError(msg) {
        message.error(msg);
    };

    // // 더미 데이터 주입
    // useEffect( () => {
    //     setVcList(DummyVcList)
    // }, [] )

    // 사용자의 vcList에서 요구 vcId 추출
    function onClick(){
        let targetVc = [ "default" ]
        // const vcIdsBuffer = []
        // // post에서 요구하는 vc만 추출
        // targetVc = vcList.filter((vc) => {
        //     return vc.context === `${posting.requirement}`
        // })

        // // vc에서 id 추출
        // targetVc.map((vc) => {
        //     return vcIdsBuffer.push(vc.id)
        // })

        // // set 데이터타입으로 중복선택 제거
        // const set = new Set(vcIdsBuffer)

        // // 버퍼에 추출된 id 넣기
        // setVcIds([...set])


        // verifier가 하나이상의 증명서를 요구할 경우 ,if 구문으로 추출된 vc 있는지 확인, 이후 제출
        if (targetVc.length !== 0 || posting.requirement.length === 0) {
            axios({
                url: `http://localhost:8080/holder/submitted-vc`,
                method: "POST",
                data: {
                    postId: posting["id"],
                    holder: userObjInStore.memberId,
                    vcIds: vcIds
                },
                withCredentials: true,
            })
            .then((res) => {
                message.success("자격증 제출 성공")
                navigate("/holder/postingList")
            })
            .catch((err) => {
                console.log(err)
                messageError("자격증 제출 실패"); 
            })
        } else message.error("요구 증명서가 없습니다.")
        
    }

    function onCancle() {
        setModalOpen(false)
    }

    function onModal() {
        setModalOpen(true)
    }

    return (
        <div>
            {Headline( holderS_headline, 600, "", 9999)}
            <div style={{ width: "100%"}}>
                <div className="holderS_formBox">
                    <Form>
                        <p className="holderS_wordBoxTitle">기업의 핵심역량을 채용합니다.</p>
                        <p className="holderS_wordBox">
                            기업의 핵심역량을 채용합니다.기업의 핵심역량을 채용합니다.기업의 핵심역량을 채용합니다.<br />
                            기업의 핵심역량을 채용합니다.기업의 핵심역량을 채용합니다.기업의 핵심역량을 채용합니다.
                            기업의 핵심역량을 채용합니다.기업의 핵심역량을 채용합니다.기업의 핵심역량을 채용합니다.
                            기업의 핵심역량을 채용합니다.기업의 핵심역량을 채용합니다.기업의 핵심역량을 채용합니다.
                            기업의 핵심역량을 채용합니다.기업의 핵심역량을 채용합니다.기업의 핵심역량을 채용합니다.
                            기업의 핵심역량을 채용합니다.기업의 핵심역량을 채용합니다.기업의 핵심역량을 채용합니다.
                            기업의 핵심역량을 채용합니다.기업의 핵심역량을 채용합니다.기업의 핵심역량을 채용합니다.
                            기업의 핵심역량을 채용합니다.기업의 핵심역량을 채용합니다.기업의 핵심역량을 채용합니다.
                            기업의 핵심역량을 채용합니다.기업의 핵심역량을 채용합니다.기업의 핵심역량을 채용합니다.<br />
                            기업의 핵심역량을 채용합니다.기업의 핵심역량을 채용합니다.기업의 핵심역량을 채용합니다.
                            기업의 핵심역량을 채용합니다.기업의 핵심역량을 채용합니다.기업의 핵심역량을 채용합니다.
                            기업의 핵심역량을 채용합니다.기업의 핵심역량을 채용합니다.기업의 핵심역량을 채용합니다.
                            기업의 핵심역량을 채용합니다.기업의 핵심역량을 채용합니다.기업의 핵심역량을 채용합니다.
                            기업의 핵심역량을 채용합니다.기업의 핵심역량을 채용합니다.기업의 핵심역량을 채용합니다.<br />
                            기업의 핵심역량을 채용합니다.기업의 핵심역량을 채용합니다.기업의 핵심역량을 채용합니다.
                            기업의 핵심역량을 채용합니다.기업의 핵심역량을 채용합니다.기업의 핵심역량을 채용합니다.
                            기업의 핵심역량을 채용합니다.기업의 핵심역량을 채용합니다.기업의 핵심역량을 채용합니다.
                            기업의 핵심역량을 채용합니다.기업의 핵심역량을 채용합니다.기업의 핵심역량을 채용합니다.
                            기업의 핵심역량을 채용합니다.기업의 핵심역량을 채용합니다.기업의 핵심역량을 채용합니다.
                            기업의 핵심역량을 채용합니다.기업의 핵심역량을 채용합니다.기업의 핵심역량을 채용합니다.
                        </p>
                        <div className="holderS_formTitle">
                            <span>기본정보</span>
                            <span style={{fontSize: 18}}>
                                <span style={{color: "red"}}>*</span>
                                필수 입력항목
                            </span>
                        </div>
                        <hr />
                        <dl className="holderS_formInputBox">
                            <dt style={{width: "20%", fontWeight: "550", fontSize: "18px"}}>지원자</dt>
                            <dd style={{width: "80%", display: "flex"}}>
                                <div style={{width: "70%"}}>
                                    <div className="holderS_formInput">
                                        <div className="holderS_formInputTag"><span style={{color: "red"}}>*</span>이름</div>
                                        <Input className="holderS_inputStyle" />
                                    </div>
                                    <div className="holderS_formInput">
                                        <div className="holderS_formInputTag"><span style={{color: "red"}}>*</span>영문이름</div>
                                        <Input className="holderS_inputStyle" />
                                    </div>
                                    <div className="holderS_formInput">
                                        <div className="holderS_formInputTag"><span style={{color: "red"}}>*</span>생년월일</div>
                                        <Input className="holderS_inputStyle" type="date" />
                                    </div>
                                    <div className="holderS_formInput">
                                        <div className="holderS_formInputTag"><span style={{color: "red"}}>*</span>성별</div>
                                        <Radio.Group>
                                            <Radio value={"male"}>남자</Radio>
                                            <Radio value={"female"}>여자</Radio>
                                        </Radio.Group>
                                    </div>
                                    <div className="holderS_formInput">
                                        <div className="holderS_formInputTag"><span style={{color: "red"}}>*</span>증명사진</div>
                                        <input style={{display: "none"}} type="file" id="fileInput" />
                                        <label className="holderS_fileInputBtn" htmlFor="fileInput">찾아보기</label>
                                    </div>
                                </div>
                                <div style={{width: "30%"}}>
                                    지원자 사진
                                </div>
                            </dd>
                        </dl>
                        <dl className="holderS_formInputBox">
                            <dt style={{width: "20%", fontWeight: "550", fontSize: "18px", margin:"auto 0"}}>요구자격증</dt>
                            <dd style={{width: "80%", display: "flex", justifyContent: "space-between", alignItems:"center"}}>
                                <div style={{width: "70%"}}>
                                    <div className="holderS_formInput" style={{marginBottom:"0"}}>
                                        <div className="holderS_formInputTag"><span style={{color: "red"}}>*</span>{(posting.requirement !== undefined) ? posting.requirement : "자율"}</div>
                                        <button className="holderS_fileInputBtn" onClick={onModal}>수동선택</button>
                                    </div>
                                </div>
                                <div style={{maxWidth: "30%", color: "#818181"}}>
                                    {(posting.requirement === undefined) ? "" : "*보유한 자격증은 자동으로 검색되어 제출됩니다."}
                                </div>
                            </dd>
                        </dl>
                    </Form>
                </div>
            </div>
            <div className="holderS_btnBox">
                <Link to="/holder/postingList">
                    <button className="holderS_homeBtn">리스트로</button>
                </Link>
                <button className="holderS_submitBtn" onClick={onClick}>요구 증명서 제출</button>
            </div>
            <Modal open={modalOpen} onCancel={onCancle} title={"자격증 수동선택"}>
                {makeVcListModal(vcList, vcIds, setVcIds)}
            </Modal>
        </div>
    )
}

function mapStateToProps(state) {
    return {memberId: state.memberId}
}
export default connect(mapStateToProps, null) (HolderSubmit)