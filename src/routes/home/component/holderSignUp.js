import { message, DatePicker, Select } from "antd";
import { useState } from "react";
// import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import QrCodeModal from "./qrCodeModal";
import * as KlipAPI from "../component/UseKlip";
const { Option } = Select;

const HolderSignUp = () => {
  const [issuers] = useState([]);
  const [qrvalue, setQrvalue] = useState("DEFAULT");
  const [myAddress, setMyAddress] = useState("");
  const [isCorrect, setIsCorrect] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  // useEffect(() => {
  //   axios({
  //     url: `${process.env.REACT_APP_ISSUER}/iss/api/v1/issuer/find/all`,
  //     method: "GET",
  //   }).then((data) => {
  //     setIssuers([...data.data]);
  //   });
  // }, []);

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
            return e.target.value === userInfo.password
              ? setIsCorrect(true)
              : setIsCorrect(false);
          }}
        />
      </div>

      <div className="signUpForm_row">
        <p className="signUpForm_tag">
          이름
        </p>
        <input
          className="signUpForm_input"
          type="text"
          onChange={onchange}
          id="username"
        />
      </div>

      <div className="signUpForm_row">
        <p className="signUpForm_tag">
          생년월일
        </p>
        <DatePicker
          className="signUpForm_selectInput"
          placeholder=""
          onChange={changeDate}
        />
      </div>

      <div className="signUpForm_row">
        <p className="signUpForm_tag">
          소속기관
        </p>
        <Select
          className="signUpForm_selectInput"
          mode="tags"
          onChange={changeIssuerList}
        >
          {issuers.map((e, idx) => {
            return <Option key={e.title}>{e.title}</Option>;
          })}
        </Select>
      </div>

      <div className="signUpForm_row">
        <p className="signUpForm_tag">
          KLIP연결
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
        <div>
          {myAddress}
        </div>
      </div>
      <div className="signUpForm_submitBox">
        <button 
          className="signUpForm_submitBtn"
          onClick={validate}
        >
          회원가입 완료
        </button>
      </div>
    </div>
  );
};

export default HolderSignUp;
