import { InvalidIdError } from "../../domain/exceptions/InvalidIdError";
import { ICategory } from "../../domain/model/Category";
import { IRepositoryCategory } from "../../domain/ports/IRepositoryCategory"
import { DeleteCategoryByIdUseCase } from "../../domain/useCases/categories/DeleteCategoryByIdUseCase";

describe("DeleteCategoryUseCase", () => {
    let mockRepository: jest.Mocked<IRepositoryCategory>;
    let deleteCategoryUseCase: DeleteCategoryByIdUseCase;

    beforeEach(() => {
        mockRepository = {
            save: jest.fn(),
            getAllCategories: jest.fn(),
            getCategoryById: jest.fn(),
            deleteById: jest.fn(),
            update: jest.fn(),            
        };

        deleteCategoryUseCase = new DeleteCategoryByIdUseCase(mockRepository);
    })

    it("deve deletar uma categoria", async () => {
        const id: string = "60c72b2f5f1b2c001f1a2c3d";

        const deleted: string = `Categoria com id ${id} deletada!`

        mockRepository.deleteById.mockResolvedValue(deleted);

        const result = await deleteCategoryUseCase.execute(id);

        expect(mockRepository.deleteById).toHaveBeenCalledTimes(1);
        expect(result).toEqual(deleted);

    })
    
})