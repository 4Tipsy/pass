import { atom } from "recoil";



export const showAddNewFsEState = atom<boolean>({
  key: 'showAddNewFsEState',
  default: false,
})




// dialog frames
export const showAlertState = atom<string | false>({
  key: 'showAlertState',
  default: false,
})
export const showConfirmState = atom<string | false>({
  key: 'showConfirmState',
  default: false,
})
export const showPromptState = atom<string | false>({
  key: 'showPromptState',
  default: false,
})