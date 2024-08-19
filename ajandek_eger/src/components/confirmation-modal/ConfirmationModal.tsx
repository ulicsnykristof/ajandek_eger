import { Button, Modal } from "react-bootstrap";

function ConfirmationModal(props: any) {
  return (
    <>
      <Modal show={props.show} onHide={props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{props.moadlTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{props.moadlBody}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.handleClose}>
            {props.moadlCancel}
          </Button>
          <Button variant="primary" onClick={props.onSubmit}>
            {props.moadlConfirm}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ConfirmationModal;
