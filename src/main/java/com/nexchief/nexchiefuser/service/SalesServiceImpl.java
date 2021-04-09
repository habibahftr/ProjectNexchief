package com.nexchief.nexchiefuser.service;

import com.nexchief.nexchiefuser.model.Sales;
import com.nexchief.nexchiefuser.repository.SalesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service("salesService")
public class SalesServiceImpl implements SalesService {
    @Autowired
    SalesRepository salesRepository;

    @Override
    public Map<String, Object> findAll(int page, int limit, String id, String dateFirst, String dateLast) {
        Map<String, Object> salesList = salesRepository.findAll(page, limit, id, dateFirst, dateLast);
        return salesList;
    }

    @Override
    public Sales findById(String idSales) {
        Sales sales;
        sales = salesRepository.findById(idSales);
        return sales;
    }

    @Override
    public List<Sales> findAllWithOutPaging(String id, String dateFirst, String dateLast) {
        List<Sales> salesList = salesRepository.findAllWithOutPaging(id, dateFirst, dateLast);
        return salesList;
    }

    @Override
    public Map<String, Object> filterByStatus(int page, int limit, String id, String status, String dateFirst, String dateLast) {
        Map<String, Object> salesList= salesRepository.filterByStatus(page, limit, id, status, dateFirst, dateLast);
        return salesList;
    }

    @Override
    public List<Sales> filterByStatusWithOutPaging(String id, String status, String dateFirst, String dateLast) {
        List<Sales> salesList = salesRepository.filterByStatusWithOutPaging(id, status, dateFirst, dateLast);
        return salesList;
    }

    @Override
    public Map<String, Object> filterByProduct(int page, int limit, String id, String nameProduct) {
        Map<String, Object> salesList = salesRepository.filterByNameProduct(page, limit, id, nameProduct);
        return salesList;
    }

    @Override
    public Map<String, Object> filterSearchAndStatus(int page, int limit, String id, String status, String nameProduct) {
        Map<String, Object> salesList = salesRepository.filterSearchAndStatus(page, limit, id, status, nameProduct);
        return salesList;
    }

    @Override
    public List<Sales> filterSearchStatus(String id, String status, String nameProduct) {
        List<Sales> salesList = salesRepository.filterSearchStatus(id, status, nameProduct);
        return salesList;
    }

    @Override
    public List<Sales> filterByProductWoPagination(String id, String nameProduct) {
        List<Sales> salesList= salesRepository.filterByProductWoPagination(id, nameProduct);
        return salesList;
    }

    @Override
    public int countSalesStatus(String id, String status, String dateFirst, String dateLast) {
        return salesRepository.countSalesStatus(id, status, dateFirst, dateLast);
    }

    @Override
    public int countSalesToday(String id, String date) {
        return salesRepository.countSalesToday(id, date);
    }

    @Override
    public int countSalesUnpaidMonth(String id, String dateFirst, String dateLast, String status) {
        return salesRepository.countSalesUnpaidMonth(id, dateFirst, dateLast, status);
    }

    @Override
    public int countSalesMonth(String id, String dateFirst, String dateLast) {
        return salesRepository.countSalesMonth(id, dateFirst, dateLast);
    }


    @Override
    public void saveSales(Sales sales) {
        synchronized (this){
            salesRepository.saveSales(sales);
        }
    }

    @Override
    public void updateSales(Sales sales) {
        synchronized (this){
            salesRepository.updateSales(sales);
        }
    }
}
