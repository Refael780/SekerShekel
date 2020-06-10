import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import {
  confirmQustionToSurvey,
  promotQustion,
  promotPage
} from '../../../../../action/createSurvey';
import { Button, Row, Col, ListGroup, ListGroupItem } from 'reactstrap';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import OpenQustion from '../OpenQustion/OpenQustion';

import './AmricanQustion.css';
class AmricanQustion extends Component {
  state = {
    answer: '',
    indexAnswer: 0,
    allAnswer: [],
    toNextQustion: false
  };
  Styles = makeStyles(theme => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '80%',
        direction: 'rtl',
        marginRight: '9.2rem'
      }
    }
  }));
  onChangeHandler = e => {
    this.setState({ answer: e.target.value });
  };
  onApproveHandler = e => {
    e.preventDefault();
    console.log(e.key);

    const ansindex = {
      answer: this.state.answer,
      index: this.state.indexAnswer + 1
    };
    if (this.state.answer !== '') {
      const tempAllanswer = this.state.allAnswer;
      tempAllanswer.push(ansindex);
      this.setState({
        allAnswer: tempAllanswer,
        indexAnswer: this.state.indexAnswer + 1,
        answer: ''
      });
    }
  };
  PressEnterHandler = e => {
    if (e.key === 'Enter') {
      this.onApproveHandler(e);
    }
  };

  confirmHanler = () => {
    let answers = [...this.state.allAnswer];
    answers = answers.map(element => {
      return {
        answer: element.answer,
        optionAnswerNumber: element.index,
        choosen: false
      };
    });

    this.props.confirmQustionToSurvey(
      this.props.qustion,
      true,
      this.props.qustionIndex,
      answers
    );
    this.props.promotPage(this.props.pageNumber);
    this.props.promotQustion(this.props.qustionIndex);
    this.setState({
      ...this.state,
      toNextQustion: true
    });
  };

  removeHandler = index => {
    console.log(index);

    let tempAllanswer = this.state.allAnswer;

    tempAllanswer = tempAllanswer.filter(ans => {
      return ans.index !== index;
    });

    this.setState({
      allAnswer: tempAllanswer,
      indexAnswer: this.state.indexAnswer - 1
    });
  };
  render() {
    const classes = this.Styles;

    //Button that going apper only if more than 2 Answer
    const finshButtun =
      this.state.indexAnswer > 1 ? (
        <Button onClick={this.confirmHanler} block color='success'>
          סיום
        </Button>
      ) : null;

    ///list that update evrery answer the user add
    const listOfAnswer = this.state.allAnswer.map(ans => {
      return (
        <div key={ans.index} style={{ display: 'block' }}>
          <ListGroup>
            <ListGroupItem
              style={{
                backgroundColor: 'transparent',
                border: '0px',
                float: 'right',
                display: 'flex'
              }}
            >
              <Button
                onClick={index => this.removeHandler(ans.index)}
                color='danger'
                style={{ marginLeft: '0.5rem', float: 'right' }}
              >
                הסר
              </Button>
              {ans.index}. {ans.answer}
            </ListGroupItem>
          </ListGroup>
        </div>
      );
    });

    return this.state.toNextQustion ? (
      <OpenQustion />
    ) : (
      <div>
        <div dir='rtl'>
          <p
            style={{
              textAlign: 'center',
              fontSize: '1.8rem',
              marginBottom: '2rem'
            }}
          >
            הזן את השאלה אשר תרצה לשאול
          </p>
          <form className={classes.root} noValidate autoComplete='off'>
            <Row style={{ float: 'right' }}>
              <Col className='inputOption' xs='3'>
                <Button
                  onClick={this.onApproveHandler}
                  size='lg'
                  color='primary'
                >
                  הוסף
                </Button>{' '}
              </Col>
              <Col className={classes.marginRight}>
                <FormControl className={classes.margin}>
                  <InputLabel
                    className={classes.marginRight}
                    htmlFor='input-with-icon-adornment'
                  >
                    הזן תשובה
                  </InputLabel>
                  <Input
                    className={classes.marginRight}
                    id='input-with-icon-adornment'
                    onChange={this.onChangeHandler}
                    onKeyDown={this.PressEnterHandler}
                    value={this.state.answer}
                  />
                </FormControl>
              </Col>
            </Row>
            <br />
            <hr />
            <Row>
              <Col>{listOfAnswer}</Col>
            </Row>
          </form>
          {finshButtun}
        </div>
      </div>
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
})(AmricanQustion);
