package com.nexchief.nexchiefuser.service;

import com.nexchief.nexchiefuser.model.Sales;

import java.util.List;

public interface SalesService {
    List<Sales> findAll(int page, int limit, String id);
    List<Sales> findAllWithOutPaging(String id);
    List<Sales> filterByStatus(int page, int limit, String id, String status);
    List<Sales> filterByStatusWithOutPaging(String id, String status);
    List<Sales> filterByProduct(int page, int limit, String id, String nameProduct);
    Sales findById(String idSales);
    int countSales(String distributor);
    int countSalesStatus(String id, String status);
    int countSalesProd(String id, String nameproduct);
    void saveSales(Sales sales);
    void updateSales(Sales sales);


}
