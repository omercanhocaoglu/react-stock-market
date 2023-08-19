import axios from "axios";

const TOKEN = "cicn7ihr01ql0uql1o60cicn7ihr01ql0uql1o6g";
export default axios.create({
    baseURL: "https://finnhub.io/api/v1",
    params: {
        token: TOKEN
    }
});