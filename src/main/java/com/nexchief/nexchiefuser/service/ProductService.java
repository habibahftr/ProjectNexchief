package com.nexchief.nexchiefuser.service;

import com.nexchief.nexchiefuser.model.Product;

import java.util.List;

public interface ProductService {
    List<Product> findAll();
    List<Product> searcProductbyUser (String id);
    public void saveProduct(Product product);
    Product findByCode(String code);
    Product findByNameProduct(String nameProduct);
    List<Product> findByName(int page, int limit, String id, String nameProduct);
    List<Product> findProductForPaging(int page, int limit, String id);
    List<Product> filterProductByStatus (int page, int limit, String id, String status);
    int countProduct(String updated_by);
    int countProductName(String updated_by, String nameProduct);
    int countProductStatus(String updated_by, String status);
    boolean isCodeExist(Product product);
    boolean isNameSpesificExist(Product product);
//    boolean isNameProductExist(Product product);
    void update(Product product);
    void deleteByCode(String code);


}
