import axios from 'axios';

const BASE_URL = 'https://api.themoviedb.org/3/';
const API_KEY = 'e8d94f3e976148bda0a5c640d4df112b';

export async function getTrendMovies() {
    try {
        const response = await axios.get(`${BASE_URL}trending/all/day?api_key=${API_KEY}`)
        // console.log(response.data)
        return response.data;

    } catch (err) {
        console.log(err);
    }
}

export async function getGenresMovies() {
    try {
        const response = await axios.get(`${BASE_URL}genre/movie/list?api_key=${API_KEY}&language=en-US`)
        // console.log(response.data.genres)
        return response.data.genres;
    }
    catch (err) { console.log(err) }
}
