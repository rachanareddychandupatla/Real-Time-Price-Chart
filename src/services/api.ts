import axios from "axios";

const token = "c7ucun2ad3ifisk2mg7g";
export const HTTP = axios.create({
    baseURL: "https://finnhub.io/api/v1",
    params: {
        token: token,
    }
})