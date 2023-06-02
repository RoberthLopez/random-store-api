import boom from "@hapi/boom";
import Category from "../db/models/category.model";

export class CategoryService {
  constructor() {}
  async create(data: Partial<Category>): Promise<Category> {
    const newCategory = await Category.create(data);
    return newCategory;
  }

  async find() {
    const res = await Category.findAll();
    return res;
  }

  async findOne(id: string): Promise<Category> {
    const res: Category | null = await Category.findByPk(id, {
      include: ["products"],
    });
    if (!res) {
      throw boom.notFound("Category not found");
    }
    return res;
  }

  async update(id: string, changes: Partial<Category>) {
    const category = await this.findOne(id);
    const updatedCategory: Category | undefined = await category.update(
      changes
    );
    return updatedCategory;
  }

  async delete(id: string) {
    const category = await this.findOne(id);
    const deletedCategory = await category.destroy();
    return deletedCategory;
  }
}
