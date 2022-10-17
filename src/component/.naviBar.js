import 'antd/dist/antd.min.css';
import { Menu } from 'antd';
import { NavLink } from "react-router-dom";
//import { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons';
//import { useNavigate } from "react-router-dom";

function NaviBar() {
  
  //const navigate = useNavigate()

  function onclick(e) {
    switch(e.key){
      case "signIn":
        return 
      case "signUp":
        return 
      default:
        return 
    }
  }

  const items = [
    { label: <NavLink to="/signIn">로그인</NavLink>, key: "signIn", onClick:onclick },
    { label: "회원가입", key: "signUp", onClick:onclick },
    { label: "공지사항",
      key: "item3",
      onClick:onclick,
      children: [{ label: "item4", key: "item4" }, { label: "item5", key: "item5" }]
    },
  ]

  return(
    <nav>
      <Menu mode="horizontal" items={items} />
    </nav>
  )
}

//export default NaviBar