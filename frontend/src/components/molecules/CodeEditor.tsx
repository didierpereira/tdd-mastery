/**
 * CodeEditor Component
 * Monaco-based code editor for TDD exercises
 */

"use client";

import Editor, { type OnMount } from "@monaco-editor/react";

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  language?: string;
  readOnly?: boolean;
  height?: string;
}

export function CodeEditor({
  value,
  onChange,
  language = "javascript",
  readOnly = false,
  height = "400px",
}: CodeEditorProps) {
  const handleEditorMount: OnMount = (editor, monaco) => {
    // Configure editor theme
    monaco.editor.defineTheme("tdd-dark", {
      base: "vs-dark",
      inherit: true,
      rules: [],
      colors: {
        "editor.background": "#0f172a",
      },
    });
    monaco.editor.setTheme("tdd-dark");
  };

  return (
    <Editor
      height={height}
      language={language}
      value={value}
      onChange={(value) => onChange(value || "")}
      onMount={handleEditorMount}
      options={{
        minimap: { enabled: false },
        fontSize: 14,
        lineNumbers: "on",
        scrollBeyondLastLine: false,
        readOnly,
        automaticLayout: true,
        tabSize: 2,
        padding: { top: 16 },
      }}
    />
  );
}
