import User from "../infra/typeorm/entities/User";

export default interface IUsersRepository {
    findById(id: string): Promise<User | undefined>;
}