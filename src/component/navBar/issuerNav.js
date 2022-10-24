import { Menu } from 'antd';
import { NavLink } from "react-router-dom";
import logo from '../../img/didnow.png'
//import { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons';
function IssuerNav() {


  const items = [
    { label: <img src={logo} alt="icon" style={{ height: "75px" }} />, key: "icon"},
    { label: "발급관리",
      key: "vc",
      style: { fontSize: "large" },
      children: [
        { label: <NavLink style={{ fontSize: "large" }} to="/issuer/issue">증명서발급</NavLink>, key: "issue" },
        { label: <NavLink style={{ fontSize: "large" }} to="/issuer/vcList">발급이력</NavLink>, key: "issuedList" },
      ]
    },
    { label: "인증서양식",
      key: "context",
      style: { fontSize: "large" },
      children: [
        { label: <NavLink style={{ fontSize: "large" }} to="/issuer/contextList">양식관리</NavLink>, key: "contextList" },
        { label: <NavLink style={{ fontSize: "large" }} to="/issuer/createContext">양식등록</NavLink>, key: "createContext" },
      ]
    },
    { label: <NavLink style={{ fontSize: "large" }} to="/issuer/issue">채용공고</NavLink>,
      key: "posting",
      style: { fontSize: "large" },
    }
  ]

  return(
    <nav>
      <Menu style={{height: '75px', alignItems:'center'}} mode="horizontal" items={items} />
    </nav>
  )
}

export default IssuerNav