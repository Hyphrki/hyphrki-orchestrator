import { n as useUIStore, t as useUsersStore, gr as FAKE_DOOR_FEATURES, x as useRootStore, H as useWorkflowsStore, d0 as deepCopy, W as useNDVStore, b6 as useSegment } from "./n8n-8ddd8349.js";
import "./flatted-551ad821.js";
import "./esprima-next-b5fc8919.js";
import "./luxon-63e8a0ed.js";
import "./pinia-282957dc.js";
import "./vendor-fd4bd18c.js";
import "./lodash-es-be629387.js";
import "./@vueuse/core-f4908be6.js";
import "./uuid-2dfcd766.js";
import "./vue-i18n-86898575.js";
import "./@fortawesome/vue-fontawesome-04873987.js";
import "./@fortawesome/fontawesome-svg-core-6d4d86d8.js";
import "./@jsplumb/util-1214d169.js";
import "./@jsplumb/core-defb43f2.js";
import "./@jsplumb/common-6db23379.js";
import "./@jsplumb/connector-bezier-4c31eaae.js";
import "./@jsplumb/browser-ui-21fcaa55.js";
function addAutoLoginToAdminPanelButton() {
  var _a;
  const adminPanelHost = new URL(window.location.href).host.split(".").slice(1).join(".");
  (_a = document.body) == null ? void 0 : _a.addEventListener("click", async (e) => {
    if (!e.target || !(e.target instanceof Element))
      return;
    if (e.target.getAttribute("id") !== "admin" && !e.target.closest("#admin"))
      return;
    e.preventDefault();
    const restPath = window.REST_ENDPOINT ?? "rest";
    const response = await fetch(`/${restPath}/cloud/proxy/login/code`);
    const { code } = await response.json();
    window.location.href = `https://${adminPanelHost}/login?code=${code}`;
  });
}
let adminIconAdded = false;
const hooksAddAdminIcon = () => {
  if (adminIconAdded) {
    return;
  }
  const uiStore = useUIStore();
  const usersStore = useUsersStore();
  if ((usersStore == null ? void 0 : usersStore.globalRoleName) !== "owner") {
    return;
  }
  const menuItems = [
    {
      id: "admin",
      type: "link",
      position: "bottom",
      label: "Admin Panel",
      icon: "home",
      properties: {
        href: "https://app.n8n.cloud",
        newWindow: false
      }
    }
  ];
  addAutoLoginToAdminPanelButton();
  uiStore.sidebarMenuItems = [...uiStore.sidebarMenuItems, ...menuItems];
  adminIconAdded = true;
};
function compileFakeDoorFeatures() {
  const store = useUIStore();
  const fakeDoorFeatures = store.fakeDoorFeatures.map((feature) => ({ ...feature }));
  const environmentsFeature = fakeDoorFeatures.find(
    (feature) => feature.id === FAKE_DOOR_FEATURES.ENVIRONMENTS
  );
  if (environmentsFeature) {
    environmentsFeature.actionBoxTitle += ".cloud";
    environmentsFeature.linkURL += "&edition=cloud";
  }
  const loggingFeature = fakeDoorFeatures.find(
    (feature) => feature.id === FAKE_DOOR_FEATURES.LOGGING
  );
  if (loggingFeature) {
    loggingFeature.actionBoxTitle += ".cloud";
    loggingFeature.linkURL += "&edition=cloud";
    loggingFeature.infoText = "";
  }
  return fakeDoorFeatures;
}
const hooksAddFakeDoorFeatures = () => {
  const store = useUIStore();
  store.fakeDoorFeatures = compileFakeDoorFeatures();
};
const nodesPanelSession = {
  sessionId: "",
  data: {
    nodeFilter: "",
    resultsNodes: [],
    filterMode: "Regular"
  }
};
const hooksGenerateNodesPanelEvent = () => {
  return {
    eventName: "User entered nodes panel search term",
    properties: {
      search_string: nodesPanelSession.data.nodeFilter,
      results_count: nodesPanelSession.data.resultsNodes.length,
      results_nodes: nodesPanelSession.data.resultsNodes,
      filter_mode: nodesPanelSession.data.filterMode,
      nodes_panel_session_id: nodesPanelSession.sessionId
    }
  };
};
const hooksResetNodesPanelSession = () => {
  nodesPanelSession.sessionId = `nodes_panel_session_${(/* @__PURE__ */ new Date()).valueOf()}`;
  nodesPanelSession.data = {
    nodeFilter: "",
    resultsNodes: [],
    filterMode: "Regular"
  };
};
const getUserSavedCredentialsEventData = (meta) => {
  var _a;
  const rootStore = useRootStore();
  const workflowsStore = useWorkflowsStore();
  return {
    eventName: "User saved credentials",
    properties: {
      instance_id: rootStore.instanceId,
      credential_type: meta.credential_type,
      credential_id: meta.credential_id,
      workflow_id: workflowsStore.workflowId,
      node_type: (_a = workflowsStore.activeNode) == null ? void 0 : _a.name,
      is_new: meta.is_new
      // is_complete: true,
      // is_valid: true,
      // error_message: ''
    }
  };
};
const getOpenWorkflowSettingsEventData = () => {
  const workflowsStore = useWorkflowsStore();
  return {
    eventName: "User opened workflow settings",
    properties: {
      workflow_id: workflowsStore.workflowId,
      workflow_name: workflowsStore.workflowName,
      current_settings: deepCopy(workflowsStore.workflowSettings)
    }
  };
};
const getUpdatedWorkflowSettingsEventData = (meta) => {
  const workflowsStore = useWorkflowsStore();
  return {
    eventName: "User updated workflow settings",
    properties: {
      workflow_id: workflowsStore.workflowId,
      workflow_name: workflowsStore.workflowName,
      new_settings: deepCopy(workflowsStore.workflowSettings),
      old_settings: meta.oldSettings
    }
  };
};
const getNodeTypeChangedEventData = (meta) => {
  var _a;
  const store = useNDVStore();
  return {
    eventName: "User opened node modal",
    properties: {
      node_name: (_a = store.activeNode) == null ? void 0 : _a.name,
      node_subtitle: meta.nodeSubtitle
    }
  };
};
const getInsertedItemFromExpEditorEventData = (meta) => {
  var _a, _b;
  const store = useNDVStore();
  return {
    eventName: "User inserted item from Expression Editor variable selector",
    properties: {
      node_name: (_a = store.activeNode) == null ? void 0 : _a.name,
      node_type: (_b = store.activeNode) == null ? void 0 : _b.type.split(".")[1],
      parameter_name: meta.parameter.displayName,
      variable_expression: meta.selectedItem.variable
    }
  };
};
const getExpressionEditorEventsData = (meta, isValueDefault) => {
  var _a, _b;
  const store = useNDVStore();
  const eventData = {
    eventName: "",
    properties: {}
  };
  if (!meta.dialogVisible) {
    eventData.eventName = "User closed Expression Editor";
    eventData.properties = {
      empty_expression: isValueDefault,
      expression_value: meta.value,
      expression_result: meta.resolvedExpressionValue.slice(1)
    };
  } else {
    eventData.eventName = "User opened Expression Editor";
    eventData.properties = {
      node_name: (_a = store.activeNode) == null ? void 0 : _a.name,
      node_type: (_b = store.activeNode) == null ? void 0 : _b.type.split(".")[1],
      parameter_name: meta.parameter.displayName,
      parameter_field_type: meta.parameter.type,
      new_expression: isValueDefault
    };
  }
  return eventData;
};
const getAuthenticationModalEventData = (meta) => {
  var _a, _b;
  const store = useNDVStore();
  return {
    eventName: "User changed Authentication type from node modal",
    properties: {
      node_name: (_a = store.activeNode) == null ? void 0 : _a.name,
      node_type: (_b = store.activeNode) == null ? void 0 : _b.type.split(".")[1],
      old_mode: meta.oldNodeParameters.authentication || (meta.parameters.find((param) => param.name === "authentication") || {
        default: "default"
      }).default,
      new_mode: meta.newValue
    }
  };
};
const getOutputModeChangedEventData = (meta) => {
  var _a, _b;
  const store = useNDVStore();
  return {
    eventName: "User changed node output view mode",
    properties: {
      old_mode: meta.oldValue,
      new_mode: meta.newValue,
      node_name: (_a = store.activeNode) == null ? void 0 : _a.name,
      node_type: (_b = store.activeNode) == null ? void 0 : _b.type.split(".")[1]
    }
  };
};
const getExecutionFinishedEventData = (meta) => {
  var _a, _b, _c, _d, _e, _f, _g, _h;
  const store = useWorkflowsStore();
  const eventData = {
    eventName: "",
    properties: {
      execution_id: store.activeExecutionId
    }
  };
  if ((_a = meta.runDataExecutedStartData) == null ? void 0 : _a.destinationNode) {
    eventData.eventName = "Node execution finished";
    eventData.properties.node_type = (_b = store.getNodeByName(meta.nodeName || "")) == null ? void 0 : _b.type.split(".")[1];
    eventData.properties.node_name = meta.nodeName;
  } else {
    eventData.eventName = "Manual workflow execution finished";
    eventData.properties.workflow_id = store.workflowId;
    eventData.properties.workflow_name = store.workflowName;
  }
  if (meta.errorMessage || meta.resultDataError) {
    eventData.properties.status = "failed";
    eventData.properties.error_message = meta.resultDataError && meta.resultDataError.message || "";
    eventData.properties.error_stack = meta.resultDataError && meta.resultDataError.stack || "";
    eventData.properties.error_ui_message = meta.errorMessage || "";
    eventData.properties.error_timestamp = /* @__PURE__ */ new Date();
    if (meta.resultDataError && ((_c = meta.resultDataError) == null ? void 0 : _c.node)) {
      eventData.properties.error_node = typeof ((_d = meta.resultDataError) == null ? void 0 : _d.node) === "string" ? (_e = meta.resultDataError) == null ? void 0 : _e.node : (_g = (_f = meta.resultDataError) == null ? void 0 : _f.node) == null ? void 0 : _g.name;
    } else {
      eventData.properties.error_node = meta.nodeName;
    }
  } else {
    eventData.properties.status = "success";
    if ((_h = meta.runDataExecutedStartData) == null ? void 0 : _h.destinationNode) {
      eventData.properties.items_count = meta.itemsCount || 0;
    }
  }
  return eventData;
};
const getNodeRemovedEventData = (meta) => {
  const workflowsStore = useWorkflowsStore();
  return {
    eventName: "User removed node from workflow canvas",
    properties: {
      node_name: meta.node.name,
      node_type: meta.node.type,
      node_disabled: meta.node.disabled,
      workflow_id: workflowsStore.workflowId
    }
  };
};
const getNodeEditingFinishedEventData = (activeNode) => {
  switch (activeNode == null ? void 0 : activeNode.type) {
    case "n8n-nodes-base.httpRequest":
      const domain = activeNode.parameters.url.split("/")[2];
      return {
        eventName: "User finished httpRequest node editing",
        properties: {
          method: activeNode.parameters.method,
          domain
        }
      };
    case "n8n-nodes-base.function":
      return {
        eventName: "User finished function node editing",
        properties: {
          node_name: activeNode.name,
          code: activeNode.parameters.functionCode
        }
      };
    case "n8n-nodes-base.functionItem":
      return {
        eventName: "User finished functionItem node editing",
        properties: {
          node_name: activeNode.name,
          code: activeNode.parameters.functionCode
        }
      };
    default:
      return;
  }
};
const getExecutionStartedEventData = (meta) => {
  var _a;
  const store = useWorkflowsStore();
  const eventData = {
    eventName: "",
    properties: {
      execution_id: store.activeExecutionId
    }
  };
  if (meta.nodeName) {
    eventData.eventName = "User started node execution";
    eventData.properties.source = "unknown";
    eventData.properties.node_type = (_a = store.getNodeByName(meta.nodeName)) == null ? void 0 : _a.type.split(".")[1];
    eventData.properties.node_name = meta.nodeName;
    if (meta.source === "RunData.ExecuteNodeButton") {
      eventData.properties.source = "node_modal";
    } else if (meta.source === "Node.executeNode") {
      eventData.properties.source = "workflow_canvas";
    }
  } else {
    eventData.eventName = "User started manual workflow execution";
    eventData.properties.workflow_id = store.workflowId;
    eventData.properties.workflow_name = store.workflowName;
  }
  return eventData;
};
const n8nCloudHooks = {
  app: {
    mount: [
      () => {
        hooksAddAdminIcon();
      },
      () => {
        hooksAddFakeDoorFeatures();
      }
    ]
  },
  nodeView: {
    mount: [
      () => {
        const segmentStore = useSegment();
        segmentStore.identify();
      },
      () => {
        hooksAddAdminIcon();
      }
    ],
    createNodeActiveChanged: [
      (_, meta) => {
        const segmentStore = useSegment();
        const eventData = {
          source: meta.source,
          nodes_panel_session_id: nodesPanelSession.sessionId
        };
        hooksResetNodesPanelSession();
        segmentStore.track("User opened nodes panel", eventData);
        segmentStore.page("Cloud instance", "Nodes panel", eventData);
      }
    ],
    addNodeButton: [
      (_, meta) => {
        const segmentStore = useSegment();
        const eventData = {
          eventName: "User added node to workflow canvas",
          properties: {
            node_type: meta.nodeTypeName.split(".")[1],
            nodes_panel_session_id: nodesPanelSession.sessionId
          }
        };
        segmentStore.track(eventData.eventName, eventData.properties);
      }
    ]
  },
  main: {
    routeChange: [
      (_, meta) => {
        const segmentStore = useSegment();
        const splitPath = meta.to.path.split("/");
        if (meta.from.path !== "/" && splitPath[1] === "workflow") {
          const eventData = {
            workflow_id: splitPath[2]
          };
          segmentStore.page("Cloud instance", "Workflow editor", eventData);
        }
      }
    ]
  },
  credential: {
    saved: [
      (_, meta) => {
        const segmentStore = useSegment();
        const eventData = getUserSavedCredentialsEventData(meta);
        segmentStore.track(eventData.eventName, eventData.properties);
      }
    ]
  },
  credentialsEdit: {
    credentialTypeChanged: [
      (_, meta) => {
        const segmentStore = useSegment();
        if (meta.newValue) {
          const eventData = {
            eventName: "User opened Credentials modal",
            properties: {
              source: meta.setCredentialType === meta.credentialType ? "node" : "primary_menu",
              new_credential: !meta.editCredentials,
              credential_type: meta.credentialType
            }
          };
          segmentStore.track(eventData.eventName, eventData.properties);
          segmentStore.page("Cloud instance", "Credentials modal", eventData.properties);
        }
      }
    ],
    credentialModalOpened: [
      (_, meta) => {
        const segmentStore = useSegment();
        const eventData = {
          eventName: "User opened Credentials modal",
          properties: {
            source: meta.activeNode ? "node" : "primary_menu",
            new_credential: !meta.isEditingCredential,
            credential_type: meta.credentialType
          }
        };
        segmentStore.track(eventData.eventName, eventData.properties);
        segmentStore.page("Cloud instance", "Credentials modal", eventData.properties);
      }
    ]
  },
  credentialsList: {
    mounted: [
      () => {
        const segmentStore = useSegment();
        const eventData = {
          eventName: "User opened global Credentials panel"
        };
        segmentStore.track(eventData.eventName);
        segmentStore.page("Cloud instance", "Credentials panel");
      }
    ],
    dialogVisibleChanged: [
      (_, meta) => {
        const segmentStore = useSegment();
        if (meta.dialogVisible) {
          const eventData = {
            eventName: "User opened global Credentials panel"
          };
          segmentStore.track(eventData.eventName);
          segmentStore.page("Cloud instance", "Credentials panel");
        }
      }
    ]
  },
  workflowSettings: {
    dialogVisibleChanged: [
      (_, meta) => {
        const segmentStore = useSegment();
        if (meta.dialogVisible) {
          const eventData = getOpenWorkflowSettingsEventData();
          segmentStore.track(eventData.eventName, eventData.properties);
        }
      }
    ],
    saveSettings: [
      (_, meta) => {
        const segmentStore = useSegment();
        const eventData = getUpdatedWorkflowSettingsEventData(meta);
        segmentStore.track(eventData.eventName, eventData.properties);
      }
    ]
  },
  dataDisplay: {
    onDocumentationUrlClick: [
      (_, meta) => {
        const segmentStore = useSegment();
        const eventData = {
          eventName: "User clicked node modal docs link",
          properties: {
            node_type: meta.nodeType.name.split(".")[1],
            docs_link: meta.documentationUrl
          }
        };
        segmentStore.track(eventData.eventName, eventData.properties);
      }
    ],
    nodeTypeChanged: [
      (_, meta) => {
        var _a;
        const segmentStore = useSegment();
        const ndvStore = useNDVStore();
        const eventData = getNodeTypeChangedEventData(meta);
        segmentStore.track(eventData.eventName, eventData.properties);
        segmentStore.page("Cloud instance", "Node modal", {
          node: (_a = ndvStore.activeNode) == null ? void 0 : _a.name
        });
      }
    ],
    nodeEditingFinished: [
      () => {
        const segmentStore = useSegment();
        const ndvStore = useNDVStore();
        const workflowsStore = useWorkflowsStore();
        const eventData = getNodeEditingFinishedEventData(ndvStore.activeNode);
        if (eventData) {
          eventData.properties.workflow_id = workflowsStore.workflowId;
        }
        if (eventData) {
          segmentStore.track(eventData.eventName, eventData.properties);
        }
      }
    ]
  },
  executionsList: {
    openDialog: [
      () => {
        const segmentStore = useSegment();
        const eventData = {
          eventName: "User opened Executions log"
        };
        segmentStore.track(eventData.eventName);
        segmentStore.page("Cloud instance", "Executions log");
      }
    ]
  },
  showMessage: {
    showError: [
      (_, meta) => {
        const segmentStore = useSegment();
        const eventData = {
          eventName: "Instance FE emitted error",
          properties: {
            error_title: meta.title,
            error_description: meta.message,
            error_message: meta.errorMessage
          }
        };
        segmentStore.track(eventData.eventName, eventData.properties);
      }
    ]
  },
  expressionEdit: {
    itemSelected: [
      (_, meta) => {
        const segmentStore = useSegment();
        const eventData = getInsertedItemFromExpEditorEventData(meta);
        if (meta.selectedItem.variable.startsWith("Object.keys")) {
          eventData.properties.variable_type = "Keys";
        } else if (meta.selectedItem.variable.startsWith("Object.values")) {
          eventData.properties.variable_type = "Values";
        } else {
          eventData.properties.variable_type = "Raw value";
        }
        segmentStore.track(eventData.eventName, eventData.properties);
      }
    ],
    dialogVisibleChanged: [
      (_, meta) => {
        const segmentStore = useSegment();
        const currentValue = meta.value.slice(1);
        let isValueDefault = false;
        switch (typeof meta.parameter.default) {
          case "boolean":
            isValueDefault = currentValue === "true" && meta.parameter.default || currentValue === "false" && !meta.parameter.default;
            break;
          case "string":
            isValueDefault = currentValue === meta.parameter.default;
            break;
          case "number":
            isValueDefault = currentValue === meta.parameter.default.toString();
            break;
        }
        const eventData = getExpressionEditorEventsData(meta, isValueDefault);
        segmentStore.track(eventData.eventName, eventData.properties);
      }
    ]
  },
  nodeSettings: {
    valueChanged: [
      (_, meta) => {
        const segmentStore = useSegment();
        if (meta.parameterPath !== "authentication") {
          return;
        }
        const eventData = getAuthenticationModalEventData(meta);
        segmentStore.track(eventData.eventName, eventData.properties);
      }
    ],
    credentialSelected: [
      (_, meta) => {
        const segmentStore = useSegment();
        const creds = Object.keys(meta.updateInformation.properties.credentials || {});
        if (creds.length < 1) {
          return;
        }
        const eventData = {
          eventName: "User selected credential from node modal",
          properties: {
            credential_name: meta.updateInformation.properties.credentials[creds[0]],
            credential_type: creds[0]
          }
        };
        segmentStore.track(eventData.eventName, eventData.properties);
      }
    ]
  },
  workflowRun: {
    runWorkflow: [
      (_, meta) => {
        const segmentStore = useSegment();
        const eventData = getExecutionStartedEventData(meta);
        segmentStore.track(eventData.eventName, eventData.properties);
      }
    ],
    runError: [
      (_, meta) => {
        const segmentStore = useSegment();
        const eventData = {
          eventName: meta.nodeName ? "Node execution finished" : "Manual workflow execution finished",
          properties: {
            preflight: "true",
            status: "failed",
            error_message: meta.errorMessages.join("<br />&nbsp;&nbsp;- "),
            error_timestamp: /* @__PURE__ */ new Date(),
            node_name: meta.nodeName
          }
        };
        segmentStore.track(eventData.eventName, eventData.properties);
      }
    ]
  },
  runData: {
    displayModeChanged: [
      (_, meta) => {
        const segmentStore = useSegment();
        const eventData = getOutputModeChangedEventData(meta);
        segmentStore.track(eventData.eventName, eventData.properties);
      }
    ]
  },
  pushConnection: {
    executionFinished: [
      (_, meta) => {
        const segmentStore = useSegment();
        const eventData = getExecutionFinishedEventData(meta);
        segmentStore.track(eventData.eventName, eventData.properties);
      }
    ]
  },
  node: {
    deleteNode: [
      (_, meta) => {
        const segmentStore = useSegment();
        const eventData = getNodeRemovedEventData(meta);
        segmentStore.track(eventData.eventName, eventData.properties);
      }
    ]
  },
  workflow: {
    activeChange: [
      (_, meta) => {
        const segmentStore = useSegment();
        const eventData = {
          eventName: meta.active && "User activated workflow" || "User deactivated workflow",
          properties: {
            workflow_id: meta.workflowId,
            source: "workflow_modal"
          }
        };
        segmentStore.track(eventData.eventName, eventData.properties);
      }
    ],
    activeChangeCurrent: [
      (_, meta) => {
        const segmentStore = useSegment();
        const workflowsStore = useWorkflowsStore();
        const eventData = {
          eventName: meta.active && "User activated workflow" || "User deactivated workflow",
          properties: {
            source: "main nav",
            workflow_id: meta.workflowId,
            workflow_name: workflowsStore.workflowName,
            workflow_nodes: workflowsStore.allNodes.map((n) => n.type.split(".")[1])
          }
        };
        segmentStore.track(eventData.eventName, eventData.properties);
      }
    ],
    afterUpdate: [
      (_, meta) => {
        const segmentStore = useSegment();
        const eventData = {
          eventName: "User saved workflow",
          properties: {
            workflow_id: meta.workflowData.id,
            workflow_name: meta.workflowData.name,
            workflow_nodes: meta.workflowData.nodes.map((n) => n.type.split(".")[1])
          }
        };
        segmentStore.track(eventData.eventName, eventData.properties);
      }
    ]
  },
  execution: {
    open: [
      (_, meta) => {
        const segmentStore = useSegment();
        const eventData = {
          eventName: "User opened read-only execution",
          properties: {
            workflow_id: meta.workflowId,
            workflow_name: meta.workflowName,
            execution_id: meta.executionId
          }
        };
        segmentStore.track(eventData.eventName, eventData.properties);
      }
    ]
  },
  nodeCreateList: {
    destroyed: [
      () => {
        const segmentStore = useSegment();
        if (nodesPanelSession.data.nodeFilter.length > 0 && nodesPanelSession.data.nodeFilter !== "") {
          const eventData = hooksGenerateNodesPanelEvent();
          segmentStore.track(eventData.eventName, eventData.properties);
        }
      }
    ],
    selectedTypeChanged: [
      (_, meta) => {
        const segmentStore = useSegment();
        const eventData = {
          eventName: "User changed nodes panel filter",
          properties: {
            old_filter: meta.oldValue,
            new_filter: meta.newValue,
            nodes_panel_session_id: nodesPanelSession.sessionId
          }
        };
        nodesPanelSession.data.filterMode = meta.newValue;
        segmentStore.track(eventData.eventName, eventData.properties);
      }
    ],
    nodeFilterChanged: [
      (_, meta) => {
        const segmentStore = useSegment();
        if (meta.newValue.length === 0 && nodesPanelSession.data.nodeFilter.length > 0) {
          const eventData = hooksGenerateNodesPanelEvent();
          segmentStore.track(eventData.eventName, eventData.properties);
        }
        if (meta.newValue.length > meta.oldValue.length) {
          nodesPanelSession.data.nodeFilter = meta.newValue;
          nodesPanelSession.data.resultsNodes = meta.filteredNodes.map((node) => {
            if (node.name) {
              return node.name.split(".")[1];
            } else if (node.key) {
              return node.key.split(".")[1];
            }
            return "";
          });
        }
      }
    ]
  }
};
export {
  n8nCloudHooks
};
