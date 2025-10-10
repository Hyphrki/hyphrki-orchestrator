import React from 'react';
import { Bot, Users, Workflow } from 'lucide-react';

interface Template {
  id: string;
  name: string;
  description: string;
  framework: string;
  language: string;
  icon: React.ComponentType<any>;
  code: string;
}

interface TemplateSelectorProps {
  onSelectTemplate: (template: Template) => void;
  className?: string;
}

const templates: Template[] = [
  {
    id: 'langgraph-basic',
    name: 'LangGraph Basic Agent',
    description: 'Simple stateful agent with graph-based execution',
    framework: 'langgraph',
    language: 'python',
    icon: Bot,
    code: `# LangGraph Basic Agent Template
from langgraph import StateGraph, END
from langchain_openai import ChatOpenAI
from typing import TypedDict, Annotated
import operator

# Define the state
class AgentState(TypedDict):
    messages: Annotated[list, operator.add]
    current_step: str

# Initialize LLM
llm = ChatOpenAI(temperature=0.7)

# Define nodes
def analyze_input(state: AgentState) -> AgentState:
    """Analyze user input and determine next steps"""
    messages = state["messages"]
    last_message = messages[-1] if messages else ""

    analysis = llm.invoke(f"Analyze this input and suggest next steps: {last_message}")

    return {
        **state,
        "current_step": "analyzed",
        "messages": messages + [analysis]
    }

def generate_response(state: AgentState) -> AgentState:
    """Generate final response"""
    messages = state["messages"]

    response = llm.invoke(f"Based on the analysis, provide a helpful response: {messages}")

    return {
        **state,
        "current_step": "responded",
        "messages": messages + [response]
    }

# Create the graph
workflow = StateGraph(AgentState)

# Add nodes
workflow.add_node("analyze", analyze_input)
workflow.add_node("respond", generate_response)

# Add edges
workflow.set_entry_point("analyze")
workflow.add_edge("analyze", "respond")
workflow.add_edge("respond", END)

# Compile the graph
app = workflow.compile()

# Example usage
if __name__ == "__main__":
    result = app.invoke({
        "messages": ["Hello, I need help with my project"],
        "current_step": "started"
    })
    print(result)
`,
  },
  {
    id: 'agno-multi-agent',
    name: 'Agno Multi-Agent System',
    description: 'High-performance multi-agent collaboration with memory',
    framework: 'agno',
    language: 'python',
    icon: Users,
    code: `# Agno Multi-Agent System Template
from agno.agent import Agent
from agno.models.openai import OpenAIChat
from agno.memory import AgentMemory
from agno.tools import Toolkit
from agno.knowledge import Knowledge
import os

# Set API key
os.environ["OPENAI_API_KEY"] = "your-api-key-here"

# Create knowledge base
knowledge = Knowledge(
    data="""Your knowledge base content here.
    Include information about your domain, processes, and capabilities.""",
    vector_store="chroma"
)

# Define specialized agents
research_agent = Agent(
    name="Research Agent",
    role="Research and gather information",
    model=OpenAIChat(id="gpt-4"),
    knowledge=knowledge,
    memory=AgentMemory(),
    instructions="""You are a research specialist.
    Your job is to:
    - Gather relevant information
    - Analyze data thoroughly
    - Provide comprehensive research findings
    - Ask clarifying questions when needed""",
    tools=[]
)

analysis_agent = Agent(
    name="Analysis Agent",
    role="Analyze data and provide insights",
    model=OpenAIChat(id="gpt-4"),
    knowledge=knowledge,
    memory=AgentMemory(),
    instructions="""You are an analysis specialist.
    Your job is to:
    - Analyze research findings
    - Identify patterns and trends
    - Provide actionable insights
    - Generate recommendations""",
    tools=[]
)

coordinator_agent = Agent(
    name="Coordinator Agent",
    role="Orchestrate multi-agent collaboration",
    model=OpenAIChat(id="gpt-4"),
    knowledge=knowledge,
    memory=AgentMemory(),
    instructions="""You are the coordinator.
    Your job is to:
    - Delegate tasks to appropriate agents
    - Synthesize responses from multiple agents
    - Ensure quality and consistency
    - Provide final comprehensive answers""",
    team=[research_agent, analysis_agent],
    tools=[]
)

# Example usage
if __name__ == "__main__":
    response = coordinator_agent.run(
        "Analyze the latest trends in AI agent development and provide recommendations"
    )
    print(response)
`,
  },
  {
    id: 'crewai-collaboration',
    name: 'CrewAI Collaboration Crew',
    description: 'Multi-agent crew with specialized roles and tasks',
    framework: 'crewai',
    language: 'python',
    icon: Users,
    code: `# CrewAI Collaboration Crew Template
from crewai import Agent, Task, Crew, Process
from crewai_tools import SerperDevTool
from langchain_openai import ChatOpenAI
import os

# Set API key
os.environ["OPENAI_API_KEY"] = "your-api-key-here"

# Initialize LLM
llm = ChatOpenAI(model="gpt-4", temperature=0.7)

# Define agents with specific roles
researcher = Agent(
    role="Senior Research Analyst",
    goal="Conduct thorough research and analysis",
    backstory="""You are an experienced research analyst with expertise in
    gathering and analyzing information from various sources.
    You excel at finding patterns and insights.""",
    llm=llm,
    tools=[SerperDevTool()],
    verbose=True
)

writer = Agent(
    role="Content Writer",
    goal="Create engaging and informative content",
    backstory="""You are a skilled content writer who can transform
    complex information into clear, engaging narratives.
    You know how to structure content for maximum impact.""",
    llm=llm,
    verbose=True
)

reviewer = Agent(
    role="Quality Assurance Specialist",
    goal="Ensure quality and accuracy of all outputs",
    backstory="""You are a meticulous quality assurance specialist
    who reviews work for accuracy, clarity, and completeness.
    You catch errors and suggest improvements.""",
    llm=llm,
    verbose=True
)

# Define tasks
research_task = Task(
    description="""Research the topic thoroughly and provide comprehensive findings.
    Include relevant data, statistics, and key insights.""",
    expected_output="A detailed research report with findings and analysis",
    agent=researcher
)

writing_task = Task(
    description="""Using the research findings, create engaging content that
    explains the topic clearly and provides value to the reader.""",
    expected_output="Well-structured, engaging content based on research",
    agent=writer,
    context=[research_task]
)

review_task = Task(
    description="""Review the content for accuracy, clarity, and quality.
    Provide feedback and suggest improvements if needed.""",
    expected_output="Quality assessment and improvement suggestions",
    agent=reviewer,
    context=[research_task, writing_task]
)

# Create and run the crew
crew = Crew(
    agents=[researcher, writer, reviewer],
    tasks=[research_task, writing_task, review_task],
    process=Process.sequential,
    verbose=True
)

# Example usage
if __name__ == "__main__":
    result = crew.kickoff(
        inputs={"topic": "The impact of AI agents on modern workflows"}
    )
    print(result)
`,
  },
  {
    id: 'n8n-workflow',
    name: 'n8n Workflow Automation',
    description: 'Visual workflow automation with AI capabilities',
    framework: 'n8n',
    language: 'javascript',
    icon: Workflow,
    code: `// n8n Workflow Automation Template
// This is a JavaScript representation of an n8n workflow
// In actual n8n, this would be a visual workflow

const workflow = {
  name: "AI Agent Workflow",
  nodes: [
    {
      id: "webhook",
      type: "n8n-nodes-base.webhook",
      parameters: {
        httpMethod: "POST",
        path: "agent-trigger",
        responseMode: "responseNode",
      },
      position: [100, 100],
    },
    {
      id: "openai",
      type: "n8n-nodes-base.openAi",
      parameters: {
        model: "gpt-4",
        prompt: "={{ $json.input }}",
        temperature: 0.7,
      },
      position: [300, 100],
    },
    {
      id: "function",
      type: "n8n-nodes-base.function",
      parameters: {
        functionCode: "// Process AI response\\nconst response = items[0].json.choices[0].message.content;\\n\\n// Extract key information\\nconst processedData = {\\n  originalInput: items[0].json.input,\\n  aiResponse: response,\\n  timestamp: new Date().toISOString(),\\n  processed: true\\n};\\n\\nreturn [processedData];",
      },
      position: [500, 100],
    },
    {
      id: "slack",
      type: "n8n-nodes-base.slack",
      parameters: {
        resource: "message",
        operation: "post",
        channel: "#ai-agent-responses",
        text: "={{ $json.aiResponse }}",
      },
      position: [700, 100],
    }
  ],
  connections: {
    "webhook": {
      main: [
        [
          {
            node: "openai",
            type: "main",
            index: 0
          }
        ]
      ]
    },
    "openai": {
      main: [
        [
          {
            node: "function",
            type: "main",
            index: 0
          }
        ]
      ]
    },
    "function": {
      main: [
        [
          {
            node: "slack",
            type: "main",
            index: 0
          }
        ]
      ]
    }
  },
  settings: {
    saveManualExecutions: true,
    timezone: "Europe/Berlin",
    executionTimeout: 3600,
  }
};

// Export the workflow configuration
module.exports = workflow;

// Usage example (in a Node.js environment)
// const n8nApi = require('n8n-api');
// const client = new n8nApi.Client({ baseUrl: 'http://localhost:5678' });
//
// client.workflows.create(workflow)
//   .then(result => console.log('Workflow created:', result.id))
//   .catch(error => console.error('Error:', error));
`,
  },
];

export const TemplateSelector: React.FC<TemplateSelectorProps> = ({
  onSelectTemplate,
  className,
}) => {
  return (
    <div className={`bg-gray-800 border-r border-gray-700 p-4 ${className}`}>
      <h3 className="text-lg font-medium text-gray-300 mb-4">Code Templates</h3>

      <div className="space-y-3">
        {templates.map((template) => {
          const IconComponent = template.icon;

          return (
            <div
              key={template.id}
              onClick={() => onSelectTemplate(template)}
              className="bg-gray-700 hover:bg-gray-600 rounded-lg p-3 cursor-pointer transition-colors border border-gray-600 hover:border-gray-500"
            >
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                    <IconComponent className="w-5 h-5 text-white" />
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-white truncate">
                    {template.name}
                  </h4>
                  <p className="text-xs text-gray-400 mt-1">
                    {template.description}
                  </p>
                  <div className="flex items-center space-x-2 mt-2">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-600 text-gray-300 capitalize">
                      {template.framework}
                    </span>
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-600 text-gray-300">
                      {template.language}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
