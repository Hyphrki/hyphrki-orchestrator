import { d as defineComponent, j as createBaseVNode, h as resolveComponent, o as openBlock, k as createElementBlock, n as normalizeClass, a3 as Fragment, ai as renderList, i as createVNode, f as withCtx, s as createTextVNode, t as toDisplayString, q as createCommentVNode, b as createBlock } from "./vendor-fd4bd18c.js";
import { m as mapStores } from "./pinia-282957dc.js";
import { H as useWorkflowsStore, W as useNDVStore, dS as shorten, gw as getMappedExpression, gx as getPairedItemId, _ as _export_sfc } from "./n8n-8ddd8349.js";
import { D as Draggable } from "./NodeView-413a24e1.js";
import { e as externalHooks } from "./index-00f166b0.js";
import { M as MappingPill } from "./MappingPill-f04ee9de.js";
import "./flatted-551ad821.js";
import "./esprima-next-b5fc8919.js";
import "./luxon-63e8a0ed.js";
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
import "./file-saver-ccbe3603.js";
import "./vue-json-pretty-1f49a504.js";
import "./RunDataAi-1d763057.js";
import "./vue-markdown-render-1dc15361.js";
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
import "./workflowActivate-7e113acb.js";
const MAX_COLUMNS_LIMIT = 40;
const _sfc_main = defineComponent({
  name: "run-data-table",
  mixins: [externalHooks],
  components: { Draggable, MappingPill },
  props: {
    node: {
      type: Object
    },
    inputData: {
      type: Array
    },
    mappingEnabled: {
      type: Boolean
    },
    distanceFromActive: {
      type: Number
    },
    runIndex: {
      type: Number
    },
    outputIndex: {
      type: Number
    },
    totalRuns: {
      type: Number
    },
    pageOffset: {
      type: Number
    },
    hasDefaultHoverState: {
      type: Boolean
    }
  },
  data() {
    return {
      activeColumn: -1,
      forceShowGrip: false,
      draggedColumn: false,
      draggingPath: null,
      hoveringPath: null,
      mappingHintVisible: false,
      activeRow: null,
      columnLimit: MAX_COLUMNS_LIMIT,
      columnLimitExceeded: false
    };
  },
  mounted() {
    if (this.tableData && this.tableData.columns && this.$refs.draggable) {
      const tbody = this.$refs.draggable.$refs.wrapper;
      if (tbody) {
        this.$emit("mounted", {
          avgRowHeight: tbody.offsetHeight / this.tableData.data.length
        });
      }
    }
  },
  computed: {
    ...mapStores(useNDVStore, useWorkflowsStore),
    hoveringItem() {
      return this.ndvStore.hoveringItem;
    },
    pairedItemMappings() {
      return this.workflowsStore.workflowExecutionPairedItemMappings;
    },
    tableData() {
      return this.convertToTable(this.inputData);
    },
    focusedMappableInput() {
      return this.ndvStore.focusedMappableInput;
    }
  },
  methods: {
    shorten,
    isHoveringRow(row) {
      if (row === this.activeRow) {
        return true;
      }
      const itemIndex = this.pageOffset + row;
      if (itemIndex === 0 && !this.hoveringItem && this.hasDefaultHoverState && this.distanceFromActive === 1) {
        return true;
      }
      const itemNodeId = getPairedItemId(
        this.node.name,
        this.runIndex || 0,
        this.outputIndex || 0,
        itemIndex
      );
      if (!this.hoveringItem || !this.pairedItemMappings[itemNodeId]) {
        return false;
      }
      const hoveringItemId = getPairedItemId(
        this.hoveringItem.nodeName,
        this.hoveringItem.runIndex,
        this.hoveringItem.outputIndex,
        this.hoveringItem.itemIndex
      );
      return this.pairedItemMappings[itemNodeId].has(hoveringItemId);
    },
    onMouseEnterCell(e) {
      const target = e.target;
      if (target && this.mappingEnabled) {
        const col = target.dataset.col;
        if (col && !isNaN(parseInt(col, 10))) {
          this.activeColumn = parseInt(col, 10);
        }
      }
      if (target) {
        const row = target.dataset.row;
        if (row && !isNaN(parseInt(row, 10))) {
          this.activeRow = parseInt(row, 10);
          this.$emit("activeRowChanged", this.pageOffset + this.activeRow);
        }
      }
    },
    onMouseLeaveCell() {
      this.activeColumn = -1;
      this.activeRow = null;
      this.$emit("activeRowChanged", null);
    },
    onMouseEnterKey(path, colIndex) {
      this.hoveringPath = this.getCellExpression(path, colIndex);
    },
    onMouseLeaveKey() {
      this.hoveringPath = null;
    },
    isHovering(path, colIndex) {
      const expr = this.getCellExpression(path, colIndex);
      return this.hoveringPath === expr;
    },
    getExpression(column) {
      if (!this.node) {
        return "";
      }
      return getMappedExpression({
        nodeName: this.node.name,
        distanceFromActive: this.distanceFromActive,
        path: [column]
      });
    },
    getPathNameFromTarget(el) {
      if (!el) {
        return "";
      }
      return el.dataset.name;
    },
    getCellPathName(path, colIndex) {
      const lastKey = path[path.length - 1];
      if (typeof lastKey === "string") {
        return lastKey;
      }
      if (path.length > 1) {
        const prevKey = path[path.length - 2];
        return `${prevKey}[${lastKey}]`;
      }
      const column = this.tableData.columns[colIndex];
      return `${column}[${lastKey}]`;
    },
    getCellExpression(path, colIndex) {
      if (!this.node) {
        return "";
      }
      const column = this.tableData.columns[colIndex];
      return getMappedExpression({
        nodeName: this.node.name,
        distanceFromActive: this.distanceFromActive,
        path: [column, ...path]
      });
    },
    isEmpty(value2) {
      return value2 === "" || Array.isArray(value2) && value2.length === 0 || typeof value2 === "object" && value2 !== null && Object.keys(value2).length === 0 || value2 === null || value2 === void 0;
    },
    getValueToRender(value2) {
      if (value2 === "") {
        return this.$locale.baseText("runData.emptyString");
      }
      if (typeof value2 === "string") {
        return value2.replaceAll("\n", "\\n");
      }
      if (Array.isArray(value2) && value2.length === 0) {
        return this.$locale.baseText("runData.emptyArray");
      }
      if (typeof value2 === "object" && value2 !== null && Object.keys(value2).length === 0) {
        return this.$locale.baseText("runData.emptyObject");
      }
      if (value2 === null || value2 === void 0) {
        return `[${value2}]`;
      }
      return value2;
    },
    onDragStart() {
      this.draggedColumn = true;
      this.ndvStore.resetMappingTelemetry();
    },
    onCellDragStart(el) {
      if (el == null ? void 0 : el.dataset.value) {
        this.draggingPath = el.dataset.value;
      }
      this.onDragStart();
    },
    onCellDragEnd(el) {
      this.draggingPath = null;
      this.onDragEnd(el.dataset.name || "", "tree", el.dataset.depth || "0");
    },
    isDraggingKey(path, colIndex) {
      if (!this.draggingPath) {
        return;
      }
      return this.draggingPath === this.getCellExpression(path, colIndex);
    },
    onDragEnd(column, src, depth = "0") {
      setTimeout(() => {
        const mappingTelemetry = this.ndvStore.mappingTelemetry;
        const telemetryPayload = {
          src_node_type: this.node.type,
          src_field_name: column,
          src_nodes_back: this.distanceFromActive,
          src_run_index: this.runIndex,
          src_runs_total: this.totalRuns,
          src_field_nest_level: parseInt(depth, 10),
          src_view: "table",
          src_element: src,
          success: false,
          ...mappingTelemetry
        };
        void this.$externalHooks().run("runDataTable.onDragEnd", telemetryPayload);
        this.$telemetry.track("User dragged data for mapping", telemetryPayload);
      }, 1e3);
    },
    isSimple(data) {
      return typeof data !== "object" || data === null || Array.isArray(data) && data.length === 0 || typeof data === "object" && Object.keys(data).length === 0;
    },
    hasJsonInColumn(colIndex) {
      return this.tableData.hasJson[this.tableData.columns[colIndex]];
    },
    convertToTable(inputData) {
      const tableData = [];
      const tableColumns = [];
      let leftEntryColumns, entryRows;
      let entry;
      const hasJson = {};
      inputData.forEach((data) => {
        if (!data.hasOwnProperty("json")) {
          return;
        }
        entry = data.json;
        entryRows = [];
        const entryColumns = Object.keys(entry || {});
        if (entryColumns.length > MAX_COLUMNS_LIMIT) {
          this.columnLimitExceeded = true;
          leftEntryColumns = entryColumns.slice(0, MAX_COLUMNS_LIMIT);
        } else {
          leftEntryColumns = entryColumns;
        }
        tableColumns.forEach((key) => {
          if (entry.hasOwnProperty(key)) {
            entryRows.push(entry[key]);
            leftEntryColumns.splice(leftEntryColumns.indexOf(key), 1);
            hasJson[key] = hasJson[key] || typeof entry[key] === "object" && Object.keys(entry[key] || {}).length > 0 || false;
          } else {
            entryRows.push(void 0);
          }
        });
        leftEntryColumns.forEach((key) => {
          tableColumns.push(key);
          entryRows.push(entry[key]);
          hasJson[key] = hasJson[key] || typeof entry[key] === "object" && Object.keys(entry[key] || {}).length > 0 || false;
        });
        tableData.push(entryRows);
      });
      tableData.forEach((entryRows2) => {
        if (tableColumns.length > entryRows2.length) {
          entryRows2.push(...new Array(tableColumns.length - entryRows2.length));
        }
      });
      return {
        hasJson,
        columns: tableColumns,
        data: tableData
      };
    },
    switchToJsonView() {
      this.$emit("displayModeChange", "json");
    }
  },
  watch: {
    focusedMappableInput(curr) {
      setTimeout(
        () => {
          this.forceShowGrip = !!this.focusedMappableInput;
        },
        curr ? 300 : 150
      );
    }
  }
});
const _imports_0 = "/n8n/n8n/static/data-mapping-gif.gif";
const dataDisplay = "_dataDisplay_1krqo_5";
const table = "_table_1krqo_18";
const nodeClass = "_nodeClass_1krqo_66";
const emptyCell = "_emptyCell_1krqo_70";
const header = "_header_1krqo_74";
const draggableHeader = "_draggableHeader_1krqo_86";
const dragButton = "_dragButton_1krqo_90";
const draggingHeader = "_draggingHeader_1krqo_94";
const activeHeader = "_activeHeader_1krqo_98";
const dataKey = "_dataKey_1krqo_107";
const value = "_value_1krqo_116";
const nestedValue = "_nestedValue_1krqo_120 _value_1krqo_116";
const mappable = "_mappable_1krqo_125";
const empty = "_empty_1krqo_70";
const limitColWidth = "_limitColWidth_1krqo_133";
const minColWidth = "_minColWidth_1krqo_137";
const hoveringKey = "_hoveringKey_1krqo_141";
const draggingKey = "_draggingKey_1krqo_145";
const tableRightMargin = "_tableRightMargin_1krqo_149";
const hoveringRow = "_hoveringRow_1krqo_157";
const warningTooltip = "_warningTooltip_1krqo_162";
const style0 = {
  dataDisplay,
  table,
  nodeClass,
  emptyCell,
  header,
  draggableHeader,
  dragButton,
  draggingHeader,
  activeHeader,
  dataKey,
  value,
  nestedValue,
  mappable,
  empty,
  limitColWidth,
  minColWidth,
  hoveringKey,
  draggingKey,
  tableRightMargin,
  hoveringRow,
  warningTooltip
};
const _hoisted_1 = ["data-row"];
const _hoisted_2 = /* @__PURE__ */ createBaseVNode("img", { src: _imports_0 }, null, -1);
const _hoisted_3 = ["data-test-id"];
const _hoisted_4 = ["data-row", "data-col"];
const _hoisted_5 = ["onMouseenter", "data-name", "data-value", "data-depth"];
const _hoisted_6 = { key: 0 };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_n8n_info_tip = resolveComponent("n8n-info-tip");
  const _component_MappingPill = resolveComponent("MappingPill");
  const _component_font_awesome_icon = resolveComponent("font-awesome-icon");
  const _component_draggable = resolveComponent("draggable");
  const _component_n8n_tooltip = resolveComponent("n8n-tooltip");
  const _component_i18n_t = resolveComponent("i18n-t");
  const _component_n8n_tree = resolveComponent("n8n-tree");
  return openBlock(), createElementBlock("div", {
    class: normalizeClass(_ctx.$style.dataDisplay)
  }, [
    _ctx.tableData.columns && _ctx.tableData.columns.length === 0 ? (openBlock(), createElementBlock("table", {
      key: 0,
      class: normalizeClass(_ctx.$style.table)
    }, [
      createBaseVNode("tr", null, [
        createBaseVNode("th", {
          class: normalizeClass(_ctx.$style.emptyCell)
        }, null, 2),
        createBaseVNode("th", {
          class: normalizeClass(_ctx.$style.tableRightMargin)
        }, null, 2)
      ]),
      (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.tableData.data, (row, index1) => {
        return openBlock(), createElementBlock("tr", {
          key: index1,
          class: normalizeClass({ [_ctx.$style.hoveringRow]: _ctx.isHoveringRow(index1) })
        }, [
          createBaseVNode("td", {
            "data-row": index1,
            "data-col": 0,
            onMouseenter: _cache[0] || (_cache[0] = (...args) => _ctx.onMouseEnterCell && _ctx.onMouseEnterCell(...args)),
            onMouseleave: _cache[1] || (_cache[1] = (...args) => _ctx.onMouseLeaveCell && _ctx.onMouseLeaveCell(...args))
          }, [
            createVNode(_component_n8n_info_tip, null, {
              default: withCtx(() => [
                createTextVNode(toDisplayString(_ctx.$locale.baseText("runData.emptyItemHint")), 1)
              ]),
              _: 1
            })
          ], 40, _hoisted_1),
          createBaseVNode("td", {
            class: normalizeClass(_ctx.$style.tableRightMargin)
          }, null, 2)
        ], 2);
      }), 128))
    ], 2)) : (openBlock(), createElementBlock("table", {
      key: 1,
      class: normalizeClass(_ctx.$style.table)
    }, [
      createBaseVNode("thead", null, [
        createBaseVNode("tr", null, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.tableData.columns || [], (column, i) => {
            return openBlock(), createElementBlock("th", { key: column }, [
              createVNode(_component_n8n_tooltip, {
                placement: "bottom-start",
                disabled: !_ctx.mappingEnabled,
                "show-after": 1e3
              }, {
                content: withCtx(() => [
                  createBaseVNode("div", null, [
                    _hoisted_2,
                    createTextVNode(" " + toDisplayString(_ctx.$locale.baseText("dataMapping.dragColumnToFieldHint")), 1)
                  ])
                ]),
                default: withCtx(() => [
                  createVNode(_component_draggable, {
                    type: "mapping",
                    data: _ctx.getExpression(column),
                    disabled: !_ctx.mappingEnabled,
                    onDragstart: _ctx.onDragStart,
                    onDragend: (column2) => _ctx.onDragEnd(column2, "column")
                  }, {
                    preview: withCtx(({ canDrop }) => [
                      createVNode(_component_MappingPill, {
                        html: _ctx.shorten(column, 16, 2),
                        "can-drop": canDrop
                      }, null, 8, ["html", "can-drop"])
                    ]),
                    default: withCtx(({ isDragging }) => [
                      createBaseVNode("div", {
                        class: normalizeClass({
                          [_ctx.$style.header]: true,
                          [_ctx.$style.draggableHeader]: _ctx.mappingEnabled,
                          [_ctx.$style.activeHeader]: (i === _ctx.activeColumn || _ctx.forceShowGrip) && _ctx.mappingEnabled,
                          [_ctx.$style.draggingHeader]: isDragging
                        })
                      }, [
                        createBaseVNode("span", null, toDisplayString(column || " "), 1),
                        createBaseVNode("div", {
                          class: normalizeClass(_ctx.$style.dragButton)
                        }, [
                          createVNode(_component_font_awesome_icon, { icon: "grip-vertical" })
                        ], 2)
                      ], 2)
                    ]),
                    _: 2
                  }, 1032, ["data", "disabled", "onDragstart", "onDragend"])
                ]),
                _: 2
              }, 1032, ["disabled"])
            ]);
          }), 128)),
          _ctx.columnLimitExceeded ? (openBlock(), createElementBlock("th", {
            key: 0,
            class: normalizeClass(_ctx.$style.header)
          }, [
            createVNode(_component_n8n_tooltip, { placement: "bottom-end" }, {
              content: withCtx(() => [
                createBaseVNode("div", null, [
                  createVNode(_component_i18n_t, {
                    tag: "span",
                    keypath: "dataMapping.tableView.tableColumnsExceeded.tooltip"
                  }, {
                    columnLimit: withCtx(() => [
                      createTextVNode(toDisplayString(_ctx.columnLimit), 1)
                    ]),
                    link: withCtx(() => [
                      createBaseVNode("a", {
                        onClick: _cache[2] || (_cache[2] = (...args) => _ctx.switchToJsonView && _ctx.switchToJsonView(...args))
                      }, toDisplayString(_ctx.$locale.baseText("dataMapping.tableView.tableColumnsExceeded.tooltip.link")), 1)
                    ]),
                    _: 1
                  })
                ])
              ]),
              default: withCtx(() => [
                createBaseVNode("span", null, [
                  createVNode(_component_font_awesome_icon, {
                    class: normalizeClass(_ctx.$style["warningTooltip"]),
                    icon: "exclamation-triangle"
                  }, null, 8, ["class"]),
                  createTextVNode(" " + toDisplayString(_ctx.$locale.baseText("dataMapping.tableView.tableColumnsExceeded")), 1)
                ])
              ]),
              _: 1
            })
          ], 2)) : createCommentVNode("", true),
          createBaseVNode("th", {
            class: normalizeClass(_ctx.$style.tableRightMargin)
          }, null, 2)
        ])
      ]),
      createVNode(_component_draggable, {
        tag: "tbody",
        type: "mapping",
        targetDataKey: "mappable",
        disabled: !_ctx.mappingEnabled,
        onDragstart: _ctx.onCellDragStart,
        onDragend: _ctx.onCellDragEnd,
        ref: "draggable"
      }, {
        preview: withCtx(({ canDrop, el }) => [
          createVNode(_component_MappingPill, {
            html: _ctx.shorten(_ctx.getPathNameFromTarget(el) || "", 16, 2),
            "can-drop": canDrop
          }, null, 8, ["html", "can-drop"])
        ]),
        default: withCtx(() => [
          (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.tableData.data, (row, index1) => {
            return openBlock(), createElementBlock("tr", {
              key: index1,
              class: normalizeClass({ [_ctx.$style.hoveringRow]: _ctx.isHoveringRow(index1) }),
              "data-test-id": _ctx.isHoveringRow(index1) ? "hovering-item" : void 0
            }, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(row, (data, index2) => {
                return openBlock(), createElementBlock("td", {
                  key: index2,
                  "data-row": index1,
                  "data-col": index2,
                  onMouseenter: _cache[4] || (_cache[4] = (...args) => _ctx.onMouseEnterCell && _ctx.onMouseEnterCell(...args)),
                  onMouseleave: _cache[5] || (_cache[5] = (...args) => _ctx.onMouseLeaveCell && _ctx.onMouseLeaveCell(...args)),
                  class: normalizeClass(_ctx.hasJsonInColumn(index2) ? _ctx.$style.minColWidth : _ctx.$style.limitColWidth)
                }, [
                  _ctx.isSimple(data) ? (openBlock(), createElementBlock("span", {
                    key: 0,
                    class: normalizeClass({ [_ctx.$style.value]: true, [_ctx.$style.empty]: _ctx.isEmpty(data) })
                  }, toDisplayString(_ctx.getValueToRender(data)), 3)) : (openBlock(), createBlock(_component_n8n_tree, {
                    key: 1,
                    nodeClass: _ctx.$style.nodeClass,
                    value: data
                  }, {
                    label: withCtx(({ label, path }) => [
                      createBaseVNode("span", {
                        onMouseenter: () => _ctx.onMouseEnterKey(path, index2),
                        onMouseleave: _cache[3] || (_cache[3] = (...args) => _ctx.onMouseLeaveKey && _ctx.onMouseLeaveKey(...args)),
                        class: normalizeClass({
                          [_ctx.$style.hoveringKey]: _ctx.mappingEnabled && _ctx.isHovering(path, index2),
                          [_ctx.$style.draggingKey]: _ctx.isDraggingKey(path, index2),
                          [_ctx.$style.dataKey]: true,
                          [_ctx.$style.mappable]: _ctx.mappingEnabled
                        }),
                        "data-target": "mappable",
                        "data-name": _ctx.getCellPathName(path, index2),
                        "data-value": _ctx.getCellExpression(path, index2),
                        "data-depth": path.length
                      }, toDisplayString(label || _ctx.$locale.baseText("runData.unnamedField")), 43, _hoisted_5)
                    ]),
                    value: withCtx(({ value: value2 }) => [
                      createBaseVNode("span", {
                        class: normalizeClass({ [_ctx.$style.nestedValue]: true, [_ctx.$style.empty]: _ctx.isEmpty(value2) })
                      }, toDisplayString(_ctx.getValueToRender(value2)), 3)
                    ]),
                    _: 2
                  }, 1032, ["nodeClass", "value"]))
                ], 42, _hoisted_4);
              }), 128)),
              _ctx.columnLimitExceeded ? (openBlock(), createElementBlock("td", _hoisted_6)) : createCommentVNode("", true),
              createBaseVNode("td", {
                class: normalizeClass(_ctx.$style.tableRightMargin)
              }, null, 2)
            ], 10, _hoisted_3);
          }), 128))
        ]),
        _: 1
      }, 8, ["disabled", "onDragstart", "onDragend"])
    ], 2))
  ], 2);
}
const cssModules = {
  "$style": style0
};
const RunDataTable = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__cssModules", cssModules]]);
export {
  RunDataTable as default
};
