export const FAHEM_HTTP_PROTOCOL =
  process.env.NEXT_PUBLIC_FAHEM_HTTPS === 'true' ? 'https://' : 'http://'
const FAHEM_API_URL = `${process.env.NEXT_PUBLIC_FAHEM_API_URL}`
export const FAHEM_BACKEND_URL = `${process.env.NEXT_PUBLIC_FAHEM_BACKEND_URL}`
export const FAHEM_DOMAIN = process.env.NEXT_PUBLIC_FAHEM_DOMAIN
export const FAHEM_COLLABORATION_WS_URL =
  process.env.NEXT_PUBLIC_FAHEM_COLLABORATION_WS_URL

export const getAPIUrl = () => FAHEM_API_URL
export const getBackendUrl = () => FAHEM_BACKEND_URL

// Multi Organization Mode
export const isMultiOrgModeEnabled = () =>
  process.env.NEXT_PUBLIC_FAHEM_MULTI_ORG === 'true' ? true : false

export const getUriWithOrg = (orgslug: string, path: string) => {
  const multi_org = isMultiOrgModeEnabled()
  if (multi_org) {
    return `${FAHEM_HTTP_PROTOCOL}${orgslug}.${FAHEM_DOMAIN}${path}`
  }
  return `${FAHEM_HTTP_PROTOCOL}${FAHEM_DOMAIN}${path}`
}

export const getOrgFromUri = () => {
  const multi_org = isMultiOrgModeEnabled()
  if (multi_org) {
    getDefaultOrg()
  } else {
    if (typeof window !== 'undefined') {
      const hostname = window.location.hostname

      return hostname.replace(`.${FAHEM_DOMAIN}`, '')
    }
  }
}

export const getDefaultOrg = () => {
  return process.env.NEXT_PUBLIC_FAHEM_DEFAULT_ORG
}

export const getCollaborationServerUrl = () => {
  return `${FAHEM_COLLABORATION_WS_URL}`
}
