"use client"

import React, { useRef } from "react"
import { EditorContent, PureEditorContent } from "@tiptap/react"

import { useBlockEditor } from "../hooks/useBlockEditor"

import "@/styles/tiptap/index.css"

import {
  ContentItemMenu,
  LinkMenu,
  TextMenu,
} from "@/components/tiptap/components/menus"
import { Sidebar } from "@/components/tiptap/components/Sidebar"

import ImageBlockMenu from "../extensions/ImageBlock/components/ImageBlockMenu"
import { ColumnsMenu } from "../extensions/MultiColumn/menus"
import { TableColumnMenu, TableRowMenu } from "../extensions/Table/menus"
import { EditorHeader } from "./components/EditorHeader"

export const BlockEditor = () => {
  const menuContainerRef = useRef(null)
  const editorRef = useRef<PureEditorContent | null>(null)

  const { editor, characterCount, leftSidebar } = useBlockEditor()

  if (!editor) {
    return null
  }

  return (
    <div className="flex h-full" ref={menuContainerRef}>
      <Sidebar
        isOpen={leftSidebar.isOpen}
        onClose={leftSidebar.close}
        editor={editor}
      />
      <div className="relative flex h-full flex-1 flex-col overflow-hidden">
        <EditorHeader
          characters={characterCount.characters()}
          users={[]}
          words={characterCount.words()}
          isSidebarOpen={leftSidebar.isOpen}
          toggleSidebar={leftSidebar.toggle}
        />
        <EditorContent
          editor={editor}
          ref={editorRef}
          className="flex-1 overflow-y-auto"
        />
        <ContentItemMenu editor={editor} />
        <LinkMenu editor={editor} appendTo={menuContainerRef} />
        <TextMenu editor={editor} />
        <ColumnsMenu editor={editor} appendTo={menuContainerRef} />
        <TableRowMenu editor={editor} appendTo={menuContainerRef} />
        <TableColumnMenu editor={editor} appendTo={menuContainerRef} />
        <ImageBlockMenu editor={editor} appendTo={menuContainerRef} />
      </div>
    </div>
  )
}

export default BlockEditor
