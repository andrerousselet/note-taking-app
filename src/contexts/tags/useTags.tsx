import { useContext } from "react";
import TagsContext from "./TagsContext";

export default function useTags() {
  return useContext(TagsContext);
}