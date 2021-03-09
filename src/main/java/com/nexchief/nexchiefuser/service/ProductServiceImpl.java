package com.nexchief.nexchiefuser.service;

import com.nexchief.nexchiefuser.model.Product;
import com.nexchief.nexchiefuser.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service("ProductService")
public class ProductServiceImpl implements ProductService{
    @Autowired
    ProductRepository productRepository;

    @Override
    public List<Product> findAll() {
//        return productRepository.findAll();
        List<Product> productList;
        try{
            productList = productRepository.findAll();
        }catch (Exception e){
            System.out.println(e);
            productList=null;
        }
        return productList;
    }

    @Override
    public List<Product> searcProductbyUser(String name) {
        return productRepository.searcProductbyUser(name);
    }

    @Override
    public void saveProduct(Product product) {
        if (product.getCode() == null){
            UUID productCode = UUID.randomUUID();
            product.setCode(productCode.toString());
        }
        synchronized (this){
            productRepository.saveProduct(product);
        }
    }

    @Override
    public void update(Product product) {
        synchronized (this){
            productRepository.updateProduct(product);
        }
    }

    @Override
    public Product findByCode(String code) {
        return productRepository.findyByCode(code);
    }

    @Override
    public boolean isCodeExist(Product product) {
        return productRepository.findyByCode(product.getCode())!=null;
    }
}
