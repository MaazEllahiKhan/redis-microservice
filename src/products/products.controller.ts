import { CACHE_MANAGER, CacheInterceptor } from '@nestjs/cache-manager';
import { Controller, HttpException, Inject, UseInterceptors } from '@nestjs/common';
import { EventPattern, MessagePattern } from '@nestjs/microservices';
import { Cache } from 'cache-manager';
import { ProductsService } from './products.service';

// @UseInterceptors(CacheInterceptor)
@Controller('products')
export class ProductsController {
    constructor(@Inject(ProductsService) private productService: ProductsService) { }
    // @EventPattern('product_created')
    // async handleProductCreated(product) {
    //     console.log('Product created event received', product);
    //     await this.cacheManager.set(`product_${product.id}`, product);
    // }

    @EventPattern('set_product_list')
    async handleSetProductList(products) {
        try {
            console.log('set_product_list event received', products);
            await this.productService.setProducts(products)
        } catch (error) {
            throw new HttpException('error', 400, {
                cause: error
            })
        }
    }

    @MessagePattern({ cmd: 'get_product_list' })
    async handleGetProductList() {
        try {
            return await this.productService.getProducts();
        } catch (error) {
            throw new HttpException('error', 400, {
                cause: error
            })
        }

    }
}
