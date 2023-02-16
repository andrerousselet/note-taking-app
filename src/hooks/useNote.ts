import { useOutletContext } from "react-router-dom";
import { Note } from "../types/NoteTypes";

export default function useNote() {
  return useOutletContext<Note>();
}