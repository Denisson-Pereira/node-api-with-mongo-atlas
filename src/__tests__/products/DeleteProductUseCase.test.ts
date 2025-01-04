import { IRepositoryProduct } from "../../domain/ports/IRepositoryProduct";
import { DeleteProductByIdUseCase } from "../../domain/useCases/products/DeleteProductByIdUseCase";


describe("DeleteCategoryUseCase", () => {
    let mockRepository: jest.Mocked<IRepositoryProduct>;
    let deleteProductUseCase: DeleteProductByIdUseCase;

    beforeEach(() => {
        mockRepository = {
            save: jest.fn(),
            getAllProducts: jest.fn(),
            getProductById: jest.fn(),
            deleteById: jest.fn(),
            update: jest.fn(),           
        };

        deleteProductUseCase = new DeleteProductByIdUseCase(mockRepository);
    })

    it("deve deletar um produto", async () => {
        const id: string = "60c72b2f5f1b2c001f1a2c3d";

        const deleted: string = `Produto com id ${id} deletado!`

        mockRepository.deleteById.mockResolvedValue(deleted);

        const result = await deleteProductUseCase.execute(id);

        expect(mockRepository.deleteById).toHaveBeenCalledTimes(1);
        expect(result).toEqual(deleted);

    })
    
})