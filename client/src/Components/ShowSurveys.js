import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Loading } from '../Components/layout/Loading/Loading';

export class ShowSurveys extends Component {
  render() {
    return (
      <Fragment>
        <div className='image'>
          <img src='https://react.semantic-ui.com/images/avatar/large/matthew.png' />
        </div>
        <div className='content'>
          <div className='header'>Matthew</div>
          <div className='meta'>
            <span className='date'>Joined in 2015</span>
          </div>
          <div className='description'>
            Matthew is a musician living in Nashville.
          </div>
        </div>
        <div className='extra content'>
          <a>
            <i aria-hidden='true' className='user icon'></i>
            22 Friends
          </a>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ShowSurveys);
