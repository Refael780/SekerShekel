import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col, Button } from 'reactstrap';
import OpenQustion from './QustionTypes/OpenQustion/OpenQustion';
import AmericanQustion from './QustionTypes/AmericanQustion/AmricanQustion';
export class BuildSurvey extends Component {
  state = {
    isOpen: false,
    isAskQustion: true, //Ask if is Amrican austion  or Not
    nextQustionType: null
  };

  render() {
    let CurrentPage;
    const nextPage = () => {
      // ** if page 1 is passOnce fowrd arrow is apper
    };
    const prevPage = () => {};
    const openQustHandler = () => {
      this.setState({
        ...this.state,
        isAskQustion: false,
        nextQustionType: <OpenQustion />
      });
    };
    const AmericanQustHandler = () => {
      this.setState({
        ...this.state,
        isAskQustion: false,
        nextQustionType: <AmericanQustion />
      });
    };

    return this.state.isAskQustion ? (
      <div>
        <Container
          fluid
          style={{
            backgroundColor: 'transparent',
            textAlign: 'center'
          }}
        >
          <br />
          <Row>
            <Col>
              <h1
                style={{
                  textAlign: 'center'
                }}
              >
                שאלה מס 1
              </h1>
            </Col>
          </Row>
          <br />
          <hr />
          <Row>
            <Col>
              <p
                style={{
                  textAlign: 'center',
                  fontSize: '1.8rem',
                  marginBottom: '2rem'
                }}
              >
                איזה סוג שאלה תבחר
              </p>
            </Col>
          </Row>
          <Row>
            <Col>
              <Button
                className='btnn'
                outline
                style={{
                  borderRadius: '2.3rem',
                  fontSize: '2.25rem',
                  marginTop: '0.8rem'
                }}
                size='lg'
                color='primary'
                block
                onClick={AmericanQustHandler}
              >
                אמריקאית
              </Button>
            </Col>
            <Col>
              <Button
                className='btnn'
                outline
                style={{
                  borderRadius: '2.3rem',
                  fontSize: '2.25rem',
                  marginTop: '0.8rem',
                  marginBottom: '0.5rem'
                }}
                size='lg'
                color='primary'
                block
                onClick={openQustHandler}
              >
                פתוחה
              </Button>
            </Col>
          </Row>
        </Container>
      </div>
    ) : (
      this.state.nextQustionType
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(BuildSurvey);
