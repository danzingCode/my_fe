
export interface IUser {
    id: number;
    name: string;
    score: number;
  }
  
  const mockUser: IUser = {
    id: 1,
    name: 'John Doe',
    score: 0,
  };
  
  export const UserRepository = () => {
    const getUser = async (): Promise<IUser> => {
      return mockUser;
    };
  
    const updateUserScore = async (newScore: number): Promise<IUser> => {
      mockUser.score = newScore;
      return mockUser;
    };
  
    return {
      getUser,
      updateUserScore
    };
  };
  