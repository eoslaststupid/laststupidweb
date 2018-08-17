import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './Header'
import Top3banner from './Top3banner'
import { Grid,Row,Col,Panel,Button,Table,FormGroup,InputGroup,FormControl } from 'react-bootstrap';


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      betRecord: [
        {
          account: "fdklskkejsjh",
          amount: "32135.2211",
          bettime: "2017-09-22 12:21:45",
        },
        {
          account: "fdklskkejsjh",
          amount: "32135.2211",
          bettime: "2017-09-22 12:21:45",
        },
        {
          account: "fdklskkejsjh",
          amount: "32135.2211",
          bettime: "2017-09-22 12:21:45",
        },
        {
          account: "fdklskkejsjh",
          amount: "32135.2211",
          bettime: "2017-09-22 12:21:45",
        },
        {
          account: "fdklskkejsjh",
          amount: "32135.2211",
          bettime: "2017-09-22 12:21:45",
        },
        {
          account: "fdklskkejsjh",
          amount: "32135.2211",
          bettime: "2017-09-22 12:21:45",
        },
        {
          account: "fdklskkejsjh",
          amount: "32135.2211",
          bettime: "2017-09-22 12:21:45",
        },
      ],
    }
  }

  renderBetRecords() {
    return (
      <Row style={{margin:"0"}}>
        <Table responsive>
          <tbody style={{border:"4px solid rgb(65, 117, 105)"}}>
          {this.state.betRecord.map((rcd,index) => {
            return (
              <tr key={index}>
                <td>{rcd.account}</td>
                <td>{rcd.amount} EOS</td>
                <td>{rcd.bettime}</td>
              </tr>
            )
          })}
          </tbody>
        </Table>
      </Row>
    )
  }

  render() {
    return (
      <div className="App">

        <Header/>

        <Top3banner />

        <p className="countDownTimer">
          09 : 45 : 32
        </p>

        <Grid>
          <Row  className="per-title order-list">
            <Col xs={12} md={3}>
            <span>接盘记录</span>
            </Col>

            <Col  xs={12} md={9}>
              <Col xs={0} md={5}>
              </Col>
              <Col xs={12} md={7}>


                <FormGroup>
                  <InputGroup className="inputGroup">
                    <FormControl type="text" name="betprice" placeholder="最低接盘价 34526.5346 EOS"/>
                    <InputGroup.Button>
                      <Button bsStyle="danger" >我来接盘</Button>
                    </InputGroup.Button>
                  </InputGroup>
                </FormGroup>
              </Col>

            </Col>
          </Row>

          {this.renderBetRecords()}

          <Row style={{margin:"0"}}>
            <div className="per-title" id="game-rule">游戏规则</div>
              <ul className="list-group rule-ul">
                <li className="list-group-item">1、第一个成为stupid的人需要支付1个EOS，随后每一个接盘侠最少需要支付前一个人接盘金额的1.1倍，也可以选择支付更多但上限为3倍；</li>
                <li className="list-group-item">2、接盘的资金将进入上一个玩家的钱包，所以一旦有其他玩家来接盘，你将至少获得10%的利润，除去手续费；</li>
                <li className="list-group-item">3、用户可以根据当前形势决定自己要支付的金额，支付的越多风险越高，但是收益也越高；</li>
                <li className="list-group-item">4、如果某玩家接盘后超过12小时没有人再来接盘，那么此玩家将成为Last Stupid，本轮游戏结束，进入下一轮；</li>
                <li className="list-group-item">5、游戏过程中将收取5%的总费用，其中2%作为DAPP运营费用，3%作为资金池；</li>
                <li className="list-group-item">6、每轮游戏的Last Stupid可以在后续游戏积累的资金池中享受永久分红，分红比例按照所有Last Stupid的个数平均分配；</li>
                <li className="list-group-item">7、分红总量为资金池总额的70%，剩余资金将积累到下一轮；</li>
              </ul>
          </Row>

          <Row style={{margin:"0"}}>
            <div className="per-title" id="history-records">历史记录</div>
            <Table className="history-ul" responsive>
              <thead>
                <tr>
                  <th>轮次</th>
                  <th>玩家</th>
                  <th>投入</th>
                  <th>分红收益</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td>#1</td>
                  <td>abcdefghijkl</td>
                  <td>2356.2235 EOS</td>
                  <td>122.3333 EOS</td>
                </tr>

                <tr>
                  <td>#2</td>
                  <td>abcdefghijkl</td>
                  <td>2356.2235 EOS</td>
                  <td>122.3333 EOS</td>
                </tr>

                <tr>
                  <td>#3</td>
                  <td>abcdefghijkl</td>
                  <td>2356.2235 EOS</td>
                  <td>122.3333 EOS</td>
                </tr>

                <tr>
                  <td>#4</td>
                  <td>abcdefghijkl</td>
                  <td>2356.2235 EOS</td>
                  <td>122.3333 EOS</td>
                </tr>

                <tr>
                  <td>#5</td>
                  <td>abcdefghijkl</td>
                  <td>2356.2235 EOS</td>
                  <td>122.3333 EOS</td>
                </tr>

              </tbody>
            </Table>
            <div className="click-div">
              <Button className="prev">
                &lt;&lt;
              </Button>

              <Button className="next">
                >>
              </Button>
            </div>
          </Row>



        </Grid>

        <Row style={{margin:"0"}} className="footer">
          <span>Copyright © BlackCat 2018</span>
        </Row>

      </div>
    );
  }
}

export default App;
