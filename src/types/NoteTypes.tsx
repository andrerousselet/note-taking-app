export type Tag = {
  id: string,
  label: string,
}

export type NoteData = {
  title: string,
  markdown: string,
  tags: Tag[],
}

export type Note = NoteData & {
  id: string,
}