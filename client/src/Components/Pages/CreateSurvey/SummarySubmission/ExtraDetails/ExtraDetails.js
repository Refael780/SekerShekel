import React, { useState } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Button } from 'reactstrap';
import BuildSurvey from '../../BuildSurvey';
import {
  addQustionToSurvey,
  addExtraDetails,
  submitCreateSurveyQuts
} from '../../../../../action/createSurvey';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '80%',
      direction: 'rtl'
    }
  }
}));

const ExtraDetails = props => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString());
  const [formData, setFormData] = useState({
    imgURL: '',
    confirm: false,
    moveToNextStep: false,
    nextStep: null,
    selectedDate: '',
    title: ''
  });
  const handleDateChange = date => {
    setSelectedDate(date);
    //show clock
  };

  const onChangeHandler = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onsubmitHandler = e => {
    e.preventDefault();

    setFormData({
      ...formData,
      moveToNextStep: true,
      nextStep: <BuildSurvey />
    });
    props.addQustionToSurvey(formData.qustion);
  };
  const AddExtraSubmit = async e => {
    e.preventDefault();
    await props.addExtraDetails(formData.title, formData.imgURL, selectedDate);
    await props.submitCreateSurveyQuts(
      props.surveyQuts,
      formData.title,
      formData.imgURL,
      selectedDate
    );
    console.log('whats UP');
  };

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
        פרטים אחרונים
        <br />
      </p>
      <form className={classes.root} noValidate autoComplete='off'>
        <TextField
          id='outlined-basic'
          label='הזן כותרת לסקר                              '
          variant='outlined'
          name='title'
          onChange={onChangeHandler}
          required
        />
        <br />
        <TextField
          id='outlined-basic'
          label='הזן כתובת תמונה                              '
          variant='outlined'
          name='imgURL'
          onChange={onChangeHandler}
        />
        <MuiPickersUtilsProvider name='selectedDate' utils={DateFnsUtils}>
          <Grid container justify='space-around'>
            <KeyboardDatePicker
              name='selectedDate'
              margin='normal'
              id='date-picker-dialog'
              label='תוקף הסקר'
              format='MM/dd/yyyy'
              value={selectedDate}
              onChange={handleDateChange}
              KeyboardButtonProps={{
                'aria-label': 'change date'
              }}
            />
          </Grid>
        </MuiPickersUtilsProvider>
        <hr></hr>
        <Button
          outline
          style={{ borderRadius: '2.3rem', fontSize: '2.25rem' }}
          size='lg'
          color='primary'
          onClick={AddExtraSubmit}
        >
          אישור והמשך
        </Button>{' '}
      </form>
    </div>
  );
};

const mapStateToProps = state => ({
  surveyQuts: state.createSurvey.surveyQuts,
  pageNumber: state.createSurvey.currentPage.page,
  qustionIndex: state.createSurvey.currentPage.qustionNumber,
  isCanReturn: state.createSurvey.currentPage.isCanReturn
});

export default connect(mapStateToProps, {
  addQustionToSurvey,
  addExtraDetails,
  submitCreateSurveyQuts
})(ExtraDetails);
