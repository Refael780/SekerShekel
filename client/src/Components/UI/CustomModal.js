import { connect } from 'react-redux';
import { setModal, remModel } from '../../action/modal';
import '../../App.css';
import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const CustomModal = props => {
  const { className } = props;

  const [modal, setModal] = useState(true);

  const toggle = () => setModal(!modal);

  return (
    props.modal !== null &&
    props.modal.length > 0 &&
    props.modal[0] !== null && (
      <div className='text-center' dir='rtl'>
        <Modal className='text-center' isOpen={modal} toggle={toggle}>
          <ModalHeader className='text-center' toggle={toggle}>
            השלמת תהליך ההרשמה
          </ModalHeader>
          <ModalBody className='text-center'>{props.modal[0].msg}</ModalBody>
          <ModalFooter>
            <Button
              color='primary'
              onClick={() => props.remModel(props.modal[0].id)}
            >
              אישור
            </Button>
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
