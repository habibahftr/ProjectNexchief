package com.nexchief.nexchiefuser.repository;

import com.nexchief.nexchiefuser.model.Sales;

import java.util.List;

public interface SalesRepository {
    List<Sales> findAll(int page, int limit, String id);
    Sales findById(String id);
    int countSales(String distributor);
    int saveSales(Sales sales);
    void updateSales(Sales sales);




}
