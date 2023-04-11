import axios from 'axios'

const axiosExport = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}`,

    headers: {
        'Content-Type': 'application/json'
    }
})

axiosExport.interceptors.request.use(
    function (config) {
        const desestructure = JSON.parse(localStorage.user)
        const token = desestructure?.data?.idToken
        if(token) {
            config.headers.Authorization = `Bearer ${token}`
        }

        return config
    }
)

export default axiosExport;