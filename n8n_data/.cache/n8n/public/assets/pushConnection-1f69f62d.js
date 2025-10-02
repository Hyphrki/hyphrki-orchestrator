import { e as externalHooks, n as nodeHelpers, w as workflowHelpers } from "./index-00f166b0.js";
import { ak as makeRestApiRequest, x as useRootStore, cO as useTitleChange, u as useToast, D as useCredentialsStore, G as useNodeTypesStore, n as useUIStore, H as useWorkflowsStore, y as useSettingsStore, b6 as useSegment, aA as codeNodeEditorEventBus, gl as globalLinkActionsEventBus, c$ as WORKFLOW_SETTINGS_MODAL_KEY, cQ as generateNodesGraph, d5 as getTriggerNodeServiceName } from "./n8n-8ddd8349.js";
import { d as defineStore, m as mapStores } from "./pinia-282957dc.js";
import { p as parse } from "./flatted-551ad821.js";
import { d as defineComponent } from "./vendor-fd4bd18c.js";
const GET_STATUS_ENDPOINT = "/orchestration/worker/status";
const sendGetWorkerStatus = async (context) => {
  await makeRestApiRequest(context, "POST", GET_STATUS_ENDPOINT);
};
const WORKER_HISTORY_LENGTH = 100;
const STALE_SECONDS = 120 * 1e3;
const useOrchestrationStore = defineStore("orchestrationManager", {
  state: () => ({
    workers: {},
    workersHistory: {},
    workersLastUpdated: {},
    statusInterval: null
  }),
  actions: {
    updateWorkerStatus(data) {
      this.workers[data.workerId] = data;
      if (!this.workersHistory[data.workerId]) {
        this.workersHistory[data.workerId] = [];
      }
      this.workersHistory[data.workerId].push({ data, timestamp: Date.now() });
      if (this.workersHistory[data.workerId].length > WORKER_HISTORY_LENGTH) {
        this.workersHistory[data.workerId].shift();
      }
      this.workersLastUpdated[data.workerId] = Date.now();
    },
    removeStaleWorkers() {
      for (const id in this.workersLastUpdated) {
        if (this.workersLastUpdated[id] + STALE_SECONDS < Date.now()) {
          delete this.workers[id];
          delete this.workersHistory[id];
          delete this.workersLastUpdated[id];
        }
      }
    },
    startWorkerStatusPolling() {
      const rootStore = useRootStore();
      if (!this.statusInterval) {
        this.statusInterval = setInterval(async () => {
          await sendGetWorkerStatus(rootStore.getRestApiContext);
          this.removeStaleWorkers();
        }, 1e3);
      }
    },
    stopWorkerStatusPolling() {
      if (this.statusInterval) {
        clearInterval(this.statusInterval);
        this.statusInterval = null;
      }
    },
    getWorkerLastUpdated(workerId) {
      return this.workersLastUpdated[workerId] ?? 0;
    },
    getWorkerStatus(workerId) {
      return this.workers[workerId];
    },
    getWorkerStatusHistory(workerId) {
      return this.workersHistory[workerId] ?? [];
    }
  }
});
const pushConnection = defineComponent({
  setup() {
    return {
      ...useTitleChange(),
      ...useToast()
    };
  },
  mixins: [externalHooks, nodeHelpers, workflowHelpers],
  data() {
    return {
      pushSource: null,
      reconnectTimeout: null,
      retryTimeout: null,
      pushMessageQueue: [],
      connectRetries: 0,
      lostConnection: false
    };
  },
  computed: {
    ...mapStores(
      useCredentialsStore,
      useNodeTypesStore,
      useUIStore,
      useWorkflowsStore,
      useSettingsStore,
      useSegment,
      useOrchestrationStore
    ),
    sessionId() {
      return this.rootStore.sessionId;
    }
  },
  methods: {
    attemptReconnect() {
      this.pushConnect();
    },
    /**
     * Connect to server to receive data via a WebSocket or EventSource
     */
    pushConnect() {
      this.pushDisconnect();
      if (this.reconnectTimeout) {
        clearTimeout(this.reconnectTimeout);
        this.reconnectTimeout = null;
      }
      const useWebSockets = this.settingsStore.pushBackend === "websocket";
      const { getRestUrl: restUrl } = this.rootStore;
      const url = `/push?sessionId=${this.sessionId}`;
      if (useWebSockets) {
        const { protocol, host } = window.location;
        const baseUrl = restUrl.startsWith("http") ? restUrl.replace(/^http/, "ws") : `${protocol === "https:" ? "wss" : "ws"}://${host + restUrl}`;
        this.pushSource = new WebSocket(`${baseUrl}${url}`);
      } else {
        this.pushSource = new EventSource(`${restUrl}${url}`, { withCredentials: true });
      }
      this.pushSource.addEventListener("open", this.onConnectionSuccess, false);
      this.pushSource.addEventListener("message", this.pushMessageReceived, false);
      this.pushSource.addEventListener(
        useWebSockets ? "close" : "error",
        this.onConnectionError,
        false
      );
    },
    onConnectionSuccess() {
      var _a;
      this.connectRetries = 0;
      this.lostConnection = false;
      this.rootStore.pushConnectionActive = true;
      try {
        this.clearAllStickyNotifications();
      } catch {
      }
      (_a = this.pushSource) == null ? void 0 : _a.removeEventListener("open", this.onConnectionSuccess);
    },
    onConnectionError() {
      this.pushDisconnect();
      this.connectRetries++;
      this.reconnectTimeout = setTimeout(
        this.attemptReconnect,
        Math.min(this.connectRetries * 2e3, 8e3)
        // maximum 8 seconds backoff
      );
    },
    /**
     * Close connection to server
     */
    pushDisconnect() {
      if (this.pushSource !== null) {
        this.pushSource.removeEventListener("error", this.onConnectionError);
        this.pushSource.removeEventListener("close", this.onConnectionError);
        this.pushSource.removeEventListener("message", this.pushMessageReceived);
        if (this.pushSource.readyState < 2)
          this.pushSource.close();
        this.pushSource = null;
      }
      this.rootStore.pushConnectionActive = false;
    },
    /**
     * Sometimes the push message is faster as the result from
     * the REST API so we do not know yet what execution ID
     * is currently active. So internally resend the message
     * a few more times
     */
    queuePushMessage(event, retryAttempts) {
      this.pushMessageQueue.push({ event, retriesLeft: retryAttempts });
      if (this.retryTimeout === null) {
        this.retryTimeout = setTimeout(this.processWaitingPushMessages, 20);
      }
    },
    /**
     * Process the push messages which are waiting in the queue
     */
    processWaitingPushMessages() {
      if (this.retryTimeout !== null) {
        clearTimeout(this.retryTimeout);
        this.retryTimeout = null;
      }
      const queueLength = this.pushMessageQueue.length;
      for (let i = 0; i < queueLength; i++) {
        const messageData = this.pushMessageQueue.shift();
        if (this.pushMessageReceived(messageData.event, true) === false) {
          messageData.retriesLeft -= 1;
          if (messageData.retriesLeft > 0) {
            this.pushMessageQueue.unshift(messageData);
          }
          break;
        }
      }
      if (this.pushMessageQueue.length !== 0 && this.retryTimeout === null) {
        this.retryTimeout = setTimeout(this.processWaitingPushMessages, 25);
      }
    },
    /**
     * Process a newly received message
     */
    async pushMessageReceived(event, isRetry) {
      var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _A;
      const retryAttempts = 5;
      let receivedData;
      try {
        receivedData = JSON.parse(event.data);
      } catch (error) {
        return false;
      }
      if (receivedData.type === "sendWorkerStatusMessage") {
        const pushData = receivedData.data;
        this.orchestrationManagerStore.updateWorkerStatus(pushData.status);
        return true;
      }
      if (receivedData.type === "sendConsoleMessage") {
        const pushData = receivedData.data;
        console.log(pushData.source, ...pushData.messages);
        return true;
      }
      if (!["testWebhookReceived"].includes(receivedData.type) && isRetry !== true && this.pushMessageQueue.length) {
        this.queuePushMessage(event, retryAttempts);
        return false;
      }
      if (receivedData.type === "nodeExecuteAfter" || receivedData.type === "nodeExecuteBefore") {
        if (!this.uiStore.isActionActive("workflowRunning")) {
          return false;
        }
        const pushData = receivedData.data;
        if (this.workflowsStore.activeExecutionId !== pushData.executionId) {
          if (isRetry !== true) {
            this.queuePushMessage(event, retryAttempts);
          }
          return false;
        }
      }
      let recoveredPushData = void 0;
      if (receivedData.type === "executionRecovered") {
        const recoveredExecutionId = (_a = receivedData.data) == null ? void 0 : _a.executionId;
        const isWorkflowRunning = this.uiStore.isActionActive("workflowRunning");
        if (isWorkflowRunning && this.workflowsStore.activeExecutionId === recoveredExecutionId) {
          const executionData = await this.workflowsStore.fetchExecutionDataById(
            this.workflowsStore.activeExecutionId
          );
          if (executionData == null ? void 0 : executionData.data) {
            executionData.data = parse(
              executionData.data
            );
            const iRunExecutionData = {
              startData: (_b = executionData.data) == null ? void 0 : _b.startData,
              resultData: ((_c = executionData.data) == null ? void 0 : _c.resultData) ?? { runData: {} },
              executionData: (_d = executionData.data) == null ? void 0 : _d.executionData
            };
            if (((_e = this.workflowsStore.workflowExecutionData) == null ? void 0 : _e.workflowId) === executionData.workflowId) {
              const activeRunData = (_h = (_g = (_f = this.workflowsStore.workflowExecutionData) == null ? void 0 : _f.data) == null ? void 0 : _g.resultData) == null ? void 0 : _h.runData;
              if (activeRunData) {
                for (const key of Object.keys(activeRunData)) {
                  iRunExecutionData.resultData.runData[key] = activeRunData[key];
                }
              }
            }
            const iRun = {
              data: iRunExecutionData,
              finished: executionData.finished,
              mode: executionData.mode,
              waitTill: (_i = executionData.data) == null ? void 0 : _i.waitTill,
              startedAt: executionData.startedAt,
              stoppedAt: executionData.stoppedAt,
              status: "crashed"
            };
            if (executionData.data) {
              recoveredPushData = {
                executionId: executionData.id,
                data: iRun
              };
            }
          }
        }
      }
      if (receivedData.type === "executionFinished" || receivedData.type === "executionRecovered") {
        let pushData;
        if (receivedData.type === "executionRecovered" && recoveredPushData !== void 0) {
          pushData = recoveredPushData;
        } else {
          pushData = receivedData.data;
        }
        if (this.workflowsStore.activeExecutionId === pushData.executionId) {
          const activeRunData = (_l = (_k = (_j = this.workflowsStore.workflowExecutionData) == null ? void 0 : _j.data) == null ? void 0 : _k.resultData) == null ? void 0 : _l.runData;
          if (activeRunData) {
            for (const key of Object.keys(activeRunData)) {
              if (((_s = (_r = (_q = (_p = (_o = (_n = (_m = pushData.data.data.resultData.runData[key]) == null ? void 0 : _m[0]) == null ? void 0 : _n.data) == null ? void 0 : _o.main) == null ? void 0 : _p[0]) == null ? void 0 : _q[0]) == null ? void 0 : _r.json) == null ? void 0 : _s.isArtificialRecoveredEventItem) === true && activeRunData[key].length > 0)
                pushData.data.data.resultData.runData[key] = activeRunData[key];
            }
          }
          this.workflowsStore.finishActiveExecution(pushData);
        }
        if (!this.uiStore.isActionActive("workflowRunning")) {
          return false;
        }
        if (this.workflowsStore.activeExecutionId !== pushData.executionId) {
          if (isRetry !== true) {
            this.queuePushMessage(event, retryAttempts);
          }
          return false;
        }
        const runDataExecuted = pushData.data;
        let runDataExecutedErrorMessage = this.getExecutionError(runDataExecuted.data);
        if (pushData.data.status === "crashed") {
          runDataExecutedErrorMessage = this.$locale.baseText(
            "pushConnection.executionFailed.message"
          );
        }
        const lineNumber = (_v = (_u = (_t = runDataExecuted == null ? void 0 : runDataExecuted.data) == null ? void 0 : _t.resultData) == null ? void 0 : _u.error) == null ? void 0 : _v.lineNumber;
        codeNodeEditorEventBus.emit("error-line-number", lineNumber || "final");
        const workflow = this.getCurrentWorkflow();
        if (runDataExecuted.waitTill !== void 0) {
          const activeExecutionId = this.workflowsStore.activeExecutionId;
          const workflowSettings = this.workflowsStore.workflowSettings;
          const saveManualExecutions = this.rootStore.saveManualExecutions;
          const isSavingExecutions = workflowSettings.saveManualExecutions === void 0 ? saveManualExecutions : workflowSettings.saveManualExecutions;
          let action;
          if (!isSavingExecutions) {
            globalLinkActionsEventBus.emit("registerGlobalLinkAction", {
              key: "open-settings",
              action: async () => {
                if (this.workflowsStore.isNewWorkflow)
                  await this.saveAsNewWorkflow();
                this.uiStore.openModal(WORKFLOW_SETTINGS_MODAL_KEY);
              }
            });
            action = '<a data-action="open-settings">Turn on saving manual executions</a> and run again to see what happened after this node.';
          } else {
            action = `<a href="/workflow/${workflow.id}/executions/${activeExecutionId}">View the execution</a> to see what happened after this node.`;
          }
          this.titleSet(workflow.name, "IDLE");
          this.showToast({
            title: "Workflow started waiting",
            message: `${action} <a href="https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.wait/" target="_blank">More info</a>`,
            type: "success",
            duration: 0
          });
        } else if (runDataExecuted.finished !== true) {
          this.titleSet(workflow.name, "ERROR");
          if (((_w = runDataExecuted.data.resultData.error) == null ? void 0 : _w.name) === "ExpressionError" && runDataExecuted.data.resultData.error.context.functionality === "pairedItem") {
            const error = runDataExecuted.data.resultData.error;
            void this.getWorkflowDataToSave().then((workflowData) => {
              const eventData = {
                caused_by_credential: false,
                error_message: error.description,
                error_title: error.message,
                error_type: error.context.type,
                node_graph_string: JSON.stringify(
                  generateNodesGraph(
                    workflowData,
                    this.getNodeTypes()
                  ).nodeGraph
                ),
                workflow_id: this.workflowsStore.workflowId
              };
              if (error.context.nodeCause && ["no pairing info", "invalid pairing info"].includes(error.context.type)) {
                const node = workflow.getNode(error.context.nodeCause);
                if (node) {
                  eventData.is_pinned = !!workflow.getPinDataOfNode(node.name);
                  eventData.mode = node.parameters.mode;
                  eventData.node_type = node.type;
                  eventData.operation = node.parameters.operation;
                  eventData.resource = node.parameters.resource;
                }
              }
              this.$telemetry.track("Instance FE emitted paired item error", eventData, {
                withPostHog: true
              });
            });
          }
          if (((_x = runDataExecuted.data.resultData.error) == null ? void 0 : _x.name) === "SubworkflowOperationError") {
            const error = runDataExecuted.data.resultData.error;
            this.workflowsStore.subWorkflowExecutionError = error;
            this.showMessage({
              title: error.message,
              message: error.description,
              type: "error",
              duration: 0
            });
          } else {
            let title;
            if (runDataExecuted.data.resultData.lastNodeExecuted) {
              title = `Problem in node ‘${runDataExecuted.data.resultData.lastNodeExecuted}‘`;
            } else {
              title = "Problem executing workflow";
            }
            this.showMessage({
              title,
              message: runDataExecutedErrorMessage,
              type: "error",
              duration: 0,
              dangerouslyUseHTMLString: true
            });
          }
        } else {
          this.titleSet(workflow.name, "IDLE");
          const execution = this.workflowsStore.getWorkflowExecution;
          if (execution == null ? void 0 : execution.executedNode) {
            const node = this.workflowsStore.getNodeByName(execution.executedNode);
            const nodeType = node && this.nodeTypesStore.getNodeType(node.type, node.typeVersion);
            const nodeOutput = execution && execution.executedNode && ((_A = (_z = (_y = execution.data) == null ? void 0 : _y.resultData) == null ? void 0 : _z.runData) == null ? void 0 : _A[execution.executedNode]);
            if (nodeType && nodeType.polling && !nodeOutput) {
              this.showMessage({
                title: this.$locale.baseText("pushConnection.pollingNode.dataNotFound", {
                  interpolate: {
                    service: getTriggerNodeServiceName(nodeType)
                  }
                }),
                message: this.$locale.baseText("pushConnection.pollingNode.dataNotFound.message", {
                  interpolate: {
                    service: getTriggerNodeServiceName(nodeType)
                  }
                }),
                type: "success"
              });
            } else {
              this.showMessage({
                title: this.$locale.baseText("pushConnection.nodeExecutedSuccessfully"),
                type: "success"
              });
            }
          } else {
            this.showMessage({
              title: this.$locale.baseText("pushConnection.workflowExecutedSuccessfully"),
              type: "success"
            });
          }
        }
        if (this.workflowsStore.getWorkflowRunData) {
          runDataExecuted.data.resultData.runData = this.workflowsStore.getWorkflowRunData;
        }
        this.workflowsStore.executingNode.length = 0;
        this.workflowsStore.setWorkflowExecutionData(runDataExecuted);
        this.uiStore.removeActiveAction("workflowRunning");
        this.updateNodesExecutionIssues();
        const lastNodeExecuted = runDataExecuted.data.resultData.lastNodeExecuted;
        let itemsCount = 0;
        if (lastNodeExecuted && runDataExecuted.data.resultData.runData[lastNodeExecuted] && !runDataExecutedErrorMessage) {
          itemsCount = runDataExecuted.data.resultData.runData[lastNodeExecuted][0].data.main[0].length;
        }
        void this.$externalHooks().run("pushConnection.executionFinished", {
          itemsCount,
          nodeName: runDataExecuted.data.resultData.lastNodeExecuted,
          errorMessage: runDataExecutedErrorMessage,
          runDataExecutedStartData: runDataExecuted.data.startData,
          resultDataError: runDataExecuted.data.resultData.error
        });
        if (!runDataExecuted.data.resultData.error) {
          this.segmentStore.trackSuccessfulWorkflowExecution(runDataExecuted);
        }
      } else if (receivedData.type === "executionStarted") {
        const pushData = receivedData.data;
        const executionData = {
          id: pushData.executionId,
          finished: false,
          mode: pushData.mode,
          startedAt: pushData.startedAt,
          retryOf: pushData.retryOf,
          workflowId: pushData.workflowId,
          workflowName: pushData.workflowName
        };
        this.workflowsStore.addActiveExecution(executionData);
      } else if (receivedData.type === "nodeExecuteAfter") {
        const pushData = receivedData.data;
        this.workflowsStore.addNodeExecutionData(pushData);
        this.workflowsStore.removeExecutingNode(pushData.nodeName);
      } else if (receivedData.type === "nodeExecuteBefore") {
        const pushData = receivedData.data;
        this.workflowsStore.addExecutingNode(pushData.nodeName);
      } else if (receivedData.type === "testWebhookDeleted") {
        const pushData = receivedData.data;
        if (pushData.workflowId === this.workflowsStore.workflowId) {
          this.workflowsStore.executionWaitingForWebhook = false;
          this.uiStore.removeActiveAction("workflowRunning");
        }
      } else if (receivedData.type === "testWebhookReceived") {
        const pushData = receivedData.data;
        if (pushData.workflowId === this.workflowsStore.workflowId) {
          this.workflowsStore.executionWaitingForWebhook = false;
          this.workflowsStore.activeExecutionId = pushData.executionId;
        }
        this.processWaitingPushMessages();
      } else if (receivedData.type === "reloadNodeType") {
        await this.nodeTypesStore.getNodeTypes();
        await this.nodeTypesStore.getFullNodesProperties([receivedData.data]);
      } else if (receivedData.type === "removeNodeType") {
        const pushData = receivedData.data;
        const nodesToBeRemoved = [pushData];
        await this.credentialsStore.fetchCredentialTypes(false).then(() => {
          this.nodeTypesStore.removeNodeTypes(nodesToBeRemoved);
        });
      } else if (receivedData.type === "nodeDescriptionUpdated") {
        await this.nodeTypesStore.getNodeTypes();
        await this.credentialsStore.fetchCredentialTypes(true);
      }
      return true;
    },
    getExecutionError(data) {
      const error = data.resultData.error;
      let errorMessage;
      if (data.resultData.lastNodeExecuted && error) {
        errorMessage = error.message || error.description;
      } else {
        errorMessage = this.$locale.baseText("pushConnection.executionError", {
          interpolate: { error: "!" }
        });
        if (error == null ? void 0 : error.message) {
          let nodeName;
          if ("node" in error) {
            nodeName = typeof error.node === "string" ? error.node : error.node.name;
          }
          const receivedError = nodeName ? `${nodeName}: ${error.message}` : error.message;
          errorMessage = this.$locale.baseText("pushConnection.executionError", {
            interpolate: {
              error: `.${this.$locale.baseText("pushConnection.executionError.details", {
                interpolate: {
                  details: receivedError
                }
              })}`
            }
          });
        }
      }
      return errorMessage;
    }
  }
});
export {
  WORKER_HISTORY_LENGTH as W,
  pushConnection as p,
  useOrchestrationStore as u
};
