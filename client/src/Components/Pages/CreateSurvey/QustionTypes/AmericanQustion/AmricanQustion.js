import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import {
  Container,
  Button,
  Row,
  Col,
  ListGroup,
  ListGroupItem
} from 'reactstrap';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';

import './AmricanQustion.css';
class AmricanQustion extends Component {
  state = {
    answer: '',
    indexAnswer: 0,
    allAnswer: []
  };
  render() {
    const Styles = makeStyles(theme => ({
      root: {
        '& > *': {
          margin: theme.spacing(1),
          width: '80%',
          direction: 'rtl',
          marginRight: '9.2rem'
        }
      }
    }));
    const onChangeHandler = e => {
      this.setState({ answer: e.target.value });
    };
    const onApproveHandler = e => {
      e.preventDefault();
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

    const removeHandler = index => {
      console.log(index);

      let tempAllanswer = this.state.allAnswer;

      tempAllanswer = tempAllanswer.filter(ans => {
        console.log('ANS:  ' + ans);
        console.log('ANS.INDEX:  ' + ans.index);
        console.log('INDEX:  ' + index);

        return ans.index !== index;
      });
      console.log(tempAllanswer);

      this.setState({
        allAnswer: tempAllanswer,
        indexAnswer: this.state.indexAnswer - 1
      });
    };

    const classes = Styles;

    //Button that going apper only if more than 2 Answer
    const finshButtun =
      this.state.indexAnswer > 1 ? (
        <Button block color='success'>
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
                onClick={index => removeHandler(ans.index)}
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
    return (
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
                <Button onClick={onApproveHandler} size='lg' color='primary'>
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
                    onChange={onChangeHandler}
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

export default AmricanQustion;
