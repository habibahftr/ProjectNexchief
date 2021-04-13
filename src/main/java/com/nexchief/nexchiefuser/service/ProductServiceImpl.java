package com.nexchief.nexchiefuser.service;

import com.nexchief.nexchiefuser.model.Product;
import com.nexchief.nexchiefuser.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Map;
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
    public Map<String,Object> findByName(int page, int limit, String id, String nameProduct) {
        return productRepository.findByName(page, limit, id, nameProduct);
    }

    @Override
    public Map<String,Object> filterProductByStatus(int page, int limit, String id, String status) {
        return productRepository.filterByStatus(page, limit, id, status);
    }

    @Override
    public List<Product> filterPrint(String id, String status) {
        return productRepository.filterPrint(id, status);
    }

    //    @Override
//    public boolean isNameProductExist(Product product) {
//        return productRepository.findByName(product.getNameProduct()).size()!=0;
//    }

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
    public Map<String,Object> findProductForPaging(int page, int limit, String id) {
        return productRepository.findProductForPaging(page, limit, id);
    }
}