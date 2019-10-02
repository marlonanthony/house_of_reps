import React from 'react'
import Perks from './Perks'

export default function PerksContainer({ profiles, loading }) {
  let perks
  if (!profiles || loading) {
    perks = null
  } else {
    perks = profiles.map(val =>
      val.perks.length > 0 && val.perks !== null
        ? val.perks.map(perk => (
            <Perks key={perk._id} perks={val.perks} perk={perk} />
          ))
        : null
    )
  }
  return <div className="perks_and_hookups">{perks}</div>
}
