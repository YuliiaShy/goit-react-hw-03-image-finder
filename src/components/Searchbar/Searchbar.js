import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { ImSearch } from 'react-icons/im';
import { Wrapper, Form, Button, Label, Input } from './Searchbar.styled';

class Searchbar extends PureComponent {
  state = {
    searchQuery: '',
  };

  handleInput = event => {
    this.setState({
      searchQuery: event.currentTarget.value.toLowerCase().trim(),
    });
  };

  handleSubmit = event => {
      event.preventDefault();
    const { searchQuery } = this.state;
    const { onSubmit } = this.props;
      
    if (searchQuery.trim() === '') {
          toast.warn('Please enter search query');  
          return;    
    }
      onSubmit(searchQuery);
      this.reset();
  };

  reset = () => {
    this.setState({ searchQuery: '' });
  };

  render() {
    const { handleInput, handleSubmit } = this;
    const { searchQuery } = this.state;

    return (
      <Wrapper>
        <Form onSubmit={handleSubmit}>
          <Button type="submit">
            <ImSearch />
            <Label>Search</Label>
          </Button>
          <Input
            type="text"
            value={searchQuery}
            onChange={handleInput}
            placeholder="Search images"
          />
        </Form>
      </Wrapper>
    );
  }
}

export default Searchbar;

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
