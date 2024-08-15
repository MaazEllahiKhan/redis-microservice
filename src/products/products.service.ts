import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class ProductsService {
     constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) { }

     async getProducts() {
        const products = await this.cacheManager.get('get-product-list');
        return products;
    }

    async setProducts(products) {
        await this.cacheManager.set('get-product-list', products, 60*1000);
    }

}
