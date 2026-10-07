import { create } from 'zustand'
import { UserDetailsType } from '../../types'
import { setCustomerRoutesToken } from '../services/customerServiceClient'
import { setChequeRoutesToken } from '../services/chequeServiceClient'

type State = {
  user: UserDetailsType | null
}

type Actions = {
  setUser: (userDetails: UserDetailsType) => void
  removeUser: () => void
}

const useLoggedInUser = create<State & Actions>((set) => ({
  user: null,
  setUser: (userDetails: UserDetailsType) => {
    window.localStorage.setItem("chequesAppUser", JSON.stringify(userDetails))
    set({ user: userDetails })
    setChequeRoutesToken(userDetails.token)
    setCustomerRoutesToken(userDetails.token)
  },
  removeUser: () => {
    window.localStorage.removeItem("chequesAppUser")
    set({ user: null })
    setChequeRoutesToken('')
    setCustomerRoutesToken('')
  }
}))

export default useLoggedInUser