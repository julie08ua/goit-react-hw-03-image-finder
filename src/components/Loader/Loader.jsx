import { Radio } from 'react-loader-spinner';
import { LoaderWrap } from './Loader.styled';

export const Loader = () => {
  return (
    <LoaderWrap>
      <Radio
  visible={true}
  height="80"
  width="80"
  ariaLabel="radio-loading"
  wrapperStyle={{}}
  wrapperClass="radio-wrapper"
/>
    </LoaderWrap>
  );
};