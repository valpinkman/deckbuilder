import React, { useCallback } from 'react'
import { useMappedState, StoreState } from '../../store'

const CardList = () => {
  const mapState = useCallback(
    ({ search }: StoreState) => ({
      ...search,
    }),
    []
  )

  const { status, cards } = useMappedState(mapState)

  if (status === 'PENDING') return <div>...loading...</div>

  if (status === 'SUCCESS') {
    return (
      <div>
        {cards.map(card => (
          <p key={card.id}>{card.name}</p>
        ))}
      </div>
    )
  }

  if (status === 'ERROR') return <div>...an error happened...</div>

  return <div>...search for cards...</div>
}

export default CardList
