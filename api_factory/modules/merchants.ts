import { GATEWAY_ENDPOINT } from '../axios.config'

export const merchants_api = {
    getProfile: () => GATEWAY_ENDPOINT.get('/merchants/me'),
    updateProfile: (payload: any) => GATEWAY_ENDPOINT.put('/merchants/me', payload),
    getStats: () => GATEWAY_ENDPOINT.get('/merchants/me/stats'),
    getReferrals: (params?: any) => GATEWAY_ENDPOINT.get('/merchants/me/referrals', { params }),
}
