import React, { useState, useCallback } from 'react';
import { CodeEditor } from '../../components/ide/CodeEditor';
import { FileExplorer } from '../../components/ide/FileExplorer';
import { TemplateSelector } from '../../components/ide/TemplateSelector';
import { Play } from 'lucide-react';

interface FileNode {
  name: string;
  type: 'file' | 'folder';
  children?: FileNode[];
  content?: string;
  language?: string;
}

const IdePage: React.FC = () => {
  const [currentFile, setCurrentFile] = useState<string | null>(null);
  const [currentContent, setCurrentContent] = useState<string>('');
  const [currentLanguage, setCurrentLanguage] = useState<string>('python');
  const [files, setFiles] = useState<FileNode[]>([
    {
      name: 'agents',
      type: 'folder',
      children: [
        {
          name: 'basic_agent.py',
          type: 'file',
          content: `# Basic Agent Template
from langchain_openai import ChatOpenAI

class BasicAgent:
    def __init__(self):
        self.llm = ChatOpenAI(temperature=0.7)

    def run(self, input_text: str) -> str:
        response = self.llm.invoke(input_text)
        return response.content

if __name__ == "__main__":
    agent = BasicAgent()
    result = agent.run("Hello, how can I help you?")
    print(result)
`,
          language: 'python',
        },
        {
          name: 'crew_agent.py',
          type: 'file',
          content: `# CrewAI Agent Template
from crewai import Agent
from langchain_openai import ChatOpenAI

llm = ChatOpenAI(model="gpt-4")

agent = Agent(
    role="Assistant",
    goal="Help users with their tasks",
    backstory="You are a helpful AI assistant",
    llm=llm,
    verbose=True
)

if __name__ == "__main__":
    result = agent.run("Create a plan for learning Python")
    print(result)
`,
          language: 'python',
        },
      ],
    },
    {
      name: 'workflows',
      type: 'folder',
      children: [
        {
          name: 'simple_workflow.js',
          type: 'file',
          content: `// Simple n8n-style workflow
const workflow = {
  name: "Simple Workflow",
  nodes: [
    {
      id: "start",
      type: "start",
      position: [100, 100],
    },
    {
      id: "process",
      type: "function",
      position: [300, 100],
      parameters: {
        function: "return { processed: true, data: $input };"
      }
    },
    {
      id: "end",
      type: "end",
      position: [500, 100],
    }
  ]
};

console.log("Workflow defined:", workflow);
`,
          language: 'javascript',
        },
      ],
    },
    {
      name: 'config.json',
      type: 'file',
      content: `{
  "framework": "langgraph",
  "model": "gpt-4",
  "temperature": 0.7,
  "max_tokens": 1000,
  "api_keys": {
    "openai": "your-api-key-here"
  }
}`,
      language: 'json',
    },
  ]);

  const handleFileSelect = useCallback((filePath: string, content: string, language: string) => {
    setCurrentFile(filePath);
    setCurrentContent(content);
    setCurrentLanguage(language);
  }, []);

  const handleContentChange = useCallback((value: string | undefined) => {
    setCurrentContent(value || '');
  }, []);

  const handleLanguageChange = useCallback((language: string) => {
    setCurrentLanguage(language);
  }, []);

  const handleExecute = useCallback(async () => {
    // Simulate code execution
    console.log('Executing code:', currentContent);
    // In a real implementation, this would send the code to the backend for execution
    await new Promise(resolve => setTimeout(resolve, 2000));
  }, [currentContent]);

  const handleSave = useCallback(() => {
    console.log('Saving file:', currentFile, currentContent);
    // In a real implementation, this would save to the backend
  }, [currentFile, currentContent]);

  const handleCreateFile = useCallback((parentPath: string) => {
    const fileName = prompt('Enter file name:');
    if (!fileName) return;

    const newFile: FileNode = {
      name: fileName,
      type: 'file',
      content: '',
      language: 'python',
    };

    if (parentPath) {
      // Add to folder
      setFiles(prevFiles =>
        prevFiles.map(file => {
          if (file.name === parentPath && file.children) {
            return {
              ...file,
              children: [...(file.children || []), newFile],
            };
          }
          return file;
        })
      );
    } else {
      // Add to root
      setFiles(prevFiles => [...prevFiles, newFile]);
    }
  }, []);

  const handleDeleteFile = useCallback((filePath: string) => {
    if (!confirm(`Delete ${filePath}?`)) return;

    setFiles(prevFiles =>
      prevFiles.filter(file => file.name !== filePath)
    );

    if (currentFile === filePath) {
      setCurrentFile(null);
      setCurrentContent('');
    }
  }, [currentFile]);

  const handleSelectTemplate = useCallback((template: any) => {
    setCurrentContent(template.code);
    setCurrentLanguage(template.language);
    setCurrentFile(`new_${template.framework}_file.${template.language === 'python' ? 'py' : 'js'}`);
  }, []);

  return (
    <div className="h-screen flex flex-col bg-gray-900">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-100">
              Code-based Agent IDE
            </h1>
            <p className="text-gray-400">
              Write, test, and deploy AI agents with multi-language support
            </p>
          </div>

          <div className="flex items-center space-x-4">
            <div className="text-sm text-gray-400">
              {currentFile ? `Editing: ${currentFile}` : 'No file selected'}
            </div>

            <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
              <Play className="w-4 h-4" />
              <span>Deploy Agent</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Template Selector */}
        <TemplateSelector
          onSelectTemplate={handleSelectTemplate}
          className="w-80"
        />

        {/* File Explorer */}
        <FileExplorer
          files={files}
          selectedFile={currentFile}
          onFileSelect={handleFileSelect}
          onCreateFile={handleCreateFile}
          onDeleteFile={handleDeleteFile}
          className="w-64"
        />

        {/* Code Editor */}
        <div className="flex-1">
          <CodeEditor
            value={currentContent}
            onChange={handleContentChange}
            language={currentLanguage}
            onLanguageChange={handleLanguageChange}
            onExecute={handleExecute}
            onSave={handleSave}
          />
        </div>
      </div>
    </div>
  );
};

export default IdePage;
