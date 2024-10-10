import React from 'react'

const card = (props) => {
    let {imageurl,name,types,stats}=props

  return (
    <div className='pokemon-card-container'>
         <div className="pokemon-card" >
          <div className='background'>
          <img src={imageurl} className="pokemon-image" alt={name}/>
          </div>
    
       <div class="content">
       <h5 class="pokemon-name">{name}</h5>
       <span className='pokemon-type'>{types}</span>
    

       <div className='pokemon-stats'>
        <h4>Stats</h4>
       <div className='stats'>{stats}</div>
       </div>
       <h1 className='pokemon-logo'>pokemon card</h1>
      
    </div>
    </div>
    </div>
  )
}

export default card
