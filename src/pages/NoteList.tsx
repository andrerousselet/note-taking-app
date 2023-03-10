import { useMemo, useState } from "react";
import { Button, Col, Form, Row, Stack } from "react-bootstrap"
import { Link } from "react-router-dom"
import ReactSelect from "react-select";
import { SimplifiedNote, Tag } from "../types/NoteTypes";
import NoteCard from "../components/NoteCard";
import EditTagsModal from "../components/EditTagsModal";
import useTags from "../contexts/tags/useTags";

type NoteListProps = {
  notes: SimplifiedNote[],
}

function NoteList({ notes }: NoteListProps) {
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [title, setTitle] = useState<string>("");
  const [editTagsModalisOpen, setEditTagsModalisOpen] = useState(false)
  const { tags } = useTags();

  const filteredNotes = useMemo(() => {
    return notes.filter(note => {
      return (title === "" || note.title.toLowerCase().includes(title.toLowerCase()))
        && (selectedTags.length === 0 || selectedTags.every(tag => note.noteTags.some(noteTag => noteTag.id === tag.id)))
    });
  }, [title, selectedTags, notes])

  return (
    <>
      <Row className="align-items-center mb-4">
        <Col><h1>Notes</h1></Col>
        <Col xs="auto">
          <Stack direction="horizontal" gap={2}>
            <Link to="/new">
              <Button>Create</Button>
            </Link>
            <Button
              variant="outline-secondary"
              onClick={() => setEditTagsModalisOpen(true)}
            >
              Edit Tags
            </Button>
          </Stack>
        </Col>
      </Row>
      <Form>
        <Row className="mb-4">
          <Col>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={title}
                onChange={e => setTitle(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="tags">
              <Form.Label>Tags</Form.Label>
              <ReactSelect
                value={selectedTags.map(tag => {
                  return { label: tag.label, value: tag.id }
                })}
                options={tags.map(tag => {
                  return { label: tag.label, value: tag.id }
                })}
                onChange={(tags) => {
                  setSelectedTags(
                    tags.map(tag => {
                      return { label: tag.label, id: tag.value }
                    })
                  )
                }}
                isMulti
              />
            </Form.Group>
          </Col>
        </Row>
      </Form>
      <Row xs={1} sm={2} lg={3} xl={4} className="g-3">
        {filteredNotes.map(note => (
          <Col key={note.id}>
            <NoteCard
              id={note.id}
              title={note.title}
              noteTags={note.noteTags}
            />
          </Col>
        ))}
      </Row>
      <EditTagsModal
        show={editTagsModalisOpen}
        handleClose={() => setEditTagsModalisOpen(false)}
      />
    </>
  )
}

export default NoteList