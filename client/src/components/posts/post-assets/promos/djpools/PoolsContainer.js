import React from 'react'
import DjPools from './DjPools'

export default function PoolsContainer({ profiles, loading }) {
  let djpools

  if (!profiles || loading) {
    djpools = null
  } else {
    djpools = profiles.map(val =>
      val.djpools.length > 0 && val.djpools !== null
        ? val.djpools.map(djpool => (
            <DjPools key={djpool._id} djpools={val.djpools} djpool={djpool} />
          ))
        : null
    )
  }

  return <div className="djpools">{djpools}</div>
}
