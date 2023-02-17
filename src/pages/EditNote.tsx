import NoteForm from "../components/NoteForm";
import useNote from "../hooks/useNote";
import useNotes from "../contexts/notes/useNotes";

function EditNote() {
  const note = useNote();
  const { onUpdateNote } = useNotes();

  return (
    <>
      <h1 className="mb-4">Edit Note</h1>
      <NoteForm
        title={note.title}
        markdown={note.markdown}
        noteTags={note.noteTags}
        onSubmit={data => onUpdateNote(note.id, data)}
      />
    </>
  )
}

export default EditNote;