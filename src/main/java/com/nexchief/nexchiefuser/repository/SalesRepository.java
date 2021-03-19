package com.nexchief.nexchiefuser.repository;

import com.nexchief.nexchiefuser.model.Sales;

import java.util.List;

public interface SalesRepository {
    List<Sales> findAll(int page, int limit, String id);
    List<Sales> findAllWithOutPaging(String id);
    List<Sales> filterByStatus(int page, int limit, String id, String status);
    List<Sales> filterByStatusWithOutPaging(String id, String status);
    List<Sales> filterByNameProduct(int page, int limit, String id, String nameProduct);
    Sales findById(String id);
    int countSalesProduct(String id, String nameProduct);
    int countSales(String distributor);
    int countSalesStatus(String id, String status);
    int saveSales(Sales sales);
    void updateSales(Sales sales);




}
