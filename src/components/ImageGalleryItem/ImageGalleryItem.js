import PropTypes from 'prop-types';
import { Item, Image } from './ImageGalleryItem.styled';

const ImageGalleryItem = ({ webformatURL, alt, onClick }) => (
  <Item onClick={onClick}>
    <Image src={webformatURL} alt={alt}></Image>
  </Item>
);

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
