import { ICategory } from "../../domain/model/Category";
import { IRepositoryCategory } from "../../domain/ports/IRepositoryCategory";
import { CreateCategoryUseCase } from "../../domain/useCases/categories/CreateCategoryUseCase";



describe("CreateCategoryUseCase", () => {
    let mockRepository: jest.Mocked<IRepositoryCategory>;
    let createCategoryUseCase: CreateCategoryUseCase;

    beforeEach(() => {
        mockRepository = {
            save: jest.fn(),
            getAllCategories: jest.fn(),
            getCategoryById: jest.fn(),
            deleteById: jest.fn(),
            update: jest.fn(),
        };

        createCategoryUseCase = new CreateCategoryUseCase(mockRepository);
    });

    it("deve salvar uma categoria com sucesso", async () => {
        const inputCategory: ICategory = { name: "Categoria A", description: "description A", image: "image A" };
        const savedCategory: ICategory = { name: "Categoria A", description: "description A", image: "image A"  };

        mockRepository.save.mockResolvedValue(savedCategory);

        const result = await createCategoryUseCase.execute(inputCategory);

        expect(mockRepository.save).toHaveBeenCalledWith(inputCategory);
        expect(mockRepository.save).toHaveBeenCalledTimes(1);

        expect(result).toEqual(savedCategory);
    });

    it("deve lançar erro se o repositório falhar", async () => {
        mockRepository.save.mockRejectedValue(new Error("Erro ao salvar categoria"));

        await expect(createCategoryUseCase.execute({ name: "Categoria A", description: "description A", image: "image A" }))
            .rejects
            .toThrow("Erro ao salvar categoria");

        expect(mockRepository.save).toHaveBeenCalledTimes(1);
    });
});
