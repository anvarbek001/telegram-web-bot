import { useEffect, useState } from 'react';
import './App.css'
import Card from './components/card/card';
import Cart from './components/cart/cart';
import { getData } from './constants/db'

const courses = getData();


const telegra  = window.Telegram.WebApp;

const App = () => {

  const [cardItems,setCardItems] = useState([])

  useEffect(() => {
    telegra.ready()
  })

  const onAddItem = (item) => {
    const existItem = cardItems.find(c => c.id == item.id)

    if(existItem){
      const newData = cardItems.map(c => c.id == item.id ? {...existItem , quantity:existItem.quantity+1} : c)
      setCardItems(newData)
    }else{
      const newData = [...cardItems,{...item,quantity:1}]
      setCardItems(newData)
    }
  };

  const onRemoveItem = (item) => {
    const existItem = cardItems.find(c => c.id == item.id)
    console.log(existItem);

    if(existItem.quantity === 1){
      const newData = cardItems.filter(c => c.id !== existItem.id)
      setCardItems(newData)
    }else{
      const newData = cardItems.map(c => c.id === existItem.id ? {...existItem,quantity:existItem.quantity-1}:c)
      console.log(newData);
      setCardItems(newData)
    }
  }

  const onCheckout = () => {
    telegra.MainButton.text = 'Sotib olish :)'
    telegra.MainButton.show();
  }

  return (
    <>
      <h1 className='heading'>Sammi kurslar</h1>
      <Cart cardItems={cardItems} onCheckout={onCheckout}/>
      <div className='cards__container'>
        {courses.map(course => (
          <Card key={course.id} course={course} onAddItem={onAddItem} onRemoveItem={onRemoveItem}/>
        ))}
      </div>
    </>
  )
}

export default App