import { Menu } from 'antd';
import { NavLink, useNavigate } from "react-router-dom";
import { useCookies } from 'react-cookie'
import logo from '../../img/didnow.png'
import '../css/nav.css'
//import { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons';
function VerifierNav() {

  const [ , , removeCookie] = useCookies([])
  const navigate = useNavigate()

  function onclick() {
    removeCookie("Authorization", [])
    navigate("/")
  }

  const items = [
    { label: <img src={logo} alt="icon" style={{ height: "75px" }} />, key: "icon"},
    { label: <NavLink style={{ fontSize: "large" }} to="/">홈</NavLink>, key: "home"},
    { label: <NavLink style={{ fontSize: "large" }} to="/signIn">로그인</NavLink>, key: "signIn" },
    { label: <NavLink style={{ fontSize: "large" }} to="/signUp">회원가입</NavLink>, key: "signUp" },
    { label: <button className='logOut' onClick={onclick}>로그아웃</button>, key: "logOut" },
  ]

  return(
    <nav>
      <Menu style={{height: '75px', alignItems:'center'}} mode="horizontal" items={items} />
    </nav>
  )
}

export default VerifierNav