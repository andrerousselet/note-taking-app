import { Tag } from "../types/NoteTypes";
import NoteForm from "../components/NoteForm";

type NewNoteProps = {
  onAddTag: (tag: Tag) => void,
  availableTags: Tag[],
}

function NewNote({ onAddTag, availableTags }: NewNoteProps) {
  return (
    <>
      <h1 className="mb-4">New Note</h1>
      <NoteForm
        onAddTag={onAddTag}
        availableTags={availableTags}
      />
    </>
  )
}

export default NewNote