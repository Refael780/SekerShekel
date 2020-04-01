import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import Loading from '../layout/Loading/Loading';
import Countdown from 'react-countdown';
import { Button } from 'reactstrap';
import FillSurvy from '../Pages/Survey/FillSurvey';
import { Link } from 'react-router-dom';
//import { Card, Icon, Image } from 'semantic-ui-react';
const Expierd = () => <div>Expierd</div>;

class NotFInsh extends Component {
  state = {
    isExpierd: false
  };
  render() {
    return this.props.loading || this.props.sortedSurey.length === 0 ? (
      <Loading></Loading>
    ) : (
      <Fragment>
        <div
          className='ui card'
          style={{ boxShadow: '-4px 5px 14px 0px #000000ad' }}
        >
          <div className='image'>
            <img
              style={{ maxHeight: '14rem' }}
              src={this.props.sortedSurey[this.props.index].sekerImg}
            />
          </div>
          <div className='content' dir='rtl'>
            <div className='header'>
              {console.log(this.props.sortedSurey[0].active)}

              {this.props.sortedSurey[this.props.index].title}
            </div>
            <div className='meta'>
              <span className='date'>Joined in 2015</span>
            </div>
            <div style={{ fontWeight: 'bold' }} className='description'>
              זמן לסיום הסקר:{' '}
              <span>
                <Countdown
                  date={
                    Date.now() +
                    (Date.parse(
                      this.props.sortedSurey[this.props.index].period.end
                    ) -
                      Date.now())
                  }
                >
                  <Expierd />
                </Countdown>{' '}
              </span>
            </div>
            <br />{' '}
            <Link
              to={{
                pathname: `/FillSurvey/${
                  this.props.sortedSurey[this.props.index].title
                }`
              }}
            >
              <Button
                style={{ alignItems: 'center' }}
                outline
                block
                size='lg'
                color='primary'
              >
                הכנס
              </Button>{' '}
            </Link>
          </div>
          <div className='extra content'>
            <a>
              <i aria-hidden='true' className='user icon'></i>
              {this.props.sortedSurey[this.props.index].userAnswer.length} מלאו
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
