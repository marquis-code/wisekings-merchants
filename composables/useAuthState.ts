// Merchant Auth State
import type { User, AuthTokens } from '~/types'
const accessToken = ref<string>(''); const refreshTokenValue = ref<string>(''); const user = ref<User | null>(null)
const isAuthenticated = computed(() => !!accessToken.value && !!user.value)

export function useAuthState() {
    if (import.meta.client && !accessToken.value) {
        const savedToken = localStorage.getItem('wk_merchant_token')
        const savedRefresh = localStorage.getItem('wk_merchant_refresh')
        const savedUser = localStorage.getItem('wk_merchant_user')

        if (savedToken) accessToken.value = savedToken
        if (savedRefresh) refreshTokenValue.value = savedRefresh
        if (savedUser) {
            try {
                user.value = JSON.parse(savedUser)
            } catch {
                user.value = null
            }
        }

        // Sync to cookies for SSR
        if (!useCookie('wk_merchant_token').value && savedToken) {
            useCookie('wk_merchant_token').value = savedToken
            useCookie('wk_merchant_refresh').value = savedRefresh
            useCookie('wk_merchant_user').value = savedUser
        }
    }
    function setAuth(userData: User, tokens: AuthTokens | { accessToken: string, refreshToken: string }) {
        const token = 'accessToken' in tokens ? tokens.accessToken : (tokens as any).accessToken;
        const refresh = 'refreshToken' in tokens ? tokens.refreshToken : (tokens as any).refreshToken;

        accessToken.value = token;
        refreshTokenValue.value = refresh;
        user.value = userData

        if (import.meta.client) {
            localStorage.setItem('wk_merchant_token', token)
            localStorage.setItem('wk_merchant_refresh', refresh)
            localStorage.setItem('wk_merchant_user', JSON.stringify(userData))
        }

        useCookie('wk_merchant_token', { maxAge: 604800 }).value = token
        useCookie('wk_merchant_refresh', { maxAge: 604800 }).value = refresh
        useCookie('wk_merchant_user', { maxAge: 604800 }).value = JSON.stringify(userData)
    }
    function logout() {
        accessToken.value = ''; refreshTokenValue.value = ''; user.value = null;
        if (import.meta.client) {
            localStorage.removeItem('wk_merchant_token'); localStorage.removeItem('wk_merchant_refresh'); localStorage.removeItem('wk_merchant_user')
        }
        useCookie('wk_merchant_token').value = null; useCookie('wk_merchant_refresh').value = null; useCookie('wk_merchant_user').value = null
    }
    async function refresh(): Promise<boolean> { if (!refreshTokenValue.value) return false; try { const config = useRuntimeConfig(); const r = await $fetch<any>(`${config.public.apiBase}/auth/refresh`, { method: 'POST', body: { refreshToken: refreshTokenValue.value } }); if (r?.data?.tokens) { setAuth(r.data.user || user.value!, r.data.tokens); return true }; return false } catch { logout(); return false } }
    return { accessToken: readonly(accessToken), refreshToken: readonly(refreshTokenValue), user: readonly(user), isAuthenticated, setAuth, logout, refresh }
}
