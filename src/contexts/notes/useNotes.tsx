import { useContext } from "react";
import { RawNote } from "../../types/NoteTypes";
import NotesContext from "./NotesContext";

export default function useNotesContext() {
  const notesContext = useContext(NotesContext);
  return { ...notesContext, notes: [] as RawNote[] }
}