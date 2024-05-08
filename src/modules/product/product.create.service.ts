import { IProductRepository, ProductCreate } from "../product/repositories/IProductRepository";

// services/CreateProductService.ts
export class CreateProductService {
  constructor(private productRepository: IProductRepository) {}

  async execute(data: ProductCreate) {
    console.log("Iniciando criação do produto...");

    // Verificar se o produto já existe no banco de dados
    const productExists = await this.productRepository.findByBarCode(data.bar_code);
    if (productExists) {
      const errorMessage = `Erro: Produto com código de barras ${data.bar_code} já existe!`;
      console.error(errorMessage);
      throw new Error(errorMessage);
    }

    // Salvar o novo produto no banco de dados
    try {
      const newProduct = await this.productRepository.save(data);
      console.log("Produto criado com sucesso:", newProduct);
      return newProduct;
    } catch (error) {
      console.error("Falha ao salvar o produto:", error);
      throw new Error("Erro ao salvar o produto no banco de dados.");
    }
  }
}

// services/UpdateProductService.ts
export class UpdateProductService {
  constructor(private productRepository: IProductRepository) {}

  async execute(id: string, data: ProductCreate) {
    console.log(`Atualizando produto com ID: ${id}...`);
    const product = await this.productRepository.findById(id);
    if (!product) {
      console.error(`Erro: Produto com ID ${id} não encontrado.`);
      throw new Error(`Produto com ID ${id} não encontrado!`);
    }
    const updatedProduct = await this.productRepository.update(id, data);
    console.log("Produto atualizado com sucesso:", updatedProduct);
    return updatedProduct;
  }
}

// services/DeleteProductService.ts
export class DeleteProductService {
    constructor(private productRepository: IProductRepository) {}
  
    async execute(id: string) {
      console.log(`Deletando produto com ID: ${id}...`);
      const product = await this.productRepository.findById(id);
      if (!product) {
        console.error(`Erro: Produto com ID ${id} não encontrado para deleção.`);
        throw new Error(`Produto com ID ${id} não encontrado!`);
      }
      await this.productRepository.delete(id);
      console.log("Produto deletado com sucesso.");
      return { message: `Produto com ID ${id} foi deletado com sucesso.` };
    }
  }
  

// services/GetProductService.ts
export class GetProductService {
  constructor(private productRepository: IProductRepository) {}

  async execute(id: string) {
    console.log(`Buscando produto com ID: ${id}...`);
    const product = await this.productRepository.findById(id);
    if (!product) {
      console.error(`Erro: Produto com ID ${id} não encontrado.`);
      throw new Error(`Produto com ID ${id} não encontrado!`);
    }
    console.log("Produto encontrado:", product);
    return product;
  }
}

// services/ListProductsService.ts
export class ListProductsService {
  constructor(private productRepository: IProductRepository) {}

  async execute() {
    console.log("Listando todos os produtos...");
    const products = await this.productRepository.findAll();
    console.log("Produtos listados com sucesso:", products);
    return products;
  }
}
