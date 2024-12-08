import { Request, Response, NextFunction } from 'express';

export async function getUsers(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> {
  const users = await BookService.getUsers();

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
    const user = BookService.getOneUser(userId);

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
    const user = BookService.createUser(req.body);

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
    const user = BookService.updateUser(userId, req.body);

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
    const user = BookService.deleteUser(userId);

    return res.status(200).json({
      message: 'User deleted successfully.',
      data: user,
    });
  } catch (error) {
    next(error);
  }
}
