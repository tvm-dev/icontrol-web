import axios from 'axios'

export const api = axios.create({
    baseURL: 'http://localhost:3333',
    
})

// export const token =
//       "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2OTlhMzI5Mzc5MWM3YTQ5MDRiODZmNCIsImlhdCI6MTcyMTM0NDgyNSwiZXhwIjoxNzIzOTM2ODI1fQ.kHVYNIhue9t-rr9W_l5nHguLCvt3H8rmwGfPyTioPmg";