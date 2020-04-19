import React from 'react';
import './CustomFooter.css';
import { Container, Row, Col } from 'reactstrap';
const CustomFooter = () => {
  return (
    <div>
      <Container className='cont' fluid>
        <Row>
          <Col>
            <div className='title'>יצירת קשר</div>
            <br />
            הגואל 31 בני ברק
            <br />
            טלפון:09-12323
            <br />
            sarew@zxc.co.il
          </Col>
          <Col>
            <div className='title'>מי אנחנו</div>
            <br />
            הגואל 31 בני ברק
            <br />
            טלפון:09-12323
            <br />
            sarew@zxc.co.il
          </Col>
          <Col>
            <div className='title'>מפת האתר</div>
            <br />
            הגואל 31 בני ברק
            <br />
            טלפון:09-12323
            <br />
            sarew@zxc.co.il
          </Col>
          <Col style={{ fontSize: '5rem' }}>
            <i className=' fa fas fa-money'></i>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default CustomFooter;
