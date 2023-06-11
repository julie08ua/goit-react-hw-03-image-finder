import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '35856796-45f142b26b414f7fc23da79d0';

export const getImages = async (searchValue, page) => {
  const response = await axios.get(
    `${BASE_URL}?q=${searchValue}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  );

  return response.data;
};
