import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../../layout/Loading/Loading';
import { connect } from 'react-redux';
import { CreateOrUpdateProfile } from '../../../action/profile';
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
      yearsOfEducation,
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
        <div dir='rtl' style={{ textAlign: 'right' }}>
          <h1 className='large text-primary'>צור את הפרופיל שלך</h1>
          <p className='lead'>
            <i className='fas fa-user' /> בוא ניצור את הפרופיל שלך
          </p>
          <small>* = required field</small>
          <form dir='rtl' className='form'>
            <div className='form-group'>
              <select name='status' value={status} onChange={e => onChange(e)}>
                <option value='0'>* רווק\ה</option>
                <option value='Marrige'>נשוי</option>
                <option value='Divorce'>גרוש</option>
                <option value='Widow'>אלמן</option>
                <option value='Other'>אחר</option>
              </select>
              <small className='form-text'>ציין את הסטטוס שלך</small>
            </div>
            <div className='form-group'>
              <select
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
              <small className='form-text'>כמה ילדים נמצאים בחזקתך?</small>
            </div>
            <div className='form-group'>
              <select
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
              <small className='form-text'>מהי רמת השכלה שהינך מחזיק</small>
            </div>

            {this.state.education > '1' ? (
              <div className='form-group'>
                <input
                  onChange={e => onChange(e)}
                  type='text'
                  placeholder='מוסד לימוד'
                  name='educationalInstitution'
                  value={educationalInstitution}
                  onChange={e => onChange(e)}
                />
                <small className='form-text'>ציין את שם המוסד שבו למדת</small>
              </div>
            ) : null}
            <div className='form-group'>
              <input
                type='text'
                placeholder='workAT'
                name='workAT'
                value={workAT}
                onChange={e => onChange(e)}
              />
              <small className='form-text'>במה אתה עוסק למחייתך?</small>
            </div>

            <div className='form-group'>
              <input
                type='text'
                placeholder='לאום'
                name='nation'
                value={nation}
                onChange={e => onChange(e)}
              />
              <small className='form-text'>ציין מה הלאום שלך</small>
            </div>
            <div className='form-group'>
              <input
                type='text'
                placeholder='* מקצוע'
                name='profession'
                value={profession}
                onChange={e => onChange(e)}
              />
              <small className='form-text'>
                אנא הפרד ב ',' בין מקצוע למקצוע (לדוגמא: חשמלאי, מפתח תוכנה,
                מנעולן)
              </small>
            </div>

            <input
              type='submit'
              onClick={onSubmit}
              className='btn btn-primary my-1'
            />
            <Loading />

            <Link className='btn btn-light my-1' to='/dashboard'>
              Go Back
            </Link>
          </form>
        </div>
      </Fragment>
    );
  }
}

export default connect(null, { CreateOrUpdateProfile })(ProfileForm);
