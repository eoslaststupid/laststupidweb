import React from 'react';
import { Image,Navbar,Nav,NavItem,NavDropdown,MenuItem } from 'react-bootstrap';

export default class Header extends React.PureComponent {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Navbar collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <Image src= "./img/logo.png"  />
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <NavItem eventKey={1} href="#">
              <strong  style={{fontSize: "2rem"}}>Last Stupid</strong>
            </NavItem>

          </Nav>
          <Nav pullRight>
            <NavItem eventKey={1} className="li-a" href="#game-rule">
              游戏规则
            </NavItem>
            <NavItem eventKey={2} className="li-a" href="#history-records">
              历史记录
            </NavItem>
            <NavDropdown eventKey={3} className="li-a" title="中文简体" id="basic-nav-dropdown">
              <MenuItem eventKey={3.1}>中文简体</MenuItem>
              <MenuItem eventKey={3.2}>ENGLISH</MenuItem>
            </NavDropdown>

          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )

  }
}