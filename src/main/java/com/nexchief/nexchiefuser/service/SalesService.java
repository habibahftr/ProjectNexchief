package com.nexchief.nexchiefuser.service;

import com.nexchief.nexchiefuser.model.Sales;

import java.util.List;

public interface SalesService {
    List<Sales> findAll(int page, int limit, String id);
    Sales findById(String idSales);
    int countSales(String distributor);
}
