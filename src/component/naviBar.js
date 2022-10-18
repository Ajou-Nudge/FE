import { Menu } from 'antd';
import { NavLink } from "react-router-dom";
import logo from '../img/didnow.png'
//import { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons';
function NaviBar() {


  const items = [
    { label: <img src={logo} alt="icon" style={{ height: "48px" }} />, key: "icon"},
    { label: <NavLink to="/">홈</NavLink>, key: "home"},
    { label: <NavLink to="/signIn">로그인</NavLink>, key: "signIn" },
    { label: <NavLink to="/signUp">회원가입</NavLink>, key: "signUp" },
    // { label: "공지사항",
    //   key: "item3",
    //   children: [{ label: "공지1", key: "item4" }, { label: "공지2", key: "item5" }]
    // },
  ]

  return(
    <nav>
      <Menu mode="horizontal" items={items} />
    </nav>
  )
}

export default NaviBar