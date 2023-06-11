import PropTypes from 'prop-types';
import { Component } from 'react';
import { LoadMore } from './Button.styled';

export class Button extends Component {
  state = { page: 2 };

  addPage = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
    this.props.morePictures(this.state.page);
  };

  render() {
    return (
      <LoadMore type="button" onClick={this.addPage}>
        Load more
      </LoadMore>
    );
  }
}

Button.propTypes = {
  morePictures: PropTypes.func.isRequired,
};