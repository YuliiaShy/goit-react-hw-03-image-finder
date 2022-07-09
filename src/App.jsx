import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Searchbar from 'components/Searchbar';
import ImageGallery from 'components/ImageGallery';
import Button from 'components/Button';
import Modal from 'components/Modal';
import Loader from 'components/Loader';
import {Container} from 'App.styled';
import { fetchImages }from "api/API";

class App extends Component {
  state = {
    searchQuery: '',
    page: 1,
    images: [],
    showModal: false,
    error: null,
    status: 'idle',
    total: null,
    largeImage: null,
  };

  async componentDidUpdate(_, prevState) {
    const { searchQuery, page } = this.state;

    if (!searchQuery) return;

    if (prevState.searchQuery !== searchQuery || prevState.page !== page) {
      try {
        this.setState({ status: 'pending' });

        const { totalHits, hits } = await fetchImages(searchQuery, page);

        if (hits.length === 0) {
          this.setState({
            status: 'idle',
          });
          return toast.error(`Not found images: ${searchQuery}`);
        }

        if (page === 1)
          toast.success(`We found ${totalHits} images`);

        const photos = hits.map(({ id, webformatURL, largeImageURL, tags }) => {
          return {
            id,
            webformatURL,
            largeImageURL,
            tags,
          };
        });

        this.setState(prevState => ({
          images: [...prevState.images, ...photos],
          status: 'resolved',
          total: totalHits,
        }));
      } catch (error) {
        this.setState({
          error,
          status: 'rejected',
        });
      }
    }
  }

  resetStates = () => {
    this.setState({ photoList: [], page: 1, error: null });
  };

 handleSearch = value => {
    this.setState({ searchQuery: value });
    this.resetStates();
  };

  handlePagination = () => {
    this.setState(({ page }) => ({ page: page + 1 }));
  };

  
  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  onClickImage = event => {
    this.toggleModal();
    this.setState({ largeImage: event });
  };

  render() {
    const { images, showModal, status, total, largeImage, error } = this.state;
    const { handleSearch, handlePagination, toggleModal, onClickImage} = this;

    return (
      <Container> 
        <Searchbar onSubmit={handleSearch} />
        {status === 'pending' && (
            <Loader />
        )} 
        {status === 'resolved' && (
          <ImageGallery images={images} onClick={onClickImage} />
        )}
       {status === 'rejected' && <p>{error.message}</p>}
        {showModal && (
          <Modal onClose={toggleModal}>
            <img src={largeImage} alt={''} />
          </Modal>
        )}
        {images.length > 0 && images.length < total && (
          <Button onClick={handlePagination} />
        )}
        <ToastContainer autoClose={2000} />
      </Container>
    );
  }
}

export default App;
