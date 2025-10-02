import { d as defineComponent, r as ref, N as onMounted, h as resolveComponent, o as openBlock, k as createElementBlock, j as createBaseVNode, n as normalizeClass, i as createVNode, t as toDisplayString, p as unref, b as createBlock, af as withModifiers, q as createCommentVNode, a3 as Fragment, ai as renderList, c as computed, f as withCtx, s as createTextVNode, w as watch, a9 as normalizeStyle } from "./vendor-fd4bd18c.js";
import { P as NodeConnectionType, gm as isObjectEmpty, am as useI18n, gg as useCopyToClipboard, u as useToast, _ as _export_sfc, G as useNodeTypesStore, H as useWorkflowsStore, gn as ElTree } from "./n8n-8ddd8349.js";
import { N as NodeIcon } from "./index-00f166b0.js";
import { A as capitalize } from "./lodash-es-be629387.js";
import { V as VueMarkdown } from "./vue-markdown-render-1dc15361.js";
import "./flatted-551ad821.js";
import "./esprima-next-b5fc8919.js";
import "./luxon-63e8a0ed.js";
import "./pinia-282957dc.js";
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
import "./prettier-ee8b90a8.js";
import "./codemirror-lang-html-n8n-1744db69.js";
import "./@n8n/codemirror-lang-sql-71393e13.js";
import "./@lezer/common-ff1769bd.js";
import "./codemirror-lang-n8n-expression-5b146a0d.js";
import "./fast-json-stable-stringify-4acbec5d.js";
import "./timeago.js-527228bd.js";
import "./qrcode.vue-401ae704.js";
import "./vue3-touch-events-c30a9e21.js";
import "./@fortawesome/free-solid-svg-icons-e786cea6.js";
import "./@fortawesome/free-regular-svg-icons-d7581360.js";
import "./chart.js-b7590faa.js";
const fallbackParser = (execData) => ({
  type: "json",
  data: execData,
  parsed: false
});
const outputTypeParsers = {
  [NodeConnectionType.AiLanguageModel](execData) {
    const response = execData.response ?? execData;
    if (!response)
      throw new Error("No response from Language Model");
    if (Array.isArray(response == null ? void 0 : response.messages) && (response == null ? void 0 : response.messages.length) === 1 && typeof (response == null ? void 0 : response.messages[0]) === "string") {
      return {
        type: "text",
        data: response.messages[0],
        parsed: true
      };
    }
    if (response.messages && Array.isArray(response.messages)) {
      return outputTypeParsers[NodeConnectionType.AiMemory](execData);
    }
    if (response.generations) {
      const generations = response.generations;
      const content = generations.map((generation) => {
        if (generation == null ? void 0 : generation.text)
          return generation.text;
        if (Array.isArray(generation)) {
          return generation.map((item) => item.text ?? item).join("\n\n").trim();
        }
        return generation;
      });
      return {
        type: "json",
        data: content,
        parsed: true
      };
    }
    return {
      type: "json",
      data: response,
      parsed: true
    };
  },
  [NodeConnectionType.AiTool]: fallbackParser,
  [NodeConnectionType.AiMemory](execData) {
    var _a;
    const chatHistory = execData.chatHistory ?? execData.messages ?? ((_a = execData == null ? void 0 : execData.response) == null ? void 0 : _a.chat_history);
    if (Array.isArray(chatHistory)) {
      const responseText = chatHistory.map((content) => {
        var _a2;
        if (content.type === "constructor" && ((_a2 = content.id) == null ? void 0 : _a2.includes("schema")) && content.kwargs) {
          let message = content.kwargs.content;
          if (Object.keys(content.kwargs.additional_kwargs).length) {
            message += ` (${JSON.stringify(content.kwargs.additional_kwargs)})`;
          }
          if (content.id.includes("HumanMessage")) {
            message = `**Human:** ${message.trim()}`;
          } else if (content.id.includes("AIMessage")) {
            message = `**AI:** ${message}`;
          } else if (content.id.includes("SystemMessage")) {
            message = `**System Message:** ${message}`;
          }
          if (execData.action && execData.action !== "getMessages") {
            message = `## Action: ${execData.action}

${message}`;
          }
          return message;
        }
        return "";
      }).join("\n\n");
      return {
        type: "markdown",
        data: responseText,
        parsed: true
      };
    }
    return fallbackParser(execData);
  },
  [NodeConnectionType.AiOutputParser]: fallbackParser,
  [NodeConnectionType.AiRetriever]: fallbackParser,
  [NodeConnectionType.AiVectorRetriever]: fallbackParser,
  [NodeConnectionType.AiVectorStore](execData) {
    if (execData.documents) {
      return {
        type: "json",
        data: execData.documents,
        parsed: true
      };
    }
    return fallbackParser(execData);
  },
  [NodeConnectionType.AiEmbedding](execData) {
    if (execData.documents) {
      return {
        type: "json",
        data: execData.documents,
        parsed: true
      };
    }
    return fallbackParser(execData);
  },
  [NodeConnectionType.AiDocument](execData) {
    if (execData.documents) {
      return {
        type: "json",
        data: execData.documents,
        parsed: true
      };
    }
    return fallbackParser(execData);
  },
  [NodeConnectionType.AiTextSplitter](execData) {
    const arrayData = Array.isArray(execData.response) ? execData.response : [execData.textSplitter];
    return {
      type: "text",
      data: arrayData.join("\n\n"),
      parsed: true
    };
  }
};
const useAiContentParsers = () => {
  const parseAiRunData = (executionData, endpointType) => {
    if ([NodeConnectionType.AiChain, NodeConnectionType.Main].includes(endpointType)) {
      return executionData.map((data) => ({ raw: data.json, parsedContent: null }));
    }
    const contentJson = executionData.map((node) => {
      const hasBinarData = !isObjectEmpty(node.binary);
      return hasBinarData ? node.binary : node.json;
    });
    const parser = outputTypeParsers[endpointType];
    if (!parser)
      return [{ raw: contentJson, parsedContent: null }];
    const parsedOutput = contentJson.map((c) => ({ raw: c, parsedContent: parser(c) }));
    return parsedOutput;
  };
  return {
    parseAiRunData
  };
};
const _hoisted_1$2 = ["data-content-type"];
const _hoisted_2$2 = ["textContent"];
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "AiRunContentBlock",
  props: {
    runData: {}
  },
  setup(__props) {
    const props = __props;
    const i18n = useI18n();
    const contentParsers = useAiContentParsers();
    const isExpanded = ref(getInitialExpandedState());
    const isShowRaw = ref(false);
    const contentParsed = ref(false);
    const parsedRun = ref(void 0);
    function getInitialExpandedState() {
      const collapsedTypes = {
        input: [NodeConnectionType.AiDocument, NodeConnectionType.AiTextSplitter],
        output: [
          NodeConnectionType.AiDocument,
          NodeConnectionType.AiEmbedding,
          NodeConnectionType.AiTextSplitter,
          NodeConnectionType.AiVectorStore
        ]
      };
      return !collapsedTypes[props.runData.inOut].includes(props.runData.type);
    }
    function parseAiRunData(run) {
      if (!run.data) {
        return;
      }
      const parsedData = contentParsers.parseAiRunData(run.data, run.type);
      return parsedData;
    }
    function isMarkdown(content) {
      if (typeof content !== "string")
        return false;
      const markdownPatterns = [
        /^# .+/gm,
        // headers
        /\*{1,2}.+\*{1,2}/g,
        // emphasis and strong
        /\[.+\]\(.+\)/g,
        // links
        /```[\s\S]+```/g
        // code blocks
      ];
      return markdownPatterns.some((pattern) => pattern.test(content));
    }
    function formatToJsonMarkdown(data) {
      return "```json\n" + data + "\n```";
    }
    function jsonToMarkdown(data) {
      if (isMarkdown(data))
        return data;
      if (Array.isArray(data) && data.length && typeof data[0] !== "number") {
        const markdownArray = data.map((item) => jsonToMarkdown(item));
        return markdownArray.join("\n\n").trim();
      }
      if (typeof data === "string") {
        return formatToJsonMarkdown(data);
      }
      return formatToJsonMarkdown(JSON.stringify(data, null, 2));
    }
    function setContentParsed(content) {
      contentParsed.value = !!content.find((item) => {
        var _a;
        if (((_a = item.parsedContent) == null ? void 0 : _a.parsed) === true) {
          return true;
        }
        return false;
      });
    }
    function onBlockHeaderClick() {
      isExpanded.value = !isExpanded.value;
    }
    function copyToClipboard2(content) {
      const copyToClipboardFn = useCopyToClipboard();
      const { showMessage } = useToast();
      try {
        copyToClipboardFn(JSON.stringify(content, void 0, 2));
        showMessage({
          title: i18n.baseText("generic.copiedToClipboard"),
          type: "success"
        });
      } catch (err) {
      }
    }
    onMounted(() => {
      parsedRun.value = parseAiRunData(props.runData);
      if (parsedRun.value) {
        setContentParsed(parsedRun.value);
      }
    });
    return (_ctx, _cache) => {
      const _component_font_awesome_icon = resolveComponent("font-awesome-icon");
      const _component_el_switch = resolveComponent("el-switch");
      const _component_n8n_icon_button = resolveComponent("n8n-icon-button");
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(_ctx.$style.block)
      }, [
        createBaseVNode("header", {
          class: normalizeClass(_ctx.$style.blockHeader),
          onClick: onBlockHeaderClick
        }, [
          createBaseVNode("button", {
            class: normalizeClass(_ctx.$style.blockToggle)
          }, [
            createVNode(_component_font_awesome_icon, {
              icon: isExpanded.value ? "angle-down" : "angle-up",
              size: "lg"
            }, null, 8, ["icon"])
          ], 2),
          createBaseVNode("p", {
            class: normalizeClass(_ctx.$style.blockTitle)
          }, toDisplayString(unref(capitalize)(_ctx.runData.inOut)), 3),
          contentParsed.value ? (openBlock(), createBlock(_component_el_switch, {
            key: 0,
            onClick: _cache[0] || (_cache[0] = withModifiers(() => {
            }, ["stop"])),
            class: normalizeClass(_ctx.$style.rawSwitch),
            "active-text": "RAW JSON",
            modelValue: isShowRaw.value,
            "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => isShowRaw.value = $event)
          }, null, 8, ["class", "modelValue"])) : createCommentVNode("", true)
        ], 2),
        createBaseVNode("main", {
          class: normalizeClass({
            [_ctx.$style.blockContent]: true,
            [_ctx.$style.blockContentExpanded]: isExpanded.value
          })
        }, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(parsedRun.value, ({ parsedContent, raw }, index) => {
            return openBlock(), createElementBlock("div", {
              key: index,
              class: normalizeClass(_ctx.$style.contentText),
              "data-content-type": parsedContent == null ? void 0 : parsedContent.type
            }, [
              parsedContent && !isShowRaw.value ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                parsedContent.type === "json" ? (openBlock(), createBlock(unref(VueMarkdown), {
                  key: 0,
                  source: jsonToMarkdown(parsedContent.data),
                  class: normalizeClass(_ctx.$style.markdown)
                }, null, 8, ["source", "class"])) : createCommentVNode("", true),
                parsedContent.type === "markdown" ? (openBlock(), createBlock(unref(VueMarkdown), {
                  key: 1,
                  source: parsedContent.data,
                  class: normalizeClass(_ctx.$style.markdown)
                }, null, 8, ["source", "class"])) : createCommentVNode("", true),
                parsedContent.type === "text" ? (openBlock(), createElementBlock("p", {
                  key: 2,
                  class: normalizeClass(_ctx.$style.runText),
                  textContent: toDisplayString(parsedContent.data)
                }, null, 10, _hoisted_2$2)) : createCommentVNode("", true)
              ], 64)) : (openBlock(), createElementBlock("div", {
                key: 1,
                class: normalizeClass(_ctx.$style.rawContent)
              }, [
                createVNode(_component_n8n_icon_button, {
                  size: "small",
                  class: normalizeClass(_ctx.$style.copyToClipboard),
                  type: "secondary",
                  onClick: ($event) => copyToClipboard2(raw),
                  title: _ctx.$locale.baseText("nodeErrorView.copyToClipboard"),
                  icon: "copy"
                }, null, 8, ["class", "onClick", "title"]),
                createVNode(unref(VueMarkdown), {
                  source: jsonToMarkdown(raw),
                  class: normalizeClass(_ctx.$style.markdown)
                }, null, 8, ["source", "class"])
              ], 2))
            ], 10, _hoisted_1$2);
          }), 128))
        ], 2)
      ], 2);
    };
  }
});
const copyToClipboard = "_copyToClipboard_bnj3r_5";
const rawContent = "_rawContent_bnj3r_11";
const markdown = "_markdown_bnj3r_15";
const contentText = "_contentText_bnj3r_39";
const block = "_block_bnj3r_44";
const blockContent = "_blockContent_bnj3r_52";
const blockContentExpanded = "_blockContentExpanded_bnj3r_56";
const runText = "_runText_bnj3r_60";
const rawSwitch = "_rawSwitch_bnj3r_65";
const blockHeader = "_blockHeader_bnj3r_72";
const blockTitle = "_blockTitle_bnj3r_84";
const blockToggle = "_blockToggle_bnj3r_89";
const style0$2 = {
  copyToClipboard,
  rawContent,
  markdown,
  contentText,
  block,
  blockContent,
  blockContentExpanded,
  runText,
  rawSwitch,
  blockHeader,
  blockTitle,
  blockToggle
};
const cssModules$2 = {
  "$style": style0$2
};
const AiRunContentBlock = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__cssModules", cssModules$2]]);
const _hoisted_1$1 = { key: 0 };
const _hoisted_2$1 = { key: 1 };
const _hoisted_3$1 = { key: 2 };
const _hoisted_4 = /* @__PURE__ */ createBaseVNode("br", null, null, -1);
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "RunDataAiContent",
  props: {
    inputData: {},
    contentIndex: {}
  },
  setup(__props) {
    const props = __props;
    const nodeTypesStore = useNodeTypesStore();
    const workflowsStore = useWorkflowsStore();
    const consumedTokensSum = computed(() => {
      var _a, _b;
      const consumedTokensSum1 = (_b = (_a = outputRun.value) == null ? void 0 : _a.data) == null ? void 0 : _b.reduce(
        (acc, curr) => {
          var _a2, _b2;
          const response = (_a2 = curr.json) == null ? void 0 : _a2.response;
          const tokenUsageData = (_b2 = response == null ? void 0 : response.llmOutput) == null ? void 0 : _b2.tokenUsage;
          if (!tokenUsageData)
            return acc;
          return {
            completionTokens: acc.completionTokens + tokenUsageData.completionTokens,
            promptTokens: acc.promptTokens + tokenUsageData.promptTokens,
            totalTokens: acc.totalTokens + tokenUsageData.totalTokens
          };
        },
        {
          completionTokens: 0,
          promptTokens: 0,
          totalTokens: 0
        }
      );
      return consumedTokensSum1;
    });
    function extractRunMeta(run) {
      const uiNode = workflowsStore.getNodeByName(props.inputData.node);
      const nodeType = nodeTypesStore.getNodeType((uiNode == null ? void 0 : uiNode.type) ?? "");
      const runMeta2 = {
        startTimeMs: run.metadata.startTime,
        executionTimeMs: run.metadata.executionTime,
        node: nodeType,
        type: run.inOut,
        connectionType: run.type
      };
      return runMeta2;
    }
    const outputRun = computed(() => {
      return props.inputData.data.find((r) => r.inOut === "output");
    });
    const runMeta = computed(() => {
      if (outputRun.value === void 0) {
        return;
      }
      return extractRunMeta(outputRun.value);
    });
    return (_ctx, _cache) => {
      var _a, _b, _c, _d, _e, _f;
      const _component_n8n_tooltip = resolveComponent("n8n-tooltip");
      const _component_n8n_text = resolveComponent("n8n-text");
      const _component_n8n_info_tip = resolveComponent("n8n-info-tip");
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(_ctx.$style.container)
      }, [
        createBaseVNode("header", {
          class: normalizeClass(_ctx.$style.header)
        }, [
          ((_a = runMeta.value) == null ? void 0 : _a.node) ? (openBlock(), createBlock(NodeIcon, {
            key: 0,
            class: normalizeClass(_ctx.$style.nodeIcon),
            "node-type": runMeta.value.node,
            size: 20
          }, null, 8, ["class", "node-type"])) : createCommentVNode("", true),
          createBaseVNode("div", {
            class: normalizeClass(_ctx.$style.headerWrap)
          }, [
            createBaseVNode("p", {
              class: normalizeClass(_ctx.$style.title)
            }, toDisplayString(_ctx.inputData.node), 3),
            createBaseVNode("ul", {
              class: normalizeClass(_ctx.$style.meta)
            }, [
              ((_b = runMeta.value) == null ? void 0 : _b.startTimeMs) ? (openBlock(), createElementBlock("li", _hoisted_1$1, toDisplayString((_c = runMeta.value) == null ? void 0 : _c.executionTimeMs) + "ms", 1)) : createCommentVNode("", true),
              ((_d = runMeta.value) == null ? void 0 : _d.startTimeMs) ? (openBlock(), createElementBlock("li", _hoisted_2$1, [
                createVNode(_component_n8n_tooltip, null, {
                  content: withCtx(() => {
                    var _a2;
                    return [
                      createTextVNode(toDisplayString(new Date((_a2 = runMeta.value) == null ? void 0 : _a2.startTimeMs).toLocaleString()), 1)
                    ];
                  }),
                  default: withCtx(() => {
                    var _a2;
                    return [
                      createTextVNode(" " + toDisplayString(_ctx.$locale.baseText("runData.aiContentBlock.startedAt", {
                        interpolate: {
                          startTime: new Date((_a2 = runMeta.value) == null ? void 0 : _a2.startTimeMs).toLocaleTimeString()
                        }
                      })), 1)
                    ];
                  }),
                  _: 1
                })
              ])) : createCommentVNode("", true),
              (((_e = consumedTokensSum.value) == null ? void 0 : _e.totalTokens) ?? 0) > 0 ? (openBlock(), createElementBlock("li", _hoisted_3$1, [
                createTextVNode(toDisplayString(_ctx.$locale.baseText("runData.aiContentBlock.tokens", {
                  interpolate: {
                    count: (_f = consumedTokensSum.value) == null ? void 0 : _f.totalTokens.toString()
                  }
                })) + " ", 1),
                createVNode(_component_n8n_info_tip, {
                  type: "tooltip",
                  theme: "info-light",
                  tooltipPlacement: "right"
                }, {
                  default: withCtx(() => [
                    createBaseVNode("div", null, [
                      createVNode(_component_n8n_text, {
                        bold: true,
                        size: "small"
                      }, {
                        default: withCtx(() => {
                          var _a2;
                          return [
                            createTextVNode(toDisplayString(_ctx.$locale.baseText("runData.aiContentBlock.tokens.prompt")) + " " + toDisplayString(_ctx.$locale.baseText("runData.aiContentBlock.tokens", {
                              interpolate: {
                                count: (_a2 = consumedTokensSum.value) == null ? void 0 : _a2.promptTokens.toString()
                              }
                            })), 1)
                          ];
                        }),
                        _: 1
                      }),
                      _hoisted_4,
                      createVNode(_component_n8n_text, {
                        bold: true,
                        size: "small"
                      }, {
                        default: withCtx(() => {
                          var _a2;
                          return [
                            createTextVNode(toDisplayString(_ctx.$locale.baseText("runData.aiContentBlock.tokens.completion")) + " " + toDisplayString(_ctx.$locale.baseText("runData.aiContentBlock.tokens", {
                              interpolate: {
                                count: (_a2 = consumedTokensSum.value) == null ? void 0 : _a2.completionTokens.toString()
                              }
                            })), 1)
                          ];
                        }),
                        _: 1
                      })
                    ])
                  ]),
                  _: 1
                })
              ])) : createCommentVNode("", true)
            ], 2)
          ], 2)
        ], 2),
        (openBlock(true), createElementBlock(Fragment, null, renderList(props.inputData.data, (run, index) => {
          return openBlock(), createElementBlock("main", {
            class: normalizeClass(_ctx.$style.content),
            key: index
          }, [
            createVNode(AiRunContentBlock, { runData: run }, null, 8, ["runData"])
          ], 2);
        }), 128))
      ], 2);
    };
  }
});
const container$1 = "_container_160yh_2";
const nodeIcon = "_nodeIcon_160yh_5";
const header = "_header_160yh_8";
const headerWrap = "_headerWrap_160yh_14";
const title$1 = "_title_160yh_18";
const meta = "_meta_160yh_25";
const style0$1 = {
  container: container$1,
  nodeIcon,
  header,
  headerWrap,
  title: title$1,
  meta
};
const cssModules$1 = {
  "$style": style0$1
};
const RunDataAiContent = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__cssModules", cssModules$1]]);
const _hoisted_1 = ["data-tree-depth"];
const _hoisted_2 = ["onClick"];
const _hoisted_3 = ["textContent"];
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "RunDataAi",
  props: {
    node: {},
    runIndex: { default: 0 },
    hideTitle: { type: Boolean },
    slim: { type: Boolean }
  },
  setup(__props) {
    const props = __props;
    const workflowsStore = useWorkflowsStore();
    const nodeTypesStore = useNodeTypesStore();
    const selectedRun = ref([]);
    function isTreeNodeSelected(node) {
      return selectedRun.value.some((run) => run.node === node.node && run.runIndex === node.runIndex);
    }
    function getReferencedData(reference, withInput, withOutput) {
      const resultData = workflowsStore.getWorkflowResultDataByNodeName(reference.node);
      if (!(resultData == null ? void 0 : resultData[reference.runIndex])) {
        return [];
      }
      const taskData = resultData[reference.runIndex];
      if (!taskData) {
        return [];
      }
      const returnData = [];
      function addFunction(data, inOut) {
        if (!data) {
          return;
        }
        Object.keys(data).map((type) => {
          returnData.push({
            data: data[type][0],
            inOut,
            type,
            metadata: {
              executionTime: taskData.executionTime,
              startTime: taskData.startTime
            }
          });
        });
      }
      if (withInput) {
        addFunction(taskData.inputOverride, "input");
      }
      if (withOutput) {
        addFunction(taskData.data, "output");
      }
      return returnData;
    }
    function toggleTreeItem(node) {
      node.expanded = !node.expanded;
    }
    function onItemClick(data) {
      var _a;
      const matchingRun = (_a = aiData.value) == null ? void 0 : _a.find(
        (run) => run.node === data.node && run.runIndex === data.runIndex
      );
      if (!matchingRun) {
        selectedRun.value = [];
        return;
      }
      selectedRun.value = [
        {
          node: data.node,
          runIndex: data.runIndex,
          data: getReferencedData(
            {
              node: data.node,
              runIndex: data.runIndex
            },
            true,
            true
          )
        }
      ];
    }
    function getNodeType(nodeName) {
      const node = workflowsStore.getNodeByName(nodeName);
      if (!node) {
        return null;
      }
      const nodeType = nodeTypesStore.getNodeType(node == null ? void 0 : node.type);
      return nodeType;
    }
    function selectFirst() {
      if (executionTree.value.length && executionTree.value[0].children.length) {
        onItemClick(executionTree.value[0].children[0]);
      }
    }
    const createNode = (nodeName, currentDepth, r, children = []) => {
      var _a, _b;
      return {
        node: nodeName,
        id: nodeName,
        depth: currentDepth,
        startTime: ((_b = (_a = r == null ? void 0 : r.data) == null ? void 0 : _a.metadata) == null ? void 0 : _b.startTime) ?? 0,
        runIndex: (r == null ? void 0 : r.runIndex) ?? 0,
        children
      };
    };
    function getTreeNodeData(nodeName, currentDepth) {
      var _a;
      const { connectionsByDestinationNode } = workflowsStore.getCurrentWorkflow();
      const connections = connectionsByDestinationNode[nodeName];
      const resultData = ((_a = aiData.value) == null ? void 0 : _a.filter((data) => data.node === nodeName)) ?? [];
      if (!connections) {
        return resultData.map((d) => createNode(nodeName, currentDepth, d));
      }
      const nonMainConnectionsKeys = Object.keys(connections).filter(
        (key) => key !== NodeConnectionType.Main
      );
      const children = nonMainConnectionsKeys.flatMap(
        (key) => connections[key][0].flatMap((node) => getTreeNodeData(node.node, currentDepth + 1))
      );
      if (resultData.length) {
        return resultData.map((r) => createNode(nodeName, currentDepth, r, children));
      }
      children.sort((a, b) => a.startTime - b.startTime);
      return [createNode(nodeName, currentDepth, void 0, children)];
    }
    const aiData = computed(() => {
      var _a;
      const resultData = workflowsStore.getWorkflowResultDataByNodeName(props.node.name);
      if (!resultData || !Array.isArray(resultData)) {
        return;
      }
      const subRun = (_a = resultData[props.runIndex].metadata) == null ? void 0 : _a.subRun;
      if (!Array.isArray(subRun)) {
        return;
      }
      const subRunWithData = subRun.flatMap(
        (run) => getReferencedData(run, false, true).map((data) => ({ ...run, data }))
      );
      subRunWithData.sort((a, b) => {
        var _a2, _b, _c, _d;
        const aTime = ((_b = (_a2 = a.data) == null ? void 0 : _a2.metadata) == null ? void 0 : _b.startTime) || 0;
        const bTime = ((_d = (_c = b.data) == null ? void 0 : _c.metadata) == null ? void 0 : _d.startTime) || 0;
        return aTime - bTime;
      });
      return subRunWithData;
    });
    const executionTree = computed(() => {
      const rootNode = props.node;
      const tree2 = getTreeNodeData(rootNode.name, 0);
      return tree2 || [];
    });
    watch(() => props.runIndex, selectFirst, { immediate: true });
    return (_ctx, _cache) => {
      const _component_font_awesome_icon = resolveComponent("font-awesome-icon");
      const _component_n8n_tooltip = resolveComponent("n8n-tooltip");
      const _component_n8n_text = resolveComponent("n8n-text");
      return aiData.value ? (openBlock(), createElementBlock("div", {
        key: 0,
        class: normalizeClass(_ctx.$style.container)
      }, [
        createBaseVNode("div", {
          class: normalizeClass({ [_ctx.$style.tree]: true, [_ctx.$style.slim]: _ctx.slim })
        }, [
          createVNode(unref(ElTree), {
            data: executionTree.value,
            props: { label: "node" },
            "default-expand-all": "",
            indent: 12,
            onNodeClick: onItemClick,
            "expand-on-click-node": false
          }, {
            default: withCtx(({ node, data }) => [
              createBaseVNode("div", {
                class: normalizeClass({
                  [_ctx.$style.treeNode]: true,
                  [_ctx.$style.isSelected]: isTreeNodeSelected(data)
                }),
                "data-tree-depth": data.depth,
                style: normalizeStyle({ "--item-depth": data.depth })
              }, [
                data.children.length ? (openBlock(), createElementBlock("button", {
                  key: 0,
                  class: normalizeClass(_ctx.$style.treeToggle),
                  onClick: ($event) => toggleTreeItem(node)
                }, [
                  createVNode(_component_font_awesome_icon, {
                    icon: node.expanded ? "angle-down" : "angle-up"
                  }, null, 8, ["icon"])
                ], 10, _hoisted_2)) : createCommentVNode("", true),
                createVNode(_component_n8n_tooltip, {
                  disabled: !_ctx.slim,
                  placement: "right"
                }, {
                  content: withCtx(() => [
                    createTextVNode(toDisplayString(node.label), 1)
                  ]),
                  default: withCtx(() => [
                    createBaseVNode("span", {
                      class: normalizeClass(_ctx.$style.leafLabel)
                    }, [
                      createVNode(NodeIcon, {
                        "node-type": getNodeType(data.node),
                        size: 17
                      }, null, 8, ["node-type"]),
                      !_ctx.slim ? (openBlock(), createElementBlock("span", {
                        key: 0,
                        textContent: toDisplayString(node.label)
                      }, null, 8, _hoisted_3)) : createCommentVNode("", true)
                    ], 2)
                  ]),
                  _: 2
                }, 1032, ["disabled"])
              ], 14, _hoisted_1)
            ]),
            _: 1
          }, 8, ["data"])
        ], 2),
        createBaseVNode("div", {
          class: normalizeClass(_ctx.$style.runData)
        }, [
          selectedRun.value.length === 0 ? (openBlock(), createElementBlock("div", {
            key: 0,
            class: normalizeClass(_ctx.$style.empty)
          }, [
            createVNode(_component_n8n_text, { size: "large" }, {
              default: withCtx(() => [
                createTextVNode(toDisplayString(_ctx.$locale.baseText("ndv.output.ai.empty", {
                  interpolate: {
                    node: props.node.name
                  }
                })), 1)
              ]),
              _: 1
            })
          ], 2)) : createCommentVNode("", true),
          (openBlock(true), createElementBlock(Fragment, null, renderList(selectedRun.value, (data, index) => {
            return openBlock(), createElementBlock("div", {
              key: `${data.node}__${data.runIndex}__index`
            }, [
              createVNode(RunDataAiContent, {
                inputData: data,
                contentIndex: index
              }, null, 8, ["inputData", "contentIndex"])
            ]);
          }), 128))
        ], 2)
      ], 2)) : createCommentVNode("", true);
    };
  }
});
const treeToggle = "_treeToggle_gjbqy_5";
const leafLabel = "_leafLabel_gjbqy_13";
const empty = "_empty_gjbqy_19";
const title = "_title_gjbqy_23";
const tree = "_tree_gjbqy_5";
const slim = "_slim_gjbqy_36";
const runData = "_runData_gjbqy_40";
const container = "_container_gjbqy_46";
const isSelected = "_isSelected_gjbqy_73";
const treeNode = "_treeNode_gjbqy_77";
const style0 = {
  treeToggle,
  leafLabel,
  empty,
  title,
  tree,
  slim,
  runData,
  container,
  isSelected,
  treeNode
};
const cssModules = {
  "$style": style0
};
const RunDataAi = /* @__PURE__ */ _export_sfc(_sfc_main, [["__cssModules", cssModules]]);
export {
  RunDataAi as default
};
