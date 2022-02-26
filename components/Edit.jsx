import React from 'react'
import styles from '../styles/Add.module.css';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useState } from 'react';






const Edit = ({setEditClose,CurrentPizza}) => {
   
   const [File, setFile] = useState(CurrentPizza.img)
   const [title, setTitle] = useState(CurrentPizza.title)
   const [desc, setDesc] = useState(CurrentPizza.desc)
  const [prices, setPrices] = useState(CurrentPizza.prices);
  const [extraOptions, setExtraOptions] = useState(CurrentPizza.extraOptions);
  const [extra, setExtra] = useState(null);
  

   
      

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
      //   const uploadRes = await axios.post(
          
      //     "https://api.cloudinary.com/v1_1/www-pizza-netlify-app/image/upload",
      //     data
      //   );
        
     

      // const { url } = uploadRes.data;
      const newProduct = {
        title,
        desc,
        prices,
        extraOptions,
        img: CurrentPizza.img,
      };


      
       const res = await axios.patch(
            "http://localhost:3000/api/products/" + CurrentPizza._id,{ newProduct }
        );
        // window.location.reload();
        
        setEditClose(false);

      } catch (error) {
        

        console.log(error.message);
      }
    

    };

  return (
     <div className={styles.container}>
      <div className={styles.wrapper}>
       <span onClick={() => setEditClose(false)}>
         X
       </span>
       
       <h1>Edit Pizza</h1>
         <div className={styles.item}>
           <label className={styles.label}>Choose An Image</label>
           <input type="file" onChange={(e) => setFile(e.target.files[0])} />
         </div>
         <div className={styles.item}>
          <label className={styles.label}>Title</label>
          <input
            className={styles.input}
            type="text"
            placeholder={CurrentPizza.title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className={styles.item}>
          <label className={styles.label}>Desc</label>
          <textarea
            rows={4}
            type="text"
             placeholder={CurrentPizza.desc}
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
         Update
        </button>
      </div>
    </div>
  )
}

export default Edit