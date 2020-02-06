import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
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
      console.log({ value: e.target.value });
      console.log(e.target.name);

      console.log(this.state);
    };
    const onSubmit = e => {
      e.preventDefault();
    };
    return (
      <Fragment>
        <div dir='rtl'>
          <h1 dir='rtl' className='large text-primary'>
            צור את הפרופיל שלך
          </h1>
          <p className='lead'>
            <i className='fas fa-user' /> Let's get some information to make
            your profile stand out
          </p>
          <small>* = required field</small>
          <form className='form'>
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
              <input
                type='text'
                placeholder='workAT'
                name='workAT'
                value={workAT}
                onChange={e => onChange(e, this.state.workAT)}
              />
              <small className='form-text'>במה אתה עוסק למחייתך?</small>
            </div>
            <div className='form-group'>
              <input
                type='text'
                placeholder='Website'
                name='website'
                value={'website'}
              />
              <small className='form-text'>
                Could be your own or a company website
              </small>
            </div>
            <div className='form-group'>
              <input
                type='text'
                placeholder='Location'
                name='location'
                //   value={location}
              />
              <small className='form-text'>
                City & state suggested (eg. Boston, MA)
              </small>
            </div>
            <div className='form-group'>
              <input
                type='text'
                placeholder='* Skills'
                name='skills'
                //    value={skills}
              />
              <small className='form-text'>
                Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)
              </small>
            </div>
            <div className='form-group'>
              <input
                type='text'
                placeholder='Github Username'
                name='githubusername'
                //  value={githubusername}
              />
              <small className='form-text'>
                If you want your latest repos and a Github link, include your
                username
              </small>
            </div>
            <div className='form-group'>
              <textarea
                placeholder='A short bio of yourself'
                name='bio'
                //  value={bio}
              />
              <small className='form-text'>
                Tell us a little about yourself
              </small>
            </div>

            <div className='my-2'>
              <button
                //  onClick={() => toggleSocialInputs(!displaySocialInputs)}
                type='button'
                className='btn btn-light'
              >
                Add Social Network Links
              </button>
              <span>Optional</span>
            </div>

            <input type='submit' className='btn btn-primary my-1' />
            <Link className='btn btn-light my-1' to='/dashboard'>
              Go Back
            </Link>
          </form>
        </div>
      </Fragment>
    );
  }
}

export default ProfileForm;
