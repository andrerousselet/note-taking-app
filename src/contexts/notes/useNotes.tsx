import { useContext } from "react";
import NotesContext from "./NotesContext";

export default function useNotes() {
  return useContext(NotesContext);
}