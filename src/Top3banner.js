import React from 'react';
import { Grid,Row,Col,Panel } from 'react-bootstrap';
import './Top3banner.css';

export default class Top3banner extends React.PureComponent{


  render(){
    return (

      <Grid>
        <Row  className="per-title">
          <div>#{this.props.currentStupidOrder + 1} GAME</div>
        </Row>

        <Row>
          <Col xs={12} md={4}>
            <Panel bsStyle="primary">
              <Panel.Heading>
                <Panel.Title componentClass="h3">{this.props.intl.get('CURRENT_STUPID')}</Panel.Title>
              </Panel.Heading>
              <Panel.Body>{this.props.currentStupid}</Panel.Body>
            </Panel>
          </Col>
          <Col xs={12} md={4}>
            <Panel bsStyle="primary">
              <Panel.Heading>
                <Panel.Title componentClass="h3">{this.props.intl.get('OFFER_MINIMAL')}</Panel.Title>
              </Panel.Heading>
              <Panel.Body>{this.props.minimumBet} EOS</Panel.Body>
            </Panel>
          </Col>
          <Col xs={12} md={4}>
            <Panel bsStyle="primary">
              <Panel.Heading>
                <Panel.Title componentClass="h3">{this.props.intl.get('BONUS_POOL')}</Panel.Title>
              </Panel.Heading>
              <Panel.Body>{this.props.capitalPool}</Panel.Body>
            </Panel>
          </Col>
        </Row>
      </Grid>
    )
  }
}