import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Button } from 'reactstrap';
const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '80%',
      direction: 'rtl'
    }
  }
}));

const OpenQustion = () => {
  const onChangeHandler = e => {};
  const classes = useStyles();

  return (
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
        <TextField
          id='outlined-basic'
          label='הזן כאן                              '
          variant='outlined'
        />
        <br />
        <hr></hr>
        <Button
          outline
          style={{ borderRadius: '2.3rem', fontSize: '2.25rem' }}
          size='lg'
          color='primary'
        >
          אישור והמשך
        </Button>{' '}
      </form>
    </div>
  );
};

export default OpenQustion;
