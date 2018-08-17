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

          <Nav pullRight>
            <NavItem eventKey={1} className="li-a" href="#game-rule">
              游戏规则
            </NavItem>
            <NavItem eventKey={2} className="li-a" href="#history-records">
              历史记录
            </NavItem>
            <NavItem eventKey={2} className="li-a change-lan" href="#">
              English
            </NavItem>

          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )

  }
}