import Router from 'next/router'

export const navigate = (url: string, replace = false) => {
  if (replace) {
    return Router.replace(url)
  } else {
    return Router.push(url)
  }
}
export const navigateWithParams = (url: string, params: any) => {
    return Router.push({pathname: url, query: params })
}

export const reload = () => {
  return Router.reload()
}

export const goBack = () => {
  return Router.back()
}

export const reloadWindow = () => {
  if (typeof window !== 'undefined') {
    window.location.reload()
  }
}

export const closeTab = () => {
  if (typeof window !== 'undefined') {
    window.close()
  }
}

export const openTab = (url: string, target = '_blank') => {
  if (typeof window !== 'undefined') {
    window.open(url, target)
  }
}
