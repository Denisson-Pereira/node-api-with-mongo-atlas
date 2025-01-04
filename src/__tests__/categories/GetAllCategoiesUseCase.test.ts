import { ICategory } from "../../domain/model/Category";
import { IRepositoryCategory } from "../../domain/ports/IRepositoryCategory"
import { GetAllCategoriesUseCase } from "../../domain/useCases/categories/GetAllCategoriesUseCase";

describe("GetAllCategoryUseCase", () => {
    let mockRepository: jest.Mocked<IRepositoryCategory>;
    let getAllCategoriesUseCase: GetAllCategoriesUseCase;

    beforeEach(() => {
        mockRepository = {
            save: jest.fn(),
            getAllCategories: jest.fn(),
            getCategoryById: jest.fn(),
            deleteById: jest.fn(),
            update: jest.fn(),
        };

        getAllCategoriesUseCase = new GetAllCategoriesUseCase(mockRepository);
    })

    it("deve obter todas as categorias com sucesso", async () => {
        const categoria: ICategory[] = [
            {
                name: "Nome da categoria A",
                description: "Descrição da categoria A",
                image: "Imagem da categoria A"
            }
        ]

        mockRepository.getAllCategories.mockResolvedValue(categoria);

        const result = await getAllCategoriesUseCase.execute();

        expect(mockRepository.getAllCategories).toHaveBeenCalledTimes(1);
        expect(result).toEqual(categoria);
    })
})