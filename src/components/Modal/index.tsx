import React, { useEffect, useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const AlertModal = (props:any) => {
  
  const {title, content, closeModal, cancelBtnHandler, show } = props;
  const [modal, setModal] = useState(false);

  useEffect(() => {
    if (show)  {
      setModal(show);
    }
  }, [show])

  function toggle() {
    closeModal(!modal);
    return setModal(!modal);
  }

  return (
      <Modal isOpen={modal} toggle={toggle} {...props}  backdrop={'static'} centered={true}>
        <ModalHeader toggle={toggle}>
          <div dangerouslySetInnerHTML={{__html: props.title}} />
        </ModalHeader>
        <ModalBody>
          <div dangerouslySetInnerHTML={{__html: content}} />
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggle}>
            Ok
          </Button>{' '}
        </ModalFooter>
      </Modal>
  );
}

export default AlertModal;