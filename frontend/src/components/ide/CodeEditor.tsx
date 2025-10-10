import React, { useRef, useState } from 'react';
import Editor from '@monaco-editor/react';
import type { Monaco } from '@monaco-editor/react';
import { Play, Save, Terminal, FolderOpen, FileText, Settings } from 'lucide-react';

interface CodeEditorProps {
  value: string;
  onChange: (value: string | undefined) => void;
  language: string;
  onLanguageChange: (language: string) => void;
  onExecute?: () => void;
  onSave?: () => void;
  className?: string;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({
  value,
  onChange,
  language,
  onLanguageChange,
  onExecute,
  onSave,
  className,
}) => {
  const editorRef = useRef<any>(null);
  const [isExecuting, setIsExecuting] = useState(false);
  const [output, setOutput] = useState<string>('');

  const languages = [
    { value: 'python', label: 'Python', frameworks: ['langgraph', 'agno', 'crewai'] },
    { value: 'javascript', label: 'JavaScript', frameworks: ['n8n'] },
    { value: 'typescript', label: 'TypeScript', frameworks: ['n8n'] },
    { value: 'json', label: 'JSON', frameworks: ['all'] },
    { value: 'yaml', label: 'YAML', frameworks: ['n8n'] },
  ];

  const handleEditorDidMount = (editor: any, monaco: Monaco) => {
    editorRef.current = editor;

    // Configure Monaco Editor
    monaco.editor.defineTheme('orchestrator-dark', {
      base: 'vs-dark',
      inherit: true,
      rules: [],
      colors: {
        'editor.background': '#1f2937',
      },
    });

    monaco.editor.setTheme('orchestrator-dark');

    // Add custom language configurations
    monaco.languages.setMonarchTokensProvider('python', {
      tokenizer: {
        root: [
          [/\b(def|class|if|elif|else|for|while|try|except|finally|import|from|return|yield|async|await)\b/, 'keyword'],
          [/\b(True|False|None|self)\b/, 'keyword.control'],
          [/"([^"\\]|\\.)*$/, 'string.invalid'],
          [/"([^"\\]|\\.)*"/, 'string'],
          [/'([^'\\]|\\.)*$/, 'string.invalid'],
          [/'([^'\\]|\\.)*'/, 'string'],
          [/\d+/, 'number'],
          [/#.*$/, 'comment'],
        ],
      },
    });
  };

  const handleExecute = async () => {
    if (!onExecute) return;

    setIsExecuting(true);
    setOutput('Executing code...\n');

    try {
      await onExecute();
      setOutput(prev => prev + 'Execution completed successfully!\n');
    } catch (error) {
      setOutput(prev => prev + `Error: ${error}\n`);
    } finally {
      setIsExecuting(false);
    }
  };


  return (
    <div className={`flex flex-col h-full bg-gray-900 ${className}`}>
      {/* Toolbar */}
      <div className="flex items-center justify-between p-3 bg-gray-800 border-b border-gray-700">
        <div className="flex items-center space-x-2">
          <select
            value={language}
            onChange={(e) => onLanguageChange(e.target.value)}
            className="px-3 py-1 bg-gray-700 text-white rounded text-sm border border-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            {languages.map((lang) => (
              <option key={lang.value} value={lang.value}>
                {lang.label}
              </option>
            ))}
          </select>

          <button
            onClick={onSave}
            className="flex items-center space-x-1 px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded text-sm transition-colors"
          >
            <Save className="w-4 h-4" />
            <span>Save</span>
          </button>
        </div>

        <div className="flex items-center space-x-2">
          <button className="p-1 text-gray-400 hover:text-white transition-colors">
            <FolderOpen className="w-4 h-4" />
          </button>
          <button className="p-1 text-gray-400 hover:text-white transition-colors">
            <FileText className="w-4 h-4" />
          </button>
          <button className="p-1 text-gray-400 hover:text-white transition-colors">
            <Settings className="w-4 h-4" />
          </button>

          <button
            onClick={handleExecute}
            disabled={isExecuting}
            className="flex items-center space-x-1 px-3 py-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded text-sm transition-colors"
          >
            <Play className="w-4 h-4" />
            <span>{isExecuting ? 'Running...' : 'Run'}</span>
          </button>
        </div>
      </div>

      {/* Editor */}
      <div className="flex-1 flex">
        <div className="flex-1">
          <Editor
            height="100%"
            language={language}
            value={value}
            onChange={onChange}
            onMount={handleEditorDidMount}
            options={{
              minimap: { enabled: true },
              fontSize: 14,
              lineNumbers: 'on',
              roundedSelection: false,
              scrollBeyondLastLine: false,
              automaticLayout: true,
              tabSize: 2,
              insertSpaces: true,
              wordWrap: 'on',
              theme: 'vs-dark',
              suggestOnTriggerCharacters: true,
              acceptSuggestionOnEnter: 'on',
              quickSuggestions: {
                other: true,
                comments: false,
                strings: true,
              },
            }}
          />
        </div>

        {/* Output Panel */}
        {output && (
          <div className="w-80 bg-gray-800 border-l border-gray-700 flex flex-col">
            <div className="flex items-center justify-between p-2 bg-gray-700 border-b border-gray-600">
              <div className="flex items-center space-x-1 text-gray-300">
                <Terminal className="w-4 h-4" />
                <span className="text-sm font-medium">Output</span>
              </div>
              <button
                onClick={() => setOutput('')}
                className="text-gray-400 hover:text-white text-sm"
              >
                Clear
              </button>
            </div>
            <div className="flex-1 p-3 overflow-auto">
              <pre className="text-sm text-gray-300 font-mono whitespace-pre-wrap">
                {output}
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
