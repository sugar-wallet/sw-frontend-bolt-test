import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { handleAkahuUserTokenExchange } from 'store/actions/user-finance'

const AkahuCallback = () => {
  const router = useRouter()

  const dispatch = useDispatch()

  useEffect(() => {
    const { code = '', state = '', error } = router.query

    dispatch(
      handleAkahuUserTokenExchange({
        code: code as string,
        state: state as string,
        error: error as string
      })
    )
  }, [router])

  return (
    <div className="flex-1 flex-col justify-center items-center">
      Authenticating... Please Wait !
    </div>
  )
}

export default AkahuCallback
