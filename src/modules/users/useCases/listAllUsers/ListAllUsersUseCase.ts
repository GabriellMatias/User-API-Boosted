import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  user_id: string;
}

class ListAllUsersUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute({ user_id }: IRequest): User[] {
    const userData = this.usersRepository.findById(user_id);
    if (!userData) {
      throw new Error("User not exists");
    }
    if (userData.admin === false) {
      throw new Error("User is not an Admin");
    }
    const allUsers = this.usersRepository.list();
    return allUsers;
  }
}

export { ListAllUsersUseCase };
