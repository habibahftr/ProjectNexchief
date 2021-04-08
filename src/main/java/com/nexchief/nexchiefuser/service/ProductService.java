package com.nexchief.nexchiefuser.service;

import com.nexchief.nexchiefuser.model.Product;

import java.util.List;
import java.util.Map;

public interface ProductService {
    List<Product> findAll();
    List<Product> searcProductbyUser (String id);
    public void saveProduct(Product product);
    Product findByCode(String code);
    Product findByNameProduct(String updated_by, String nameProduct);
    Map<String,Object> findByName(int page, int limit, String id, String nameProduct);
    Map<String,Object> findProductForPaging(int page, int limit, String id);
    Map<String,Object> filterProductByStatus (int page, int limit, String id, String status);
    List<Product> filterPrint(String id, String status);
    boolean isCodeExist(Product product);
    boolean isNameSpesificExist(Product product);
    void update(Product product);
    void deleteByCode(String code);


}
