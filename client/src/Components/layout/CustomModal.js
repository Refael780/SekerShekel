import { connect } from 'react-redux';
import { setModal, remModel } from '../../action/modal';

import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const CustomModal = props => {
  const { buttonLabel, className } = props;

  const [modal, setModal] = useState(true);

  const toggle = () => setModal(!modal);

  return (
    props.modal !== null &&
    props.modal.length > 0 && (
      <div dir='rtl'>
        {console.log(props.modal)}
        {console.log(props.modal.length)}

        <Modal isOpen={modal} toggle={toggle} className={className}>
          <ModalHeader toggle={toggle}>השלמת תהליך ההרשמה</ModalHeader>
          <ModalBody>{props.modal[0].msg}</ModalBody>
          <ModalFooter>
            <Button
              color='primary'
              onClick={() => props.remModel(props.modal[0].id)}
            >
              אישור
            </Button>{' '}
          </ModalFooter>
        </Modal>
      </div>
    )
  );
};

const mapStateToProps = state => ({
  modal: state.modal
});

export default connect(mapStateToProps, { setModal, remModel })(CustomModal);
