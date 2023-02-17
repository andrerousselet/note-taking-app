import { createContext } from "react";
import { NoteData, RawNote } from "../../types/NoteTypes";

type NotesContextType = {
  notes: RawNote[],
  onCreateNote: (data: NoteData) => void,
  onUpdateNote: (id: string, data: NoteData) => void,
  onDeleteNote: (id: string) => void,
}

const NotesContext = createContext<NotesContextType>({} as NotesContextType);

export default NotesContext;