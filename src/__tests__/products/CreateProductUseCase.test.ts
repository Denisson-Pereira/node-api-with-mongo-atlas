import { IProduct } from "../../domain/model/Product";
import { IRepositoryProduct } from "../../domain/ports/IRepositoryProduct"
import { CreateProductsUseCase } from "../../domain/useCases/products/CreateProductsUseCase";

describe("CreateProductUseCase", () => {
    let mockRepository: jest.Mocked<IRepositoryProduct>;
    let createProductUseCase: CreateProductsUseCase;

    beforeEach(() => {
        mockRepository = {
            save: jest.fn(),
            deleteById: jest.fn(),
            getAllProducts: jest.fn(),
            getProductById: jest.fn(),
            update: jest.fn(),
        };

        createProductUseCase = new CreateProductsUseCase(mockRepository);
    });

    it("deve salvar um produto com sucesso", async () => {
        const inputProduct: IProduct = {
            name: "Produto A",
            description: "Descrição do produto A",
            evaluation: "Avaliação do produto A",
            price: "Preço do produto A",
            image: "Imagem do produto A"
        };
        const savedProduct: IProduct = {
            name: "Produto A",
            description: "Descrição do produto A",
            evaluation: "Avaliação do produto A",
            price: "Preço do produto A",
            image: "Imagem do produto A"
        };

        mockRepository.save.mockResolvedValue(savedProduct);

        const result = await createProductUseCase.execute(inputProduct);

        expect(mockRepository.save).toHaveBeenCalledWith(inputProduct);
        expect(mockRepository.save).toHaveBeenCalledTimes(1);
        
        expect(result).toEqual(savedProduct);
    })
})