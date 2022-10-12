import { Row, Col, message, DatePicker, Select } from "antd";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import QrCodeModal from "./qrCodeModal";
import * as KlipAPI from "../component/UseKlip";
const { Option } = Select;

const HolderSignUp = () => {
  const [issuers, setIssuers] = useState([]);
  const [qrvalue, setQrvalue] = useState("DEFAULT");
  const [myAddress, setMyAddress] = useState("");
  const [isCorrect, setIsCorrect] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    axios({
      url: `${process.env.REACT_APP_ISSUER}/iss/api/v1/issuer/find/all`,
      method: "GET",
    }).then((data) => {
      setIssuers([...data.data]);
    });
  }, []);

  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
    username: "",
    birth: "",
    IssuerList: [],
  });

  
  const onchange = (e) => {
    userInfo[e.target.id] = e.target.value;
    setUserInfo(userInfo);
  };
  
  const validate = () => {
    if (userInfo.email === "") {
      message.error("이메일을 입력해주세요.");
    } else if (
      !/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/.test(
        userInfo.email
      )
    ) {
      message.error("이메일을 주소 형식을 확인해주세요.");
    } else if (userInfo.password === "") {
      message.error("비밀번호를 입력해주세요.");
    } else if (
      !/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,20}$/.test(
        userInfo.password
      )
    ) {
      message.error("비밀번호를 형식에 맞춰 정확히 입력해주세요.");
    } else if (!isCorrect) {
      message.error("비밀번호 확인이 일치하지 않습니다");
    } else if (!/^[ㄱ-ㅎ|가-힣|a-z|A-Z|]+$/.test(userInfo.username)) {
      message.error("이름을 정확히 입력해주세요.");
    } else if (userInfo.birth === "" || userInfo.birth === null) {
      message.error("생년월일을 선택해주세요.");
    } else if (userInfo.IssuerList.length < 1) {
      message.error("1개 이상의 기관을 선택해주세요.");
    } else if (myAddress === "") {
      message.error("KLIP 지갑을 연동해주세요.");
    } else {
      axios({
        url: `${process.env.REACT_APP_AUTH}/aut/api/v1/register-holder`,
        method: "POST",
        data: {
          email: userInfo.email,
          password: userInfo.password,
          username: userInfo.username,
          birthDay: userInfo.birth,
          IssuerList: userInfo.IssuerList,
        },
        withCredentials: true,
      })
        .then((data) => {
          message.success("회원 가입 완료.");
          navigate("/home");
        })
        .catch((error) => {
          if (error.response.status) {
            message.error("이미 가입된 회원입니다.");
          } else {
            message.error("회원 가입 실패.");
          }
        });
    }
  };

  const changeDate = (date, dateString) => {
    setUserInfo((prev) => {
      return {
        ...prev,
        birth: dateString,
      };
    });
  };

  const changeIssuerList = (e) => {
    const arr = e.map((el, idx) => {
      const i = issuers.findIndex((ele) => {
        return ele.title === el;
      });
      return issuers[i]._id;
    });
    setUserInfo((prev) => {
      return {
        ...prev,
        IssuerList: arr,
      };
    });
  };

  const qrModalOpen = () => {
    setModalOpen(true);
    KlipAPI.getAddress(setQrvalue, async (address) => {
      setMyAddress(address);
      setModalOpen(false);
    });
  };

  return (
    <div>
      <h1>HolderSignUp</h1>
      <Row>
        <Col span={6} style={{ display: "flex" }}>
          <span>이메일</span>
        </Col>
        <Col span={18}>
          <input
            type="text"
            onChange={onchange}
            id="email"
          />
        </Col>
      </Row>

      <Row>
        <Col span={6} style={{ display: "flex" }}>
          <span>비밀번호</span>
        </Col>
        <Col span={18}>
          <input
            type="password"
            onChange={onchange}
            id="password"
          />
        </Col>
      </Row>
      <Row>
        <Col span={6}>
          <span>비밀번호확인</span>
        </Col>
        <Col span={18}>
          <input
            type="password"
            onChange={(e) => {
              return e.target.value === userInfo.password
                ? setIsCorrect(true)
                : setIsCorrect(false);
            }}
          />
        </Col>
      </Row>

      <Row>
        <Col span={6} style={{ display: "flex" }}>
          <span>이름</span>
        </Col>
        <Col span={18}>
          <input
            type="text"
            onChange={onchange}
            id="username"
          />
        </Col>
      </Row>

      <Row>
        <Col span={6} style={{ display: "flex" }}>
          <span>생년월일</span>
        </Col>
        <Col span={18}>
          <DatePicker
            placeholder=""
            onChange={changeDate}
          />
        </Col>
      </Row>

      <Row>
        <Col span={6} style={{ display: "flex" }}>
          <span>소속기관</span>
        </Col>
        <Col span={18}>
          <Select
            mode="tags"
            onChange={changeIssuerList}
          >
            {issuers.map((e, idx) => {
              return <Option key={e.title}>{e.title}</Option>;
            })}
          </Select>
        </Col>
      </Row>
      <Row>
        <Col span={6}>
          <span>KLIP연결</span>
        </Col>
        <Col span={18}>
          <button
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
        </Col>
      </Row>
      <Row>
        <Col span={6} style={{ display: "flex" }}>
          <span>지갑주소</span>
        </Col>
        <Col span={18}>
          <div>{myAddress}</div>
        </Col>
      </Row>
      <Row>
        <button onClick={validate}>
          회원가입 완료
        </button>
      </Row>
    </div>
  );
};

export default HolderSignUp;
