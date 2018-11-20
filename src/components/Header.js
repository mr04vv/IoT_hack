import React from "react"
import styled from "react-emotion"
import logo from "../images/logo_transparent.png"
import img from "../images/logo2.png"

class Header extends React.Component {


  render() {
    return (
      <HeaderWrapper>
        <LogoWrapper src={img}/>
        <LogoWrapper src={logo}/>
      </HeaderWrapper>
    )
  }
}

const HeaderWrapper = styled("div")`
  display: block;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 100vw;
  text-align: center;
  height: 48px;
  box-sizing: border-box;
  border-bottom: solid 1px #ccc;
  background: white;
  position: sticky;
  top: 0;
  z-index: 1000;
`;


const LogoWrapper = styled("img")`
  height: 40px;
  margin-top: 5px;
`;


export default Header