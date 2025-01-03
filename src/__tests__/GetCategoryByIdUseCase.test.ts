import { ICategory } from "../domain/model/Category";
import { IRepositoryCategory } from "../domain/ports/IRepositoryCategory"
import { GetCategoryByIdUseCase } from "../domain/useCases/categories/GetCategoryByIdUseCase";

describe("GetCategoryByIdUseCase", () => {
    let mockRepository: jest.Mocked<IRepositoryCategory>;
    let getCategoryByIdUseCase: GetCategoryByIdUseCase;

    beforeEach(() => {
        mockRepository = {
            save: jest.fn(),
            getAllCategories: jest.fn(),
            getCategoryById: jest.fn(),
            deleteById: jest.fn(),
            update: jest.fn(),
        };

        getCategoryByIdUseCase = new GetCategoryByIdUseCase(mockRepository);
    })

    it("deve obter a categoria com um determinado id", async () => {
        const id: string = "60c72b2f5f1b2c001f1a2c3d";
        const categoria: ICategory = {
            name: "Nome da categoria A",
            description: "Descrição da categoria A",
            image: "Imagem da categoria A"            
        }

        const categoriaWithId = { ...categoria, id };

        mockRepository.getCategoryById.mockResolvedValue(categoriaWithId);

        const result = await getCategoryByIdUseCase.execute(id);

        expect(mockRepository.getCategoryById).toHaveBeenCalledTimes(1);
        expect(result).toEqual(categoriaWithId);
    })
})