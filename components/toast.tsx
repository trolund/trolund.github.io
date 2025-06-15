'use client';

import { useTheme } from 'next-themes';
import { FC } from 'react';
import { Slide, ToastContainer } from 'react-toastify';

interface ToastProps {}

const Toast: FC<ToastProps> = () => {
  const { theme } = useTheme()
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
      theme={theme}
      transition={Slide}
    />
  );
};

export default Toast;
