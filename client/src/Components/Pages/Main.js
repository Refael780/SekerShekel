import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col, Button } from 'reactstrap';
import CustomModal from '../UI/CustomModal';
import CaruselSeker from '../UI/CarouselSeker/CarouselSeker';
import NotFInsh from '../NotFinish/NotFInsh';
import './Main.css';
import RegisterCustom from '../RegisterCustom/RegisterCustom';
import { loadAllSurvey } from '../../action/survey';
import Numbers from '../Numbers/Numbers';
import RegForUpdate from '../RegForUpdate/RegForUpdate';
import FadeInSection from '../UI/FadeInSection/FadeInSection';
class Main extends Component {
  componentDidMount = () => {
    this.props.loadAllSurvey();
  };
  state = {
    RegForUpdateToggel: false
  };

  render() {
    const prestRegForUpdateHandler = () => {
      console.log('prestRegForUpdateHandler');

      this.setState({
        RegForUpdateToggel: !this.state.RegForUpdateToggel
      });
    };
    return (
      <Fragment>
        <Container fluid style={{ margin: '0.2rem' }}>
          <FadeInSection>
            <CustomModal />
          </FadeInSection>
          <FadeInSection>
            <Row>
              <Col className='shd'>
                <CaruselSeker />
              </Col>
            </Row>
          </FadeInSection>
          <FadeInSection>
            <Row className='borderSwitchPicture'>
              <Col className='info' md='12'>
                <Container
                  style={{
                    fontSize: '1.7rem',
                    height: '15rem',
                    padding: ' 1rem',
                    textAlign: 'center'
                  }}
                >
                  ש המון גרסאות זמינות לפסקאות של Lorem Ipsum. אבל רובם עברו
                  שינויים בצורה זו או אחרת, על ידי השתלת הומור או מילים אקראיות
                  שלא נראות אפילו מעט אמינות. אם אתה הולך להשתמש במקטעים של של
                  ינויים בצורה זו או אחרת, על ידי השתלת הומור או מילים אקראיות
                  שלא נראות אפילו מעט אמינות. אם אתה הולך להשתמש במקטעים של של
                  Lorem Ipsum אתה צריך להיות בטוח שאין משהו מביך חבוי בתוך הטקס
                </Container>
              </Col>
              <Col>
                <FadeInSection>
                  <RegisterCustom></RegisterCustom>
                </FadeInSection>
              </Col>
            </Row>
          </FadeInSection>
          <FadeInSection>
            <Row>
              <Col>
                <div
                  style={{
                    fontFamily: 'Amatic SC ,cursive',
                    textAlign: 'center'
                  }}
                >
                  {' '}
                  <p style={{ fontSize: '4rem' }}>סקרים שטרם יסתיימו</p>
                </div>
              </Col>
            </Row>
          </FadeInSection>

          <FadeInSection>
            <Row>
              <Col className='bigger' style={{ margin: '0.6rem' }}>
                <NotFInsh index={0} />
              </Col>
              <Col className='bigger' style={{ margin: '0.6rem' }}>
                <NotFInsh index={1} />
              </Col>
              <Col className='bigger' style={{ margin: '0.6rem' }}>
                {' '}
                <NotFInsh index={2} />
              </Col>
            </Row>
          </FadeInSection>
          <br />

          <br />

          <hr />
          <FadeInSection>
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
                  onClick={prestRegForUpdateHandler}
                  style={{ alignItems: 'center' }}
                  color='primary'
                  size='lg'
                  block
                  outline
                >
                  הרשם לקבלת עדכונים
                </Button>
                <br />

                {this.state.RegForUpdateToggel ? <RegForUpdate /> : <div></div>}
              </Col>
            </Row>
          </FadeInSection>
          <FadeInSection>
            <Row
              style={{
                float: 'left',
                margin: 0,
                padding: 0
              }}
            >
              <Col
                xs='12'
                sm='6'
                lg='3'
                className='bigger'
                style={{ float: 'left', margin: 0, padding: 0 }}
              >
                <Numbers />
                <hr />
              </Col>
              <Col
                xs='12'
                sm='6'
                lg='3'
                className='bigger'
                style={{ float: 'left', margin: '0', padding: 0 }}
              >
                <Numbers />
                <hr />
              </Col>
              <Col
                xs='12'
                sm='6'
                lg='3'
                className='bigger'
                style={{ float: 'left', margin: '0', padding: 0 }}
              >
                <Numbers />
                <hr />
              </Col>
              <Col
                xs='12'
                sm='6'
                lg='3'
                className='bigger'
                style={{ float: 'left', margin: '0', padding: 0 }}
              >
                <Numbers />
                <hr />
              </Col>
            </Row>
          </FadeInSection>
          <hr />
          <br />
        </Container>
      </Fragment>
    );
  }
}
export default connect(null, { loadAllSurvey })(Main);
