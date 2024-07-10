interface User {
  id: string;
  email: string;
  userRole: UserRole;
  createdAt: string;
  updatedAt: string;
}

interface Character {
  id: string;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Operations<T>{
  create(data: T): Promise<T>;
  update(data: T, id: string): Promise<T>;
  delete(id: string): Promise<T>;
  findAll(): Promise<T[]>;
  findOne(id: string): Promise<T>;
  findBy(filter: string): Promise<T[]>;
}

enum UserRole {Admin, User}

export type { User  as UserDto};
export type { Character as CharacterDto};
