import Backdrop from '@mui/material/Backdrop'
import Box from '@mui/material/Box'
import Fade from '@mui/material/Fade'
import Modal from '@mui/material/Modal'
import * as React from 'react'

import { CloseIcon } from '@sw-npm-packages/icons'
import { IKeyValuePair } from '@sw-npm-packages/types'

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '95%',
  bgcolor: 'white',
  borderRadius: '8px',
  p: 4,
  outline: 'none',
  maxHeight: '90vh',
  overflow: 'auto'
}

interface IProps {
  open: boolean
  onClose: () => void
  customStyle?: IKeyValuePair<string | number>
  showCloseIcon?: boolean
}

const CustomModal: React.FC<React.PropsWithChildren<IProps>> = ({
  open,
  onClose,
  // eslint-disable-next-line no-empty-pattern
  customStyle = {},
  showCloseIcon = false,
  children
}) => {
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={onClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500
        }
      }}
    >
      <>
        <Fade in={open}>
          <Box
            sx={{
              ...style,
              ...customStyle
            }}
          >
            {showCloseIcon && (
              <CloseIcon
                onClick={onClose}
                className="absolute text-white right-2 top-0 z-20"
              />
            )}
            {children}
          </Box>
        </Fade>
      </>
    </Modal>
  )
}

export { CustomModal }
