package com.nexchief.nexchiefuser.repository;

import com.nexchief.nexchiefuser.model.Sales;

import java.util.List;
import java.util.Map;

public interface SalesRepository {
    Map<String, Object> findAll(int page, int limit, String id, String dateFirst, String dateLast);
    List<Sales> findAllWithOutPaging(String id, String dateFirst, String dateLast);
    List<Sales> filterByStatus(int page, int limit, String id, String status, String dateFirst, String dateLast);
    List<Sales> filterByStatusWithOutPaging(String id, String status,String dateFirst, String dateLast );
    List<Sales> filterByNameProduct(int page, int limit, String id, String nameProduct);
    List<Sales> filterByProductWoPagination(String id, String nameProduct);
    List<Sales> filterSearchAndStatus(int page, int limit, String id, String status, String nameProduct);
    List<Sales> filterSearchStatus(String id, String status, String productName);
    Sales findById(String id);
    int countSalesMonth(String id, String dateFirst, String dateLast);
    int countSalesUnpaidMonth(String id, String dateFirst, String dateLast, String status);
    int countSalesToday(String id, String date);
    int countSalesProduct(String id, String nameProduct);
    int countFilterAndStatus(String id, String status, String nameProduct);
    int countSales(String distributor, String dateFirst, String dateLast);
    int countSalesStatus(String id, String status, String dateFirst, String dateLast );
    int saveSales(Sales sales);
    void updateSales(Sales sales);




}
