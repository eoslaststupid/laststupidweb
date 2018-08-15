import React from 'react';
import { Grid,Row,Col,Panel } from 'react-bootstrap';
import './Top3banner.css';

export default class Top3banner extends React.PureComponent{
  constructor (props){
    super(props)
  }

  render(){
    return (

      <Grid>
        <Row  className="per-title">
          <div>#21 GAME</div>
        </Row>

        <Row>
          <Col xs={12} md={4}>
            <Panel bsStyle="primary">
              <Panel.Heading>
                <Panel.Title componentClass="h3">当前Stupid</Panel.Title>
              </Panel.Heading>
              <Panel.Body>finalljskdje</Panel.Body>
            </Panel>
          </Col>
          <Col xs={12} md={4}>
            <Panel bsStyle="primary">
              <Panel.Heading>
                <Panel.Title componentClass="h3">接盘最低价</Panel.Title>
              </Panel.Heading>
              <Panel.Body>1322.3800 EOS</Panel.Body>
            </Panel>
          </Col>
          <Col xs={12} md={4}>
            <Panel bsStyle="primary">
              <Panel.Heading>
                <Panel.Title componentClass="h3">奖金池</Panel.Title>
              </Panel.Heading>
              <Panel.Body>23553.8299 EOS</Panel.Body>
            </Panel>
          </Col>
        </Row>
      </Grid>
    )
  }
}