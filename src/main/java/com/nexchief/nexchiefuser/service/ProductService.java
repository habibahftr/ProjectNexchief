package com.nexchief.nexchiefuser.service;

import com.nexchief.nexchiefuser.model.Product;

import java.util.List;

public interface ProductService {
    List<Product> findAll();
    List<Product> searcProductbyUser (String id);
    public void saveProduct(Product product);
    Product findByCode(String code);
    boolean isCodeExist(Product product);
    void update(Product product);


}
