import { Menu } from 'antd';
import { NavLink } from "react-router-dom";
import logo from '../../img/didnow.png'
//import { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons';
function HolderNav() {


  const items = [
    { label: <img src={logo} alt="icon" style={{ height: "75px" }} />, key: "icon"},
    { label: <NavLink style={{ fontSize: "large" }} to="/holder/vcList">내지갑</NavLink>, key: "home"},
    { label: <NavLink style={{ fontSize: "large" }}>커리어로드맵</NavLink>, key: "signIn" },
    { label: <NavLink style={{ fontSize: "large" }} to="/holder/postingList">입사지원</NavLink>, key: "signUp" },
    // { label: "공지사항",
    //   key: "item3",
    //   children: [{ label: "공지1", key: "item4" }, { label: "공지2", key: "item5" }]
    // },
  ]

  return(
    <nav>
      <Menu style={{height: '75px', alignItems:'center'}} mode="horizontal" items={items} />
    </nav>
  )
}

export default HolderNav