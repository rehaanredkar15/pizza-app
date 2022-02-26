import dbConnect from '../../../utils/mongo';
import Product from "../../../models/Product";


export default async function handler(req, res) {
      
      const { method } = req;

      dbConnect()

      if( method === "GET"){
         try {
             const products = await Product.find()
             res.status(200).json(products);

         } catch (error) {
             res.status(500).json(error.message);
         }
      }
      if( method === "POST"){
         
         try {
             
           const product = await Product.create(req.body);
           res.status(200).json(product);

         } catch (error) {
             
             res.status(500).json(error.message);
         }
      }
      //  if (method === "PATCH") {
      //     try {
      //       const Product  = await Product.findByIdAndUpdate(id, req.body, {
      //           new: true,
      //         });
      //       res.status(200).json(Product);

             
      //     } catch (err) {
      //       res.status(500).json(err);
      //     }
      //   }

}