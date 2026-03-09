import { GATEWAY_ENDPOINT } from '../axios.config'

export const orders_api = {
    get: (params?: any) => GATEWAY_ENDPOINT.get('/orders/me', { params }),
}
