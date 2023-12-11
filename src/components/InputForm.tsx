import { useEffect, useState } from 'react';


const initValues = {title: '', genre: '', description: '', rating: ''}

type InputFormProps = {
  addGame: () => void,
   editGame: (data: typeof initValues) => void
} 

export const InputForm = ({addGame, editGame}: InputFormProps) => {
  const [formValue, setFormValue] = useState(initValues);

  useEffect(() => {
    setFormValue(initValues);
  }, []);

  const handleInputChange = (event) => {
    const { id, value, type, checked } = event.target;

    if(type === 'radio') {
      setFormValue((prevValues) => ({
      ...prevValues,
      rating: checked ? value : prevValues.rating,
      }));
    } else {
      setFormValue((prevValues) => ({
      ...prevValues,
      [id]: value,
      }));
    }
  };
  
  const handleSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    const  newGame = {
      image: 'src/assets/images/default-image.jpg',
      ...formValue
    }
    if (formValue.id) {
      editGame(formValue)
    } else {
      addGame(newGame)
    }
    
    setFormValue(initValues)
  }

  return (
    <form className='input-wrapper' onSubmit={handleSubmit}>
      <h1 className='input__heading'>Add a new game</h1>
      <label htmlFor='title'>What is the game called?</label>
      <input type='text' id='title' className='input' placeholder='Title' value={formValue.title} onChange={handleInputChange} required/>
      <label htmlFor='title'>What genre is the game?</label>
      <input type='text' id='genre' className='input' placeholder='Genre' value={formValue.genre} onChange={handleInputChange} required/>
      <label htmlFor='title'>Describe the game in your own words.</label>
      <textarea id='description' className='input input__textarea' placeholder='Description' value={formValue.description} onChange={handleInputChange} required></textarea>
      <label htmlFor='star1'>Rate the game</label>
      <div className='input__rating' >
        <input type='radio' id='star5' name='rating' value='5' onChange={handleInputChange} checked={formValue.rating === '5'}/>
        <label className='star' htmlFor='star5' title='Awesome'></label>
        <input type='radio' id='star4' name='rating' value='4' onChange={handleInputChange} checked={formValue.rating === '4'}/>
        <label className='star' htmlFor='star4' title='Great'></label>
        <input type='radio' id='star3' name='rating' value='3' onChange={handleInputChange} checked={formValue.rating === '3'}/>
        <label className='star' htmlFor='star3' title='Very good'></label>
        <input type='radio' id='star2' name='rating' value='2' onChange={handleInputChange} checked={formValue.rating === '2'}/>
        <label className='star' htmlFor='star2' title='Good'></label>
        <input type='radio' id='star1' name='rating' value='1' onChange={handleInputChange} checked={formValue.rating === '1'}/>
        <label className='star' htmlFor='star1' title='Bad'></label>
      </div>
      <button className='input__button' type='submit'>Add game</button>
    </form>
    )
}