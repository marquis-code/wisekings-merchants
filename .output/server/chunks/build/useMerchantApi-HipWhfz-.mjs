import { d as useNuxtApp } from './server.mjs';

function useMerchantDashboardApi() {
  const { $api } = useNuxtApp();
  return {
    getMyProfile() {
      return $api("/merchants/me");
    },
    updateProfile(data) {
      return $api("/merchants/me", { method: "PUT", body: data });
    },
    getMyStats() {
      return $api("/merchants/me/stats");
    },
    getMyOrders(params) {
      return $api("/orders/me", { params });
    },
    getMyCommissions(params) {
      return $api("/commissions/me", { params });
    },
    getMyWallet() {
      return $api("/wallets/me");
    },
    requestWithdrawal(data) {
      return $api("/wallets/withdraw", { method: "POST", body: data });
    },
    getMyWithdrawals(params) {
      return $api("/wallets/withdrawals/me", { params });
    },
    getMyReferrals(params) {
      return $api("/merchants/me/referrals", { params });
    }
  };
}

export { useMerchantDashboardApi as u };
//# sourceMappingURL=useMerchantApi-HipWhfz-.mjs.map
