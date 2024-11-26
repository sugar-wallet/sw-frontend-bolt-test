import React, { useEffect, useState } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'

import { ContainedButton } from '@sw-npm-packages/components'
import { CustomModal, Info } from 'components'
import { navigationPaths } from 'config'
import { navigate } from 'helpers/navigation'
import { handleCloseModal } from 'store/actions/modal'
import { selectActiveModal } from 'store/selectors/modal'
import { MODALS } from 'types/modal'

const SellBlockedModal = () => {
  const dispatch = useDispatch()
  const [isOpen, setOpen] = useState(false)
  const [content, setContent] = useState({
    english: '',
    hindi: ''
  })
  // const { data: userData } = useQuery(fetchUserProfile())
  const activeModal = useSelector(selectActiveModal, shallowEqual)

  useEffect(() => {
    if (activeModal) {
      if (activeModal.modal === MODALS.SELL_BLOCK_MODAL) {
        setOpen(true)
        setContent({
          english: 'You can not sell within 15 days of buying gold.',
          hindi: 'App gold kharidne ke 15 din tak bikri nahi kar sakte hain.'
        })
      } else if (activeModal.modal === MODALS.ACCOUNT_FLAGGED_SELL_MODAL) {
        setOpen(true)
        setContent({
          english: 'Contact customer support on WhatsApp to complete KYC.',
          hindi: 'KYC pura karne ke liye WhatsApp par sampark karein.'
        })
      } else {
        setOpen(false)
      }
    } else {
      setOpen(false)
    }
  }, [activeModal])

  const closeModal = () => dispatch(handleCloseModal())

  // const seventhDecStart = dayjs('2023-12-07T00:00:00')
  // const userCreatedAt = dayjs(userData?.createdAt)

  return (
    <CustomModal open={isOpen} onClose={closeModal}>
      <div className="flex-col">
        <div className="w-full flex-center">Notice</div>
        <Info className="mt-4">{content.english}</Info>
        <Info className="mt-4">{content.hindi}</Info>
        <div className="mt-6 flex-col">
          <ContainedButton
            className="btn-contained-black mt-2"
            onClick={() => {
              closeModal()
              navigate(navigationPaths.home, true)
            }}
          >
            Got It!
          </ContainedButton>
        </div>
      </div>
    </CustomModal>
  )
}

export { SellBlockedModal }
