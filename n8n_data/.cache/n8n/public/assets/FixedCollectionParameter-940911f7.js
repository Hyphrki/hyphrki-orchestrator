import { d0 as deepCopy, gs as isINodePropertyCollectionList, cT as __vitePreload, _ as _export_sfc } from "./n8n-8ddd8349.js";
import { d as defineComponent, aI as defineAsyncComponent, aB as pushScopeId, aC as popScopeId, h as resolveComponent, o as openBlock, k as createElementBlock, af as withModifiers, i as createVNode, f as withCtx, s as createTextVNode, t as toDisplayString, q as createCommentVNode, a3 as Fragment, ai as renderList, b as createBlock, j as createBaseVNode, n as normalizeClass, aK as Suspense } from "./vendor-fd4bd18c.js";
import { g as get } from "./lodash-es-be629387.js";
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
const ParameterInputList = defineAsyncComponent(async () => __vitePreload(() => import("./index-00f166b0.js").then((n) => n.p), true ? ["assets/index-00f166b0.js","assets/vendor-fd4bd18c.js","assets/n8n-8ddd8349.js","assets/flatted-551ad821.js","assets/esprima-next-b5fc8919.js","assets/luxon-63e8a0ed.js","assets/pinia-282957dc.js","assets/lodash-es-be629387.js","assets/@vueuse/core-f4908be6.js","assets/uuid-2dfcd766.js","assets/vue-i18n-86898575.js","assets/@fortawesome/vue-fontawesome-04873987.js","assets/@fortawesome/fontawesome-svg-core-6d4d86d8.js","assets/@jsplumb/util-1214d169.js","assets/@jsplumb/core-defb43f2.js","assets/@jsplumb/common-6db23379.js","assets/@jsplumb/connector-bezier-4c31eaae.js","assets/@jsplumb/browser-ui-21fcaa55.js","assets/n8n-9a260305.css","assets/prettier-ee8b90a8.js","assets/codemirror-lang-html-n8n-1744db69.js","assets/@n8n/codemirror-lang-sql-71393e13.js","assets/@lezer/common-ff1769bd.js","assets/codemirror-lang-n8n-expression-5b146a0d.js","assets/fast-json-stable-stringify-4acbec5d.js","assets/timeago.js-527228bd.js","assets/qrcode.vue-401ae704.js","assets/vue3-touch-events-c30a9e21.js","assets/@fortawesome/free-solid-svg-icons-e786cea6.js","assets/@fortawesome/free-regular-svg-icons-d7581360.js","assets/chart.js-b7590faa.js","assets/index-ef6ecd1d.css"] : void 0));
const _sfc_main = defineComponent({
  name: "FixedCollectionParameter",
  props: {
    nodeValues: {
      type: Object,
      required: true
    },
    parameter: {
      type: Object,
      required: true
    },
    path: {
      type: String,
      required: true
    },
    values: {
      type: Object,
      default: () => ({})
    },
    isReadOnly: {
      type: Boolean,
      default: false
    }
  },
  components: {
    ParameterInputList
  },
  data() {
    return {
      selectedOption: void 0,
      mutableValues: {}
    };
  },
  watch: {
    values: {
      handler(newValues) {
        this.mutableValues = deepCopy(newValues);
      },
      deep: true
    }
  },
  created() {
    this.mutableValues = deepCopy(this.values);
  },
  computed: {
    getPlaceholderText() {
      const placeholder = this.$locale.nodeText().placeholder(this.parameter, this.path);
      return placeholder ? placeholder : this.$locale.baseText("fixedCollectionParameter.choose");
    },
    getProperties() {
      const returnProperties = [];
      let tempProperties;
      for (const name of this.propertyNames) {
        tempProperties = this.getOptionProperties(name);
        if (tempProperties !== void 0) {
          returnProperties.push(tempProperties);
        }
      }
      return returnProperties;
    },
    multipleValues() {
      var _a;
      return !!((_a = this.parameter.typeOptions) == null ? void 0 : _a.multipleValues);
    },
    parameterOptions() {
      if (this.multipleValues && isINodePropertyCollectionList(this.parameter.options)) {
        return this.parameter.options;
      }
      return this.parameter.options.filter((option) => {
        return !this.propertyNames.includes(option.name);
      });
    },
    propertyNames() {
      return Object.keys(this.mutableValues || {});
    },
    sortable() {
      var _a;
      return !!((_a = this.parameter.typeOptions) == null ? void 0 : _a.sortable);
    }
  },
  methods: {
    deleteOption(optionName, index) {
      const currentOptionsOfSameType = this.mutableValues[optionName];
      if (!currentOptionsOfSameType || currentOptionsOfSameType.length > 1) {
        this.$emit("valueChanged", {
          name: this.getPropertyPath(optionName, index),
          value: void 0
        });
      } else {
        this.$emit("valueChanged", {
          name: this.getPropertyPath(optionName),
          value: void 0
        });
      }
    },
    getPropertyPath(name, index) {
      return `${this.path}.${name}` + (index !== void 0 ? `[${index}]` : "");
    },
    getOptionProperties(optionName) {
      if (isINodePropertyCollectionList(this.parameter.options)) {
        for (const option of this.parameter.options) {
          if (option.name === optionName) {
            return option;
          }
        }
      }
      return void 0;
    },
    moveOptionDown(optionName, index) {
      if (Array.isArray(this.mutableValues[optionName])) {
        this.mutableValues[optionName].splice(
          index + 1,
          0,
          this.mutableValues[optionName].splice(index, 1)[0]
        );
      }
      const parameterData = {
        name: this.getPropertyPath(optionName),
        value: this.mutableValues[optionName]
      };
      this.$emit("valueChanged", parameterData);
    },
    moveOptionUp(optionName, index) {
      var _a;
      if (Array.isArray(this.mutableValues[optionName])) {
        (_a = this.mutableValues) == null ? void 0 : _a[optionName].splice(
          index - 1,
          0,
          this.mutableValues[optionName].splice(index, 1)[0]
        );
      }
      const parameterData = {
        name: this.getPropertyPath(optionName),
        value: this.mutableValues[optionName]
      };
      this.$emit("valueChanged", parameterData);
    },
    optionSelected(optionName) {
      const option = this.getOptionProperties(optionName);
      if (option === void 0) {
        return;
      }
      const name = `${this.path}.${option.name}`;
      const newParameterValue = {};
      for (const optionParameter of option.values) {
        if (optionParameter.type === "fixedCollection" && optionParameter.typeOptions !== void 0 && optionParameter.typeOptions.multipleValues === true) {
          newParameterValue[optionParameter.name] = {};
        } else if (optionParameter.typeOptions !== void 0 && optionParameter.typeOptions.multipleValues === true) {
          newParameterValue[optionParameter.name] = get(
            this.nodeValues,
            `${this.path}.${optionParameter.name}`,
            []
          );
          if (Array.isArray(optionParameter.default)) {
            newParameterValue[optionParameter.name].push(
              ...deepCopy(optionParameter.default)
            );
          } else if (optionParameter.default !== "" && typeof optionParameter.default !== "object") {
            newParameterValue[optionParameter.name].push(
              deepCopy(optionParameter.default)
            );
          }
        } else {
          newParameterValue[optionParameter.name] = deepCopy(optionParameter.default);
        }
      }
      let newValue;
      if (this.multipleValues) {
        newValue = get(this.nodeValues, name, []);
        newValue.push(newParameterValue);
      } else {
        newValue = newParameterValue;
      }
      const parameterData = {
        name,
        value: newValue
      };
      this.$emit("valueChanged", parameterData);
      this.selectedOption = void 0;
    },
    valueChanged(parameterData) {
      this.$emit("valueChanged", parameterData);
    }
  }
});
const FixedCollectionParameter_vue_vue_type_style_index_0_scoped_10abe54a_lang = "";
const _withScopeId = (n) => (pushScopeId("data-v-10abe54a"), n = n(), popScopeId(), n);
const _hoisted_1 = {
  key: 0,
  class: "no-items-exist"
};
const _hoisted_2 = { key: 1 };
const _hoisted_3 = {
  key: 0,
  class: "delete-option"
};
const _hoisted_4 = {
  key: 0,
  class: "sort-icon"
};
const _hoisted_5 = {
  key: 2,
  class: "parameter-item"
};
const _hoisted_6 = { class: "parameter-item-wrapper" };
const _hoisted_7 = {
  key: 0,
  class: "delete-option"
};
const _hoisted_8 = { key: 1 };
const _hoisted_9 = {
  key: 1,
  class: "add-option"
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_n8n_text = resolveComponent("n8n-text");
  const _component_n8n_input_label = resolveComponent("n8n-input-label");
  const _component_font_awesome_icon = resolveComponent("font-awesome-icon");
  const _component_parameter_input_list = resolveComponent("parameter-input-list");
  const _component_n8n_button = resolveComponent("n8n-button");
  const _component_n8n_option = resolveComponent("n8n-option");
  const _component_n8n_select = resolveComponent("n8n-select");
  return openBlock(), createElementBlock("div", {
    onKeydown: _cache[2] || (_cache[2] = withModifiers(() => {
    }, ["stop"])),
    class: "fixed-collection-parameter"
  }, [
    _ctx.getProperties.length === 0 ? (openBlock(), createElementBlock("div", _hoisted_1, [
      createVNode(_component_n8n_text, { size: "small" }, {
        default: withCtx(() => [
          createTextVNode(toDisplayString(_ctx.$locale.baseText("fixedCollectionParameter.currentlyNoItemsExist")), 1)
        ]),
        _: 1
      })
    ])) : createCommentVNode("", true),
    (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.getProperties, (property) => {
      return openBlock(), createElementBlock("div", {
        key: property.name,
        class: "fixed-collection-parameter-property"
      }, [
        property.displayName !== "" && _ctx.parameter.options && _ctx.parameter.options.length !== 1 ? (openBlock(), createBlock(_component_n8n_input_label, {
          key: 0,
          label: _ctx.$locale.nodeText().inputLabelDisplayName(property, _ctx.path),
          underline: true,
          size: "small",
          color: "text-dark"
        }, null, 8, ["label"])) : createCommentVNode("", true),
        _ctx.multipleValues ? (openBlock(), createElementBlock("div", _hoisted_2, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.mutableValues[property.name], (value, index) => {
            return openBlock(), createElementBlock("div", {
              key: property.name + index,
              class: "parameter-item"
            }, [
              createBaseVNode("div", {
                class: normalizeClass(index ? "border-top-dashed parameter-item-wrapper " : "parameter-item-wrapper")
              }, [
                !_ctx.isReadOnly ? (openBlock(), createElementBlock("div", _hoisted_3, [
                  createVNode(_component_font_awesome_icon, {
                    icon: "trash",
                    class: "reset-icon clickable",
                    title: _ctx.$locale.baseText("fixedCollectionParameter.deleteItem"),
                    onClick: ($event) => _ctx.deleteOption(property.name, index)
                  }, null, 8, ["title", "onClick"]),
                  _ctx.sortable ? (openBlock(), createElementBlock("div", _hoisted_4, [
                    index !== 0 ? (openBlock(), createBlock(_component_font_awesome_icon, {
                      key: 0,
                      icon: "angle-up",
                      class: "clickable",
                      title: _ctx.$locale.baseText("fixedCollectionParameter.moveUp"),
                      onClick: ($event) => _ctx.moveOptionUp(property.name, index)
                    }, null, 8, ["title", "onClick"])) : createCommentVNode("", true),
                    index !== _ctx.mutableValues[property.name].length - 1 ? (openBlock(), createBlock(_component_font_awesome_icon, {
                      key: 1,
                      icon: "angle-down",
                      class: "clickable",
                      title: _ctx.$locale.baseText("fixedCollectionParameter.moveDown"),
                      onClick: ($event) => _ctx.moveOptionDown(property.name, index)
                    }, null, 8, ["title", "onClick"])) : createCommentVNode("", true)
                  ])) : createCommentVNode("", true)
                ])) : createCommentVNode("", true),
                (openBlock(), createBlock(Suspense, null, {
                  default: withCtx(() => [
                    createVNode(_component_parameter_input_list, {
                      parameters: property.values,
                      nodeValues: _ctx.nodeValues,
                      path: _ctx.getPropertyPath(property.name, index),
                      hideDelete: true,
                      isReadOnly: _ctx.isReadOnly,
                      onValueChanged: _ctx.valueChanged
                    }, null, 8, ["parameters", "nodeValues", "path", "isReadOnly", "onValueChanged"])
                  ]),
                  _: 2
                }, 1024))
              ], 2)
            ]);
          }), 128))
        ])) : (openBlock(), createElementBlock("div", _hoisted_5, [
          createBaseVNode("div", _hoisted_6, [
            !_ctx.isReadOnly ? (openBlock(), createElementBlock("div", _hoisted_7, [
              createVNode(_component_font_awesome_icon, {
                icon: "trash",
                class: "reset-icon clickable",
                title: _ctx.$locale.baseText("fixedCollectionParameter.deleteItem"),
                onClick: ($event) => _ctx.deleteOption(property.name)
              }, null, 8, ["title", "onClick"])
            ])) : createCommentVNode("", true),
            createVNode(_component_parameter_input_list, {
              parameters: property.values,
              nodeValues: _ctx.nodeValues,
              path: _ctx.getPropertyPath(property.name),
              isReadOnly: _ctx.isReadOnly,
              class: "parameter-item",
              onValueChanged: _ctx.valueChanged,
              hideDelete: true
            }, null, 8, ["parameters", "nodeValues", "path", "isReadOnly", "onValueChanged"])
          ])
        ]))
      ]);
    }), 128)),
    _ctx.parameterOptions.length > 0 && !_ctx.isReadOnly ? (openBlock(), createElementBlock("div", _hoisted_8, [
      _ctx.parameter.options.length === 1 ? (openBlock(), createBlock(_component_n8n_button, {
        key: 0,
        type: "tertiary",
        block: "",
        onClick: _cache[0] || (_cache[0] = ($event) => _ctx.optionSelected(_ctx.parameter.options[0].name)),
        label: _ctx.getPlaceholderText
      }, null, 8, ["label"])) : (openBlock(), createElementBlock("div", _hoisted_9, [
        createVNode(_component_n8n_select, {
          modelValue: _ctx.selectedOption,
          "onUpdate:modelValue": [
            _cache[1] || (_cache[1] = ($event) => _ctx.selectedOption = $event),
            _ctx.optionSelected
          ],
          placeholder: _ctx.getPlaceholderText,
          size: "small",
          filterable: ""
        }, {
          default: withCtx(() => [
            (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.parameterOptions, (item) => {
              return openBlock(), createBlock(_component_n8n_option, {
                key: item.name,
                label: _ctx.$locale.nodeText().collectionOptionDisplayName(_ctx.parameter, item, _ctx.path),
                value: item.name
              }, null, 8, ["label", "value"]);
            }), 128))
          ]),
          _: 1
        }, 8, ["modelValue", "placeholder", "onUpdate:modelValue"])
      ]))
    ])) : createCommentVNode("", true)
  ], 32);
}
const FixedCollectionParameter = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-10abe54a"]]);
export {
  FixedCollectionParameter as default
};
