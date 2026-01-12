'use client';

import { useTheme } from 'next-themes';
import { Slide, ToastContainer } from 'react-toastify';

const Toast = () => {
  const { resolvedTheme } = useTheme();
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
      theme={resolvedTheme}
      transition={Slide}
    />
  );
};

export default Toast;
