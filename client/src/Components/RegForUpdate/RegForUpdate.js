import { React, Fragment } from 'react';
import { Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { Animated } from 'react-animated-css';

import './RegForUpdate.css';

const RegForUpdate = () => {
  return (
    <div>
      <Fragment>
        <Animated
          animationIn='fadeIn'
          animationOut='fadeOut'
          animationInDuration={800}
          animationOutDuration={800}
          isVisible={true}
        >
          <Form className='borderX'>
            <FormGroup row>
              <Label for='exampleEmail' sm={2} size='lg'></Label>
              <Col sm={10}>
                <Input
                  className='borderX'
                  dir='rtl'
                  type='email'
                  name='email'
                  id='exampleEmail'
                  placeholder='אימייל'
                  color='primary'
                  bsSize='lg'
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col sm={10}>
                <Button color='primary' outline size='sm'>
                  הרשם
                </Button>
              </Col>
            </FormGroup>
          </Form>
        </Animated>
      </Fragment>
    </div>
  );
};

export default RegForUpdate;
