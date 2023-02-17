import NoteForm from "../components/NoteForm";
import useNotes from "../contexts/notes/useNotes";

function NewNote() {
  const { onCreateNote } = useNotes();

  return (
    <>
      <h1 className="mb-4">New Note</h1>
      <NoteForm onSubmit={onCreateNote} />
    </>
  )
}

export default NewNote;