import { PrismaClient } from '@prisma/client';
import { IProductRepository, ProductCreate, ProductSave } from './IProductRepository';

class ProductPrismaRepository implements IProductRepository {
  private prisma = new PrismaClient();

  async save(data: ProductCreate): Promise<ProductSave> {
    const savedProduct = await this.prisma.product.create({
      data: {
        name: data.name,
        bar_code: data.bar_code,
        price: data.price
      }
    });
    return {
      ...savedProduct,
      price: savedProduct.price.toNumber(),  // Converte Decimal para number
      id: savedProduct.id.toString()  // Converte o id numérico para string
    };
  }

  async findByBarCode(bar_code: string): Promise<ProductSave | null> {
    const product = await this.prisma.product.findUnique({
      where: { bar_code }
    });
    if (!product) return null;
    return {
      ...product,
      price: product.price.toNumber(),  // Converte Decimal para number
      id: product.id.toString()  // Converte o id numérico para string
    };
  }

  async findById(id: string): Promise<ProductSave | null> {
    const product = await this.prisma.product.findUnique({
      where: { id: Number(id) }
    });
    if (!product) return null;
    return {
      ...product,
      price: product.price.toNumber(),  // Converte Decimal para number
      id: product.id.toString()
    };
  }

  async update(id: string, productData: ProductCreate): Promise<ProductSave> {
    const updatedProduct = await this.prisma.product.update({
      where: { id: Number(id) },
      data: {
        name: productData.name,
        bar_code: productData.bar_code,
        price: productData.price
      }
    });
    return {
      ...updatedProduct,
      price: updatedProduct.price.toNumber(),  // Converte Decimal para number
      id: updatedProduct.id.toString()
    };
  }

  async delete(id: string): Promise<void> {
    await this.prisma.product.delete({
      where: { id: Number(id) }
    });
  }

  async findAll(): Promise<ProductSave[]> {
    const products = await this.prisma.product.findMany();
    return products.map(product => ({
      ...product,
      price: product.price.toNumber(),  // Converte Decimal para number
      id: product.id.toString()  // Converte todos os ids numéricos para strings
    }));
  }
}

export { ProductPrismaRepository };
