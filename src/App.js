import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './Header'
import Top3banner from './Top3banner'
import { Grid,Row,Col,Panel,Button,Table } from 'react-bootstrap';


class App extends Component {
  render() {
    return (
      <div className="App">

        <Header/>

        <Top3banner />

        <p className="countDownTimer">
          09 : 45 : 32
        </p>

        <Grid>
          <Row  className="per-title">
            <span>接盘记录</span>
            <Button bsStyle="danger" className="button-right">最低接盘价 34526.5346 EOS</Button>
          </Row>

          <Row style={{margin:"0"}}>
            <Table responsive>
              <tbody style={{border:"1px solid #dddddd"}}>
                <tr>
                  <td>fdklskkejsjh</td>
                  <td>2377.5365 EOS</td>
                  <td>2017-09-22 12:21:45</td>
                </tr>

                <tr>
                  <td>fdklskkejsjh</td>
                  <td>2377.5365 EOS</td>
                  <td>2017-09-22 12:21:45</td>
                </tr>

                <tr>
                  <td>fdklskkejsjh</td>
                  <td>2377.5365 EOS</td>
                  <td>2017-09-22 12:21:45</td>
                </tr>

                <tr>
                  <td>fdklskkejsjh</td>
                  <td>2377.5365 EOS</td>
                  <td>2017-09-22 12:21:45</td>
                </tr>

                <tr>
                  <td>fdklskkejsjh</td>
                  <td>2377.5365 EOS</td>
                  <td>2017-09-22 12:21:45</td>
                </tr>

                <tr>
                  <td>fdklskkejsjh</td>
                  <td>2377.5365 EOS</td>
                  <td>2017-09-22 12:21:45</td>
                </tr>
              </tbody>
            </Table>
          </Row>

          <Row style={{margin:"0"}}>
            <div className="per-title">游戏规则</div>
              <ul className="list-group rule-ul">
                <li className="list-group-item">1、啊啊</li>
                <li className="list-group-item">2、版本</li>
                <li className="list-group-item">3、超出</li>
              </ul>
          </Row>

          <Row style={{margin:"0"}}>
            <div className="per-title">历史记录</div>
            <Table className="history-ul">
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
              <Button>
                上一页
              </Button>

              <Button>
                下一页
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
