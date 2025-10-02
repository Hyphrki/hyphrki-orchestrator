import { d as defineComponent, r as ref, c as computed, N as onMounted, w as watch, L as nextTick, h as resolveComponent, o as openBlock, k as createElementBlock, j as createBaseVNode, t as toDisplayString, b as createBlock, p as unref, i as createVNode, f as withCtx, s as createTextVNode, n as normalizeClass, q as createCommentVNode, K as onBeforeMount, M as onBeforeUnmount, ak as createSlots, aB as pushScopeId, aC as popScopeId } from "./vendor-fd4bd18c.js";
import { u as useToast, y as useSettingsStore, t as useUsersStore, gf as getVariablesPermissions, aa as EnterpriseEditionFeature, am as useI18n, gg as useCopyToClipboard, _ as _export_sfc, Y as useEnvironmentsStore, n as useUIStore, z as useSourceControlStore, ar as useTelemetry, $ as useMessage, gh as uid, a9 as MODAL_CONFIRM } from "./n8n-8ddd8349.js";
import { R as ResourcesListLayout } from "./ResourcesListLayout-853dd5e5.js";
import "./flatted-551ad821.js";
import "./esprima-next-b5fc8919.js";
import "./luxon-63e8a0ed.js";
import "./pinia-282957dc.js";
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
import "./index-00f166b0.js";
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
const _hoisted_1$1 = { class: "variables-key-column" };
const _hoisted_2$1 = { key: 0 };
const _hoisted_3 = { class: "variables-value-column" };
const _hoisted_4 = { key: 0 };
const _hoisted_5 = { class: "variables-usage-column" };
const _hoisted_6 = { key: 0 };
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "VariablesRow",
  props: {
    data: {
      type: Object,
      default: () => ({})
    },
    editing: {
      type: Boolean,
      default: false
    }
  },
  emits: ["save", "cancel", "edit", "delete"],
  setup(__props, { emit }) {
    const props = __props;
    const i18n = useI18n();
    const copyToClipboard = useCopyToClipboard();
    const { showMessage } = useToast();
    const settingsStore = useSettingsStore();
    const usersStore = useUsersStore();
    const permissions = getVariablesPermissions(usersStore.currentUser);
    const modelValue = ref({ ...props.data });
    const formValidationStatus = ref({
      key: false,
      value: false
    });
    const formValid = computed(() => {
      return formValidationStatus.value.key && formValidationStatus.value.value;
    });
    const keyInputRef = ref();
    const valueInputRef = ref();
    const usage = ref(`$vars.${props.data.key}`);
    const isFeatureEnabled = computed(
      () => settingsStore.isEnterpriseFeatureEnabled(EnterpriseEditionFeature.Variables)
    );
    const showActions = computed(
      () => isFeatureEnabled.value && (permissions.edit || permissions.delete)
    );
    onMounted(() => {
      focusFirstInput();
    });
    const keyValidationRules = [
      { name: "REQUIRED" },
      { name: "MAX_LENGTH", config: { maximum: 50 } },
      {
        name: "MATCH_REGEX",
        config: {
          regex: /^[a-zA-Z]/,
          message: i18n.baseText("variables.editing.key.error.startsWithLetter")
        }
      },
      {
        name: "MATCH_REGEX",
        config: {
          regex: /^[a-zA-Z][a-zA-Z0-9_]*$/,
          message: i18n.baseText("variables.editing.key.error.jsonKey")
        }
      }
    ];
    const valueValidationRules = [
      { name: "MAX_LENGTH", config: { maximum: 220 } }
    ];
    watch(
      () => modelValue.value.key,
      async () => {
        await nextTick();
        if (formValidationStatus.value.key) {
          updateUsageSyntax();
        }
      }
    );
    function updateUsageSyntax() {
      usage.value = `$vars.${modelValue.value.key || props.data.key}`;
    }
    async function onCancel() {
      modelValue.value = { ...props.data };
      emit("cancel", modelValue.value);
    }
    async function onSave() {
      emit("save", modelValue.value);
    }
    async function onEdit() {
      emit("edit", modelValue.value);
      await nextTick();
      focusFirstInput();
    }
    async function onDelete() {
      emit("delete", modelValue.value);
    }
    function onValidate(key, value) {
      formValidationStatus.value[key] = value;
    }
    function onUsageClick() {
      copyToClipboard(usage.value);
      showMessage({
        title: i18n.baseText("variables.row.usage.copiedToClipboard"),
        type: "success"
      });
    }
    function focusFirstInput() {
      var _a, _b, _c;
      (_c = (_b = (_a = keyInputRef.value) == null ? void 0 : _a.inputRef) == null ? void 0 : _b.focus) == null ? void 0 : _c.call(_b);
    }
    return (_ctx, _cache) => {
      const _component_n8n_form_input = resolveComponent("n8n-form-input");
      const _component_n8n_tooltip = resolveComponent("n8n-tooltip");
      const _component_n8n_button = resolveComponent("n8n-button");
      return openBlock(), createElementBlock("tr", {
        class: normalizeClass(_ctx.$style.variablesRow),
        "data-test-id": "variables-row"
      }, [
        createBaseVNode("td", _hoisted_1$1, [
          createBaseVNode("div", null, [
            !__props.editing ? (openBlock(), createElementBlock("span", _hoisted_2$1, toDisplayString(__props.data.key), 1)) : (openBlock(), createBlock(_component_n8n_form_input, {
              key: 1,
              label: "",
              name: "key",
              "data-test-id": "variable-row-key-input",
              placeholder: unref(i18n).baseText("variables.editing.key.placeholder"),
              required: "",
              validateOnBlur: "",
              validationRules: keyValidationRules,
              modelValue: modelValue.value.key,
              "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => modelValue.value.key = $event),
              ref_key: "keyInputRef",
              ref: keyInputRef,
              onValidate: _cache[1] || (_cache[1] = (value) => onValidate("key", value))
            }, null, 8, ["placeholder", "modelValue"]))
          ])
        ]),
        createBaseVNode("td", _hoisted_3, [
          createBaseVNode("div", null, [
            !__props.editing ? (openBlock(), createElementBlock("span", _hoisted_4, toDisplayString(__props.data.value), 1)) : (openBlock(), createBlock(_component_n8n_form_input, {
              key: 1,
              label: "",
              name: "value",
              "data-test-id": "variable-row-value-input",
              placeholder: unref(i18n).baseText("variables.editing.value.placeholder"),
              validateOnBlur: "",
              validationRules: valueValidationRules,
              modelValue: modelValue.value.value,
              "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => modelValue.value.value = $event),
              ref_key: "valueInputRef",
              ref: valueInputRef,
              onValidate: _cache[3] || (_cache[3] = (value) => onValidate("value", value))
            }, null, 8, ["placeholder", "modelValue"]))
          ])
        ]),
        createBaseVNode("td", _hoisted_5, [
          createBaseVNode("div", null, [
            createVNode(_component_n8n_tooltip, { placement: "top" }, {
              content: withCtx(() => [
                createTextVNode(toDisplayString(unref(i18n).baseText("variables.row.usage.copyToClipboard")), 1)
              ]),
              default: withCtx(() => [
                modelValue.value.key && usage.value ? (openBlock(), createElementBlock("span", {
                  key: 0,
                  class: normalizeClass(_ctx.$style.usageSyntax),
                  onClick: onUsageClick
                }, toDisplayString(usage.value), 3)) : createCommentVNode("", true)
              ]),
              _: 1
            })
          ])
        ]),
        isFeatureEnabled.value ? (openBlock(), createElementBlock("td", _hoisted_6, [
          __props.editing ? (openBlock(), createElementBlock("div", {
            key: 0,
            class: normalizeClass(_ctx.$style.buttons)
          }, [
            createVNode(_component_n8n_button, {
              "data-test-id": "variable-row-cancel-button",
              type: "tertiary",
              class: "mr-xs",
              onClick: onCancel
            }, {
              default: withCtx(() => [
                createTextVNode(toDisplayString(unref(i18n).baseText("variables.row.button.cancel")), 1)
              ]),
              _: 1
            }),
            createVNode(_component_n8n_button, {
              "data-test-id": "variable-row-save-button",
              disabled: !formValid.value,
              type: "primary",
              onClick: onSave
            }, {
              default: withCtx(() => [
                createTextVNode(toDisplayString(unref(i18n).baseText("variables.row.button.save")), 1)
              ]),
              _: 1
            }, 8, ["disabled"])
          ], 2)) : (openBlock(), createElementBlock("div", {
            key: 1,
            class: normalizeClass([_ctx.$style.buttons, _ctx.$style.hoverButtons])
          }, [
            createVNode(_component_n8n_tooltip, {
              disabled: unref(permissions).edit,
              placement: "top"
            }, {
              content: withCtx(() => [
                createTextVNode(toDisplayString(unref(i18n).baseText("variables.row.button.edit.onlyOwnerCanSave")), 1)
              ]),
              default: withCtx(() => [
                createBaseVNode("div", null, [
                  createVNode(_component_n8n_button, {
                    "data-test-id": "variable-row-edit-button",
                    type: "tertiary",
                    class: "mr-xs",
                    disabled: !unref(permissions).edit,
                    onClick: onEdit
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(unref(i18n).baseText("variables.row.button.edit")), 1)
                    ]),
                    _: 1
                  }, 8, ["disabled"])
                ])
              ]),
              _: 1
            }, 8, ["disabled"]),
            createVNode(_component_n8n_tooltip, {
              disabled: unref(permissions).delete,
              placement: "top"
            }, {
              content: withCtx(() => [
                createTextVNode(toDisplayString(unref(i18n).baseText("variables.row.button.delete.onlyOwnerCanDelete")), 1)
              ]),
              default: withCtx(() => [
                createBaseVNode("div", null, [
                  createVNode(_component_n8n_button, {
                    "data-test-id": "variable-row-delete-button",
                    type: "tertiary",
                    disabled: !unref(permissions).delete,
                    onClick: onDelete
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(unref(i18n).baseText("variables.row.button.delete")), 1)
                    ]),
                    _: 1
                  }, 8, ["disabled"])
                ])
              ]),
              _: 1
            }, 8, ["disabled"])
          ], 2))
        ])) : createCommentVNode("", true)
      ], 2);
    };
  }
});
const variablesRow = "_variablesRow_rbd77_5";
const hoverButtons = "_hoverButtons_rbd77_5";
const buttons = "_buttons_rbd77_14";
const usageSyntax = "_usageSyntax_rbd77_25";
const style0$1 = {
  variablesRow,
  hoverButtons,
  buttons,
  usageSyntax
};
const cssModules$1 = {
  "$style": style0$1
};
const VariablesRow = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__cssModules", cssModules$1]]);
const _withScopeId = (n) => (pushScopeId("data-v-efe5d219"), n = n(), popScopeId(), n);
const _hoisted_1 = { key: 0 };
const _hoisted_2 = { key: 1 };
const TEMPORARY_VARIABLE_UID_BASE = "@tmpvar";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "VariablesView",
  setup(__props) {
    const settingsStore = useSettingsStore();
    const environmentsStore = useEnvironmentsStore();
    const usersStore = useUsersStore();
    const uiStore = useUIStore();
    const telemetry = useTelemetry();
    const i18n = useI18n();
    const message = useMessage();
    const sourceControlStore = useSourceControlStore();
    let sourceControlStoreUnsubscribe = () => {
    };
    const layoutRef = ref(null);
    const { showError } = useToast();
    const allVariables = ref([]);
    const editMode = ref({});
    const permissions = getVariablesPermissions(usersStore.currentUser);
    const isFeatureEnabled = computed(
      () => settingsStore.isEnterpriseFeatureEnabled(EnterpriseEditionFeature.Variables)
    );
    const canCreateVariables = computed(() => isFeatureEnabled.value && permissions.create);
    const datatableColumns = computed(() => [
      {
        id: 0,
        path: "name",
        label: i18n.baseText("variables.table.key"),
        classes: ["variables-key-column"]
      },
      {
        id: 1,
        path: "value",
        label: i18n.baseText("variables.table.value"),
        classes: ["variables-value-column"]
      },
      {
        id: 2,
        path: "usage",
        label: i18n.baseText("variables.table.usage"),
        classes: ["variables-usage-column"]
      },
      ...isFeatureEnabled.value ? [
        {
          id: 3,
          path: "actions",
          label: ""
        }
      ] : []
    ]);
    const contextBasedTranslationKeys = computed(() => uiStore.contextBasedTranslationKeys);
    const newlyAddedVariableIds = ref([]);
    const nameSortFn = (a, b, direction) => {
      if (`${a.id}`.startsWith(TEMPORARY_VARIABLE_UID_BASE)) {
        return -1;
      } else if (`${b.id}`.startsWith(TEMPORARY_VARIABLE_UID_BASE)) {
        return 1;
      } else if (newlyAddedVariableIds.value.includes(a.id) && newlyAddedVariableIds.value.includes(b.id)) {
        return newlyAddedVariableIds.value.indexOf(a.id) - newlyAddedVariableIds.value.indexOf(b.id);
      } else if (newlyAddedVariableIds.value.includes(a.id)) {
        return -1;
      } else if (newlyAddedVariableIds.value.includes(b.id)) {
        return 1;
      }
      return direction === "asc" ? displayName(a).trim().localeCompare(displayName(b).trim()) : displayName(b).trim().localeCompare(displayName(a).trim());
    };
    const sortFns = {
      nameAsc: (a, b) => {
        return nameSortFn(a, b, "asc");
      },
      nameDesc: (a, b) => {
        return nameSortFn(a, b, "desc");
      }
    };
    function resetNewVariablesList() {
      newlyAddedVariableIds.value = [];
    }
    async function initialize() {
      await environmentsStore.fetchAllVariables();
      allVariables.value = [...environmentsStore.variables];
    }
    function addTemporaryVariable() {
      const temporaryVariable = {
        id: uid(TEMPORARY_VARIABLE_UID_BASE),
        key: "",
        value: ""
      };
      if (layoutRef.value) {
        if (layoutRef.value.$refs.listWrapperRef) {
          layoutRef.value.$refs.listWrapperRef.scrollTop = 0;
        }
        if (layoutRef.value.currentPage !== 1) {
          layoutRef.value.setCurrentPage(1);
        }
      }
      allVariables.value.unshift(temporaryVariable);
      editMode.value[temporaryVariable.id] = true;
      telemetry.track("User clicked add variable button");
    }
    async function saveVariable(data) {
      let updatedVariable;
      try {
        if (typeof data.id === "string" && data.id.startsWith(TEMPORARY_VARIABLE_UID_BASE)) {
          const { id, ...rest } = data;
          updatedVariable = await environmentsStore.createVariable(rest);
          allVariables.value.unshift(updatedVariable);
          allVariables.value = allVariables.value.filter((variable) => variable.id !== data.id);
          newlyAddedVariableIds.value.unshift(updatedVariable.id);
        } else {
          updatedVariable = await environmentsStore.updateVariable(data);
          allVariables.value = allVariables.value.filter((variable) => variable.id !== data.id);
          allVariables.value.push(updatedVariable);
          toggleEditing(updatedVariable);
        }
      } catch (error) {
        showError(error, i18n.baseText("variables.errors.save"));
      }
    }
    function toggleEditing(data) {
      editMode.value = {
        ...editMode.value,
        [data.id]: !editMode.value[data.id]
      };
    }
    function cancelEditing(data) {
      if (typeof data.id === "string" && data.id.startsWith(TEMPORARY_VARIABLE_UID_BASE)) {
        allVariables.value = allVariables.value.filter((variable) => variable.id !== data.id);
      } else {
        toggleEditing(data);
      }
    }
    async function deleteVariable(data) {
      try {
        const confirmed = await message.confirm(
          i18n.baseText("variables.modals.deleteConfirm.message", { interpolate: { name: data.key } }),
          i18n.baseText("variables.modals.deleteConfirm.title"),
          {
            confirmButtonText: i18n.baseText("variables.modals.deleteConfirm.confirmButton"),
            cancelButtonText: i18n.baseText("variables.modals.deleteConfirm.cancelButton")
          }
        );
        if (confirmed !== MODAL_CONFIRM) {
          return;
        }
        await environmentsStore.deleteVariable(data);
        allVariables.value = allVariables.value.filter((variable) => variable.id !== data.id);
      } catch (error) {
        showError(error, i18n.baseText("variables.errors.delete"));
      }
    }
    function goToUpgrade() {
      void uiStore.goToUpgrade("variables", "upgrade-variables");
    }
    function displayName(resource) {
      return resource.key;
    }
    onBeforeMount(() => {
      sourceControlStoreUnsubscribe = sourceControlStore.$onAction(({ name, after }) => {
        if (name === "pullWorkfolder" && after) {
          after(() => {
            void initialize();
          });
        }
      });
    });
    onBeforeUnmount(() => {
      sourceControlStoreUnsubscribe();
    });
    return (_ctx, _cache) => {
      const _component_n8n_button = resolveComponent("n8n-button");
      const _component_n8n_tooltip = resolveComponent("n8n-tooltip");
      const _component_n8n_action_box = resolveComponent("n8n-action-box");
      return openBlock(), createBlock(ResourcesListLayout, {
        class: "variables-view",
        ref_key: "layoutRef",
        ref: layoutRef,
        "resource-key": "variables",
        disabled: !isFeatureEnabled.value,
        resources: allVariables.value,
        initialize,
        shareable: false,
        displayName,
        sortFns,
        sortOptions: ["nameAsc", "nameDesc"],
        showFiltersDropdown: false,
        type: "datatable",
        "type-props": { columns: datatableColumns.value },
        onSort: resetNewVariablesList,
        "onClick:add": addTemporaryVariable
      }, createSlots({
        "add-button": withCtx(() => [
          createVNode(_component_n8n_tooltip, {
            placement: "top",
            disabled: canCreateVariables.value
          }, {
            content: withCtx(() => [
              !isFeatureEnabled.value ? (openBlock(), createElementBlock("span", _hoisted_1, toDisplayString(unref(i18n).baseText(`variables.add.unavailable${allVariables.value.length === 0 ? ".empty" : ""}`)), 1)) : (openBlock(), createElementBlock("span", _hoisted_2, toDisplayString(unref(i18n).baseText("variables.add.onlyOwnerCanCreate")), 1))
            ]),
            default: withCtx(() => [
              createBaseVNode("div", null, [
                createVNode(_component_n8n_button, {
                  size: "large",
                  block: "",
                  disabled: !canCreateVariables.value,
                  onClick: addTemporaryVariable,
                  "data-test-id": "resources-list-add"
                }, {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString(_ctx.$locale.baseText(`variables.add`)), 1)
                  ]),
                  _: 1
                }, 8, ["disabled"])
              ])
            ]),
            _: 1
          }, 8, ["disabled"])
        ]),
        default: withCtx(({ data }) => [
          (openBlock(), createBlock(VariablesRow, {
            key: data.id,
            editing: editMode.value[data.id],
            data,
            onSave: saveVariable,
            onEdit: toggleEditing,
            onCancel: cancelEditing,
            onDelete: deleteVariable
          }, null, 8, ["editing", "data"]))
        ]),
        _: 2
      }, [
        !isFeatureEnabled.value ? {
          name: "preamble",
          fn: withCtx(() => [
            createVNode(_component_n8n_action_box, {
              class: "mb-m",
              "data-test-id": "unavailable-resources-list",
              emoji: "👋",
              heading: _ctx.$locale.baseText(contextBasedTranslationKeys.value.variables.unavailable.title),
              description: _ctx.$locale.baseText(contextBasedTranslationKeys.value.variables.unavailable.description),
              buttonText: _ctx.$locale.baseText(contextBasedTranslationKeys.value.variables.unavailable.button),
              buttonType: "secondary",
              "onClick:button": goToUpgrade
            }, null, 8, ["heading", "description", "buttonText"])
          ]),
          key: "0"
        } : void 0,
        !isFeatureEnabled.value || isFeatureEnabled.value && !canCreateVariables.value ? {
          name: "empty",
          fn: withCtx(() => [
            !isFeatureEnabled.value ? (openBlock(), createBlock(_component_n8n_action_box, {
              key: 0,
              "data-test-id": "unavailable-resources-list",
              emoji: "👋",
              heading: _ctx.$locale.baseText(contextBasedTranslationKeys.value.variables.unavailable.title),
              description: _ctx.$locale.baseText(contextBasedTranslationKeys.value.variables.unavailable.description),
              buttonText: _ctx.$locale.baseText(contextBasedTranslationKeys.value.variables.unavailable.button),
              buttonType: "secondary",
              "onClick:button": goToUpgrade
            }, null, 8, ["heading", "description", "buttonText"])) : !canCreateVariables.value ? (openBlock(), createBlock(_component_n8n_action_box, {
              key: 1,
              "data-test-id": "cannot-create-variables",
              emoji: "👋",
              heading: _ctx.$locale.baseText("variables.empty.notAllowedToCreate.heading", {
                interpolate: { name: unref(usersStore).currentUser.firstName }
              }),
              description: _ctx.$locale.baseText("variables.empty.notAllowedToCreate.description"),
              onClick: goToUpgrade
            }, null, 8, ["heading", "description"])) : createCommentVNode("", true)
          ]),
          key: "1"
        } : void 0
      ]), 1032, ["disabled", "resources", "type-props"]);
    };
  }
});
const sidebarContainer = "_sidebarContainer_1qflh_9";
const style0 = {
  "type-input": "_type-input_1qflh_5",
  sidebarContainer
};
const VariablesView_vue_vue_type_style_index_1_scoped_efe5d219_lang = "";
const cssModules = {
  "$style": style0
};
const VariablesView = /* @__PURE__ */ _export_sfc(_sfc_main, [["__cssModules", cssModules], ["__scopeId", "data-v-efe5d219"]]);
export {
  VariablesView as default
};
