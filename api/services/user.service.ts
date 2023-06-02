import User from "../db/models/user.model";
import boom from "@hapi/boom";

export class UserService {
  constructor() {}

  async create(data: Partial<User>): Promise<User> {
    const newUser: User = await User.create(data);
    return newUser;
  }

  async find() {
    const res: User[] = await User.findAll({
      include: ["customer"],
    });
    return res;
  }

  async findOne(id: string): Promise<User | null> {
    const user: User | null = await User.findByPk(id);
    if (!user) {
      throw boom.notFound("User not found");
    }
    return user;
  }

  async update(id: string, changes: Partial<User>) {
    const user: User | null = await this.findOne(id);
    const res: User | undefined = await user?.update(changes);
    return res;
  }

  async delete(id: string) {
    const user: User | null = await this.findOne(id);
    const res = await user?.destroy();
    return { id };
  }
}
