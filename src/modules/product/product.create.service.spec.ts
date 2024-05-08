import { CreateProductService } from "./product.create.service";
import { ProductInMemoryRepository } from "./repositories/ProductInMemoryRepository";
import { ProductCreate } from "./repositories/IProductRepository";

describe("CreateProductService", () => {
    let createProductService: CreateProductService;
    let productInMemoryRepository: ProductInMemoryRepository;

    beforeEach(() => {
        productInMemoryRepository = new ProductInMemoryRepository();
        createProductService = new CreateProductService(productInMemoryRepository);
    });

    it("should successfully create a product when a unique bar code is provided", async () => {
        const productData: ProductCreate = {
            name: "Product Test",
            bar_code: "bar_code_unique",
            price: 100,
        };

        const product = await createProductService.execute(productData);

        expect(product).toHaveProperty("id");
        expect(product.name).toBe(productData.name);
        expect(product.bar_code).toBe(productData.bar_code);
        expect(product.price).toBe(productData.price);
    });

    it("should throw an error if the product with the same bar code already exists", async () => {
        const productData: ProductCreate = {
            name: "Product Test",
            bar_code: "test_bar_code_existent",
            price: 100,
        };

        // Primeira criação
        await createProductService.execute(productData);

        // Tentar criar o mesmo produto novamente deve lançar um erro
        await expect(createProductService.execute(productData))
            .rejects
            .toThrow(`Erro: Produto com código de barras ${productData.bar_code} já existe!`);
    });
});
