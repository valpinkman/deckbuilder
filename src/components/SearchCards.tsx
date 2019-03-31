import React from 'react'
import useSearchCards from '../hooks/use-cards-search'

const SearchCards = () => {
  const { cards, setTerm, status } = useSearchCards()
  return (
    <div>
      <section>
        search
        <input type="text" onChange={evt => setTerm(evt.target.value)} />
      </section>
      <section>
        {cards.length ? (
          cards.map(card => <p key={card.id}>{card.name}</p>)
        ) : status === 'PENDING' ? (
          <div>searching....</div>
        ) : (
          <div>search for cards</div>
        )}
      </section>
    </div>
  )
}

export default SearchCards
