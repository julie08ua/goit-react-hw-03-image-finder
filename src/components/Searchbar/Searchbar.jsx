import { Component } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { BsSearch } from 'react-icons/bs';
import {Form, Header, Button, Input} from './Searchbar.styled';

export class Searchbar extends Component {
  state = { text: '' };

  handleSearch = ({ currentTarget: { value } }) => {
    this.setState({ text: value.toLowerCase() });
  };

  handleSubmit = event => {
    event.preventDefault();

    if (!this.state.text.trim()) {
      return toast.warn('Please, enter a search query');
    }
    this.props.onSubmit(this.state.text); 
    this.setState({ text: '', page: 1, images: []}); 
  };

  render() {
    return (
      <Header>
        <Form onSubmit={this.handleSubmit}>
          <Button type="submit">
            <BsSearch/>
          </Button>

          <Input
            type="text"
            name="text"
            value={this.state.text}
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleSearch}
          />
        </Form>
        </Header>
        );
  }
}
        
Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};