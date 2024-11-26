interface CredentialRequestOptions {
  otp: OTPOptions
  abort: AbortController
}

interface Credential {
  code: string
}

interface OTPOptions {
  transport: string[]
}
