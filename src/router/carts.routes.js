import { Router } from "express";
import { CartManager } from "../managers/cartManager.js";
import { ProductManager } from "../managers/productManager.js";
import { cartModel } from "../models/cart.model.js";
import { productModel } from "../models/product.model.js";

const cartManager = new CartManager();
const productManager = new ProductManager();
const router = Router();

// Crear un carrito
router.post("/", async (req, res) => {
  try {
    const cart = await cartModel.create({});

    res.json({ status: "ok", payload: cart });
  } catch (error) {
    console.log(error);
    res.send(error.message);
  }
});

// Obtener un carrito por id
router.get("/:cid", async (req, res) => {
  const { cid } = req.params;
  try {
    const cart = await cartModel.findById(cid);
    if (!cart) return res.json({ status: "error", message: `Cart id ${cid} not found` });

    res.json({ status: "ok", payload: cart });
  } catch (error) {
    console.log(error);
    res.send(error.message);
  }
});

// Obtener todos los carritos
router.get("/", async (req, res) => {
  try {
    const carts = await cartModel.find();  // Obtener todos los carritos

    if (!carts || carts.length === 0) {
      return res.json({ status: "error", message: "No carts found" });  // No se encontraron carritos
    }

    res.json({ status: "ok", payload: carts });  // Enviar todos los carritos
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", message: error.message });  // Error interno del servidor
  }
});

// Eliminar un carrito por id
router.delete("/:cid", async (req, res) => {
  const { cid } = req.params; // Obtener el id del carrito
  try {
    const cart = await cartModel.findByIdAndDelete(cid); // Buscar y eliminar el carrito por id   
    if (!cart) {
      return res.status(404).json({ status: "error", message: `Cart with id ${cid} not found` }); // Retornar error si no se encuentra el carrito
    }
    res.status(200).json({ status: "ok", message: "Cart successfully deleted", payload: cart }); // Retornar éxito si se elimina el carrito
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", message: error.message }); // Error en el servidor
  }
});


// Agregar un producto a un carrito
router.post("/:cid/product/:pid", async (req, res) => {
  const { cid, pid } = req.params;
  try {
    // Validar que el producto exista
    const findProduct = await productModel.findById(pid);
    if (!findProduct) return res.json({ status: "error", message: `Product id ${pid} not found` });

    const findCart = await cartModel.findById(cid);
    if (!findCart) return res.json({ status: "error", message: `Cart id ${cid} not found` });

    const product = findCart.products.find((productCart) => productCart.product === pid);
    if (!product) {
      // Agregar el producto al carrito si no existe
      findCart.products.push({ product: pid, quantity: 1 });
    } else {
    
      // Incrementar cantidad de 1 en 1 si ya existe
      product.quantity++;
    }


    const cart = await cartModel.findByIdAndUpdate(cid, { products: findCart.products }, { new: true });
    res.json({ status: "ok", payload: cart });
  } catch (error) {
    console.log(error);
    res.send(error.message);
  }
});

export default router;