import axios from 'axios';

const baseUrl = "https://chartcloud-backend.onrender.com/api"

const api = axios.create({
    baseURL: baseUrl,
});

const isTokenExpired = () => {
    const expiry = localStorage.getItem('expiry');
    if (!expiry) return true;
    return Date.now() > parseInt(expiry, 10);
}

// Used to refresh a access token
const refreshToken = async () => {
    const token = localStorage.getItem('refreshToken');
    if (!token) {
        window.location.href = "/login";
        return null;
    }

    try {
        const refreshPath = baseUrl + "/auth/refresh";
        const res = await axios.post(
            refreshPath,
            {},
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        const { access } = res.data.token;
        const expiryTime = Date.now() + 10 * 60 * 1000;

        localStorage.setItem('accessToken', access);
        localStorage.setItem('expiry', expiryTime.toString());

        return access;

    } catch (err) {
        console.error("Token refresh failed", err);
        window.location.href = "/login";
        return null;
    }
};


const getValidAccessToken = async () => {
    const expired = isTokenExpired();

    if (expired) {
        const newToken = await refreshToken();
        return newToken;
    }

    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
        window.location.href = "/login";
        return null;
    }

    return accessToken;
};


// Interceptor to attach valid access token if the url needs auth
api.interceptors.request.use(async (config) => {
    const url = config.url

    // Only the route that needs to add the refresh token in authorization
    if (url == "/auth/logout") {
        config.headers.Authorization = `Bearer ${localStorage.getItem('refreshToken')}`

        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
        localStorage.removeItem('expiry')

        return config
    }

    const noTokenRoutes = [
        /^\/auth\/signup$/,
        /^\/auth\/login$/,
        /^\/auth\/login\/google\/callback$/,
        /^\/auth\/login\/github\/callback$/
    ];

    const needsAuth = !noTokenRoutes.some(pattern => pattern.test(url));
    console.log(url)

    if (needsAuth) {
        const accessToken = await getValidAccessToken()
        config.headers.Authorization = `Bearer ${accessToken}`

    }

    return config
})

export default api;
