import React from 'react';
import styles from "../../styles/Product.module.css";
import Image from 'next/image';
import { useState } from "react";
import { useDispatch } from "react-redux";
import Select from 'react-select';
import axios from "axios"; 
import { addProduct } from "../../redux/cartSlice.js";
import { v4 as uuidv4 } from 'uuid';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});




const Product = ({pizza}) => {
   const [quantity,setQuantity] = useState(0);
   const [price, setPrice] = useState(pizza.prices[0]);
  const [size, setSize] = useState(0);
  const [extras, setExtras] = useState([]);
  const dispatch = useDispatch();
    const [opener, setOpener] = useState(false);


    const [state, setState] = React.useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });

  const { vertical, horizontal, open } = state;



  const handleClose = () => {
    setState({ ...state, open: false });
  };

  
   
  const handleCart = () => {
 
    dispatch(addProduct({...pizza,extras,price,quantity,uid:uuidv4()}));
      setState({ open: true,   vertical: 'top',horizontal: 'center', });
  }

  const handleClick=() => {
      setQuantity(prevCount => prevCount - 1)
  }
   
  const handleButtonClick=() => {
      setQuantity(prevCount => prevCount + 1)
  }
  

  const changePrice = (number) => {
    setPrice(price + number);
  };

  const handleSize = (sizeIndex) => {
    const difference = pizza.prices[sizeIndex] - pizza.prices[size];
    setSize(sizeIndex);
    changePrice(difference);
  };

   const handleChange = (e, option) => {
    const checked = e.target.checked;

    if (checked) {
      changePrice(option.price);
      setExtras((prev) => [...prev, option]);
    } else {
      changePrice(-option.price);
      setExtras(extras.filter((extra) => extra._id !== option._id));
    }
  };



   const optionToppings = [
       {value:'extra-cheese',label:'🧀 Extraa Cheese'},
       {value:'olives',label:'🥝 Black Olives'},
       {value:'Pepperoni',label:'🌰 Pepperoni'},
       {value:'Sausage',label:'🥖 Sausage'},
       {value:'Mushroom',label:'🍄 Mushroom.'},
       {value:'Green Pepper',label:'🥗 Green pepper.'},
   ]


    return ( 
        <div className={styles.container}>
         <div className={styles.left}>
          <Snackbar  anchorOrigin={{ vertical, horizontal }} open={open} autoHideDuration={1000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                  Item Added to Cart
                </Alert>
          </Snackbar>
          <div className={styles.imgContainer}>
           <Image src={pizza.img} objectFit="contain" layout="fill" alt = ""/>
          </div>
         </div>
         
          <div  className={styles.right}> 
           <h1 className={styles.title}> {pizza.title} </h1>
           <span className={styles.price}>{price} Rs</span>
           <p className={styles.desc}> {pizza.desc}</p>
           <h3 className={styles.choose}> Choose the Size </h3>
           <div className={styles.sizes}>
            <div className={styles.size} onClick={() => handleSize(0)}>
               <Image src= "/img/size.png" objectFit="contain" layout="fill" alt = ""/>
               <span className={styles.number}>Small{size === 0 && <>✅</>} </span>
            </div>
            
            <div className={styles.size} onClick={() => handleSize(1)}>
               <Image src= "/img/size.png" objectFit="contain" layout="fill" alt = ""/>
               <span className={styles.number}>Medium{size === 1 && <>✅</>}</span>
            </div>
            <div className={styles.size} onClick={() => handleSize(2)}>
               <Image src= "/img/size.png" objectFit="contain" layout="fill" alt = ""/>
               <span className={styles.number}>Large{size === 2 && <>✅</>}</span>
            </div>
 
          
           </div>
            <h3 className={styles.choose}>Choose additional Ingredients</h3>
           <div className={styles.ingredients}>
                 {pizza.extraOptions.map((option) => (
            <div className={styles.option} key={option._id}>
              <input
                type="checkbox"
                id={option.value}
                name={option.value}
                className={styles.checkbox}
                onChange={(e) => handleChange(e, option)}
              />
              <label htmlFor="double" className={styles.leftbox}>{option.label}</label>
            </div>
          ))}
           </div>

           <div className={styles.add}>
             {  
              quantity > 0  && <button onClick={handleClick} className={styles.increaser}> - </button>
             }
             <span> {quantity} </span>
             <button onClick={handleButtonClick} className={styles.increaser}> + </button>
            <button className={styles.button} onClick={handleCart} disabled={!quantity>=1}> Add to Cart</button>
          
          
            </div>
          </div>
        </div>
     );
}
 


export const getServerSideProps = async ({params}) => {
  
   const res = await axios.get(`https://pizza-app-five.vercel.app/api/products/${params.id}`);

   return {
     props:{
       pizza:res.data,
     }
   }

}


export default Product;