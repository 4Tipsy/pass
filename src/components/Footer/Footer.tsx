import React from 'react'


import { ReactComponent as StorageSvg } from '../../assets/icons/storage.svg'
import { ReactComponent as TrmSvg } from '../../assets/icons/trm.svg'


interface FooterProps {
  spaceUsedInMB: number;
  spaceAvailableInMB: number; 
}


/* MAIN COMPONENT */
const Footer: React.FC<FooterProps> = ({spaceUsedInMB, spaceAvailableInMB}) => {


  return (
    <div className='footer-section-wrapper'>
      <div className="space-available-bar-section">
        <div className="space-available-bar-inner">

          <StorageSvg className="space-available-bar__icon"/>

          <div className="space-available-bar__bar">
            <Bar percentage={spaceUsedInMB / spaceAvailableInMB * 100} />
          </div>

          <div className="space-available-bar__text-info">
            Used: <span className="colored-text">{spaceUsedInMB} MB</span> / {spaceAvailableInMB} MB
          </div>

        </div>
      </div>



      <footer>
        <div className="footer-link-wrapper">
          <div className="footer-link">User Manual</div>
        </div>
        <div className="footer-link-wrapper">
          <div className="footer-link">GitHub</div>
        </div>
        <div className="footer-link-wrapper">
          <div className="footer-link">Contact author</div>
        </div>
        <div className="footer-link-wrapper">
          <div className="footer-link colored-text"><TrmSvg className='footer-link-icon'/>Check pass-cli</div>
        </div>
      </footer>
    </div>
  )
}



interface BarProps {
  percentage: number;
}

const Bar: React.FC<BarProps> = ({percentage}) => {

  const baseStyle = {
    backgroundColor: 'var(--color-5)',
    borderRadius: '50px',
    height: 'calc(1.8vh + 0.1vw)',
    width: '100%',
  }

  const thumbStyle = {
    backgroundColor: 'var(--color-4)',
    borderRadius: percentage == 100 ? '50px' : '50px 0 0 50px',
    width: percentage + '%',
    height: '100%',
  }


  return (
    <div className="space-available-bar__bar__base" style={baseStyle}>
      <div className="space-available-bar__bar__thumb" style={thumbStyle}></div>
    </div>
  )
}





export default Footer