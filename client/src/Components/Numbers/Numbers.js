import React from 'react';

import { Card, CardTitle, CardText, CardImg, CardImgOverlay } from 'reactstrap';

const Numbers = props => {
  return (
    <div>
      <Card
        inverse
        style={{
          boxShadow: ' 2px 6px 14px black',
          marginLeft: '0.5rem'
        }}
      >
        <CardImg
          height='100%'
          width='100%'
          src={require('../../img/c.jpg')}
          alt='Card image cap'
        />
        <CardImgOverlay>
          <CardTitle style={{ fontSize: '2.9rem', fontWeight: 'bolder' }}>
            פרסים
          </CardTitle>
          <CardText
            style={{ fontWeight: 'bolder', fontSize: '1.5rem' }}
            color='black'
            dir='rtl'
          >
            מעל 2500 פרסים חולקו החודש
          </CardText>
        </CardImgOverlay>
      </Card>
    </div>
  );
};
Numbers.propTypes = {};

export default Numbers;
