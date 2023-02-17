import { createContext } from "react";
import { Tag } from "../../types/NoteTypes";

type TagsContextType = {
  tags: Tag[],
  onAddTag: (tag: Tag) => void,
  onUpdateTag: (id: string, label: string) => void,
  onDeleteTag: (id: string) => void,
}

const TagsContext = createContext<TagsContextType>({} as TagsContextType);

export default TagsContext;