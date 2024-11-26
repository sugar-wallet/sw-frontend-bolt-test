import { ToastOptions, toast } from 'react-toastify'

const defaultConfig: ToastOptions = {
  position: toast.POSITION.TOP_RIGHT,
  autoClose: 3000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: false,
  progress: undefined,
  theme: 'light'
}

export const notifySuccess = (message: string, config: ToastOptions = {}) => {
  toast.success(message, {
    ...defaultConfig,
    ...config
  })
}

export const notifyError = (message: string, config: ToastOptions = {}) => {
  toast.error(message, {
    ...defaultConfig,
    ...config
  })
}
