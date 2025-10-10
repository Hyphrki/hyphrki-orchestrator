import React, { useState } from 'react';
import { X, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { useCreateDeployment } from '../../hooks/useDeployments';
import { useNavigate } from 'react-router-dom';

interface DeployAgentModalProps {
  agent: any;
  isOpen: boolean;
  onClose: () => void;
}

const DeployAgentModal: React.FC<DeployAgentModalProps> = ({ agent, isOpen, onClose }) => {
  const navigate = useNavigate();
  const [deploymentName, setDeploymentName] = useState(`${agent.name} - Deployment`);
  const [parameters, setParameters] = useState<Record<string, any>>({});
  const createDeployment = useCreateDeployment();

  if (!isOpen) return null;

  const handleDeploy = async () => {
    try {
      await createDeployment.mutateAsync({
        agentTemplateId: agent.id,
        deploymentName,
        parameterValues: parameters,
      });
      onClose();
      navigate('/deployments');
    } catch (error) {
      console.error('Failed to deploy:', error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75" onClick={onClose}></div>
        <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full p-6">
          <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-500">
            <X className="w-6 h-6" />
          </button>

          <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Deploy Agent</h3>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Agent: {agent.name}
              </label>
              <p className="text-sm text-gray-600 dark:text-gray-400">{agent.description}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Deployment Name *
              </label>
              <input
                type="text"
                value={deploymentName}
                onChange={(e) => setDeploymentName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>

            {agent.parameters && agent.parameters.length > 0 && (
              <div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Parameters</h4>
                {agent.parameters.map((param: any) => (
                  <div key={param.id} className="mb-3">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      {param.displayLabel} {param.isRequired && '*'}
                    </label>
                    {param.helpText && (
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{param.helpText}</p>
                    )}
                    <input
                      type={param.fieldType === 'password' ? 'password' : param.fieldType === 'number' ? 'number' : 'text'}
                      defaultValue={param.defaultValue}
                      onChange={(e) => setParameters({ ...parameters, [param.parameterName]: e.target.value })}
                      required={param.isRequired}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                ))}
              </div>
            )}

            {createDeployment.isError && (
              <div className="flex items-center p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 mr-2" />
                <p className="text-sm text-red-800 dark:text-red-200">Failed to deploy agent</p>
              </div>
            )}

            <div className="flex justify-end space-x-3 pt-4">
              <button
                onClick={onClose}
                disabled={createDeployment.isPending}
                className="px-4 py-2 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={handleDeploy}
                disabled={createDeployment.isPending || !deploymentName}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center space-x-2"
              >
                {createDeployment.isPending && <Loader2 className="w-4 h-4 animate-spin" />}
                <span>Deploy</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeployAgentModal;
