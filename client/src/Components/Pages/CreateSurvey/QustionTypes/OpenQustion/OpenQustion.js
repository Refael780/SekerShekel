import React, { useState } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Button } from 'reactstrap';
import BuildSurvey from '../../BuildSurvey';
import ExtraDetails from '../../SummarySubmission/ExtraDetails/ExtraDetails';
import { addQustionToSurvey } from '../../../../../action/createSurvey';
const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '80%',
      direction: 'rtl'
    }
  }
}));

const OpenQustion = props => {
  const [formData, setFormData] = useState({
    qustion: '',
    confirm: false,
    moveToNextStep: false,
    nextStep: null
  });

  const onPressEnter = e => {
    if (e.key == 'Enter') onsubmitHandler(e);
  };
  const onChangeHandler = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onsubmitHandler = e => {
    e.preventDefault();

    setFormData({
      ...formData,
      moveToNextStep: true,
      nextStep: <BuildSurvey />
    });
    props.addQustionToSurvey(formData.qustion);
  };

  const FinishClickHandler = e => {
    e.preventDefault();

    setFormData({
      ...formData,
      moveToNextStep: true,
      nextStep: <ExtraDetails />
    });
  };
  const finishButton = props.isCanReturn ? (
    <div style={{ margin: 'auto' }}>
      {' '}
      <Button
        className='btnn'
        outline
        style={{
          borderRadius: '2.3rem',
          fontSize: '2.25rem',
          marginTop: '0.8rem',
          marginBottom: '0.5rem',
          textAlign: 'center'
        }}
        size='lg'
        color='success'
        onClick={FinishClickHandler}
      >
        המשך לסיכום וסיום
      </Button>
    </div>
  ) : null;

  const classes = useStyles();

  return formData.moveToNextStep ? (
    formData.nextStep
  ) : (
    <div dir='rtl'>
      <p
        style={{
          textAlign: 'center',
          fontSize: '1.8rem',
          marginBottom: '2rem'
        }}
      >
        שאלה מספר {props.qustionIndex}
        <br />
        הזן את השאלה אשר תרצה לשאול
      </p>
      <form className={classes.root} noValidate autoComplete='off'>
        <TextField
          id='outlined-basic'
          label='הזן כאן                              '
          variant='outlined'
          name='qustion'
          onChange={onChangeHandler}
          onKeyDown={onPressEnter}
        />
        <br />
        <hr></hr>
        <Button
          outline
          style={{ borderRadius: '2.3rem', fontSize: '2.25rem' }}
          size='lg'
          color='primary'
          onClick={onsubmitHandler}
        >
          אישור והמשך
        </Button>{' '}
        {finishButton}
      </form>
    </div>
  );
};

const mapStateToProps = state => ({
  pageNumber: state.createSurvey.currentPage.page,
  qustionIndex: state.createSurvey.currentPage.qustionNumber,
  isCanReturn: state.createSurvey.currentPage.isCanReturn
});

export default connect(mapStateToProps, { addQustionToSurvey })(OpenQustion);
