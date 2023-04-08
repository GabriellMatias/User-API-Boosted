import { User } from "../../model/User";
import { IUsersRepository, ICreateUserDTO } from "../IUsersRepository";

class UsersRepository implements IUsersRepository {
  private users: User[];

  private static INSTANCE: UsersRepository;

  private constructor() {
    this.users = [];
  }

  public static getInstance(): UsersRepository {
    if (!UsersRepository.INSTANCE) {
      UsersRepository.INSTANCE = new UsersRepository();
    }

    return UsersRepository.INSTANCE;
  }

  create({ name, email }: ICreateUserDTO): User {
    const user = new User();

    Object.assign(user, {
      admin: false,
      email,
      name,
      updated_at: new Date(),
      created_at: new Date(),
    });
    this.users.push(user);
    return user;
  }

  findById(id: string): User | undefined {
    const userFindById = this.users.find((user) => user.id === id);

    return userFindById;
  }

  findByEmail(email: string): User | undefined {
    const userFindByEmail = this.users.find((user) => user.email === email);

    return userFindByEmail;
  }

  turnAdmin(receivedUser: User): User {
    const userAdmin = receivedUser;

    userAdmin.admin = true;
    userAdmin.updated_at = new Date();

    return userAdmin;
  }

  list(): User[] {
    return this.users;
  }
}

export { UsersRepository };
