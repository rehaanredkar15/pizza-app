import React from 'react'
import styles from '../styles/Add.module.css';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});






const Add = ({setClose}) => {
   
   const [File, setFile] = useState(null)
   const [title, setTitle] = useState(null)
   const [desc, setDesc] = useState(null)
  const [prices, setPrices] = useState([]);
  const [extraOptions, setExtraOptions] = useState([]);
  const [extra, setExtra] = useState(null);
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





   const changePrice = (e, index) => {
    const currentPrices = prices;
    currentPrices[index] = e.target.value;
    setPrices(currentPrices);
  };

  const handleExtraInput = (e) => {
    setExtra({ ...extra, [e.target.name]: e.target.value });
  };

  const handleExtra = (e) => {
    setExtraOptions((prev) => [...prev, extra]);
  };
  
   
    const handleCreate = async () => {


    const data = new FormData();
    data.append("file", File);
    data.append("upload_preset", "uploads");

      try {
        const uploadRes = await axios.post(
          
          "https://api.cloudinary.com/v1_1/www-pizza-netlify-app/image/upload",
          data
        );
        
     

      const { url } = uploadRes.data;
      const newProduct = {
        title, 
        desc,
        prices,
        extraOptions,
        img: url,
      };
      
       const res =  await axios.post("http://localhost:3000/api/products", newProduct);
        setState({ open: true,   vertical: 'top',horizontal: 'center', });
       
       setTimeout(() => {
         
       setClose(true);
       }, 1000);
     
       

      } catch (error) {
        

        console.log(error.message);
      }

  };


  return (
     <div className={styles.container}>
       <Snackbar  anchorOrigin={{ vertical, horizontal }} open={open} autoHideDuration={1000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                  New Pizza Created
                </Alert>
          </Snackbar>
      <div className={styles.wrapper}>
       <span onClick={() => setClose(true)}>
         X
       </span>
       
       <h1>Add A New Pizza</h1>
         <div className={styles.item}>
           <label className={styles.label}>Choose An Image</label>
           <input type="file" onChange={(e) => setFile(e.target.files[0])} />
         </div>
         <div className={styles.item}>
          <label className={styles.label}>Title</label>
          <input
            className={styles.input}
            type="text"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className={styles.item}>
          <label className={styles.label}>Desc</label>
          <textarea
            rows={4}
            type="text"
            onChange={(e) => setDesc(e.target.value)}
          />
        </div>
          <div className={styles.item}>
          <label className={styles.label}>Prices</label>
          <div className={styles.priceContainer}>
            <input
              className={`${styles.input} ${styles.inputSm}`}
              type="number"
              placeholder="Small"
              onChange={(e) => changePrice(e, 0)}
            />
            <input
              className={`${styles.input} ${styles.inputSm}`}
              type="number"
              placeholder="Medium"
              onChange={(e) => changePrice(e, 1)}
            />
            <input
              className={`${styles.input} ${styles.inputSm}`}
              type="number"
              placeholder="Large"
              onChange={(e) => changePrice(e, 2)}
            />
          </div>
        </div>
         <div className={styles.item}>
          <label className={styles.label}>Extra</label>
          <div className={styles.extra}>
            <input
              className={`${styles.input} ${styles.inputSm}`}
              type="text"
              placeholder="Item"
              name="label"
              onChange={handleExtraInput}
            />
            <input
              className={`${styles.input} ${styles.inputSm}`}
              type="number"
              placeholder="Price"
              name="price"
              onChange={handleExtraInput}
            />
            <button className={styles.extraButton} onClick={handleExtra}>
              Add
            </button>
          </div>
          <div className={styles.extraItems}>
            {extraOptions.map((option) => (
              <span key={option.label} className={styles.extraItem}>
                {option.label}
              </span>
            ))}
          </div>
        </div>
        <button className={styles.addButton} onClick={handleCreate}>
          Create
        </button>
      </div>
    </div>
  )
}

export default Add