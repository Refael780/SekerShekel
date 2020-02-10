import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { loadMyProfile } from '../../action/profile';
import axios from 'axios';
import Axios from 'axios';
import Loading from '../layout/Loading/Loading';
class UserDashbord extends Component {
  componentDidMount = async () => {
    console.log('componentDidMount');

    this.props.loadMyProfile();
    console.log('componentDidMount2');
  };
  render() {
    let hasProfile =
      this.props.profile.myProfile !== null ? (
        <Fragment>For this user has Profile</Fragment>
      ) : (
        <Fragment>
          <div>
            <h3>You have Not Profile to Create one Click To the Button </h3>
            <button>Create Profile</button>
          </div>
        </Fragment>
      );

    return this.props.profile.loading &&
      this.props.profile.myProfile === null ? (
      <Fragment>
        <Loading />
      </Fragment>
    ) : (
      <Fragment>
        <div dir='rtl'>
          <h1>Welcome {this.props.auth.user.name}</h1>
        </div>
        {hasProfile}
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(mapStateToProps, { loadMyProfile })(UserDashbord);
