package com.nexchief.nexchiefuser.service;

import com.nexchief.nexchiefuser.model.Sales;

import java.util.List;
import java.util.Map;

public interface SalesService {
    Map<String, Object> findAll(int page, int limit, String id, String dateFirst, String dateLast);
    List<Sales> findAllWithOutPaging(String id,String dateFirst, String dateLast );
    Map<String, Object> filterByStatus(int page, int limit, String id, String status, String dateFirst, String dateLast);
    List<Sales> filterByStatusWithOutPaging(String id, String status, String dateFirst, String dateLast);
    Map<String, Object> filterByProduct(int page, int limit, String id, String nameProduct);
    List<Sales> filterByProductWoPagination(String id, String nameProduct);
    Map<String, Object> filterSearchAndStatus(int page, int limit, String id, String status, String nameProduct);
    List<Sales> filterSearchStatus(String id, String status, String nameProduct);
    Sales findById(String idSales);
    int countSalesToday(String id, String date);
    int countSalesMonth(String id, String dateFirst, String dateLast);
    int countSalesUnpaidMonth(String id, String dateFirst, String dateLast, String status);
    int countSalesStatus(String id, String status, String dateFirst, String dateLast);
    void saveSales(Sales sales);
    void updateSales(Sales sales);


}
