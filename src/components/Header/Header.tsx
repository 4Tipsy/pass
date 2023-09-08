import React from 'react'
import { useRecoilState } from 'recoil'


import { ReactComponent as LogoSvg } from '../../assets/icons/logo.svg'
import { ReactComponent as SettingsSvg } from '../../assets/icons/settings.svg'
import { ReactComponent as AccSvg } from '../../assets/icons/acc.svg'


// states
import { fileFieldState } from '../../atoms/fsManagerAtoms'
import { fsUrlState } from '../../atoms/fsManagerAtoms'



interface HeaderProps {
  userName?: string;
  userVerified?: boolean;
}

/* MAIN COMPONENT */
const Header: React.FC<HeaderProps> = ({userName, userVerified}) => {




  return (
    <>
      <header>
        <div className="header-inner">

          <div className="header__logo-container">
            <LogoSvg className='logo__icon'/>
            <div className='logo__text'>P.<span className="colored-text">A.</span>S.S.</div>
          </div>


          {/* only at desktop screen */}
          <div className="header__btns-section_desktop-ver">
            <HeaderBtns userName={userName} userVerified={userVerified} />
          </div>

        </div>
      </header>


      {/* only at mobile screen */}
      <div className="header__btns-section_mobile-ver">
        <HeaderBtns userName={userName} userVerified={userVerified} />
      </div>
    

      <div className="file-field-choose-section">
        <div className='file-field-choose-btns-wrapper'>
          <ChooseFileField/>
        </div>

        <div className="file-field-choose-section__gap"></div>
      </div>
    </>
  )
}



const HeaderBtns: React.FC<HeaderProps> = ({userName, userVerified}) => {


  


  return (
    <>
      <div className="header__settings-btn header__btn">
        <SettingsSvg className='header__btn__icon' /> 
        <div className="header__btn__text">Settings</div>
      </div>
      
      <div className="header__acc-btn header__btn">
        <AccSvg className='header__btn__icon' />
        {
        userName
          /* if userName */
          ? 
          <div className="header__btn__text">{userName + " "}
            <span className="colored-text">
              {userVerified ? "[verified]" : "[not verified]"}
            </span>
          </div>


          /* if Not userName */
          : <div className="header__btn__text">Account</div>
        }
      </div>
    </>
  )
}





const ChooseFileField: React.FC = () => {


  const [fileField, setFileField] = useRecoilState(fileFieldState)
  const [, setFsUrl] = useRecoilState(fsUrlState)


  return (
    <>
      <div onClick={ () => {setFileField('mere'); setFsUrl('/')} } 
      className={fileField === 'mere' ? "file-field-choose-btn _active" : "file-field-choose-btn"}>mere</div>

      <div onClick={ () => {setFileField('unmere'); setFsUrl('/')} } 
      className={fileField === 'unmere' ? "file-field-choose-btn _active" : "file-field-choose-btn"}>unmere</div>

      <div onClick={ () => {setFileField('reserved'); setFsUrl('/')} } 
      className={fileField === 'reserved' ? "file-field-choose-btn _active" : "file-field-choose-btn"}><span style={{textDecoration: 'line-through', opacity: '0.6'}}>reserved</span></div>
    </>
  )
}










export default Header