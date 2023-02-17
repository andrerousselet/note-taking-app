import { Button, Col, Form, Modal, Row, Stack } from "react-bootstrap";
import useTags from "../contexts/tags/useTags";

type EditTagsModalProps = {
  show: boolean,
  handleClose: () => void,
}

function EditTagsModal({ show, handleClose }: EditTagsModalProps) {
  const { tags, onUpdateTag, onDeleteTag } = useTags();

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit Tags</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Stack gap={2}>
            {tags.map(tag => (
              <Row key={tag.id} >
                <Col>
                  <Form.Control
                    type="text"
                    value={tag.label}
                    onChange={(e) => onUpdateTag(tag.id, e.target.value)}
                  />
                </Col>
                <Col xs="auto">
                  <Button
                    variant="outline-danger"
                    onClick={() => onDeleteTag(tag.id)}
                  >
                    &times;
                  </Button>
                </Col>
              </Row>
            ))}
          </Stack>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

export default EditTagsModal;