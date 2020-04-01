import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { loadSurveyToFill, fillSurveyCom } from '../../../action/survey';
import Loading from '../../layout/Loading/Loading';
import {
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  Col,
  Row,
  Container,
  Button
} from 'reactstrap';

class FillSurvey extends Component {
  state = {
    title: '',
    survey: []
  };

  componentDidMount = async () => {
    const title = 's7';

    await this.props.loadSurveyToFill(this.props.match.params.title.toString());
    console.log(this.props.match.params);

    const surveyQuts = this.props.survey.map((el, index) => {
      return {
        qut: {
          qust: el.qust,

          isChoosenAnswer: el.isChoosenAnswer,
          index: index,
          answers: [...el.answers]
        }
      };
    });

    console.log(surveyQuts);

    this.setState({
      title: this.props.match.params.title.toString(),
      newSurvey: [...this.props.survey],
      survey: [...surveyQuts]
    });

    const ww = this.props.survey.map(element => {
      return element.isChoosenAnswer
        ? element.answers.map(ans => {
            return ans.answer;
          })
        : null;
    });
    console.log(ww);
  };
  onChengeHandler = e => {
    let index = this.state.survey.findIndex(x => x.qut.qust == e.target.name);
    console.log(this.state.survey);
    console.log(e.target.name);

    let theChoosenIndex = this.state.survey[index].qut.answers.findIndex(
      x => x.answer === e.target.value
    );
    this.setState({
      ...this.state.survey[index].qut.answers.forEach(x => (x.choosen = false))
    });

    this.setState({
      ...(this.state.survey[index].qut.answers[theChoosenIndex].choosen = true)
    });
    console.log(this.state.survey[index].qut.answers);
    console.log(this.state.survey[index].qut.answers[theChoosenIndex]);
    console.log(this.state.survey);
  };

  onChengeTextHandler = e => {
    let name = e.target.name;

    let index = this.state.survey.findIndex(x => x.qut.qust == name);

    this.setState({
      ...(this.state.survey[index].qut.answers[0].answer = e.target.value)
    });
  };

  SubmitTheSurvey = e => {
    e.preventDefault();

    this.props.fillSurveyCom(
      this.props.match.params.title.toString(),
      this.state.survey
    );
  };
  render() {
    const s = this.props.survey;
    const customForm = this.props.loading ? (
      <Loading></Loading>
    ) : (
      <Fragment>
        <h1>{this.state.title}</h1>
        <Form>
          {this.props.isLoading ? <Loading></Loading> : null}
          {this.state.survey.map(element => {
            return element.qut.isChoosenAnswer ? (
              <FormGroup style={{ height: '100%' }} tag='fieldset'>
                <legend>{`  ${element.qut.qust}`}</legend>
                <ul>
                  {element.qut.answers.map(ans => {
                    return (
                      <Container>
                        <li>
                          <FormGroup check>
                            <Label
                              check
                              style={{ width: '20rem', marginLeft: '0.3rem' }}
                            >
                              <Input
                                style={{ width: '1rem' }}
                                type='radio'
                                value={ans.answer}
                                name={element.qut.qust}
                                onChange={e => this.onChengeHandler(e)}
                              />
                              {'   '}
                              {`ANSWER: ${ans.answer}`}
                            </Label>
                            <br />
                          </FormGroup>
                        </li>
                      </Container>
                    );
                  })}
                </ul>
              </FormGroup>
            ) : (
              <FormGroup style={{ height: '100%' }} tag='fieldset'>
                <legend>{`  ${element.qut.qust}`}</legend>
                <ul>
                  {element.qut.answers.map(ans => {
                    return (
                      <Container>
                        <li>
                          <FormGroup check>
                            <Label
                              check
                              style={{ width: '20rem', marginLeft: '0.3rem' }}
                            >
                              <Input
                                style={{ width: '14rem', marginTop: '1rem' }}
                                type='text'
                                name={element.qut.qust}
                                value={ans.answer}
                                onChange={e => this.onChengeTextHandler(e)}
                              />
                              {'   '}
                              {`ANSWER: ${ans.answer}`}
                            </Label>
                            <br />
                          </FormGroup>
                        </li>
                      </Container>
                    );
                  })}
                </ul>
              </FormGroup>
            );
          })}
          <Button onClick={e => this.SubmitTheSurvey(e)} color='primary'>
            שלח
          </Button>{' '}
        </Form>
      </Fragment>
    );

    return <div>{this.props.loading ? <Loading></Loading> : customForm}</div>;
  }
}

const mapStateToProps = state => ({
  survey: state.survey.survey,
  isLoading: state.survey.loading
});

export default connect(mapStateToProps, { loadSurveyToFill, fillSurveyCom })(
  FillSurvey
);
