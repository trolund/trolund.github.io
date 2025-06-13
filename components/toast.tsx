import { FC } from 'react';
import { Slide, ToastContainer } from 'react-toastify';
import { useTheme } from '@/hooks/ThemeContext';

interface ToastProps {}

const Toast: FC<ToastProps> = () => {
  const { isDark } = useTheme();
  return (
    <ToastContainer
      position="bottom-center"
      autoClose={1200}
      hideProgressBar
      newestOnTop={false}
      closeOnClick
      closeButton={false}
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      icon={false}
      limit={3}
      theme={isDark ? 'dark' : 'light'}
      transition={Slide}
    />
  );
};

export default Toast;
