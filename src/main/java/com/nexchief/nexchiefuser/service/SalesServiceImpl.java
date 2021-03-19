package com.nexchief.nexchiefuser.service;

import com.nexchief.nexchiefuser.model.Sales;
import com.nexchief.nexchiefuser.repository.SalesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("salesService")
public class SalesServiceImpl implements SalesService {
    @Autowired
    SalesRepository salesRepository;

    @Override
    public List<Sales> findAll(int page, int limit, String id) {
        List<Sales> salesList = salesRepository.findAll(page, limit, id);
        return salesList;
    }

    @Override
    public Sales findById(String idSales) {
        Sales sales;
        sales = salesRepository.findById(idSales);
        return sales;
    }

    @Override
    public List<Sales> findAllWithOutPaging(String id) {
        List<Sales> salesList = salesRepository.findAllWithOutPaging(id);
        return salesList;
    }

    @Override
    public List<Sales> filterByStatus(int page, int limit, String id, String status) {
        List<Sales> salesList= salesRepository.filterByStatus(page, limit, id, status);
        return salesList;
    }

    @Override
    public List<Sales> filterByStatusWithOutPaging(String id, String status) {
        List<Sales> salesList = salesRepository.filterByStatusWithOutPaging(id, status);
        return salesList;
    }

    @Override
    public List<Sales> filterByProduct(int page, int limit, String id, String nameProduct) {
        List<Sales> salesList = salesRepository.filterByNameProduct(page, limit, id, nameProduct);
        return salesList;
    }

    @Override
    public int countSalesStatus(String id, String status) {
        return salesRepository.countSalesStatus(id, status);
    }

    @Override
    public int countSales(String distributor) {
        return salesRepository.countSales(distributor);
    }

    @Override
    public int countSalesProd(String id, String nameproduct) {
        return salesRepository.countSalesProduct(id, nameproduct);
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
