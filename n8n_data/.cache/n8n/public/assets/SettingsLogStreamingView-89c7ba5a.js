import { d as defineComponent, h as resolveComponent, o as openBlock, b as createBlock, n as normalizeClass, f as withCtx, j as createBaseVNode, i as createVNode, s as createTextVNode, t as toDisplayString, L as nextTick, k as createElementBlock, a3 as Fragment, q as createCommentVNode, ai as renderList } from "./vendor-fd4bd18c.js";
import { m as mapStores } from "./pinia-282957dc.js";
import { v as v4 } from "./uuid-2dfcd766.js";
import { aa as EnterpriseEditionFeature, $ as useMessage, d0 as deepCopy, dl as defaultMessageEventBusDestinationOptions, dk as useLogStreamingStore, a9 as MODAL_CONFIRM, _ as _export_sfc, w as createEventBus, D as useCredentialsStore, t as useUsersStore, n as useUIStore, H as useWorkflowsStore, y as useSettingsStore, dm as LOG_STREAM_MODAL_KEY } from "./n8n-8ddd8349.js";
import "./flatted-551ad821.js";
import "./esprima-next-b5fc8919.js";
import "./luxon-63e8a0ed.js";
import "./lodash-es-be629387.js";
import "./@vueuse/core-f4908be6.js";
import "./vue-i18n-86898575.js";
import "./@fortawesome/vue-fontawesome-04873987.js";
import "./@fortawesome/fontawesome-svg-core-6d4d86d8.js";
import "./@jsplumb/util-1214d169.js";
import "./@jsplumb/core-defb43f2.js";
import "./@jsplumb/common-6db23379.js";
import "./@jsplumb/connector-bezier-4c31eaae.js";
import "./@jsplumb/browser-ui-21fcaa55.js";
const DESTINATION_LIST_ITEM_ACTIONS = {
  OPEN: "open",
  DELETE: "delete"
};
const _sfc_main$1 = defineComponent({
  data() {
    return {
      EnterpriseEditionFeature,
      nodeParameters: {}
    };
  },
  setup() {
    return {
      ...useMessage()
    };
  },
  components: {},
  props: {
    eventBus: {
      type: Object
    },
    destination: {
      type: Object,
      required: true,
      default: deepCopy(defaultMessageEventBusDestinationOptions)
    },
    isInstanceOwner: Boolean
  },
  mounted() {
    var _a;
    this.nodeParameters = Object.assign(
      deepCopy(defaultMessageEventBusDestinationOptions),
      this.destination
    );
    (_a = this.eventBus) == null ? void 0 : _a.on("destinationWasSaved", this.onDestinationWasSaved);
  },
  beforeUnmount() {
    var _a;
    (_a = this.eventBus) == null ? void 0 : _a.off("destinationWasSaved", this.onDestinationWasSaved);
  },
  computed: {
    ...mapStores(useLogStreamingStore),
    actions() {
      const actions = [
        {
          label: this.$locale.baseText("workflows.item.open"),
          value: DESTINATION_LIST_ITEM_ACTIONS.OPEN
        }
      ];
      if (this.isInstanceOwner) {
        actions.push({
          label: this.$locale.baseText("workflows.item.delete"),
          value: DESTINATION_LIST_ITEM_ACTIONS.DELETE
        });
      }
      return actions;
    },
    typeLabelName() {
      return `settings.log-streaming.${this.destination.__type}`;
    }
  },
  methods: {
    onDestinationWasSaved() {
      const updatedDestination = this.logStreamingStore.getDestination(this.destination.id);
      if (updatedDestination) {
        this.nodeParameters = Object.assign(
          deepCopy(defaultMessageEventBusDestinationOptions),
          this.destination
        );
      }
    },
    async onClick(event) {
      var _a, _b;
      if (this.$refs.cardActions === event.target || ((_a = this.$refs.cardActions) == null ? void 0 : _a.contains(event.target)) || ((_b = event.target) == null ? void 0 : _b.contains(this.$refs.cardActions))) {
        return;
      }
      this.$emit("edit", this.destination.id);
    },
    onEnabledSwitched(state, destinationId) {
      this.nodeParameters.enabled = state;
      void this.saveDestination();
    },
    async saveDestination() {
      await this.logStreamingStore.saveDestination(this.nodeParameters);
    },
    async onAction(action) {
      if (action === DESTINATION_LIST_ITEM_ACTIONS.OPEN) {
        this.$emit("edit", this.destination.id);
      } else if (action === DESTINATION_LIST_ITEM_ACTIONS.DELETE) {
        const deleteConfirmed = await this.confirm(
          this.$locale.baseText("settings.log-streaming.destinationDelete.message", {
            interpolate: { destinationName: this.destination.label }
          }),
          this.$locale.baseText("settings.log-streaming.destinationDelete.headline"),
          {
            type: "warning",
            confirmButtonText: this.$locale.baseText(
              "settings.log-streaming.destinationDelete.confirmButtonText"
            ),
            cancelButtonText: this.$locale.baseText(
              "settings.log-streaming.destinationDelete.cancelButtonText"
            )
          }
        );
        if (deleteConfirmed !== MODAL_CONFIRM) {
          return;
        }
        this.$emit("remove", this.destination.id);
      }
    }
  }
});
const cardLink = "_cardLink_ump6w_5";
const activeStatusText = "_activeStatusText_ump6w_15";
const cardHeading = "_cardHeading_ump6w_23";
const cardDescription = "_cardDescription_ump6w_29";
const cardActions = "_cardActions_ump6w_36";
const style0$1 = {
  cardLink,
  activeStatusText,
  cardHeading,
  cardDescription,
  cardActions
};
function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_n8n_heading = resolveComponent("n8n-heading");
  const _component_n8n_text = resolveComponent("n8n-text");
  const _component_el_switch = resolveComponent("el-switch");
  const _component_n8n_action_toggle = resolveComponent("n8n-action-toggle");
  const _component_n8n_card = resolveComponent("n8n-card");
  return openBlock(), createBlock(_component_n8n_card, {
    class: normalizeClass(_ctx.$style.cardLink),
    "data-test-id": "destination-card",
    onClick: _ctx.onClick
  }, {
    header: withCtx(() => [
      createBaseVNode("div", null, [
        createVNode(_component_n8n_heading, {
          tag: "h2",
          bold: "",
          class: normalizeClass(_ctx.$style.cardHeading)
        }, {
          default: withCtx(() => [
            createTextVNode(toDisplayString(_ctx.destination.label), 1)
          ]),
          _: 1
        }, 8, ["class"]),
        createBaseVNode("div", {
          class: normalizeClass(_ctx.$style.cardDescription)
        }, [
          createVNode(_component_n8n_text, {
            color: "text-light",
            size: "small"
          }, {
            default: withCtx(() => [
              createBaseVNode("span", null, toDisplayString(_ctx.$locale.baseText(_ctx.typeLabelName)), 1)
            ]),
            _: 1
          })
        ], 2)
      ])
    ]),
    append: withCtx(() => [
      createBaseVNode("div", {
        class: normalizeClass(_ctx.$style.cardActions),
        ref: "cardActions"
      }, [
        createBaseVNode("div", {
          class: normalizeClass(_ctx.$style.activeStatusText),
          "data-test-id": "destination-activator-status"
        }, [
          _ctx.nodeParameters.enabled ? (openBlock(), createBlock(_component_n8n_text, {
            key: 0,
            color: "success",
            size: "small",
            bold: ""
          }, {
            default: withCtx(() => [
              createTextVNode(toDisplayString(_ctx.$locale.baseText("workflowActivator.active")), 1)
            ]),
            _: 1
          })) : (openBlock(), createBlock(_component_n8n_text, {
            key: 1,
            color: "text-base",
            size: "small",
            bold: ""
          }, {
            default: withCtx(() => [
              createTextVNode(toDisplayString(_ctx.$locale.baseText("workflowActivator.inactive")), 1)
            ]),
            _: 1
          }))
        ], 2),
        createVNode(_component_el_switch, {
          class: "mr-s",
          disabled: !_ctx.isInstanceOwner,
          modelValue: _ctx.nodeParameters.enabled,
          "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.onEnabledSwitched($event, _ctx.destination.id)),
          title: _ctx.nodeParameters.enabled ? _ctx.$locale.baseText("workflowActivator.deactivateWorkflow") : _ctx.$locale.baseText("workflowActivator.activateWorkflow"),
          "active-color": "#13ce66",
          "inactive-color": "#8899AA",
          "element-loading-spinner": "el-icon-loading",
          "data-test-id": "workflow-activate-switch"
        }, null, 8, ["disabled", "modelValue", "title"]),
        createVNode(_component_n8n_action_toggle, {
          actions: _ctx.actions,
          theme: "dark",
          onAction: _ctx.onAction
        }, null, 8, ["actions", "onAction"])
      ], 2)
    ]),
    _: 1
  }, 8, ["class", "onClick"]);
}
const cssModules$1 = {
  "$style": style0$1
};
const EventDestinationCard = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render$1], ["__cssModules", cssModules$1]]);
const _sfc_main = defineComponent({
  name: "SettingsLogStreamingView",
  props: {},
  components: {
    EventDestinationCard
  },
  data() {
    return {
      eventBus: createEventBus(),
      destinations: Array,
      disableLicense: false,
      allDestinations: [],
      isInstanceOwner: false
    };
  },
  async mounted() {
    var _a, _b;
    if (!this.isLicensed)
      return;
    this.isInstanceOwner = ((_b = (_a = this.usersStore.currentUser) == null ? void 0 : _a.globalRole) == null ? void 0 : _b.name) === "owner";
    await this.credentialsStore.fetchCredentialTypes(false);
    await this.credentialsStore.fetchAllCredentials();
    this.uiStore.nodeViewInitialized = false;
    await this.getDestinationDataFromBackend();
    this.logStreamingStore.$onAction(({ name, after }) => {
      if (name === "removeDestination" || name === "updateDestination") {
        after(async () => {
          this.$forceUpdate();
        });
      }
    });
    this.eventBus.on("destinationWasSaved", this.onDestinationWasSaved);
    this.eventBus.on("remove", this.onRemove);
    this.eventBus.on("closing", this.onBusClosing);
  },
  beforeUnmount() {
    this.eventBus.off("destinationWasSaved", this.onDestinationWasSaved);
    this.eventBus.off("remove", this.onRemove);
    this.eventBus.off("closing", this.onBusClosing);
  },
  computed: {
    ...mapStores(
      useSettingsStore,
      useLogStreamingStore,
      useWorkflowsStore,
      useUIStore,
      useUsersStore,
      useCredentialsStore
    ),
    sortedItemKeysByLabel() {
      var _a;
      const sortedKeys = [];
      for (const [key, value] of Object.entries(this.logStreamingStore.items)) {
        sortedKeys.push({ key, label: ((_a = value.destination) == null ? void 0 : _a.label) ?? "Destination" });
      }
      return sortedKeys.sort((a, b) => a.label.localeCompare(b.label));
    },
    environment() {
      return "production";
    },
    isLicensed() {
      if (this.disableLicense)
        return false;
      return this.settingsStore.isEnterpriseFeatureEnabled(EnterpriseEditionFeature.LogStreaming);
    }
  },
  methods: {
    onDestinationWasSaved() {
      this.$forceUpdate();
    },
    onBusClosing() {
      this.workflowsStore.removeAllNodes({ setStateDirty: false, removePinData: true });
      this.uiStore.stateIsDirty = false;
    },
    async getDestinationDataFromBackend() {
      this.logStreamingStore.clearEventNames();
      this.logStreamingStore.clearDestinationItemTrees();
      this.allDestinations = [];
      const eventNamesData = await this.logStreamingStore.fetchEventNames();
      if (eventNamesData) {
        for (const eventName of eventNamesData) {
          this.logStreamingStore.addEventName(eventName);
        }
      }
      const destinationData = await this.logStreamingStore.fetchDestinations();
      if (destinationData) {
        for (const destination of destinationData) {
          this.logStreamingStore.addDestination(destination);
          this.allDestinations.push(destination);
        }
      }
      this.$forceUpdate();
    },
    goToUpgrade() {
      void this.uiStore.goToUpgrade("log-streaming", "upgrade-log-streaming");
    },
    storeHasItems() {
      return this.logStreamingStore.items && Object.keys(this.logStreamingStore.items).length > 0;
    },
    async addDestination() {
      const newDestination = deepCopy(defaultMessageEventBusDestinationOptions);
      newDestination.id = v4();
      this.logStreamingStore.addDestination(newDestination);
      await nextTick();
      this.uiStore.openModalWithData({
        name: LOG_STREAM_MODAL_KEY,
        data: {
          destination: newDestination,
          isNew: true,
          eventBus: this.eventBus
        }
      });
    },
    async onRemove(destinationId) {
      if (!destinationId)
        return;
      await this.logStreamingStore.deleteDestination(destinationId);
      const foundNode = this.workflowsStore.getNodeByName(destinationId);
      if (foundNode) {
        this.workflowsStore.removeNode(foundNode);
      }
    },
    async onEdit(destinationId) {
      if (!destinationId)
        return;
      const editDestination = this.logStreamingStore.getDestination(destinationId);
      if (editDestination) {
        this.uiStore.openModalWithData({
          name: LOG_STREAM_MODAL_KEY,
          data: {
            destination: editDestination,
            isNew: false,
            eventBus: this.eventBus
          }
        });
      }
    }
  }
});
const header = "_header_1lkg8_5";
const destinationItem = "_destinationItem_1lkg8_15";
const style0 = {
  header,
  destinationItem
};
const _hoisted_1 = { class: "mb-2xl" };
const _hoisted_2 = { class: "ml-m" };
const _hoisted_3 = { class: "mb-l" };
const _hoisted_4 = ["innerHTML"];
const _hoisted_5 = { class: "mt-m text-right" };
const _hoisted_6 = {
  key: 1,
  "data-test-id": "action-box-licensed"
};
const _hoisted_7 = ["innerHTML"];
const _hoisted_8 = {
  key: 0,
  class: "mb-l"
};
const _hoisted_9 = ["innerHTML"];
const _hoisted_10 = { "data-test-id": "action-box-unlicensed" };
const _hoisted_11 = ["innerHTML"];
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_n8n_heading = resolveComponent("n8n-heading");
  const _component_el_switch = resolveComponent("el-switch");
  const _component_n8n_info_tip = resolveComponent("n8n-info-tip");
  const _component_event_destination_card = resolveComponent("event-destination-card");
  const _component_el_col = resolveComponent("el-col");
  const _component_el_row = resolveComponent("el-row");
  const _component_n8n_button = resolveComponent("n8n-button");
  const _component_n8n_action_box = resolveComponent("n8n-action-box");
  return openBlock(), createElementBlock("div", null, [
    createBaseVNode("div", {
      class: normalizeClass(_ctx.$style.header)
    }, [
      createBaseVNode("div", _hoisted_1, [
        createVNode(_component_n8n_heading, { size: "2xlarge" }, {
          default: withCtx(() => [
            createTextVNode(toDisplayString(_ctx.$locale.baseText(`settings.log-streaming.heading`)), 1)
          ]),
          _: 1
        }),
        _ctx.environment !== "production" ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
          createBaseVNode("strong", _hoisted_2, "Disable License (" + toDisplayString(_ctx.environment) + ") ", 1),
          createVNode(_component_el_switch, {
            modelValue: _ctx.disableLicense,
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.disableLicense = $event),
            size: "large",
            "data-test-id": "disable-license-toggle"
          }, null, 8, ["modelValue"])
        ], 64)) : createCommentVNode("", true)
      ])
    ], 2),
    _ctx.isLicensed ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
      createBaseVNode("div", _hoisted_3, [
        createVNode(_component_n8n_info_tip, {
          theme: "info",
          type: "note"
        }, {
          default: withCtx(() => [
            createBaseVNode("span", {
              innerHTML: _ctx.$locale.baseText("settings.log-streaming.infoText")
            }, null, 8, _hoisted_4)
          ]),
          _: 1
        })
      ]),
      _ctx.storeHasItems() ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.sortedItemKeysByLabel, (item) => {
          return openBlock(), createBlock(_component_el_row, {
            gutter: 10,
            key: item.key,
            class: normalizeClass(_ctx.$style.destinationItem)
          }, {
            default: withCtx(() => {
              var _a;
              return [
                ((_a = _ctx.logStreamingStore.items[item.key]) == null ? void 0 : _a.destination) ? (openBlock(), createBlock(_component_el_col, { key: 0 }, {
                  default: withCtx(() => {
                    var _a2;
                    return [
                      createVNode(_component_event_destination_card, {
                        destination: (_a2 = _ctx.logStreamingStore.items[item.key]) == null ? void 0 : _a2.destination,
                        eventBus: _ctx.eventBus,
                        isInstanceOwner: _ctx.isInstanceOwner,
                        onRemove: ($event) => {
                          var _a3, _b;
                          return _ctx.onRemove((_b = (_a3 = _ctx.logStreamingStore.items[item.key]) == null ? void 0 : _a3.destination) == null ? void 0 : _b.id);
                        },
                        onEdit: ($event) => {
                          var _a3, _b;
                          return _ctx.onEdit((_b = (_a3 = _ctx.logStreamingStore.items[item.key]) == null ? void 0 : _a3.destination) == null ? void 0 : _b.id);
                        }
                      }, null, 8, ["destination", "eventBus", "isInstanceOwner", "onRemove", "onEdit"])
                    ];
                  }),
                  _: 2
                }, 1024)) : createCommentVNode("", true)
              ];
            }),
            _: 2
          }, 1032, ["class"]);
        }), 128)),
        createBaseVNode("div", _hoisted_5, [
          _ctx.isInstanceOwner ? (openBlock(), createBlock(_component_n8n_button, {
            key: 0,
            size: "large",
            onClick: _ctx.addDestination
          }, {
            default: withCtx(() => [
              createTextVNode(toDisplayString(_ctx.$locale.baseText(`settings.log-streaming.add`)), 1)
            ]),
            _: 1
          }, 8, ["onClick"])) : createCommentVNode("", true)
        ])
      ], 64)) : (openBlock(), createElementBlock("div", _hoisted_6, [
        createVNode(_component_n8n_action_box, {
          buttonText: _ctx.$locale.baseText(`settings.log-streaming.add`),
          "onClick:button": _ctx.addDestination
        }, {
          heading: withCtx(() => [
            createBaseVNode("span", {
              innerHTML: _ctx.$locale.baseText(`settings.log-streaming.addFirstTitle`)
            }, null, 8, _hoisted_7)
          ]),
          _: 1
        }, 8, ["buttonText", "onClick:button"])
      ]))
    ], 64)) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
      _ctx.$locale.baseText("settings.log-streaming.infoText") ? (openBlock(), createElementBlock("div", _hoisted_8, [
        createVNode(_component_n8n_info_tip, {
          theme: "info",
          type: "note"
        }, {
          default: withCtx(() => [
            createBaseVNode("span", {
              innerHTML: _ctx.$locale.baseText("settings.log-streaming.infoText")
            }, null, 8, _hoisted_9)
          ]),
          _: 1
        })
      ])) : createCommentVNode("", true),
      createBaseVNode("div", _hoisted_10, [
        createVNode(_component_n8n_action_box, {
          description: _ctx.$locale.baseText("settings.log-streaming.actionBox.description"),
          buttonText: _ctx.$locale.baseText("settings.log-streaming.actionBox.button"),
          "onClick:button": _ctx.goToUpgrade
        }, {
          heading: withCtx(() => [
            createBaseVNode("span", {
              innerHTML: _ctx.$locale.baseText("settings.log-streaming.actionBox.title")
            }, null, 8, _hoisted_11)
          ]),
          _: 1
        }, 8, ["description", "buttonText", "onClick:button"])
      ])
    ], 64))
  ]);
}
const cssModules = {
  "$style": style0
};
const SettingsLogStreamingView = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__cssModules", cssModules]]);
export {
  SettingsLogStreamingView as default
};
