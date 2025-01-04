import { IProduct } from "../../domain/model/Product";
import { IRepositoryProduct } from "../../domain/ports/IRepositoryProduct";
import { GetProductByIdUseCase } from "../../domain/useCases/products/GetProductByIdUseCase";


describe("GetProductByIdUseCase", () => {
    let mockRepository: jest.Mocked<IRepositoryProduct>;
    let getProductByIdUseCase: GetProductByIdUseCase;

    beforeEach(() => {
        mockRepository = {
            save: jest.fn(),
            getAllProducts: jest.fn(),
            getProductById: jest.fn(),
            deleteById: jest.fn(),
            update: jest.fn(),
        };

        getProductByIdUseCase = new GetProductByIdUseCase(mockRepository);
    })

    it("deve obter um produto com um determinado id", async () => {
        const id: string = "60c72b2f5f1b2c001f1a2c3d";
        const produto: IProduct = {
            name: "Produto A",
            description: "Descrição do produto A",
            evaluation: "Avaliação do produto A",
            price: "Preço do produto A",
            image: "Imagem do produto A"          
        }

        const produtoWithId = { ...produto, id };

        mockRepository.getProductById.mockResolvedValue(produtoWithId);

        const result = await getProductByIdUseCase.execute(id);

        expect(mockRepository.getProductById).toHaveBeenCalledTimes(1);
        expect(result).toEqual(produtoWithId);
    })
})