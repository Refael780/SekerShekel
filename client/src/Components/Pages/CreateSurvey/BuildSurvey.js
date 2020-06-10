import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col, Button } from 'reactstrap';
import OpenQustion from './QustionTypes/OpenQustion/OpenQustion';
import AmericanQustion from './QustionTypes/AmericanQustion/AmricanQustion';
import {
  promotQustion,
  promotPage,
  confirmQustionToSurvey
} from '../../../action/createSurvey';

export class BuildSurvey extends Component {
  state = {
    isOpen: false,
    isAskQustion: true, //Ask if is Amrican austion  or Not
    nextQustionType: null
  };

  render() {
    const openQustHandler = () => {
      this.setState({
        ...this.state,
        isAskQustion: false,
        nextQustionType: <OpenQustion /> ///SAVE THE QUSTION IN STATE AND RETURN TO NEXT QUSTION
      });
      this.props.promotPage(this.props.pageNumber);

      this.props.confirmQustionToSurvey(
        this.props.qustion,
        false,
        this.props.qustionIndex
      );
      this.props.promotQustion(this.props.qustionIndex);
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
                {this.props.qustionIndex} שאלה מס
              </h1>
              <span>{this.props.qustion}</span>
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
                <br />
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

const mapStateToProps = state => ({
  pageNumber: state.createSurvey.currentPage.page,
  qustionIndex: state.createSurvey.currentPage.qustionNumber,
  qustion: state.createSurvey.currentPage.qut
});

export default connect(mapStateToProps, {
  promotQustion,
  promotPage,
  confirmQustionToSurvey
})(BuildSurvey);
