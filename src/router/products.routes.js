import { Router } from "express";
import { ProductManager } from "../managers/productManager.js";
import { productModel } from "../models/product.model.js";

const productManager = new ProductManager();
const router = Router();

router.get("/", async (req, res) => {
  const { limit } = req.query;
  try {
    const products = await productModel.find();
    res.json({ status: "success", payload: products });
  } catch (error) {
    console.log(error);
    res.send(error.message);
  }
});

router.get("/:pid", async (req, res) => {
  const { pid } = req.params;
  try {
    const product = await productModel.findById(pid);
    if(!findProduct) return res.json({status: "error", message: `Product ${pid} not found`});

    res.json({ status: "success", payload: `product id ${pid} deleted` });
  } catch (error) {
    console.log(error);
    res.send(error.message);
  }
});

router.post("/", async (req, res) => {
  const body = req.body;
  try {
    const product = await productModel.create(body);

    res.send(product);
  } catch (error) {
    console.log(error);
    res.send(error.message);
  }
});

router.put("/:pid", async (req, res) => {
  const { pid } = req.params;
  const body = req.body;
  try {
    
    const findProduct = await productModel.findById(pid);
    if(!findProduct) return res.json({status: "error", message: `Product ${pid} not found`});

    const product = await productModel.findByIdAndUpdate(pid, body, { new: true });
    res.json({ status: "success", payload: product });
  } catch (error) {
    console.log(error);
    res.send(error.message);
  }
});

router.delete("/:pid", async (req, res) => {
  try {
    const product = await productModel.findByIdAndDelete(req.params.pid);
    if (!product) return res.status(404).json({ status: "error", message: `product id ${pid} not found` });
     res.json({ status: "success", payload: `product id ${req.params.pid} deleted` });
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
});


export default router;
