import { randomUUID } from "crypto";

import {
  IProductRepository,
  ProductCreate,
  ProductSave,
} from "./IProductRepository";

class ProductInMemoryRepository implements IProductRepository {
  findById(id: string): Promise<ProductSave | null> {
      throw new Error("Method not implemented.");
  }
  update(id: string, productData: ProductCreate): Promise<ProductSave> {
      throw new Error("Method not implemented.");
  }
  delete(id: string): Promise<void> {
      throw new Error("Method not implemented.");
  }
  findAll(): Promise<ProductSave[]> {
      throw new Error("Method not implemented.");
  }
  products: any[] = [];

  async save(data: ProductCreate): Promise<ProductSave> {
    // INSERT INTO PRODUCTS(NAME, PRICE, BAR_CODE)
    // VALUES('', 100, '')
    const id = randomUUID();

    const product: ProductSave = {
      ...data,
      id,
    };

    this.products.push(product);
    return product;
  }
  async findByBarCode(bar_code: String): Promise<ProductSave | null> {
    // SELECT * FROM PRODUCTS WHERE BAR_CODE = BAR_CODE LIMTI 1
    return this.products.find((product) => product.bar_code === bar_code);
  }
}

export { ProductInMemoryRepository };