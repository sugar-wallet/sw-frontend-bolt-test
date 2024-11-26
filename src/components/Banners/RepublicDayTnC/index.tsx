import {
  ContainedButton,
  OutlinedButton,
  Title
} from '@sw-npm-packages/components'
import { CustomModal } from 'components'
import { SUGAR_WALLET_NUMBER } from 'config'

interface RepublicDayTnCProps {
  isOpen: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const RepublicDayTnC = ({ isOpen, setOpen }: RepublicDayTnCProps) => {
  return (
    <CustomModal open={isOpen} onClose={() => setOpen(false)}>
      <div className="flex-1 flex-col">
        <div className="w-full flex-center">
          <Title className="text-lg w-full text-center border-b border-solid border-light-pink min-h-[30px]">
            Reward
          </Title>
          <ul className="list-disc list-inside mb-4">
            <li className="text-sm mt-4">
              Daily 1000 Participants to win ₹100 CASHBACK* / 1gm of Gold*
            </li>
            <li className="text-sm mt-2">
              BUMPER PRIZE: 7 grams Gold Coin to be won*
            </li>
          </ul>

          <Title className="text-lg w-full text-center border-b border-solid border-light-pink min-h-[30px]">
            How to participate?
          </Title>
          <ul className="list-decimal list-inside mb-4">
            <li className="text-sm mt-4">
              Give a missed call on {SUGAR_WALLET_NUMBER}
            </li>
            <li className="text-sm mt-2">
              You will receive a call/whatsapp message from us within 24 hours
            </li>
            <li className="text-sm mt-2">
              To claim your Republic Day offer, Follow the T&C*.
            </li>
          </ul>
          <div className="justify-between w-full gap-4">
            <ContainedButton
              className="btn-contained-black w-full"
              onClick={() => {
                setOpen(false)
                window.open(`tel:${SUGAR_WALLET_NUMBER}`)
              }}
            >
              Participate
            </ContainedButton>
            <OutlinedButton
              className="btn-outlined-black w-full"
              onClick={() => setOpen(false)}
            >
              No, Thanks
            </OutlinedButton>
          </div>
        </div>
      </div>
    </CustomModal>
  )
}

export { RepublicDayTnC }
