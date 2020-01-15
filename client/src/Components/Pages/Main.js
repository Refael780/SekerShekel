import React, { Fragment, Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import Register from '../auth/Register';
import CustomModal from '../layout/CustomModal';
import './Main.css';
class Main extends Component {
  render() {
    return (
      <Fragment>
        <Container fluid>
          <CustomModal />
          <Row>
            <Col className='borderSwitchPicture Logo'>תמונות מתחלפות =</Col>
          </Row>
          <Row>
            <Col className='borderSwitchPicture info' md='7'>
              <Container style={{ fontSize: '1.4rem' }}>
                ש המון גרסאות זמינות לפסקאות של Lorem Ipsum. אבל רובם עברו
                שינויים בצורה זו או אחרת, על ידי השתלת הומור או מילים אקראיות
                שלא נראות אפילו מעט אמינות. אם אתה הולך להשתמש במקטעים של של
                Lorem Ipsum אתה צריך להיות בטוח שאין משהו מביך חבוי בתוך הטקס
              </Container>
            </Col>
            <Col className='borderSwitchPicture' md='5'>
              <Register></Register>
            </Col>
          </Row>
        </Container>
      </Fragment>
    );
  }
}
export default Main;
