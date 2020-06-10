import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { CreateOrUpdateProfile } from '../../../action/profile';
import './ProfileForm.css';
class ProfileForm extends Component {
  state = {
    status: '',
    kidsAmount: '',
    workAT: '',
    yearsOfEducation: '',
    nation: '',
    education: '',
    educationalInstitution: '',
    profession: ''
  };

  render() {
    const {
      status,
      kidsAmount,
      workAT,
      nation,
      education,
      educationalInstitution,
      profession
    } = this.state;

    const onChange = e => {
      this.setState({
        ...this.state,
        [e.target.name]: e.target.value
      });

      console.log(this.state);
    };
    const onSubmit = e => {
      e.preventDefault();
      console.log(status);
      this.props.CreateOrUpdateProfile({ ...this.state });
      console.log('submit');
    };
    return (
      <Fragment>
        <div className='allpage'>
          <div dir='rtl' style={{ textAlign: 'right' }}>
            <div>
              <h1 className='large   headline'>צור את הפרופיל שלך</h1>
            </div>
            <p className='lead sub-headline'>
              <i className='fas fa-user' /> <span> </span> בוא ניצור את הפרופיל
              שלך
            </p>
            <small className='form-text'>ציין את הסטטוס שלך</small>
            <small>* = required field</small>
            <form dir='rtl' className='form'>
              <div className='form-group'>
                <select
                  className='inputBorder'
                  name='status'
                  value={status}
                  onChange={e => onChange(e)}
                >
                  <option value='0'>* רווק\ה</option>
                  <option value='Marrige'>נשוי</option>
                  <option value='Divorce'>גרוש</option>
                  <option value='Widow'>אלמן</option>
                  <option value='Other'>אחר</option>
                </select>
              </div>
              <small className='form-text '>כמה ילדים נמצאים בחזקתך?</small>
              <div className='form-group'>
                <select
                  className='inputBorder'
                  required
                  name='kidsAmount'
                  value={kidsAmount}
                  onChange={e => onChange(e)}
                >
                  <option value='0'>* 0</option>
                  <option value='1'>1</option>
                  <option value='2'>2</option>
                  <option value='3'>3</option>
                  <option value='4'>4</option>
                  <option value='5+'>יותר מ4</option>
                </select>
              </div>
              <small className='form-text'>מהי רמת השכלה שהינך מחזיק</small>

              <div className='form-group'>
                <select
                  className='inputBorder'
                  name='education'
                  value={education}
                  onChange={e => onChange(e)}
                >
                  <option value='0'>* השכלה 12 שנות לימוד</option>
                  <option value='1'>זכאי תעודת בגרות</option>
                  <option value='2'>בעל תואר ראשון</option>
                  <option value='3'>בעל תואר שני</option>
                  <option value='4'>תואר שלישי ויותר</option>
                  <option value='5+'>אחר</option>
                </select>
              </div>

              {this.state.education > '1' ? (
                <div>
                  <small className='form-text'>ציין את שם המוסד שבו למדת</small>

                  <div className='form-group'>
                    <input
                      className='inputBorder'
                      onChange={e => onChange(e)}
                      type='text'
                      placeholder='מוסד לימוד'
                      name='educationalInstitution'
                      value={educationalInstitution}
                    />
                  </div>
                </div>
              ) : null}
              <small className='form-text'>במה אתה עוסק למחייתך?</small>

              <div className='form-group'>
                <input
                  className='inputBorder'
                  type='text'
                  placeholder='workAT'
                  name='workAT'
                  value={workAT}
                  onChange={e => onChange(e)}
                />
              </div>
              <small className='form-text'>ציין מה הלאום שלך</small>

              <div className='form-group'>
                <input
                  className='inputBorder'
                  type='text'
                  placeholder='לאום'
                  name='nation'
                  value={nation}
                  onChange={e => onChange(e)}
                />
              </div>
              <small className='form-text' style={{ color: 'white' }}>
                אנא הפרד ב ',' בין מקצוע למקצוע (לדוגמא: חשמלאי, מפתח תוכנה,
                מנעולן)
              </small>
              <div className='form-group'>
                <input
                  className='inputBorder'
                  type='text'
                  placeholder='* מקצוע'
                  name='profession'
                  value={profession}
                  onChange={e => onChange(e)}
                />
              </div>

              <input type='submit' onClick={onSubmit} className='send' />

              <Link className='btn btn-light my-1' to='/dashboard'>
                Go Back
              </Link>
            </form>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default connect(null, { CreateOrUpdateProfile })(ProfileForm);
