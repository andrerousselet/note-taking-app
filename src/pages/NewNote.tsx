import { Tag } from "../types/NoteTypes";
import NoteForm from "../components/NoteForm";
import useNotes from "../contexts/notes/useNotes";

type NewNoteProps = {
  onAddTag: (tag: Tag) => void,
  availableTags: Tag[],
}

function NewNote({ onAddTag, availableTags }: NewNoteProps) {
  const { onCreateNote } = useNotes();

  return (
    <>
      <h1 className="mb-4">New Note</h1>
      <NoteForm
        onSubmit={onCreateNote}
        onAddTag={onAddTag}
        availableTags={availableTags}
      />
    </>
  )
}

export default NewNote;