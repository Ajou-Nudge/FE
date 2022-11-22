import { Menu } from 'antd';
import { NavLink } from "react-router-dom";
import logo from '../../img/didnow.png'
//import { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons';
function HolderNav() {

  const navStyle = {
    fontSize: "large",
    color: "black",
  }

  const items = [
    { label: <img src={logo} alt="icon" style={{ height: "75px" }} />, key: "icon"},
    { label: <NavLink style={ navStyle } to="/holder/vcList">내지갑</NavLink>, 
      children:[
        { label: <NavLink style={ navStyle } to="/holder/vcList">인증서관리</NavLink>, key: "vcList" },
        { label: <NavLink style={ navStyle } to="/holder/issue">인증서등록</NavLink>, key: "issue" },
        { label: <NavLink style={ navStyle } to="/holder/submittedList">제출이력</NavLink>, key: "submittedVc" }
      ],
      key: "vcWallet",
    },
    { label: <NavLink style={ navStyle }>커리어로드맵</NavLink>, key: "signIn" },
    { label: <NavLink style={ navStyle } to="/holder/postingList">입사지원</NavLink>, key: "signUp" },
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