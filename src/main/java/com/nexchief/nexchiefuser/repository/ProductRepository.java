package com.nexchief.nexchiefuser.repository;

import com.nexchief.nexchiefuser.model.Product;

import java.util.List;
import java.util.Map;

public interface ProductRepository {
    List<Product> findAll();
    List<Product> searcProductbyUser (String name);
    Product findyByCode(String code);
    Product findByNameProduct(String id, String nameProduct);
    List<Product> filterPrint(String id, String status);
    Map<String, Object> findByName(int page, int limit, String id, String name);
    Map<String, Object> filterByStatus(int page, int limit, String id, String status);
    Map<String,Object> findProductForPaging(int page, int limit, String id);
    int saveProduct(Product product);
    int updateProduct (Product product);
    int deleteByCode(String code);




}
