import { isGlobalUser } from 'helpers'
import translate from 'languages'
const WHATSAPP_NUMBER = isGlobalUser ? '+917385727182' : '+905435715878'

const HELLO_MESSAGE = translate('HomePage.hello') // FIXME

const SUGAR_WALLET_NUMBER = '8454966913'

export { WHATSAPP_NUMBER, HELLO_MESSAGE, SUGAR_WALLET_NUMBER }
