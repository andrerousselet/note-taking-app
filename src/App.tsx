import "bootstrap/dist/css/bootstrap.min.css"
import { useMemo } from "react";
import { Container } from "react-bootstrap"
import { Navigate, Route, Routes } from "react-router-dom"
import NewNote from "./components/NewNote"
import useLocalStorage from "./hooks/useLocalStorage";
import { NoteData, RawNote, Tag } from "./types/NoteTypes";
import { v4 as uuidv4 } from "uuid";
import NoteList from "./components/NoteList";

function App() {
  const [notes, setNotes] = useLocalStorage<RawNote[]>("NOTES", []);
  const [tags, setTags] = useLocalStorage<Tag[]>("TAGS", []);

  const notesWithTags = useMemo(() => {
    return notes.map(note => ({ ...note, tags: tags.filter(tag => note.tagIds.includes(tag.id)) }))
  }, [notes, tags]);

  const onCreateNote = ({ tags, ...data }: NoteData) => {
    setNotes(prevNotes => ([
      ...prevNotes,
      { ...data, id: uuidv4(), tagIds: tags.map(tag => tag.id) }
    ]))
  }

  const onAddTag = (tag: Tag) => {
    setTags(prev => [...prev, tag])
  }

  return (
    <Container className="my-4">
      <Routes>
        <Route path="/" element={<NoteList availableTags={tags} notes={notesWithTags} />} />
        <Route
          path="/new"
          element={
            <NewNote
              onSubmit={onCreateNote}
              onAddTag={onAddTag}
              availableTags={tags}
            />
          }
        />
        <Route path="/:id">
          <Route index element={<h1>Show</h1>} />
          <Route path="edit" element={<h1>Edit</h1>} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Container>
  )
}

export default App
