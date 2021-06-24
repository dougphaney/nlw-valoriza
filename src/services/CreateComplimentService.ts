import { getCustomRepository } from "typeorm";
import { ComplimentsRepositories } from "../repositories/ComplimentsRepositories";
import { UsersRepositories } from "../repositories/UsersRepositories";

interface IComplimentRequest {
  user_sender: string,
  user_receiver: string,
  message: string,
  tag_id: string
}

class CreateComplimentService {
  async execute({ user_sender, user_receiver, message, tag_id }: IComplimentRequest){
    const complimentsRepository = getCustomRepository(ComplimentsRepositories);
    
    const usersRepository = getCustomRepository(UsersRepositories);
    
    if(user_sender === user_receiver) {
      throw new Error("Incorrect User Receiver");
    }
    
    const userReceiverExists = await usersRepository.findOne(user_receiver);
    
    if(!userReceiverExists) {
      throw new Error("User Receiver does not exists");
    }

    const compliment = complimentsRepository.create({
      user_receiver,
      user_sender,
      message,
      tag_id
    });

    await complimentsRepository.save(compliment);
    
    return compliment;
  }
}

export { CreateComplimentService };