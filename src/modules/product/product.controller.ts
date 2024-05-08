import { Request, Response } from "express";
import { CreateProductService, UpdateProductService, DeleteProductService, GetProductService, ListProductsService } from "./product.create.service"; // Assuming all services are in the same file
import { ProductPrismaRepository } from "./repositories/ProductPrismaRepository";

class ProductController {
  async create(request: Request, response: Response) {
    try {
      const { body } = request;
      const prismaRepository = new ProductPrismaRepository();
      const createProductService = new CreateProductService(prismaRepository);

      const result = await createProductService.execute(body);

      return response.json(result);
    } catch (err: any) {
      return response.status(400).json({ error: err.message });
    }
  }

  async get(request: Request, response: Response) {
    try {
      const { id } = request.params;
      const prismaRepository = new ProductPrismaRepository();
      const getProductService = new GetProductService(prismaRepository);

      const result = await getProductService.execute(id);

      return response.json(result);
    } catch (err: any) {
      return response.status(404).json({ error: err.message });
    }
  }

  async update(request: Request, response: Response) {
    try {
      const { id } = request.params;
      const { body } = request;
      const prismaRepository = new ProductPrismaRepository();
      const updateProductService = new UpdateProductService(prismaRepository);

      const result = await updateProductService.execute(id, body);

      return response.json(result);
    } catch (err: any) {
      return response.status(400).json({ error: err.message });
    }
  }

  async delete(request: Request, response: Response) {
    try {
      const { id } = request.params;
      const prismaRepository = new ProductPrismaRepository();
      const deleteProductService = new DeleteProductService(prismaRepository);

      await deleteProductService.execute(id);

      return response.status(204).send();
    } catch (err: any) {
      return response.status(404).json({ error: err.message });
    }
  }

  async list(_request: Request, response: Response) {
    try {
      const prismaRepository = new ProductPrismaRepository();
      const listProductsService = new ListProductsService(prismaRepository);

      const results = await listProductsService.execute();

      return response.json(results);
    } catch (err: any) {
      return response.status(500).json({ error: err.message });
    }
  }
}

export { ProductController };
