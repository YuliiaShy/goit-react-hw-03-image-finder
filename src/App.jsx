import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Searchbar from 'components/Searchbar';
import ImageGallery from 'components/ImageGallery';
import Button from 'components/Button';
import Modal from 'components/Modal';
import Loader from 'components/Loader';
import {Container} from 'App.styled';
import api from "api/API";

class App extends Component {
  state = {
    searchQuery: '',
    page: 1,
    images: [],
    showModal: false,
    status: 'idle',
    total: 0,
    largeImage: '',
  };

  componentDidUpdate = (_, prevState) => {
    const { searchQuery, page } = this.state;

    if (prevState.searchQuery !== searchQuery) {
      this.setState({
        images: [],
        status: 'pending',
        page: 1,
      });
      this.getImages();
    }
    if (page !== prevState.page && page !== 1) {
      this.setState({
        status: 'pending',
      });
      this.getImages();
    }
  };

  submitSomeProps = searchQuery => {
    this.setState({
      searchQuery,
      images: [],
      page: 1,
    });
  };

  async getImages() {
    const { searchQuery, page } = this.state;

    try {
      const {totalHits, hits} = await api.fetchImages(searchQuery, page);

      if (hits.length === 0) {
        this.setState({
          status: 'idle',
        });
        return toast.error(`Not found: ${searchQuery} `);
      }

      this.setState(prevState => ({
        images: [...prevState.images, ...hits],
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

  handleLoadMoreButtonClick = () => {
    this.setState(({ page }) => {
      return {
        page: page + 1,
      };
    });
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
    const { images, showModal, status, total, largeImage } = this.state;
    const { submitSomeProps, toggleModal, handleLoadMoreButtonClick } = this;


    return (
      <Container> 
        <Searchbar onSubmit={submitSomeProps} />
        {status === 'pending' && (<Loader /> )} 
        {status === 'resolved' && (<ImageGallery images={images} onClick={this.onClickImage} />)}
        {showModal && (<Modal onClose={toggleModal}>
          <img src={largeImage} alt={''}/>
        </Modal>)}
        {images.length > 0 && images.length < total && (
          <Button onClick={handleLoadMoreButtonClick} /> )}
        <ToastContainer autoClose={2000} />
      </Container>
    );
  }
}

export default App;
