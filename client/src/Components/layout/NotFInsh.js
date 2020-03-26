import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import Loading from '../layout/Loading/Loading';
import Countdown from 'react-countdown';

//import { Card, Icon, Image } from 'semantic-ui-react';

class NotFInsh extends Component {
  componentDidMount = () => {
    console.log('componentDidMount');

    console.log(this.props.sortedSurey[0]);

    let sort = this.props.sortedSurey[0];
    console.log('SORT');
    console.log(sort);
  };
  render() {
    return this.props.loading || this.props.sortedSurey.length === 0 ? (
      <Loading></Loading>
    ) : (
      <Fragment>
        <div className='ui card'>
          <div className='image'>
            <img
              style={{ maxHeight: '14rem' }}
              src={this.props.sortedSurey[this.props.index].sekerImg}
            />
          </div>
          <div className='content'>
            <div className='header'>
              {console.log(this.props.sortedSurey[0].active)}

              {this.props.sortedSurey[this.props.index].title}
            </div>

            <div className='meta'>
              <span className='date'>Joined in 2015</span>
            </div>
            <div className='description'>
              {console.log(
                Date.parse(this.props.sortedSurey[this.props.index].period.end)
              )}
              Time To Finsh:{' '}
              <span>
                <Countdown
                  zeroPadTime={0}
                  date={
                    Date.now() +
                    Date.parse(
                      this.props.sortedSurey[this.props.index].period.end
                    ) /
                      240
                  }
                ></Countdown>
              </span>
            </div>
          </div>
          <div className='extra content'>
            <a>
              <i aria-hidden='true' className='user icon'></i>
              22 Friends
            </a>
          </div>
        </div>
      </Fragment>
    );
  }
}
const mapStateToProps = state => ({
  loading: state.survey.loading,
  sortedSurey: state.survey.threeSurveys
});

export default connect(mapStateToProps, null)(NotFInsh);
