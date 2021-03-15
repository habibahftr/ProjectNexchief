package com.nexchief.nexchiefuser.repository;

import com.nexchief.nexchiefuser.model.Product;

import java.util.List;

public interface ProductRepository {
    List<Product> findAll();
    List<Product> searcProductbyUser (String name);
    Product findyByCode(String code);
    Product findByNameProduct(String nameProduct);
    List<Product> findByName(int page, int limit, String id, String name);
    List<Product> filterByStatus(int page, int limit, String id, String status);
    List<Product> findProductForPaging(int page, int limit, String id);
    int countProduct(String updated_by);
    int countProductName(String updated_by, String productName);
    int countProductStatus(String updated_by, String status);
    int saveProduct(Product product);
    int updateProduct (Product product);
    int deleteByCode(String code);




}
