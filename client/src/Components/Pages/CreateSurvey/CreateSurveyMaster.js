import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col, Button } from 'reactstrap';
import './CreateSurveyMaster.css';
import OpenQustion from './QustionTypes/OpenQustion/OpenQustion';

class CreateSurveyMaster extends Component {
  state = {
    startToggle: true
  };
  onStartHanler = () => {
    this.setState({
      startToggle: false
    });
  };
  render() {
    return (
      <div>
        <Container>
          <p className='headline'>בנה את הסקר שלך</p>
          <Row>
            <Col className='border'>
              {this.state.startToggle ? (
                <div
                  style={{
                    textAlign: 'center',
                    margin: 'auto',
                    position: 'absolute',
                    top: '50%',
                    left: ' 50%',
                    marginRight: '-50%',
                    transform: 'translate(-50%, -50%)'
                  }}
                >
                  <Button
                    onClick={this.onStartHanler}
                    outline
                    style={{ borderRadius: '2.3rem', fontSize: '2.25rem' }}
                    size='lg'
                    color='primary'
                  >
                    !בוא נתחיל
                  </Button>{' '}
                </div>
              ) : (
                <div
                  style={{
                    backgroundColor: 'transparent',
                    textAlign: 'center'
                  }}
                >
                  <OpenQustion />
                </div>
              )}
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(CreateSurveyMaster);
