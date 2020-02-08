import React from 'react'
import DjPools from './DjPools'

export default function PoolsContainer({ profiles }) {
  if (!profiles) return null

  return profiles.map(
    val =>
      val.djpools &&
      val.djpools.length &&
      val.djpools.map(djpool => (
        <DjPools key={djpool._id} djpools={val.djpools} djpool={djpool} />
      ))
  )
}
