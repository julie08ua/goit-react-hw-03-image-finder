import { Watch } from 'react-loader-spinner';

export const Loader = () => {
  return (
    <Watch
      height="80"
      width="80"
      radius="40"
      color="#3f51b5"
      ariaLabel="watch-loading"
      visible={true}
      wrapperStyle={{ 'marginLeft': 'auto', 'marginRight': 'auto' }}
    />
  );
};