import React, { Fragment, Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import './Main.css';
class Main extends Component {
  render() {
    return (
      <Fragment>
        <Row>
          <Col className='borderSwitchPicture'>תמונות מתחלפות</Col>
        </Row>
        <Row>
          <Col className='borderSwitchPicture' xs='6'>
            מלל
          </Col>
          <Col className='borderSwitchPicture' xs='6'>
            Rישום
          </Col>
        </Row>
      </Fragment>
    );
  }
}
export default Main;
