import React, { useState } from 'react';
import { ChevronRight, ChevronDown, File, Folder, FolderOpen, Plus, Trash2 } from 'lucide-react';

interface FileNode {
  name: string;
  type: 'file' | 'folder';
  children?: FileNode[];
  content?: string;
  language?: string;
}

interface FileExplorerProps {
  files: FileNode[];
  selectedFile: string | null;
  onFileSelect: (filePath: string, content: string, language: string) => void;
  onCreateFile: (parentPath: string) => void;
  onDeleteFile: (filePath: string) => void;
  className?: string;
}

const FileTreeNode: React.FC<{
  node: FileNode;
  path: string;
  level: number;
  selectedFile: string | null;
  onFileSelect: (filePath: string, content: string, language: string) => void;
  onCreateFile: (parentPath: string) => void;
  onDeleteFile: (filePath: string) => void;
}> = ({ node, path, level, selectedFile, onFileSelect, onCreateFile, onDeleteFile }) => {
  const [isExpanded, setIsExpanded] = useState(level < 2);
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    if (node.type === 'folder') {
      setIsExpanded(!isExpanded);
    } else if (node.content && node.language) {
      onFileSelect(path, node.content, node.language);
    }
  };


  const indent = level * 16;

  return (
    <div>
      <div
        className={`flex items-center py-1 px-2 hover:bg-gray-700 cursor-pointer group ${
          selectedFile === path ? 'bg-blue-600 text-white' : 'text-gray-300'
        }`}
        style={{ paddingLeft: `${indent + 8}px` }}
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex items-center flex-1 min-w-0">
          {node.type === 'folder' ? (
            <>
              {isExpanded ? (
                <ChevronDown className="w-4 h-4 mr-1 flex-shrink-0" />
              ) : (
                <ChevronRight className="w-4 h-4 mr-1 flex-shrink-0" />
              )}
              {isExpanded ? (
                <FolderOpen className="w-4 h-4 mr-2 flex-shrink-0 text-yellow-400" />
              ) : (
                <Folder className="w-4 h-4 mr-2 flex-shrink-0 text-yellow-400" />
              )}
            </>
          ) : (
            <>
              <File className="w-4 h-4 mr-2 flex-shrink-0 text-gray-400" />
            </>
          )}

          <span className="truncate text-sm">{node.name}</span>
        </div>

        {isHovered && node.type === 'folder' && (
          <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onCreateFile(path);
              }}
              className="p-1 text-gray-400 hover:text-green-400 transition-colors"
              title="Create file"
            >
              <Plus className="w-3 h-3" />
            </button>
          </div>
        )}

        {isHovered && (
          <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDeleteFile(path);
              }}
              className="p-1 text-gray-400 hover:text-red-400 transition-colors"
              title="Delete"
            >
              <Trash2 className="w-3 h-3" />
            </button>
          </div>
        )}
      </div>

      {node.type === 'folder' && isExpanded && node.children && (
        <div>
          {node.children.map((child) => (
            <FileTreeNode
              key={`${path}/${child.name}`}
              node={child}
              path={`${path}/${child.name}`}
              level={level + 1}
              selectedFile={selectedFile}
              onFileSelect={onFileSelect}
              onCreateFile={onCreateFile}
              onDeleteFile={onDeleteFile}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export const FileExplorer: React.FC<FileExplorerProps> = ({
  files,
  selectedFile,
  onFileSelect,
  onCreateFile,
  onDeleteFile,
  className,
}) => {
  return (
    <div className={`bg-gray-800 border-r border-gray-700 flex flex-col ${className}`}>
      <div className="flex items-center justify-between p-3 border-b border-gray-700">
        <h3 className="text-sm font-medium text-gray-300">Files</h3>
        <button
          onClick={() => onCreateFile('')}
          className="p-1 text-gray-400 hover:text-green-400 transition-colors"
          title="Create new file"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      <div className="flex-1 overflow-auto">
        {files.map((file) => (
          <FileTreeNode
            key={file.name}
            node={file}
            path={file.name}
            level={0}
            selectedFile={selectedFile}
            onFileSelect={onFileSelect}
            onCreateFile={onCreateFile}
            onDeleteFile={onDeleteFile}
          />
        ))}
      </div>
    </div>
  );
};
