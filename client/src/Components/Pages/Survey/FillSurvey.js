import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { loadSurveyToFill } from '../../../action/survey';
import Loading from '../../layout/Loading/Loading';
import { Form, FormGroup, Label, Input, FormText, Col } from 'reactstrap';
import { element } from 'prop-types';
class FillSurvey extends Component {
  state = {
    survey: []
  };
  componentDidMount = async () => {
    let som = 'MySeker';
    const title = 'MySeker';
    console.log(title);

    await this.props.loadSurveyToFill(title);
    this.setState({
      survey: [...this.props.survey]
    });
    console.log('=================================');

    console.log(this.state.survey);
    const ww = this.props.survey.map(element => {
      return element.isChoosenAnswer
        ? element.answers.map(ans => {
            return ans.answer;
          })
        : null;
    });
    console.log(ww);
  };

  render() {
    const s = this.props.survey;
    const customForm = this.props.loading ? (
      <Loading />
    ) : (
      this.state.survey.map(element => {
        return element.isChoosenAnswer ? (
          <Form>
            <FormGroup tag='fieldset' row>
              <legend className='col-form-label col-sm-2'>{`  ${element.qust}`}</legend>
              <Col sm={10}>
                {element.answers.map(ans => {
                  return (
                    <FormGroup check>
                      <Label check>
                        <Input type='radio' name={ans.answer} />{' '}
                        {`ANSWER: ${ans.answer}`}
                      </Label>
                    </FormGroup>
                  );
                })}
              </Col>
            </FormGroup>
          </Form>
        ) : (
          <Loading></Loading>
        );
      })
    );

    return <Fragment>{customForm};</Fragment>;
  }
}

const mapStateToProps = state => ({
  survey: state.survey.survey,
  isLoading: state.survey.loading
});

export default connect(mapStateToProps, { loadSurveyToFill })(FillSurvey);
