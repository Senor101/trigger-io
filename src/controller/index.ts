import { Request, Response, NextFunction } from 'express';
import { UserService } from '../service';

export async function getUsers(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const users = UserService.getUsers();

    return res.status(200).json({
      message: 'Users fetched successfully.',
      data: users,
    });
  } catch (error) {
    next(error);
  }
}

export async function createUser(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const users = UserService.createUser();

    return res.status(200).json({
      message: 'Users fetched successfully.',
      data: users,
    });
  } catch (error) {
    next(error);
  }
}

export async function updateUser(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const users = UserService.updateUser();

    return res.status(200).json({
      message: 'Users fetched successfully.',
      data: users,
    });
  } catch (error) {
    next(error);
  }
}

export async function deleteUser(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const users = UserService.deleteUser();

    return res.status(200).json({
      message: 'Users fetched successfully.',
      data: users,
    });
  } catch (error) {
    next(error);
  }
}
