import { b as __nuxt_component_1 } from "../server.mjs";
import { defineComponent, ref, resolveComponent, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrRenderClass } from "vue/server-renderer";
import "/Users/mac/Documents/wisekings/merchant/node_modules/hookable/dist/index.mjs";
import { u as useMerchantDashboardApi } from "./useMerchantApi-HipWhfz-.js";
import "/Users/mac/Documents/wisekings/merchant/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
import "/Users/mac/Documents/wisekings/merchant/node_modules/unctx/dist/index.mjs";
import "/Users/mac/Documents/wisekings/merchant/node_modules/h3/dist/index.mjs";
import "vue-router";
import "/Users/mac/Documents/wisekings/merchant/node_modules/defu/dist/defu.mjs";
import "/Users/mac/Documents/wisekings/merchant/node_modules/ufo/dist/index.mjs";
import "/Users/mac/Documents/wisekings/merchant/node_modules/nuxt/node_modules/cookie-es/dist/index.mjs";
import "/Users/mac/Documents/wisekings/merchant/node_modules/destr/dist/index.mjs";
import "/Users/mac/Documents/wisekings/merchant/node_modules/ohash/dist/index.mjs";
import "/Users/mac/Documents/wisekings/merchant/node_modules/klona/dist/index.mjs";
import "@iconify/vue";
import "@iconify/utils/lib/css/icon";
import "/Users/mac/Documents/wisekings/merchant/node_modules/@unhead/vue/dist/index.mjs";
import "/Users/mac/Documents/wisekings/merchant/node_modules/perfect-debounce/dist/index.mjs";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "orders",
  __ssrInlineRender: true,
  setup(__props) {
    useMerchantDashboardApi();
    const orders = ref([]);
    const loading = ref(true);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_definePageMeta = resolveComponent("definePageMeta");
      const _component_Icon = __nuxt_component_1;
      _push(`<div${ssrRenderAttrs(_attrs)}>`);
      _push(ssrRenderComponent(_component_definePageMeta, { layout: "dashboard" }, null, _parent));
      _push(`<h1 class="text-2xl font-bold text-white mb-6">My Orders</h1><div class="table-container"><table class="data-table"><thead><tr><th>Order #</th><th>Customer</th><th>Total</th><th>Status</th><th>Date</th></tr></thead><tbody>`);
      if (unref(loading)) {
        _push(`<tr><td colspan="5" class="text-center py-12 text-dark-400">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "lucide:loader-2",
          class: "w-6 h-6 animate-spin mx-auto"
        }, null, _parent));
        _push(`</td></tr>`);
      } else if (unref(orders).length === 0) {
        _push(`<tr><td colspan="5" class="text-center py-12 text-dark-400">No orders yet</td></tr>`);
      } else {
        _push(`<!--[-->`);
        ssrRenderList(unref(orders), (o) => {
          _push(`<tr><td><code class="text-xs bg-dark-800 px-2 py-0.5 rounded">${ssrInterpolate(o.orderNumber)}</code></td><td class="text-dark-200 text-sm">${ssrInterpolate(typeof o.customerId === "object" ? o.customerId?.fullName : o.customerId)}</td><td class="font-medium text-white">₦${ssrInterpolate(o.totalAmount?.toLocaleString())}</td><td><span class="${ssrRenderClass(o.status === "delivered" || o.status === "completed" ? "badge-success" : "badge-warning")}">${ssrInterpolate(o.status)}</span></td><td class="text-dark-400 text-xs">${ssrInterpolate(new Date(o.createdAt).toLocaleDateString())}</td></tr>`);
        });
        _push(`<!--]-->`);
      }
      _push(`</tbody></table></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/orders.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=orders-Byow82YS.js.map
