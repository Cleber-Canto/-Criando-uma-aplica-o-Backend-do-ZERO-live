import { Router } from "express";
import { ProductController } from "./product.controller";

const productRouter = Router();
const productController = new ProductController();

// Rota para criar um novo produto
productRouter.post("/", productController.create);

// Rota para atualizar um produto existente
productRouter.put("/:id", productController.update);

// Rota para deletar um produto
productRouter.delete("/:id", productController.delete);

// Rota para obter um único produto por ID
productRouter.get("/:id", productController.get);

// Rota para listar todos os produtos
productRouter.get("/", productController.list);

export { productRouter };
