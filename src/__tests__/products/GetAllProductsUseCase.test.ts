import { IProduct } from "../../domain/model/Product";
import { IRepositoryProduct } from "../../domain/ports/IRepositoryProduct";
import { GetAllProductsUseCase } from "../../domain/useCases/products/GetAllProductsUseCase";


describe("GetAllProductsUseCase", () => {
    let mockRepository: jest.Mocked<IRepositoryProduct>;
    let getAllProductsUseCase: GetAllProductsUseCase;

    beforeEach(() => {
        mockRepository = {
            save: jest.fn(),
            getAllProducts: jest.fn(),
            getProductById: jest.fn(),
            deleteById: jest.fn(),
            update: jest.fn(),
        };

        getAllProductsUseCase = new GetAllProductsUseCase(mockRepository);
    })

    it("deve obter todos os produtos com sucesso", async () => {
        const produto: IProduct[] = [
            {
                name: "Produto A",
                description: "Descrição do produto A",
                evaluation: "Avaliação do produto A",
                price: "Preço do produto A",
                image: "Imagem do produto A"
            }
        ]

        mockRepository.getAllProducts.mockResolvedValue(produto);

        const result = await getAllProductsUseCase.execute();

        expect(mockRepository.getAllProducts).toHaveBeenCalledTimes(1);
        expect(result).toEqual(produto);
    })
})