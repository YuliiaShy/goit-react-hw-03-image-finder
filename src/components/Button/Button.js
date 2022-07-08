import PropTypes from 'prop-types';
import { LoadMoreBtn } from './Button.styled';


const Button = ({ onClick }) => (
  <LoadMoreBtn type="button" onClick={onClick}>
    Load more
  </LoadMoreBtn>
);

Button.propTypes = {
  onClick: PropTypes.func,
};

export default Button;
