import { NoteData, Tag } from "../types/NoteTypes";
import NoteForm from "../components/NoteForm";
import useNote from "../hooks/useNote";
import useNotes from "../contexts/notes/useNotes";

type EditNoteProps = {
  onAddTag: (tag: Tag) => void,
  availableTags: Tag[],
}

function EditNote({ onAddTag, availableTags }: EditNoteProps) {
  const note = useNote();
  const { onUpdateNote } = useNotes();

  return (
    <>
      <h1 className="mb-4">Edit Note</h1>
      <NoteForm
        title={note.title}
        markdown={note.markdown}
        tags={note.tags}
        onSubmit={data => onUpdateNote(note.id, data)}
        onAddTag={onAddTag}
        availableTags={availableTags}
      />
    </>
  )
}

export default EditNote;