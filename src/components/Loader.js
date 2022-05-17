import { Spinner } from 'react-bootstrap';

const Loader = ({
  style = { width: '50px', height: '50px', margin: '0 auto', display: 'block' },
  variant = 'secondary',
}) => {
  return (
    <Spinner animation="border" variant={variant} role="status" style={style}>
      <span className="sr-only"></span>
    </Spinner>
  );
};

export default Loader;
