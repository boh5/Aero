import * as Y from "yjs"

export interface TiptapProps {
  ydoc: Y.Doc
}

export type EditorUser = {
  clientId: string
  name: string
  color: string
  initials?: string
}
