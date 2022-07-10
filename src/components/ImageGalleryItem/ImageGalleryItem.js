import React from 'react';
import PropTypes from 'prop-types';
import { Item, Image } from './ImageGalleryItem.styled';

const ImageGalleryItem = ({ cardUrl, alt, onClick }) => (
  
  <Item onClick={onClick}>
    <Image src={cardUrl} alt={alt} />
    </Item>

);

ImageGalleryItem.propTypes = {
  cardUrl: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
