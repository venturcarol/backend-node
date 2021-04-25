import { getCustomRepository, Repository } from "typeorm";
import { UsersRepository } from "../repositories/UsersRepository";


class UsersService {
  private usersRepository: UsersRepository;

  constructor() {
    this.usersRepository = getCustomRepository(UsersRepository);
  }
  
  async create(email: string){
    //Verificar se usuario existente

    const userExists = await this.usersRepository.findOne({ 
      email,
    });

    //Se existir, retornar user
    if(userExists){
      return userExists;
    }

    //Se não existir, salvar no DB
    const user = this.usersRepository.create({
      email,
    });

    await this.usersRepository.save(user);

    return user;
  }
  
  async findByEmail(email: string) {
    const user = await this.usersRepository.findOne({ email });
  
    return user;
  }
}

export { UsersService };