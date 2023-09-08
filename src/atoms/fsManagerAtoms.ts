import { atom, selector } from "recoil";



type fileFieldType = 'mere' | 'unmere' | 'reserved'
export const fileFieldState = atom<fileFieldType>({
  key: 'fileFieldState',
  default: 'mere'
})



export const fsUrlState = atom<string>({
  key: 'fsUrlState',
  default: './'
})


