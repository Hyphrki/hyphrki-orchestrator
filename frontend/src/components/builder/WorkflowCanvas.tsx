import React, { useCallback, useState } from 'react';
import {
  ReactFlow,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  MiniMap,
  Background,
  BackgroundVariant,
  Panel,
} from '@xyflow/react';
import type { Node, Edge, Connection } from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import { AgentNode } from './nodes/AgentNode';
import { TaskNode } from './nodes/TaskNode';
import { DecisionNode } from './nodes/DecisionNode';
import { DataNode } from './nodes/DataNode';
import { Toolbar } from './Toolbar';
import { PropertiesPanel } from './PropertiesPanel';

const nodeTypes = {
  agent: AgentNode,
  task: TaskNode,
  decision: DecisionNode,
  data: DataNode,
};

const initialNodes: Node[] = [
  {
    id: '1',
    type: 'agent',
    position: { x: 250, y: 25 },
    data: {
      label: 'Start Agent',
      framework: 'langgraph',
      config: { temperature: 0.7 },
    },
  },
];

const initialEdges: Edge[] = [];

interface WorkflowCanvasProps {
  className?: string;
}

export const WorkflowCanvas: React.FC<WorkflowCanvasProps> = ({ className }) => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const onNodeClick = useCallback((_event: React.MouseEvent, node: Node) => {
    setSelectedNodeId(node.id);
  }, []);

  const addNode = useCallback((type: string, position: { x: number; y: number }) => {
    const newNode: Node = {
      id: `${nodes.length + 1}`,
      type,
      position,
      data: {
        label: `${type.charAt(0).toUpperCase() + type.slice(1)} Node`,
        ...(type === 'agent' && {
          framework: 'langgraph',
          config: { temperature: 0.7 },
        }),
        ...(type === 'task' && {
          taskType: 'llm_call',
          parameters: {},
        }),
        ...(type === 'decision' && {
          condition: 'value > 0',
        }),
        ...(type === 'data' && {
          dataType: 'text',
          value: '',
        }),
      },
    };
    setNodes((nds) => nds.concat(newNode));
  }, [nodes.length, setNodes]);

  const selectedNode = nodes.find(node => node.id === selectedNodeId);

  return (
    <div className={`h-full w-full relative ${className}`}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        nodeTypes={nodeTypes}
        fitView
        attributionPosition="bottom-left"
      >
        <Controls />
        <MiniMap
          nodeColor={(node) => {
            switch (node.type) {
              case 'agent':
                return '#3b82f6';
              case 'task':
                return '#10b981';
              case 'decision':
                return '#f59e0b';
              case 'data':
                return '#8b5cf6';
              default:
                return '#6b7280';
            }
          }}
        />
        <Background variant={BackgroundVariant.Dots} gap={12} size={1} />

        <Panel position="top-left" data-testid="canvas-toolbar">
          <Toolbar onAddNode={addNode} />
        </Panel>

        {selectedNode && (
          <Panel position="top-right">
            <PropertiesPanel
              node={selectedNode}
              onUpdate={(updates) => {
                setNodes((nds) =>
                  nds.map((node) =>
                    node.id === selectedNodeId
                      ? { ...node, data: { ...node.data, ...updates } }
                      : node
                  )
                );
              }}
              onClose={() => setSelectedNodeId(null)}
            />
          </Panel>
        )}
      </ReactFlow>
    </div>
  );
};
