import React from 'react'
import CertifiedStores from './CertifiedStores'

export default function StoresContainer({ profiles }) {
  let stores

  if (!profiles) {
    stores = null
  } else {
    stores = profiles.map(val =>
      val.stores.length > 0 && val.stores !== null
        ? val.stores.map(store => (
            <CertifiedStores
              key={store._id}
              stores={val.stores}
              store={store}
            />
          ))
        : null
    )
  }

  return <div className="stores_container">{stores}</div>
}
