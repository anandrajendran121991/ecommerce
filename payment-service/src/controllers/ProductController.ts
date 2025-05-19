import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { Product } from '../entities/Product';

export class ProductController {
  static getAllProducts = async (req: Request, res: Response) => {
    try {
      const productRepo = AppDataSource.getRepository(Product);
      const products = await productRepo.find({
        relations: ['category', 'inventory'],
      });

      const flatProducts = products.map((p) => ({
        id: p.id,
        name: p.name,
        description: p.description,
        price: Number(p.price),
        image: p.imageUrl, // flatten imageUrl to image
        category: p.category.name,
        availableQuantity: p.inventory.quantity,
        status: p.status,
      }));
      res.status(200).json(flatProducts);
    } catch (error) {
      console.error('Error fetching products:', error);
      res.status(500).json({ error: 'Failed to fetch products' });
    }
  };
}
