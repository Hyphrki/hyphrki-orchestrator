import { d as defineComponent, h as resolveComponent, aw as resolveDirective, o as openBlock, k as createElementBlock, j as createBaseVNode, n as normalizeClass, i as createVNode, f as withCtx, s as createTextVNode, t as toDisplayString, b as createBlock, q as createCommentVNode, ac as withDirectives } from "./vendor-fd4bd18c.js";
import { f$ as ElTable, g0 as ElTableColumn, u as useToast, $ as useMessage, w as createEventBus, n as useUIStore, y as useSettingsStore, t as useUsersStore, g1 as capitalizeFirstLetter, g2 as convertToDisplayDate, a9 as MODAL_CONFIRM, _ as _export_sfc } from "./n8n-8ddd8349.js";
import { h as humanizeDuration } from "./humanize-duration-417ecb37.js";
import { K } from "./v3-infinite-loading-d8abbb64.js";
import { m as mapStores } from "./pinia-282957dc.js";
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
const _sfc_main = defineComponent({
  name: "SettingsLdapView",
  components: {
    InfiniteLoading: K,
    ElTable,
    ElTableColumn
  },
  setup() {
    return {
      ...useToast(),
      ...useMessage()
    };
  },
  data() {
    return {
      dataTable: [],
      tableKey: 0,
      adConfig: {},
      loadingTestConnection: false,
      loadingDryRun: false,
      loadingLiveRun: false,
      loadingTable: false,
      hasAnyChanges: false,
      formInputs: null,
      formBus: createEventBus(),
      readyToSubmit: false,
      page: 0,
      loginEnabled: false,
      syncEnabled: false
    };
  },
  async mounted() {
    if (!this.isLDAPFeatureEnabled)
      return;
    await this.getLdapConfig();
  },
  computed: {
    ...mapStores(useUsersStore, useSettingsStore, useUIStore),
    currentUser() {
      return this.usersStore.currentUser;
    },
    isLDAPFeatureEnabled() {
      return this.settingsStore.settings.enterprise.ldap;
    }
  },
  methods: {
    goToUpgrade() {
      void this.uiStore.goToUpgrade("ldap", "upgrade-ldap");
    },
    cellClassStyle({ row, column }) {
      if (column.property === "status") {
        if (row.status === "Success") {
          return { color: "green" };
        } else if (row.status === "Error") {
          return { color: "red" };
        }
      }
      if (column.property === "runMode") {
        if (row.runMode === "Dry") {
          return { color: "orange" };
        } else if (row.runMode === "Live") {
          return { color: "blue" };
        }
      }
      return {};
    },
    onInput(input) {
      if (input.name === "loginEnabled" && typeof input.value === "boolean") {
        this.loginEnabled = input.value;
      }
      if (input.name === "synchronizationEnabled" && typeof input.value === "boolean") {
        this.syncEnabled = input.value;
      }
      this.hasAnyChanges = true;
    },
    onReadyToSubmit(ready) {
      this.readyToSubmit = ready;
    },
    syncDataMapper(sync) {
      const startedAt = new Date(sync.startedAt);
      const endedAt = new Date(sync.endedAt);
      const runTimeInMinutes = endedAt.getTime() - startedAt.getTime();
      return {
        runTime: humanizeDuration(runTimeInMinutes),
        runMode: capitalizeFirstLetter(sync.runMode),
        status: capitalizeFirstLetter(sync.status),
        endedAt: convertToDisplayDate(endedAt.getTime()),
        details: this.$locale.baseText("settings.ldap.usersScanned", {
          interpolate: {
            scanned: sync.scanned.toString()
          }
        })
      };
    },
    async onSubmit() {
      const formInputsRef = this.$refs.ldapConfigForm;
      if (!this.hasAnyChanges || !formInputsRef) {
        return;
      }
      const newConfiguration = {
        loginEnabled: formInputsRef.values.loginEnabled,
        loginLabel: formInputsRef.values.loginLabel,
        connectionUrl: formInputsRef.values.serverAddress,
        allowUnauthorizedCerts: formInputsRef.values.allowUnauthorizedCerts,
        connectionPort: +formInputsRef.values.port,
        connectionSecurity: formInputsRef.values.connectionSecurity,
        baseDn: formInputsRef.values.baseDn,
        bindingAdminDn: formInputsRef.values.bindingType === "admin" ? formInputsRef.values.adminDn : "",
        bindingAdminPassword: formInputsRef.values.bindingType === "admin" ? formInputsRef.values.adminPassword : "",
        emailAttribute: formInputsRef.values.email,
        firstNameAttribute: formInputsRef.values.firstName,
        lastNameAttribute: formInputsRef.values.lastName,
        loginIdAttribute: formInputsRef.values.loginId,
        ldapIdAttribute: formInputsRef.values.ldapId,
        userFilter: formInputsRef.values.userFilter,
        synchronizationEnabled: formInputsRef.values.synchronizationEnabled,
        synchronizationInterval: +formInputsRef.values.synchronizationInterval,
        searchPageSize: +formInputsRef.values.pageSize,
        searchTimeout: +formInputsRef.values.searchTimeout
      };
      let saveForm = true;
      try {
        if (this.adConfig.loginEnabled && !newConfiguration.loginEnabled) {
          const confirmAction = await this.confirm(
            this.$locale.baseText("settings.ldap.confirmMessage.beforeSaveForm.message"),
            this.$locale.baseText("settings.ldap.confirmMessage.beforeSaveForm.headline"),
            {
              cancelButtonText: this.$locale.baseText(
                "settings.ldap.confirmMessage.beforeSaveForm.cancelButtonText"
              ),
              confirmButtonText: this.$locale.baseText(
                "settings.ldap.confirmMessage.beforeSaveForm.confirmButtonText"
              )
            }
          );
          saveForm = confirmAction === MODAL_CONFIRM;
        }
        if (!saveForm) {
          this.hasAnyChanges = true;
        }
        this.adConfig = await this.settingsStore.updateLdapConfig(newConfiguration);
        this.showToast({
          title: this.$locale.baseText("settings.ldap.updateConfiguration"),
          message: "",
          type: "success"
        });
      } catch (error) {
        this.showError(error, this.$locale.baseText("settings.ldap.configurationError"));
      } finally {
        if (saveForm) {
          this.hasAnyChanges = false;
        }
      }
    },
    onSaveClick() {
      this.formBus.emit("submit");
    },
    async onTestConnectionClick() {
      this.loadingTestConnection = true;
      try {
        await this.settingsStore.testLdapConnection();
        this.showToast({
          title: this.$locale.baseText("settings.ldap.connectionTest"),
          message: this.$locale.baseText("settings.ldap.toast.connection.success"),
          type: "success"
        });
      } catch (error) {
        this.showToast({
          title: this.$locale.baseText("settings.ldap.connectionTestError"),
          message: error.message,
          type: "error"
        });
      } finally {
        this.loadingTestConnection = false;
      }
    },
    async onDryRunClick() {
      this.loadingDryRun = true;
      try {
        await this.settingsStore.runLdapSync({ type: "dry" });
        this.showToast({
          title: this.$locale.baseText("settings.ldap.runSync.title"),
          message: this.$locale.baseText("settings.ldap.toast.sync.success"),
          type: "success"
        });
      } catch (error) {
        this.showError(error, this.$locale.baseText("settings.ldap.synchronizationError"));
      } finally {
        this.loadingDryRun = false;
        await this.reloadLdapSynchronizations();
      }
    },
    async onLiveRunClick() {
      this.loadingLiveRun = true;
      try {
        await this.settingsStore.runLdapSync({ type: "live" });
        this.showToast({
          title: this.$locale.baseText("settings.ldap.runSync.title"),
          message: this.$locale.baseText("settings.ldap.toast.sync.success"),
          type: "success"
        });
      } catch (error) {
        this.showError(error, this.$locale.baseText("settings.ldap.synchronizationError"));
      } finally {
        this.loadingLiveRun = false;
        await this.reloadLdapSynchronizations();
      }
    },
    async getLdapConfig() {
      try {
        this.adConfig = await this.settingsStore.getLdapConfig();
        this.loginEnabled = this.adConfig.loginEnabled;
        this.syncEnabled = this.adConfig.synchronizationEnabled;
        const whenLoginEnabled = (values) => values.loginEnabled === true;
        const whenSyncAndLoginEnabled = (values) => values.synchronizationEnabled === true && values.loginEnabled === true;
        const whenAdminBindingAndLoginEnabled = (values) => values.bindingType === "admin" && values.loginEnabled === true;
        this.formInputs = [
          {
            name: "loginEnabled",
            initialValue: this.adConfig.loginEnabled,
            properties: {
              type: "toggle",
              label: this.$locale.baseText("settings.ldap.form.loginEnabled.label"),
              tooltipText: this.$locale.baseText("settings.ldap.form.loginEnabled.tooltip"),
              required: true
            }
          },
          {
            name: "loginLabel",
            initialValue: this.adConfig.loginLabel,
            properties: {
              label: this.$locale.baseText("settings.ldap.form.loginLabel.label"),
              required: true,
              placeholder: this.$locale.baseText("settings.ldap.form.loginLabel.placeholder"),
              infoText: this.$locale.baseText("settings.ldap.form.loginLabel.infoText")
            },
            shouldDisplay: whenLoginEnabled
          },
          {
            name: "serverAddress",
            initialValue: this.adConfig.connectionUrl,
            properties: {
              label: this.$locale.baseText("settings.ldap.form.serverAddress.label"),
              required: true,
              capitalize: true,
              placeholder: this.$locale.baseText("settings.ldap.form.serverAddress.placeholder"),
              infoText: this.$locale.baseText("settings.ldap.form.serverAddress.infoText")
            },
            shouldDisplay: whenLoginEnabled
          },
          {
            name: "port",
            initialValue: this.adConfig.connectionPort,
            properties: {
              type: "number",
              label: this.$locale.baseText("settings.ldap.form.port.label"),
              capitalize: true,
              infoText: this.$locale.baseText("settings.ldap.form.port.infoText")
            },
            shouldDisplay: whenLoginEnabled
          },
          {
            name: "connectionSecurity",
            initialValue: this.adConfig.connectionSecurity,
            properties: {
              type: "select",
              label: this.$locale.baseText("settings.ldap.form.connectionSecurity.label"),
              infoText: this.$locale.baseText("settings.ldap.form.connectionSecurity.infoText"),
              options: [
                {
                  label: "None",
                  value: "none"
                },
                {
                  label: "TLS",
                  value: "tls"
                },
                {
                  label: "STARTTLS",
                  value: "startTls"
                }
              ],
              required: true,
              capitalize: true
            },
            shouldDisplay: whenLoginEnabled
          },
          {
            name: "allowUnauthorizedCerts",
            initialValue: this.adConfig.allowUnauthorizedCerts,
            properties: {
              type: "toggle",
              label: this.$locale.baseText("settings.ldap.form.allowUnauthorizedCerts.label"),
              required: false
            },
            shouldDisplay(values) {
              return values.connectionSecurity !== "none" && values.loginEnabled === true;
            }
          },
          {
            name: "baseDn",
            initialValue: this.adConfig.baseDn,
            properties: {
              label: this.$locale.baseText("settings.ldap.form.baseDn.label"),
              required: true,
              capitalize: true,
              placeholder: this.$locale.baseText("settings.ldap.form.baseDn.placeholder"),
              infoText: this.$locale.baseText("settings.ldap.form.baseDn.infoText")
            },
            shouldDisplay: whenLoginEnabled
          },
          {
            name: "bindingType",
            initialValue: "admin",
            properties: {
              type: "select",
              label: this.$locale.baseText("settings.ldap.form.bindingType.label"),
              infoText: this.$locale.baseText("settings.ldap.form.bindingType.infoText"),
              options: [
                {
                  value: "admin",
                  label: "Admin"
                },
                {
                  value: "anonymous",
                  label: "Anonymous"
                }
              ]
            },
            shouldDisplay: whenLoginEnabled
          },
          {
            name: "adminDn",
            initialValue: this.adConfig.bindingAdminDn,
            properties: {
              label: this.$locale.baseText("settings.ldap.form.adminDn.label"),
              placeholder: this.$locale.baseText("settings.ldap.form.adminDn.placeholder"),
              infoText: this.$locale.baseText("settings.ldap.form.adminDn.infoText"),
              capitalize: true
            },
            shouldDisplay: whenAdminBindingAndLoginEnabled
          },
          {
            name: "adminPassword",
            initialValue: this.adConfig.bindingAdminPassword,
            properties: {
              label: this.$locale.baseText("settings.ldap.form.adminPassword.label"),
              type: "password",
              capitalize: true,
              infoText: this.$locale.baseText("settings.ldap.form.adminPassword.infoText")
            },
            shouldDisplay: whenAdminBindingAndLoginEnabled
          },
          {
            name: "userFilter",
            initialValue: this.adConfig.userFilter,
            properties: {
              label: this.$locale.baseText("settings.ldap.form.userFilter.label"),
              type: "text",
              required: false,
              capitalize: true,
              placeholder: this.$locale.baseText("settings.ldap.form.userFilter.placeholder"),
              infoText: this.$locale.baseText("settings.ldap.form.userFilter.infoText")
            },
            shouldDisplay: whenLoginEnabled
          },
          {
            name: "attributeMappingInfo",
            properties: {
              label: this.$locale.baseText("settings.ldap.form.attributeMappingInfo.label"),
              type: "info",
              labelSize: "large",
              labelAlignment: "left"
            },
            shouldDisplay: whenLoginEnabled
          },
          {
            name: "ldapId",
            initialValue: this.adConfig.ldapIdAttribute,
            properties: {
              label: this.$locale.baseText("settings.ldap.form.ldapId.label"),
              type: "text",
              required: true,
              capitalize: true,
              placeholder: this.$locale.baseText("settings.ldap.form.ldapId.placeholder"),
              infoText: this.$locale.baseText("settings.ldap.form.ldapId.infoText")
            },
            shouldDisplay: whenLoginEnabled
          },
          {
            name: "loginId",
            initialValue: this.adConfig.loginIdAttribute,
            properties: {
              label: this.$locale.baseText("settings.ldap.form.loginId.label"),
              type: "text",
              autocomplete: "email",
              required: true,
              capitalize: true,
              placeholder: this.$locale.baseText("settings.ldap.form.loginId.placeholder"),
              infoText: this.$locale.baseText("settings.ldap.form.loginId.infoText")
            },
            shouldDisplay: whenLoginEnabled
          },
          {
            name: "email",
            initialValue: this.adConfig.emailAttribute,
            properties: {
              label: this.$locale.baseText("settings.ldap.form.email.label"),
              type: "text",
              autocomplete: "email",
              required: true,
              capitalize: true,
              placeholder: this.$locale.baseText("settings.ldap.form.email.placeholder"),
              infoText: this.$locale.baseText("settings.ldap.form.email.infoText")
            },
            shouldDisplay: whenLoginEnabled
          },
          {
            name: "firstName",
            initialValue: this.adConfig.firstNameAttribute,
            properties: {
              label: this.$locale.baseText("settings.ldap.form.firstName.label"),
              type: "text",
              autocomplete: "email",
              required: true,
              capitalize: true,
              placeholder: this.$locale.baseText("settings.ldap.form.firstName.placeholder"),
              infoText: this.$locale.baseText("settings.ldap.form.firstName.infoText")
            },
            shouldDisplay: whenLoginEnabled
          },
          {
            name: "lastName",
            initialValue: this.adConfig.lastNameAttribute,
            properties: {
              label: this.$locale.baseText("settings.ldap.form.lastName.label"),
              type: "text",
              autocomplete: "email",
              required: true,
              capitalize: true,
              placeholder: this.$locale.baseText("settings.ldap.form.lastName.placeholder"),
              infoText: this.$locale.baseText("settings.ldap.form.lastName.infoText")
            },
            shouldDisplay: whenLoginEnabled
          },
          {
            name: "synchronizationEnabled",
            initialValue: this.adConfig.synchronizationEnabled,
            properties: {
              type: "toggle",
              label: this.$locale.baseText("settings.ldap.form.synchronizationEnabled.label"),
              tooltipText: this.$locale.baseText(
                "settings.ldap.form.synchronizationEnabled.tooltip"
              ),
              required: true
            },
            shouldDisplay: whenLoginEnabled
          },
          {
            name: "synchronizationInterval",
            initialValue: this.adConfig.synchronizationInterval,
            properties: {
              type: "number",
              label: this.$locale.baseText("settings.ldap.form.synchronizationInterval.label"),
              infoText: this.$locale.baseText(
                "settings.ldap.form.synchronizationInterval.infoText"
              )
            },
            shouldDisplay: whenSyncAndLoginEnabled
          },
          {
            name: "pageSize",
            initialValue: this.adConfig.searchPageSize,
            properties: {
              type: "number",
              label: this.$locale.baseText("settings.ldap.form.pageSize.label"),
              infoText: this.$locale.baseText("settings.ldap.form.pageSize.infoText")
            },
            shouldDisplay: whenSyncAndLoginEnabled
          },
          {
            name: "searchTimeout",
            initialValue: this.adConfig.searchTimeout,
            properties: {
              type: "number",
              label: this.$locale.baseText("settings.ldap.form.searchTimeout.label"),
              infoText: this.$locale.baseText("settings.ldap.form.searchTimeout.infoText")
            },
            shouldDisplay: whenSyncAndLoginEnabled
          }
        ];
      } catch (error) {
        this.showError(error, this.$locale.baseText("settings.ldap.configurationError"));
      }
    },
    async getLdapSynchronizations(state) {
      try {
        this.loadingTable = true;
        const data = await this.settingsStore.getLdapSynchronizations({
          page: this.page
        });
        if (data.length !== 0) {
          this.dataTable.push(...data.map(this.syncDataMapper));
          this.page += 1;
          state.loaded();
        } else {
          state.complete();
        }
        this.loadingTable = false;
      } catch (error) {
        this.showError(error, this.$locale.baseText("settings.ldap.synchronizationError"));
      }
    },
    async reloadLdapSynchronizations() {
      try {
        this.page = 0;
        this.tableKey += 1;
        this.dataTable = [];
      } catch (error) {
        this.showError(error, this.$locale.baseText("settings.ldap.synchronizationError"));
      }
    }
  }
});
const container = "_container_f18ao_5";
const syncTable = "_syncTable_f18ao_9";
const header = "_header_f18ao_13";
const enableFeatureContainer = "_enableFeatureContainer_f18ao_22";
const sectionHeader = "_sectionHeader_f18ao_36";
const settingsForm = "_settingsForm_f18ao_40";
const docsInfoTip = "_docsInfoTip_f18ao_44";
const style0 = {
  container,
  syncTable,
  header,
  enableFeatureContainer,
  sectionHeader,
  settingsForm,
  docsInfoTip
};
const _hoisted_1 = { key: 0 };
const _hoisted_2 = { key: 1 };
const _hoisted_3 = ["innerHTML"];
const _hoisted_4 = { key: 0 };
const _hoisted_5 = { class: "pb-3xl" };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_n8n_heading = resolveComponent("n8n-heading");
  const _component_n8n_info_tip = resolveComponent("n8n-info-tip");
  const _component_n8n_action_box = resolveComponent("n8n-action-box");
  const _component_n8n_form_inputs = resolveComponent("n8n-form-inputs");
  const _component_n8n_button = resolveComponent("n8n-button");
  const _component_el_table_column = resolveComponent("el-table-column");
  const _component_infinite_loading = resolveComponent("infinite-loading");
  const _component_el_table = resolveComponent("el-table");
  const _directive_loading = resolveDirective("loading");
  return !_ctx.isLDAPFeatureEnabled ? (openBlock(), createElementBlock("div", _hoisted_1, [
    createBaseVNode("div", {
      class: normalizeClass([_ctx.$style.header, "mb-2xl"])
    }, [
      createVNode(_component_n8n_heading, { size: "2xlarge" }, {
        default: withCtx(() => [
          createTextVNode(toDisplayString(_ctx.$locale.baseText("settings.ldap")), 1)
        ]),
        _: 1
      })
    ], 2),
    createVNode(_component_n8n_info_tip, {
      type: "note",
      theme: "info",
      tooltipPlacement: "right",
      class: "mb-l"
    }, {
      default: withCtx(() => [
        createTextVNode(toDisplayString(_ctx.$locale.baseText("settings.ldap.note")), 1)
      ]),
      _: 1
    }),
    createVNode(_component_n8n_action_box, {
      description: _ctx.$locale.baseText("settings.ldap.disabled.description"),
      buttonText: _ctx.$locale.baseText("settings.ldap.disabled.buttonText"),
      "onClick:button": _ctx.goToUpgrade
    }, {
      heading: withCtx(() => [
        createBaseVNode("span", null, toDisplayString(_ctx.$locale.baseText("settings.ldap.disabled.title")), 1)
      ]),
      _: 1
    }, 8, ["description", "buttonText", "onClick:button"])
  ])) : (openBlock(), createElementBlock("div", _hoisted_2, [
    createBaseVNode("div", {
      class: normalizeClass(_ctx.$style.container)
    }, [
      createBaseVNode("div", {
        class: normalizeClass(_ctx.$style.header)
      }, [
        createVNode(_component_n8n_heading, { size: "2xlarge" }, {
          default: withCtx(() => [
            createTextVNode(toDisplayString(_ctx.$locale.baseText("settings.ldap")), 1)
          ]),
          _: 1
        })
      ], 2),
      createBaseVNode("div", {
        class: normalizeClass(_ctx.$style.docsInfoTip)
      }, [
        createVNode(_component_n8n_info_tip, {
          theme: "info",
          type: "note"
        }, {
          default: withCtx(() => [
            createBaseVNode("span", {
              innerHTML: _ctx.$locale.baseText("settings.ldap.infoTip")
            }, null, 8, _hoisted_3)
          ]),
          _: 1
        })
      ], 2),
      createBaseVNode("div", {
        class: normalizeClass(_ctx.$style.settingsForm)
      }, [
        _ctx.formInputs ? (openBlock(), createBlock(_component_n8n_form_inputs, {
          key: 0,
          ref: "ldapConfigForm",
          inputs: _ctx.formInputs,
          eventBus: _ctx.formBus,
          columnView: true,
          verticalSpacing: "l",
          onUpdate: _ctx.onInput,
          onReady: _ctx.onReadyToSubmit,
          onSubmit: _ctx.onSubmit
        }, null, 8, ["inputs", "eventBus", "onUpdate", "onReady", "onSubmit"])) : createCommentVNode("", true)
      ], 2),
      createBaseVNode("div", null, [
        _ctx.loginEnabled ? (openBlock(), createBlock(_component_n8n_button, {
          key: 0,
          label: _ctx.loadingTestConnection ? _ctx.$locale.baseText("settings.ldap.testingConnection") : _ctx.$locale.baseText("settings.ldap.testConnection"),
          size: "large",
          class: "mr-s",
          disabled: _ctx.hasAnyChanges || !_ctx.readyToSubmit,
          loading: _ctx.loadingTestConnection,
          onClick: _ctx.onTestConnectionClick
        }, null, 8, ["label", "disabled", "loading", "onClick"])) : createCommentVNode("", true),
        createVNode(_component_n8n_button, {
          label: _ctx.$locale.baseText("settings.ldap.save"),
          size: "large",
          disabled: !_ctx.hasAnyChanges || !_ctx.readyToSubmit,
          onClick: _ctx.onSaveClick
        }, null, 8, ["label", "disabled", "onClick"])
      ])
    ], 2),
    _ctx.loginEnabled ? (openBlock(), createElementBlock("div", _hoisted_4, [
      createVNode(_component_n8n_heading, {
        tag: "h1",
        class: "mb-xl mt-3xl",
        size: "medium"
      }, {
        default: withCtx(() => [
          createTextVNode(toDisplayString(_ctx.$locale.baseText("settings.ldap.section.synchronization.title")), 1)
        ]),
        _: 1
      }),
      createBaseVNode("div", {
        class: normalizeClass(_ctx.$style.syncTable)
      }, [
        withDirectives((openBlock(), createBlock(_component_el_table, {
          border: true,
          stripe: true,
          data: _ctx.dataTable,
          "cell-style": _ctx.cellClassStyle,
          style: { "width": "100%" },
          height: "250",
          key: _ctx.tableKey
        }, {
          empty: withCtx(() => [
            createTextVNode(toDisplayString(_ctx.$locale.baseText("settings.ldap.synchronizationTable.empty.message")), 1)
          ]),
          append: withCtx(() => [
            createVNode(_component_infinite_loading, {
              onInfinite: _ctx.getLdapSynchronizations,
              "force-use-infinite-wrapper": ".el-table__body-wrapper"
            }, null, 8, ["onInfinite"])
          ]),
          default: withCtx(() => [
            createVNode(_component_el_table_column, {
              prop: "status",
              label: _ctx.$locale.baseText("settings.ldap.synchronizationTable.column.status")
            }, null, 8, ["label"]),
            createVNode(_component_el_table_column, {
              prop: "endedAt",
              label: _ctx.$locale.baseText("settings.ldap.synchronizationTable.column.endedAt")
            }, null, 8, ["label"]),
            createVNode(_component_el_table_column, {
              prop: "runMode",
              label: _ctx.$locale.baseText("settings.ldap.synchronizationTable.column.runMode")
            }, null, 8, ["label"]),
            createVNode(_component_el_table_column, {
              prop: "runTime",
              label: _ctx.$locale.baseText("settings.ldap.synchronizationTable.column.runTime")
            }, null, 8, ["label"]),
            createVNode(_component_el_table_column, {
              prop: "details",
              label: _ctx.$locale.baseText("settings.ldap.synchronizationTable.column.details")
            }, null, 8, ["label"])
          ]),
          _: 1
        }, 8, ["data", "cell-style"])), [
          [_directive_loading, _ctx.loadingTable]
        ])
      ], 2),
      createBaseVNode("div", _hoisted_5, [
        createVNode(_component_n8n_button, {
          label: _ctx.$locale.baseText("settings.ldap.dryRun"),
          type: "secondary",
          size: "large",
          class: "mr-s",
          disabled: _ctx.hasAnyChanges || !_ctx.readyToSubmit,
          loading: _ctx.loadingDryRun,
          onClick: _ctx.onDryRunClick
        }, null, 8, ["label", "disabled", "loading", "onClick"]),
        createVNode(_component_n8n_button, {
          label: _ctx.$locale.baseText("settings.ldap.synchronizeNow"),
          size: "large",
          disabled: _ctx.hasAnyChanges || !_ctx.readyToSubmit,
          loading: _ctx.loadingLiveRun,
          onClick: _ctx.onLiveRunClick
        }, null, 8, ["label", "disabled", "loading", "onClick"])
      ])
    ])) : createCommentVNode("", true)
  ]));
}
const cssModules = {
  "$style": style0
};
const SettingsLdapView = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__cssModules", cssModules]]);
export {
  SettingsLdapView as default
};
