import dbConnect from '../../../utils/mongo';
import Product from "../../../models/Product";


export default async function handler(req, res) {
      
      const { method,query:{id} } = req;

      dbConnect()

      if( method === "GET"){
         try {
             const products = await Product.findById(id)
             res.status(200).json(products);

         } catch (error) {
             res.status(500).json(error.message);
         }
      }
      if( method === "PUT"){
         
         try {
             
           const product = await Product.create(req.body);
           res.status(200).json(product);
           
         } catch (error) {
             
             res.status(500).json(error.message);
         }
      }

      if (method === "DELETE") {
          try {
            await Product.findByIdAndDelete(id);
            res.status(200).json("The product has been deleted!");
          } catch (err) {
            res.status(500).json(err);
          }
        }
       if (method === "PATCH") {

         
          try {

            console.log(req.body);
            await Product.findByIdAndUpdate(id, { "$set": { "title": req.body.newProduct.title, "desc": req.body.newProduct.desc, "prices": req.body.newProduct.prices, "img": req.body.newProduct.img,"extraOptions": req.body.newProduct.extraOptions}},
             {
              new:true,
            });
            res.status(200).json("The Product is updated");
       
             
          } catch (err) {
            res.status(500).json(err.message);
          }
        }

}