import "bootstrap/dist/css/bootstrap.min.css"
import { useMemo } from "react";
import { Container } from "react-bootstrap"
import { Navigate, Route, Routes } from "react-router-dom"
import NewNote from "./pages/NewNote"
import useLocalStorage from "./hooks/useLocalStorage";
import { NoteData, RawNote, Tag } from "./types/NoteTypes";
import { v4 as uuidv4 } from "uuid";
import NoteList from "./pages/NoteList";
import NoteLayout from "./components/NoteLayout";
import Note from "./pages/Note";
import EditNote from "./pages/EditNote";

function App() {
  const [notes, setNotes] = useLocalStorage<RawNote[]>("NOTES", []);
  const [tags, setTags] = useLocalStorage<Tag[]>("TAGS", []);

  const notesWithTags = useMemo(() => {
    return notes.map(note => ({ ...note, tags: tags.filter(tag => note.tagIds.includes(tag.id)) }));
  }, [notes, tags]);

  const onCreateNote = ({ tags, ...data }: NoteData) => {
    setNotes(prevNotes => ([
      ...prevNotes,
      { ...data, id: uuidv4(), tagIds: tags.map(tag => tag.id) }
    ]));
  };

  const onUpdateNote = (id: string, { tags, ...data }: NoteData) => {
    setNotes(prevNotes => {
      return prevNotes.map(note => {
        if (note.id === id) return { ...note, ...data, tagIds: tags.map(tag => tag.id) };
        return note;
      });
    });
  };

  const onDeleteNote = (id: string) => {
    setNotes(prevNotes => {
      return prevNotes.filter(note => note.id !== id);
    });
  };

  const onAddTag = (tag: Tag) => {
    setTags(prev => [...prev, tag]);
  };

  const onUpdateTag = (id: string, label: string) => {
    setTags(prevTags => {
      return prevTags.map(tag => {
        if (tag.id === id) return { ...tag, label };
        return tag;
      });
    });
  };

  const onDeleteTag = (id: string) => {
    setTags(prevTags => {
      return prevTags.filter(tag => tag.id !== id);
    });
  };

  return (
    <Container className="my-4">
      <Routes>
        <Route
          path="/"
          element={
            <NoteList
              notes={notesWithTags}
              availableTags={tags}
              onUpdateTag={onUpdateTag}
              onDeleteTag={onDeleteTag}
            />
          }
        />
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
        <Route path="/:id" element={<NoteLayout notes={notesWithTags} />}>
          <Route
            index
            element={
              <Note onDelete={onDeleteNote} />
            }
          />
          <Route
            path="edit"
            element={
              <EditNote
                onSubmit={onUpdateNote}
                onAddTag={onAddTag}
                availableTags={tags}
              />
            }
          />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Container>
  )
}

export default App
