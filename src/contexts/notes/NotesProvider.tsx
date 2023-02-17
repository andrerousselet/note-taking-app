import NotesContext from "./NotesContext";
import useLocalStorage from "../../hooks/useLocalStorage";
import { NoteData, RawNote } from "../../types/NoteTypes";
import { v4 as uuidv4 } from "uuid";

type NotesProviderProps = {
  children: React.ReactElement
}

function NotesProvider({ children }: NotesProviderProps) {
  const [notes, setNotes] = useLocalStorage<RawNote[]>("NOTES", []);

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

  const contextValue = {
    notes,
    onCreateNote,
    onUpdateNote,
    onDeleteNote,
  }

  return (
    <NotesContext.Provider value={contextValue}>
      {children}
    </NotesContext.Provider>
  )
}

export default NotesProvider;