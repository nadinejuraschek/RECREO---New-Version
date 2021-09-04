// STYLED COMPONENTS
import { CloseBtn, Container } from './styles/Toast';

// INTERFACES
import { ToastProps } from './types';

const Toast = ({ children, danger, handleClose, success }: ToastProps): JSX.Element => {
  return (
    <Container danger={danger} success={success}>
      <CloseBtn onClick={handleClose} />
      {children}
    </Container>
  );
};

export default Toast;
