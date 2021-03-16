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
    public int countSales(String distributor) {
        return salesRepository.countSales(distributor);
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
