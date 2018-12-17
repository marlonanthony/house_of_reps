import React from 'react' 

import './LightBackdrop.css'

 const LightBackdrop = props => (
   props.show ? <div className='light-backdrop' onClick={props.clicked}></div> : null 
 )

 export default LightBackdrop