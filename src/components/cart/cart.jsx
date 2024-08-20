import './cart.css'
import Button from '../button/button'
import { totalPrice } from '../../units/total-price'

const Cart = ({cardItems,onCheckout}) => {
  return (
    <div className='cart__container'>
        <p>
            Umumiy narx: {totalPrice(cardItems).toLocaleString('eng-US',{style:'currency',currency:'USD'})}
        </p>

        <Button title={`${cardItems.length === 0 ? 'Buyutma berish' : 'Tolov'}`} type={'checkout'} 
            disable={cardItems.length === 0 ? true : false}
            onClick={onCheckout}/>
    </div>
  )
}

export default Cart