import React, { useState } from 'react';

export const GameEdit = ({ game, editGame }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedGame, setEditedGame] = useState(game);

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    setEditedGame((prevGame) => ({ ...prevGame, [id]: value }));
  };

  const handleSave = () => {
    editGame(editedGame);
    setIsEditing(false);
  };

  const ratingToStars = (rating) => {
    const starClass = 'rating__star';
    const ratingNum = Number(rating);
    const stars = Array.from({ length: ratingNum }, (_, index) => (
      <i className={`fas fa-star ${starClass}`} key={index}></i>
    ));
    return stars;
  };
  

  return (
    <div className='card' key={game.id}>
      <h2>Edit game</h2>
      <img className="card__image" src={game.image} alt="game-img" />
      {isEditing ? (
        <>
          <input className="card__title edit-mode" id="title" value={editedGame.title} onChange={handleInputChange} />
          <input className="card__genre edit-mode" id="genre" value={editedGame.genre} onChange={handleInputChange} />
          <textarea className="card__description edit-mode" id="description" value={editedGame.description} onChange={handleInputChange} />
          <div className='input__rating' >
            <input type='radio' id='star5' name='rating' value='5' onChange={handleInputChange} checked={editedGame.rating === '5'}/>
            <label className='star' htmlFor='star5' title='Awesome'></label>
            <input type='radio' id='star4' name='rating' value='4' onChange={handleInputChange} checked={editedGame.rating === '4'}/>
            <label className='star' htmlFor='star4' title='Great'></label>
            <input type='radio' id='star3' name='rating' value='3' onChange={handleInputChange} checked={editedGame.rating === '3'}/>
            <label className='star' htmlFor='star3' title='Very good'></label>
            <input type='radio' id='star2' name='rating' value='2' onChange={handleInputChange} checked={editedGame.rating === '2'}/>
            <label className='star' htmlFor='star2' title='Good'></label>
            <input type='radio' id='star1' name='rating' value='1' onChange={handleInputChange} checked={editedGame.rating === '1'}/>
            <label className='star' htmlFor='star1' title='Bad'></label>
      </div>
          <div className="card__buttons">
            <button className="buttons__save" onClick={handleSave}>Save</button>
          </div>
        </>
      ) : (
        <>
          <div className="card__title">{game.title}</div>
          <div className="card__genre">{game.genre}</div>
          <div className="card__description">{game.description}</div>
          <div className="card__rating">{ratingToStars(game.rating)}</div>
          <div className="card__buttons">
            <button className="buttons__edit" onClick={() => setIsEditing(true)}>Edit</button>
          </div>
        </>
      )}
    </div>
  );
};

