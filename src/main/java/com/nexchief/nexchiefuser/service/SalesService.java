package com.nexchief.nexchiefuser.service;

import com.nexchief.nexchiefuser.model.Sales;

import java.util.List;

public interface SalesService {
    List<Sales> findAll(int page, int limit, String id, String dateFirst, String dateLast);
    List<Sales> findAllWithOutPaging(String id,String dateFirst, String dateLast );
    List<Sales> filterByStatus(int page, int limit, String id, String status);
    List<Sales> filterByStatusWithOutPaging(String id, String status);
    List<Sales> filterByProduct(int page, int limit, String id, String nameProduct);
    List<Sales> filterByProductWoPagination(String id, String nameProduct);
    List<Sales> filterSearchAndToggle(int page, int limit, String id, String status, String nameProduct );
    List<Sales> filterSearchToggle(String id, String status, String nameProduct);
    Sales findById(String idSales);
    int countSales(String distributor, String dateFirst, String dateLast);
    int countSalesToday(String id, String date);
    int countSalesMonth(String id, String dateFirst, String dateLast);
    int countSalesUnpaidMonth(String id, String dateFirst, String dateLast, String status);
    int countSalesStatus(String id, String status);
    int countSalesProd(String id, String nameproduct);
    int countFilterAndToggle(String id, String status, String nameProduct);
    void saveSales(Sales sales);
    void updateSales(Sales sales);


}
