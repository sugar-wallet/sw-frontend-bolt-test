import { createTranslator } from 'next-intl'

import { getLanguageByTz } from 'helpers'

import EN from './en.json'
import TR from './tr.json'

// FIXME for performance if dynamic import possible
const Messages = {
  en: EN,
  tr: TR
}

const translate = createTranslator({
  locale: getLanguageByTz(),
  messages: Messages[getLanguageByTz()]
})

export default translate
