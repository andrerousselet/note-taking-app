import useLocalStorage from "../../hooks/useLocalStorage";
import { NoteData, Tag } from "../../types/NoteTypes";
import { v4 as uuidv4 } from "uuid";
import TagsContext from "./TagsContext";

type TagsProviderProps = {
  children: React.ReactElement
}

function TagsProvider({ children }: TagsProviderProps) {
  const [tags, setTags] = useLocalStorage<Tag[]>("TAGS", []);

  const onAddTag = (tag: Tag) => {
    setTags(prev => [...prev, tag]);
  };

  const onUpdateTag = (id: string, label: string) => {
    setTags(prevTags => {
      return prevTags.map(tag => {
        if (tag.id === id) return { ...tag, label };
        return tag;
      });
    });
  };

  const onDeleteTag = (id: string) => {
    setTags(prevTags => {
      return prevTags.filter(tag => tag.id !== id);
    });
  };

  const contextValue = {
    tags,
    onAddTag,
    onUpdateTag,
    onDeleteTag,
  }

  return (
    <TagsContext.Provider value={contextValue}>
      {children}
    </TagsContext.Provider>
  )
}

export default TagsProvider;