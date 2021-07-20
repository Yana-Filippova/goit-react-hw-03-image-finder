const KEY = '21910767-1ff9d0df6204712ecdebd388c';
const BASE_URL = 'https://pixabay.com/api/';

function fetchImage(name, page) {
  return fetch(
    `${BASE_URL}?q=${name}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`,
  ).then(response => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(new Error('Invalid request'));
  });
}

const api = {
  fetchImage,
};

export default api;
