package com.nexchief.nexchiefuser.service;

import com.nexchief.nexchiefuser.model.Product;
import com.nexchief.nexchiefuser.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
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
    public List<Product> findByName(int page, int limit, String id, String nameProduct) {
        return productRepository.findByName(page, limit, id, nameProduct);
    }

    @Override
    public List<Product> filterProductByStatus(int page, int limit, String id, String status) {
        return productRepository.filterByStatus(page, limit, id, status);
    }

    //    @Override
//    public boolean isNameProductExist(Product product) {
//        return productRepository.findByName(product.getNameProduct()).size()!=0;
//    }

    @Override
    public int countProduct(String updated_by) {
        return productRepository.countProduct(updated_by);
    }

    @Override
    public int countProductName(String updated_by, String nameProduct) {
        return productRepository.countProductName(updated_by, nameProduct);
    }

    @Override
    public int countProductStatus(String updated_by, String status) {
        return productRepository.countProductStatus(updated_by, status);
    }



    @Override
    public void saveProduct(Product product) {
        if (product.getCode() == null){
            UUID productCode = UUID.randomUUID();
            product.setCode(productCode.toString());
        }else if(product.getLaunch_date() == null){
            Date today = new Date();
            System.out.println(today);
            product.setLaunch_date(today);
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
    public Product findByNameProduct(String updated_by, String nameProduct) {
        return productRepository.findByNameProduct(updated_by, nameProduct);
    }

    @Override
    public boolean isCodeExist(Product product) {
        return productRepository.findyByCode(product.getCode())!=null;
    }

    @Override
    public boolean isNameSpesificExist(Product product) {
        return productRepository.findByNameProduct(product.getUpdated_by(), product.getNameProduct())!=null;
    }

    @Override
    public void deleteByCode(String code) {
        synchronized (this){
            productRepository.deleteByCode(code);
        }
    }

    @Override
    public List<Product> findProductForPaging(int page, int limit, String id) {
        return productRepository.findProductForPaging(page, limit, id);
    }
}
