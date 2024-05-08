import { Prisma } from "@prisma/client";

export type ProductCreate = {
    name: string;
    bar_code: string;
    price: number;
    id?: string;  // Este campo pode ser opcional para criação.
  };
  
  export type ProductSave = {
    name: string;
    bar_code: string;
    price: number;
    id: string;  // Este campo deve ser obrigatório após salvar.
  };
  
export interface IProductRepository {
    save(data: ProductCreate): Promise<ProductSave>;
    findByBarCode(bar_code: string): Promise<ProductSave | null>;
    findById(id: string): Promise<ProductSave | null>;
    update(id: string, productData: ProductCreate): Promise<ProductSave>;
    delete(id: string): Promise<void>;
    findAll(): Promise<ProductSave[]>;
}
  