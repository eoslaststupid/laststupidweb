import React from 'react';
import { Image,Navbar,Nav,NavItem } from 'react-bootstrap';
import cookie from 'cookie'

export default class Header extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      showWord : 'English',
    }
  }


  componentDidMount(){
    const currCookie = cookie.parse(document.cookie).lang ? cookie.parse(document.cookie).lang : 'zh-CN'
    if(currCookie === 'zh-CN'){
      this.setState({showWord: 'English'})
    }else{
      this.setState({showWord: '中文简体'})
    }
  }

  changeLanguage = () => {
    const currCookie = cookie.parse(document.cookie).lang ? cookie.parse(document.cookie).lang : 'zh-CN'
    if(currCookie === 'en-US'){
      document.cookie = cookie.serialize("lang", "zh-CN");
    }else{
      document.cookie = cookie.serialize("lang", "en-US");
    }
    window.location.reload()
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
              {this.props.intl.get('GMAE_RULE')}
            </NavItem>
            <NavItem eventKey={2} className="li-a" href="#history-records">
              {this.props.intl.get('HISTORY')}
            </NavItem>
            <NavItem eventKey={2} className="li-a change-lan" onClick = {this.changeLanguage} href="#">
              {this.state.showWord}
            </NavItem>

          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )

  }
}