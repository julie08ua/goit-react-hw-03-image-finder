import { LoadMore } from './Button.styled';

export const Button = ({ onClick }) =>
  <LoadMore type="button" onClick={onClick}>
    Load more
  </LoadMore>;