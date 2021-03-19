package com.nexchief.nexchiefuser.controller;


import com.nexchief.nexchiefuser.model.Product;
import com.nexchief.nexchiefuser.model.Sales;
import com.nexchief.nexchiefuser.service.ProductService;
import com.nexchief.nexchiefuser.service.SalesService;
import com.nexchief.nexchiefuser.util.CustomErrorType;
import com.nexchief.nexchiefuser.util.CustomSuccessType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/nexchief")
public class SalesController {

    @Autowired
    SalesService salesService;

    @Autowired
    ProductService productService;

    @GetMapping("/sales/{distributor}/")
    public ResponseEntity<?> getAllSalesList(@PathVariable("distributor") String distributor) {
        List<Sales> salesList = salesService.findAllWithOutPaging(distributor);
        if(salesList == null) {
            return new ResponseEntity<>(salesList, HttpStatus.NOT_FOUND);
        }else{
            return new ResponseEntity<>(salesList, HttpStatus.OK);
        }
    }

    @GetMapping("/sales/paging/")
    public ResponseEntity<?> getSalesForPagin(@RequestParam int page, @RequestParam int limit , @RequestParam String id){
        List<Sales> salesList = salesService.findAll(page,limit, id);
        return new ResponseEntity<>(salesList, HttpStatus.OK);
    }

    @GetMapping("/sales/{idSales}")
    public ResponseEntity<?> findSalesById(@PathVariable("idSales") String idSales) {
        Sales sales = salesService.findById(idSales);
        if (sales == null) {
            return new ResponseEntity<>(sales, HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(sales, HttpStatus.OK);
    }

    @GetMapping("/sales/count/")
    public ResponseEntity<?> countSales(@RequestParam String distributor){
        int salesCount = salesService.countSales(distributor);
        return new ResponseEntity<>(salesCount, HttpStatus.OK);
    }

    @GetMapping("/sales/filter/status/")
    public ResponseEntity<?> filterByStatusPaging (@RequestParam int page, @RequestParam int limit, @RequestParam String distributor, @RequestParam String status){
        List<Sales> salesList= salesService.filterByStatus(page, limit, distributor,status);
        if(salesList == null) {
            return new ResponseEntity<>(salesList, HttpStatus.NOT_FOUND);
        }else{
            return new ResponseEntity<>(salesList, HttpStatus.OK);
        }
    }

    @GetMapping("/sales/filter/prod/")
    public ResponseEntity<?> filterByNameproductPaging (@RequestParam int page, @RequestParam int limit, @RequestParam String distributor, @RequestParam String nameProduct){
        List<Sales> salesList = salesService.filterByProduct(page, limit, distributor, nameProduct);
        if (salesList == null){
            return new ResponseEntity<>(salesList, HttpStatus.NOT_FOUND);
        }else{
            return new ResponseEntity<>(salesList, HttpStatus.OK);
        }
    }

    @GetMapping("/sales/filter")
    public ResponseEntity<?> filterByStatus (@RequestParam String distributor, @RequestParam String status){
        List<Sales> salesList =  salesService.filterByStatusWithOutPaging(distributor, status);
        if(salesList==null){
            return new ResponseEntity<>(salesList, HttpStatus.NOT_FOUND);
        }else{
            return new ResponseEntity<>(salesList, HttpStatus.OK);
        }
    }

    @GetMapping("/sales/status/count/")
    public ResponseEntity<?> countSales(@RequestParam String distributor, @RequestParam String status) {
        int salesCount= salesService.countSalesStatus(distributor, status);
        return new ResponseEntity<>(salesCount, HttpStatus.OK);
    }

    @GetMapping("/sales/product/count/")
    public ResponseEntity<?> countProduct (@RequestParam String distributor, @RequestParam String nameProduct){
        int salesProdCount = salesService.countSalesProd(distributor, nameProduct);
        return new ResponseEntity<>(salesProdCount, HttpStatus.OK);
    }

    @PostMapping("/sales/")
    public ResponseEntity<?> createSales(@RequestBody Sales sales){
        if(sales.getDateSales()==null||sales.getCustomer().isBlank()||sales.getStatus().isBlank()){
            return new ResponseEntity<>(new CustomErrorType("Insert customer name, date and status!"),
                    HttpStatus.BAD_REQUEST);
        }else{
            salesService.saveSales(sales);
            return new ResponseEntity<>(new CustomSuccessType("New Sales succesfully cretaed"), HttpStatus.CREATED);
        }
    }

    @PutMapping("/update/sales/{idSales}")
    public ResponseEntity<?> updateSales(@PathVariable ("idSales") String idSales, @RequestBody Sales sales){
        Sales findSales = salesService.findById(idSales);
        if(findSales== null){
            return new ResponseEntity<>(new CustomErrorType("Sales with id "+sales.getIdSales()+" not found"),
                    HttpStatus.NOT_FOUND);
        }else{
            if(sales.getProductList().isEmpty()){
                return new ResponseEntity<>(new CustomErrorType("Insert Product!"),
                        HttpStatus.BAD_REQUEST);
            }else{
                sales.setIdSales(findSales.getIdSales());
                salesService.updateSales(sales);
                return new ResponseEntity<>(new CustomSuccessType("Update success!"), HttpStatus.CREATED);
            }
        }

    }
}
