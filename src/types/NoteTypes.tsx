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

export type RawNote = RawNoteData & {
  id: string,
}

export type RawNoteData = {
  title: string,
  markdown: string,
  tagIds: string[],
}

export type SimplifiedNote = {
  id: string,
  title: string,
  tags: Tag[],
}