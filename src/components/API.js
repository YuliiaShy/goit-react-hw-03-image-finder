import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';
axios.defaults.headers.get['Content-Type'] = 'application/json; charset=utf-8';

const KEY = '26838114-b92b6e9eb97735375e5f14aed';

const options = '&image_type=photo&orientation=horizontal';

export default class APIService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  async fetchImages() {
    const url = `?key=${KEY}&q=${this.searchQuery}${options}&per_page=12&page=${this.page}`;

    try {
      const response = await axios.get(url);
      this.incrementPage();
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
