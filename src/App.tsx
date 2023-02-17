import "bootstrap/dist/css/bootstrap.min.css"
import { useMemo } from "react";
import { Container } from "react-bootstrap"
import { Navigate, Route, Routes } from "react-router-dom"
import NewNote from "./pages/NewNote"
import NoteList from "./pages/NoteList";
import NoteLayout from "./components/NoteLayout";
import NoteDetails from "./pages/NoteDetails";
import EditNote from "./pages/EditNote";
import useNotes from "./contexts/notes/useNotes";
import useTags from "./contexts/tags/useTags";

function App() {
  const { notes } = useNotes();
  const { tags } = useTags();

  const notesWithTags = useMemo(() => {
    return notes.map(note => ({ ...note, noteTags: tags.filter(tag => note.tagIds.includes(tag.id)) }));
  }, [notes, tags]);

  return (
    <Container className="my-4">
      <Routes>
        <Route path="/" element={<NoteList notes={notesWithTags} />} />
        <Route path="/new" element={<NewNote />} />
        <Route path="/:id" element={<NoteLayout notes={notesWithTags} />}>
          <Route index element={<NoteDetails />} />
          <Route path="edit" element={<EditNote availableTags={tags} />} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Container>
  )
}

export default App;
