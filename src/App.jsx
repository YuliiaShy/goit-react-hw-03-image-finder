import React, { Component } from 'react';
import { animateScroll as scroll } from 'react-scroll';
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
    error: null,
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
scroll.scrollToBottom();
    }
  };

  async getImages() {
    const { searchQuery, page } = this.state;

    try {
      const {totalHits, hits} = await api.fetchImages(searchQuery, page);

      if (hits.length === 0) {
        this.setState({
          status: 'idle',
        });
        toast.error(`Not found: ${searchQuery} `);
        return
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

handleSubmitInput = searchQuery => {
    this.setState({
      searchQuery,
      images: [],
      page: 1,
    });
  };

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
    const { handleSubmitInput, toggleModal, handleLoadMoreButtonClick, onClickImage } = this;


    return (
      <Container> 
        <Searchbar onSubmit={handleSubmitInput} />
        {status === 'pending' && (<Loader /> )} 
        {status === 'resolved' && (<ImageGallery images={images} onClick={onClickImage} />)}
        {showModal && (<Modal onClose={toggleModal}>
          <img src={largeImage} alt={''}/>
        </Modal>)}
        {status !== 'pending' && images.length > 0 && images.length < total && (
          <Button onClick={handleLoadMoreButtonClick} /> )}
        <ToastContainer autoClose={2000} />
      </Container>
    );
  }
}

export default App;
