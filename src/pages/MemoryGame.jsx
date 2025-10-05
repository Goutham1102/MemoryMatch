import React, { useState, useEffect } from 'react';


const cardEmojis = ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼'];

function MemoryGame() {
 
  const [cards, setCards] = useState([]);
  const [firstCard, setFirstCard] = useState(null);
  const [secondCard, setSecondCard] = useState(null);
  const [moves, setMoves] = useState(0);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [isWinner, setIsWinner] = useState(false);

  
  useEffect(() => {
    startNewGame();
  }, []);


  useEffect(() => {
    if (matchedPairs.length === cardEmojis.length && matchedPairs.length > 0) {
      setIsWinner(true);
    }
  }, [matchedPairs]);

  
  function startNewGame() {
    
    const allCards = [...cardEmojis, ...cardEmojis];
    
    
    const shuffled = allCards.sort(() => Math.random() - 0.5);
    
    
    const cardsWithIds = shuffled.map((emoji, index) => ({
      id: index,
      emoji: emoji,
      isFlipped: false
    }));

    setCards(cardsWithIds);
    setFirstCard(null);
    setSecondCard(null);
    setMoves(0);
    setMatchedPairs([]);
    setIsWinner(false);
  }

  function handleCardClick(clickedCard) {
    
    if (matchedPairs.includes(clickedCard.emoji)) {
      return;
    }

    if (firstCard && secondCard) {
      return;
    }

    
    if (!firstCard) {
      setFirstCard(clickedCard);
      return;
    }

    
    if (clickedCard.id === firstCard.id) {
      return;
    }

    
    setSecondCard(clickedCard);
    setMoves(moves + 1);

    
    if (firstCard.emoji === clickedCard.emoji) {
      
      setMatchedPairs([...matchedPairs, clickedCard.emoji]);
      setFirstCard(null);
      setSecondCard(null);
    } else {
      
      setTimeout(() => {
        setFirstCard(null);
        setSecondCard(null);
      }, 1000);
    }
  }

  
  function isCardFlipped(card) {
    if (matchedPairs.includes(card.emoji)) return true;
    if (firstCard && firstCard.id === card.id) return true;
    if (secondCard && secondCard.id === card.id) return true;
    return false;
  }

  return (
    <div style={styles.container}>
      <div style={styles.gameBox}>
       
        <h1 style={styles.title}> Memory Match Game</h1>
        
        
        <div style={styles.scoreBox}>
          <p style={styles.scoreText}>Moves: {moves}</p>
          <p style={styles.scoreText}>Matched: {matchedPairs.length}/{cardEmojis.length}</p>
        </div>

        
        <div style={styles.cardGrid}>
          {cards.map((card) => (
            <div
              key={card.id}
              onClick={() => handleCardClick(card)}
              style={{
                ...styles.card,
                backgroundColor: isCardFlipped(card) ? '#fff' : '#4a90e2',
                transform: isCardFlipped(card) ? 'rotateY(0deg)' : 'rotateY(0deg)',
                cursor: matchedPairs.includes(card.emoji) ? 'default' : 'pointer'
              }}
            >
              <span style={styles.emoji}>
                {isCardFlipped(card) ? card.emoji : '?'}
              </span>
            </div>
          ))}
        </div>

       
        <button onClick={startNewGame} style={styles.button}>
           New Game
        </button>

        
        {isWinner && (
          <div style={styles.winMessage}>
            <h2> You Won! </h2>
            <p>You matched all cards in {moves} moves!</p>
          </div>
        )}
      </div>
    </div>
  );
}


const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#f0f0f0',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
    fontFamily: 'Arial, sans-serif'
  },
  gameBox: {
    backgroundColor: 'white',
    borderRadius: '15px',
    padding: '30px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    maxWidth: '600px',
    width: '100%'
  },
  title: {
    textAlign: 'center',
    color: '#333',
    marginBottom: '20px',
    fontSize: '32px'
  },
  scoreBox: {
    display: 'flex',
    justifyContent: 'space-around',
    backgroundColor: '#f8f9fa',
    padding: '15px',
    borderRadius: '10px',
    marginBottom: '20px'
  },
  scoreText: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#555',
    margin: 0
  },
  cardGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '15px',
    marginBottom: '20px'
  },
  card: {
    aspectRatio: '1',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '10px',
    fontSize: '48px',
    transition: 'all 0.3s ease',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    userSelect: 'none'
  },
  emoji: {
    fontSize: '48px'
  },
  button: {
    width: '100%',
    padding: '15px',
    fontSize: '18px',
    fontWeight: 'bold',
    backgroundColor: '#4a90e2',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    transition: 'background-color 0.3s'
  },
  winMessage: {
    marginTop: '20px',
    padding: '20px',
    backgroundColor: '#d4edda',
    borderRadius: '10px',
    textAlign: 'center',
    color: '#155724'
  }
};

export default MemoryGame;