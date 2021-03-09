package com.nexchief.nexchiefuser.repository;

import com.nexchief.nexchiefuser.model.Product;

import java.util.List;

public interface ProductRepository {
    List<Product> findAll();
    List<Product> searcProductbyUser (String name);
    Product findyByCode(String code);
    Product findByName(String name);
    int saveProduct(Product product);
    int updateProduct (Product product);
    int deleteById(String id);



}
