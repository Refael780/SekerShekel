import React, { Fragment, Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import Register from '../auth/Register';
import CustomModal from '../layout/CustomModal';
import CaruselSeker from '../layout/CarouselSeker';
import NotFInsh from '../layout/NotFInsh';
import './Main.css';
class Main extends Component {
  render() {
    return (
      <Fragment>
        <Container fluid>
          <CustomModal />
          <Row>
            <Col className='shd'>
              <CaruselSeker />
            </Col>
          </Row>
          <Row className='borderSwitchPicture'>
            <Col className='info' md='7'>
              <Container style={{ fontSize: '1.4rem' }}>
                ש המון גרסאות זמינות לפסקאות של Lorem Ipsum. אבל רובם עברו
                שינויים בצורה זו או אחרת, על ידי השתלת הומור או מילים אקראיות
                שלא נראות אפילו מעט אמינות. אם אתה הולך להשתמש במקטעים של של
                ינויים בצורה זו או אחרת, על ידי השתלת הומור או מילים אקראיות שלא
                נראות אפילו מעט אמינות. אם אתה הולך להשתמש במקטעים של של Lorem
                Ipsum אתה צריך להיות בטוח שאין משהו מביך חבוי בתוך הטקס
              </Container>
            </Col>

            <Col className=' reg' md='4'>
              <Register></Register>
            </Col>
          </Row>
          <Row>
            <Col style={{ height: '40vh' }} className='borderSwitchPicture'>
              <NotFInsh />
            </Col>
          </Row>
          <Row>
            <Col
              md='8'
              style={{ height: '40vh' }}
              className='borderSwitchPicture'
            >
              <NotFInsh />
            </Col>
            <Col
              md='4'
              style={{ height: '40vh' }}
              className='borderSwitchPicture'
            >
              <NotFInsh />
              <NotFInsh />
            </Col>
          </Row>
        </Container>
      </Fragment>
    );
  }
}
export default Main;
