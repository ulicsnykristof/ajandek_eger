import { Button, Modal } from "react-bootstrap";

function AlertModal(props: any) {
  return (
    <>
      <Modal show={props.show} onHide={props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{props.moadlTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{props.moadlBody}</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={props.handleClose}>
            Ok
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AlertModal;
