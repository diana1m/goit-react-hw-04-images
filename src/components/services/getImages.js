import axios from "axios";

const BASE_URL = "https://pixabay.com/api/";
const KEY = "32976687-1605871f29f724bfaa9acfcd4";

export async function getImages(inputValue, page){
    const response = await axios.get(`${BASE_URL}?key=${KEY}&q=${inputValue}&page=${page}&image_type=photo&orientation=horizontal&per_page=12`);
    return response.data;
}
