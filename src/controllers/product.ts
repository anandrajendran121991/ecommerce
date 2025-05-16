import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { Product } from '../entities/Product';

export const getAllProducts = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const productRepo = AppDataSource.getRepository(Product);
    const products = await productRepo.find({
      relations: ['category', 'inventory'],
    });
    res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};
