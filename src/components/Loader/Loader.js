import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import { Grid } from 'react-loader-spinner';
import { Loaders} from './Loader.styled';

const Loader = () => (
  <Loaders>
    <Grid
      color="#303f9f"
      height={100}
      width={110}
      ariaLabel="loading"
      css={`
        display: block;
        margin: 0 auto;
      `}
    />
  </Loaders>
);

export default Loader;
