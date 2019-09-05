// import React, { Component } from 'react'
// import Moment from 'react-moment'

// class ProfileHighlights extends Component {
  
//   state = {
//     highlight: '',
//     highlights: ''
//   }

//   componentDidMount() {
//     this.setState({
//       highlights: this.props.profile.venues,
//       highlight: this.props.profile.venues[0]
//     })
//   }

//   nextHighlight = (i) => {
//     const newIndex = i + 1
//     this.setState({
//       highlight: this.props.profile.venues[newIndex]
//     })
//   }

//   prevHighlight = (i) => {
//     const newIndex = i - 1
//     this.setState({
//       highlight: this.props.profile.venues[newIndex]
//     })
//   }

//   render() {
//     const { highlight, highlights } = this.state
    
//     return  highlights ? ( 
//       <div>
//         { highlights.map((venue, i, array) => (  
//         <div key={i}>  
//         <button onClick={() => this.nextHighlight(i)}
//           disabled={i === -1}
//           style={{ background: 'black', position: 'absolute', right: '10', color: 'white', }}>Next</button>
//         <button onClick={() => this.prevHighlight(i)} disabled={i === 0}>Prev</button>
//         <div key={venue._id}>
//           <div style={{position: 'absolute', top: 0, background: '#444', left: 40, width: '300px', height: '250px' }}>
//             <p style={{ overflow: 'hidden'}}><Moment format='MM/DD/YYYY'>{highlight.date}</Moment></p>
//             <p>{highlight.location}</p>
//             <p>{highlight.description}</p>
//           </div>
//         </div>
//         </div>
//         ))}
        
//         </div>
//       ) : null 
//     }
//   }

// export default ProfileHighlights