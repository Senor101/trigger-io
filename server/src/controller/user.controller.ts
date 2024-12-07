import { Request, Response, NextFunction } from 'express';
import { UserService } from '../service/user.service';

export async function getUsers(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> {
  const users = await UserService.getUsers();

  res.status(200).json({
    message: 'Users fetched successfully.',
    data: users,
  });
}

export async function getSingleUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { userId } = req.params;
    const user = UserService.getOneUser(userId);

    return res.status(200).json({
      message: 'User fetched successfully.',
      data: user,
    });
  } catch (error) {
    next(error);
  }
}

export async function createUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const user = UserService.createUser(req.body);

    return res.status(201).json({
      message: 'User created successfully.',
      data: user,
    });
  } catch (error) {
    next(error);
  }
}

export async function updateUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { userId } = req.params;
    const user = UserService.updateUser(userId, req.body);

    return res.status(200).json({
      message: 'User updated successfully.',
      data: user,
    });
  } catch (error) {
    next(error);
  }
}

export async function deleteUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { userId } = req.params;
    const user = UserService.deleteUser(userId);

    return res.status(200).json({
      message: 'User deleted successfully.',
      data: user,
    });
  } catch (error) {
    next(error);
  }
}
