import { Component } from 'react';
import PixabayApiService from './helpers/helper-api';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import css from './App.module.css';

const pixabayAPI = new PixabayApiService();

export class App extends Component {
  state = {
    searchQuery: '',
    images: [],
    page: 1,
    isMoreImages: false,
    randomId: 0,
    error: null,
    isEmpty: false,
  };

  async componentDidUpdate(_, prevState) {
    const { searchQuery, page, randomId, images } = this.state;
    if (
      prevState.searchQuery !== searchQuery ||
      prevState.page !== page ||
      prevState.randomId !== randomId
    ) {
      try {
        const { hits, totalHits } = await pixabayAPI.getPixabayData(
          searchQuery,
          page
        );
        if (images.length === 0) {
          this.setState({
            isEmpty: true,
          });
          return;
        }
        this.setState(prevState => ({
          images: [...prevState.images, ...hits],
          isMoreImages: page < Math.ceil(totalHits / 12),
        }));
      } catch (error) {
        this.setState({
          error: error.message,
        });
      }
    }
  }

  searchForm = searchQuery => {
    this.setState({
      searchQuery,
      images: [],
      page: 1,
      isMoreImages: false,
      randomId: Math.random(),
      isEmpty: false,
    });
  };

  handleLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    const { searchQuery, images, isMoreImages, error, isEmpty } = this.state;
    console.log(images);
    return (
      <div>
        <Searchbar onSubmit={this.searchForm} />
        {images.length > 0 && <ImageGallery images={images} />}
        {isMoreImages && <Button onLoad={this.handleLoadMore} />}
        {error && <p>Sorry. {error} 😥</p>}
        {isEmpty && <p>Sorry. '{searchQuery}' not found. 😥</p>}
      </div>
    );
  }
}
