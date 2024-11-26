import { loadStripe } from '@stripe/stripe-js'

import { isProduction } from '@sw-npm-packages/constants'
import { logger } from '@sw-npm-packages/utils'

import { getLanguageByTz } from './language'
import { reloadWindow } from './navigation'

// https://github.com/stripe/stripe-js/issues/26#issuecomment-1477716731
const stripePromise = (async () => {
  const STRIPE_TOKEN = isProduction
    ? 'pk_live_51NPKhMGo3r4xzfnlrLVL9mSymJTy7vXO9mDvHgXZT5R9M65UmQ4TkghvnrOyK1kKLLd9QoYHtgn7I3L9onFV4GWN00ZzSbpuCj'
    : 'pk_test_51NPKhMGo3r4xzfnlCtXiv6v67tpKrnTf6H6JGHWk2cizkfR7ZA6PSL7IjFuqKfPT4RBReVrPH2tOmC18WFwrVXWo00MZlqKzai'

  try {
    return await loadStripe(STRIPE_TOKEN as string, {
      locale: getLanguageByTz()
    })
  } catch (err) {
    logger.error(err as string)
    reloadWindow()
  }
})()

export { stripePromise }
