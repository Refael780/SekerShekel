import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col, Button } from 'reactstrap';
import Register from '../auth/Register';
import CustomModal from '../UI/CustomModal';
import CaruselSeker from '../UI/CarouselSeker/CarouselSeker';
import NotFInsh from '../NotFinish/NotFInsh';
import RefisterCustom from '../RegisterCustom/RegisterCustom';
import './Main.css';
import RegisterCustom from '../RegisterCustom/RegisterCustom';
import FillSurvey from './Survey/FillSurvey';
import { loadAllSurvey } from '../../action/survey';
import Numbers from '../Numbers/Numbers';
class Main extends Component {
  componentDidMount = () => {
    this.props.loadAllSurvey();
  };
  render() {
    return (
      <Fragment>
        <Container fluid style={{ margin: '0.2rem' }}>
          <CustomModal />

          <Row>
            <Col className='shd'>
              <CaruselSeker />
            </Col>
          </Row>
          <Row className='borderSwitchPicture'>
            <Col className='info' md='12'>
              <Container
                style={{
                  fontSize: '1.4rem',
                  height: '15rem',
                  padding: ' 1rem',
                  textAlign: 'center'
                }}
              >
                ש המון גרסאות זמינות לפסקאות של Lorem Ipsum. אבל רובם עברו
                שינויים בצורה זו או אחרת, על ידי השתלת הומור או מילים אקראיות
                שלא נראות אפילו מעט אמינות. אם אתה הולך להשתמש במקטעים של של
                ינויים בצורה זו או אחרת, על ידי השתלת הומור או מילים אקראיות שלא
                נראות אפילו מעט אמינות. אם אתה הולך להשתמש במקטעים של של Lorem
                Ipsum אתה צריך להיות בטוח שאין משהו מביך חבוי בתוך הטקס
              </Container>
            </Col>
            <Col>
              <RegisterCustom></RegisterCustom>
            </Col>
          </Row>
          <Row>
            <Col>
              <div
                style={{
                  fontFamily: 'Amatic SC ,cursive',
                  textAlign: 'center'
                }}
              >
                {' '}
                <p style={{ fontSize: '4rem' }}>סקרים שאינם יסתיימו</p>
              </div>
            </Col>
          </Row>
          <Row>
            <Col className='bigger' style={{ margin: '0.6rem' }}>
              <NotFInsh index={0} />
            </Col>
            <Col className='bigger' style={{ margin: '0.6rem' }}>
              <NotFInsh index={1} />
            </Col>
            <Col className='bigger' style={{ margin: '0.6rem' }}>
              <NotFInsh index={2} />
            </Col>
          </Row>
          <br />
          <hr />
          <Row>
            <Col md='8'>
              <CaruselSeker />
            </Col>
            <Col md='4'>
              <Button
                style={{ alignItems: 'center' }}
                color='primary'
                size='lg'
                block
                outline
              >
                הזמן סקר
              </Button>
              <Button
                style={{ alignItems: 'center' }}
                color='primary'
                size='lg'
                block
                outline
              >
                הרשם לקבלת עדכונים
              </Button>
            </Col>
          </Row>
          <Row
            style={{
              float: 'left',
              margin: 0,
              padding: 0
            }}
          >
            <Col
              className='bigger'
              style={{ float: 'left', margin: 0, padding: 0 }}
            >
              <Numbers />
              <hr />
            </Col>
            <Col
              className='bigger'
              style={{ float: 'left', margin: '0', padding: 0 }}
            >
              <Numbers />
              <hr />
            </Col>
            <Col
              className='bigger'
              style={{ float: 'left', margin: '0', padding: 0 }}
            >
              <Numbers />
              <hr />
            </Col>
            <Col
              className='bigger'
              style={{ float: 'left', margin: '0', padding: 0 }}
            >
              <Numbers />
              <hr />
            </Col>
            <Col
              className='bigger'
              style={{ float: 'left', margin: '0', padding: 0 }}
            >
              <Numbers />
              <hr />
            </Col>
          </Row>
          <hr />
          <Row>
            <Col>
              <footer>
                ><h1>פוטר</h1>
              </footer>
            </Col>
          </Row>
        </Container>
      </Fragment>
    );
  }
}
export default connect(null, { loadAllSurvey })(Main);
