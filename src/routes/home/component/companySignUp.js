import { message, Select } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import QrCodeModal from "./qrCodeModal";
import * as KlipAPI from "./UseKlip";
import "./css/signUpForm.css"

const { Option } = Select;

const CompanySignUp = () => {
  const [qrvalue, setQrvalue] = useState("DEFAULT");
  const [myAddress, setMyAddress] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const requiredVCList = ["이름", "이메일", "생년월일", "전화번호", "주소"];
  const navigate = useNavigate();
  const [issuerInfo, setIssuerInfo] = useState({
    email: "",
    password: "",
    title: "",
    registNumber: "",
    requiredVC: "",
    desc: "",
    walletAddress: "",
  });
  const [isCorrect, setIsCorrect] = useState(false);
  const onchange = (e) => {
    issuerInfo[e.target.id] = e.target.value;
    setIssuerInfo(issuerInfo);
  };
  const validate = async () => {
    if (issuerInfo.email === "") {
      message.error("이메일을 입력해주세요.");
    } else if (
      !/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/.test(
        issuerInfo.email
      )
    ) {
      message.error("이메일을 주소 형식을 확인해주세요.");
    } else if (issuerInfo.password === "") {
      message.error("비밀번호를 입력해주세요.");
    } else if (
      !/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,20}$/.test(
        issuerInfo.password
      )
    ) {
      message.error("비밀번호를 형식에 맞춰 정확히 입력해주세요.");
    } else if (!isCorrect) {
      message.error("비밀번호 확인이 일치하지 않습니다");
    } else if (!/^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9| |]+$/.test(issuerInfo.title)) {
      message.error("기관명을 정확히 입력해주세요.");
    } else if (issuerInfo.registNumber === "") {
      message.error("사업자 등록번호를 입력해주세요.");
    } else if (issuerInfo.requiredVC.length < 1) {
      message.error("1개 이상의 요구사항을 선택해주세요.");
    } else if (myAddress === "") {
      message.error("KLIP 지갑을 연동해주세요.");
    } else {
      let res = await axios({
        url: `${process.env.REACT_APP_AUTH}/aut/api/v1/register-issuer`,
        method: "POST",
        data: {
          email: issuerInfo.email,
          password: issuerInfo.password,
          title: issuerInfo.title,
          requiredVC: [...issuerInfo.requiredVC],
          // desc: issuerInfo.desc,
        },
        withCredentials: true,
      });

      if (res.status === 200) {
        message.info(res.data);
        navigate("/home");
      }
    }
  };

  const qrModalOpen = () => {
    setModalOpen(true);
    KlipAPI.getAddress(setQrvalue, async (address) => {
      setMyAddress(address);
      setModalOpen(false);
    });
  };

  // requiredVC 변경
  const changeRequiredVC = (e) => {
    setIssuerInfo((prev) => {
      return { ...prev, requiredVC: e };
    });
  };
  return (
    <div>
      <div className="signUpForm_row">
        <p className="signUpForm_tag">
          이메일
        </p>
        <input
          className="signUpForm_input"
          type="text"
          onChange={onchange}
          id="email"
        />
      </div>
      <div className="signUpForm_row">
        <p className="signUpForm_tag">
          비밀번호
        </p>
        <input
          className="signUpForm_input"
          type="password"
          onChange={onchange}
          id="password"
        />
      </div>
      <div className="signUpForm_row">
        <p className="signUpForm_tag">
          비밀번호확인
        </p>
        <input
          className="signUpForm_input"
          type="password"
          onChange={(e) => {
            return e.target.value === issuerInfo.password
              ? setIsCorrect(true)
              : setIsCorrect(false);
          }}
        />
      </div>
      <div className="signUpForm_row">
        <p className="signUpForm_tag">
          기관명
        </p>
        <input
          className="signUpForm_input"
          type="text"
          onChange={onchange}
          id="title"
        />
      </div>
      <div className="signUpForm_row">
        <p className="signUpForm_tag">
          사업자등록번호
        </p>
        <input
          className="signUpForm_input"
          type="text"
          onChange={onchange}
          id="registNumber"
        />
      </div>
      <div className="signUpForm_row">
        <p className="signUpForm_tag">
          필수요구사항
        </p>
        <Select
          className="signUpForm_selectInput"
          mode="tags"
          onChange={changeRequiredVC}
        >
          {requiredVCList.map((e, idx) => {
            return <Option key={e}>{e}</Option>;
          })}
        </Select>
      </div>
      <div className="signUpForm_row">
        <p className="signUpForm_tag">
          기관소개
        </p>
        <input
          className="signUpForm_input"
          type="text"
          onChange={onchange}
          id="desc"
        />
      </div>
      <div className="signUpForm_row">
        <p className="signUpForm_tag">
          <span>KLIP연결</span>
        </p>
        <button
          className="signUpForm_klipBtn"
          onClick={() => {
            qrModalOpen();
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            KLIP
          </div>
        </button>
        <QrCodeModal
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          qrvalue={qrvalue}
          setQrvalue={setQrvalue}
        />
      </div>
      <div className="signUpForm_row">
        <p className="signUpForm_tag">
          지갑주소
        </p>
        <div className="signUpForm_input">
          {myAddress}
        </div>
      </div>
      <div className="signUpForm_submitBox">
        <button 
          onClick={validate}
          className="signUpForm_submitBtn"
        >
          가입 완료
        </button>
      </div>
    </div>
  );
};

export default CompanySignUp;