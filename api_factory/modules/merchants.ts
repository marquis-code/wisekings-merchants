import { GATEWAY_ENDPOINT } from '../axios.config'

export const merchants_api = {
    get: (params?: any) => GATEWAY_ENDPOINT.get('/merchants', { params }),
    getProfile: () => GATEWAY_ENDPOINT.get('/merchants/me'),
    updateProfile: (payload: any) => GATEWAY_ENDPOINT.put('/merchants/me', payload),
    getDashboard: () => GATEWAY_ENDPOINT.get('/merchants/me/dashboard'),
    getReferrals: (params?: any) => GATEWAY_ENDPOINT.get('/merchants/me/referrals', { params }),
    getKyc: () => GATEWAY_ENDPOINT.get('/merchants/me/kyc'),
    submitKycDocument: (payload: any) => GATEWAY_ENDPOINT.post('/merchants/me/kyc/document', payload),
    getReferralQr: () => GATEWAY_ENDPOINT.get('/merchants/me/referral-qr'),
}
