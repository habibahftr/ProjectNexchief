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

//    ---------------------------------------GET ALL SALES (PRINT)--------------------------------------------------
    @GetMapping("/sales/all/{distributor}")
    public ResponseEntity<?> getAllSalesList(@PathVariable("distributor") String distributor,
                                             @RequestParam String dateFirst, @RequestParam String dateLast) {
        List<Sales> salesList = salesService.findAllWithOutPaging(distributor, dateFirst, dateLast);
        if(salesList == null) {
            return new ResponseEntity<>(salesList, HttpStatus.NOT_FOUND);
        }else{
            return new ResponseEntity<>(salesList, HttpStatus.OK);
        }
    }

//    --------------------------------------GET SALES THIS MONTH (W PAGINATION)-----------------------------------------
    @GetMapping("/sales/paging/")
    public ResponseEntity<?> getSalesForPagin(@RequestParam int page, @RequestParam int limit , @RequestParam String id,
                                              @RequestParam String dateFirst, @RequestParam String dateLast){
        List<Sales> salesList = salesService.findAll(page,limit, id, dateFirst, dateLast);
        return new ResponseEntity<>(salesList, HttpStatus.OK);
    }

//    --------------------------------FIND SALES BY ID SALES----------------------------------------------------------
    @GetMapping("/sales/{idSales}")
    public ResponseEntity<?> findSalesById(@PathVariable("idSales") String idSales) {
        Sales sales = salesService.findById(idSales);
        if (sales == null) {
            return new ResponseEntity<>(sales, HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(sales, HttpStatus.OK);
    }

//    ---------------------------------------COUNT SALES BY DISTRIBUTOR-----------------------------------------
    @GetMapping("/sales/count/")
    public ResponseEntity<?> countSales(@RequestParam String distributor, @RequestParam String dateFirst, @RequestParam String dateLast){
        int salesCount = salesService.countSales(distributor, dateFirst, dateLast);
        return new ResponseEntity<>(salesCount, HttpStatus.OK);
    }
    // kontroller gabungan.
    // contoller(@Reqpsrsm Map<String, Object> pams)
    // endpont?nama=?&umur=? ..dst
    // ={
    //      nama: "sdfsdf"
    //      umur : "asdasd"
    //
    // Containkey("key yang dicari")
    // nama map dot get. map.get("key yang ingin diambil nilainya")


//    -----------------------------------------FILTER SALES BY STATUS(PAID/UNPAID)--------------------------------
    @GetMapping("/sales/filter/status/")
    public ResponseEntity<?> filterByStatusPaging (@RequestParam int page, @RequestParam int limit,
                                                   @RequestParam String distributor, @RequestParam String status,
                                                   @RequestParam String dateFirst, @RequestParam String dateLast){
        List<Sales> salesList= salesService.filterByStatus(page, limit, distributor,status, dateFirst, dateLast);
        if(salesList == null) {
            return new ResponseEntity<>(salesList, HttpStatus.NOT_FOUND);
        }else{
            return new ResponseEntity<>(salesList, HttpStatus.OK);
        }
    }

//    -------------------------------------FILTER SALES BY PRODUCT NAME/ CUSTOMER NAME-------------------------------
    @GetMapping("/sales/filter/prod/")
    public ResponseEntity<?> filterByNameproductPaging (@RequestParam int page, @RequestParam int limit,
                                                        @RequestParam String distributor, @RequestParam String nameProduct){
        List<Sales> salesList = salesService.filterByProduct(page, limit, distributor, nameProduct);
        if (salesList == null){
            return new ResponseEntity<>(salesList, HttpStatus.NOT_FOUND);
        }else{
            return new ResponseEntity<>(salesList, HttpStatus.OK);
        }
    }

//    -----------------------------------FILTER SALES BY PRODUCT NAME/ CUSTOMER NAME AND STATUS-----------------------
    @GetMapping("/sales/filter/search/")
    public ResponseEntity<?> filterByNameproductPagingAndSearch (@RequestParam int page, @RequestParam int limit,
                                                                 @RequestParam String distributor,@RequestParam String status,
                                                                 @RequestParam String nameProduct){
        List<Sales> salesList = salesService.filterSearchAndToggle(page, limit, distributor, status, nameProduct);
        if (salesList == null){
            return new ResponseEntity<>(salesList, HttpStatus.NOT_FOUND);
        }else{
            return new ResponseEntity<>(salesList, HttpStatus.OK);
        }
    }


//    ----------------------------------FILTER SALES BY PRODUCT NAME/ CUSTOMER NAME AND STATUS(w/o pagination)-----------
    @GetMapping("/sales/search/filter/print/")
    public ResponseEntity<?> filterByNameproductAndFilterStatus (@RequestParam String distributor,@RequestParam String status,
                                                                 @RequestParam String nameProduct){
        List<Sales> salesList = salesService.filterSearchToggle(distributor, status, nameProduct);
        if (salesList == null){
            return new ResponseEntity<>(salesList, HttpStatus.NOT_FOUND);
        }else{
            return new ResponseEntity<>(salesList, HttpStatus.OK);
        }
    }

//    ---------------------------FILTER SALES BY STATUS (W/O PAGINATION) FOR PRINT-------------------------------------
    @GetMapping("/sales/filter")
    public ResponseEntity<?> filterByStatus (@RequestParam String distributor, @RequestParam String status,
                                             @RequestParam String dateFirst, @RequestParam String dateLast){
        List<Sales> salesList =  salesService.filterByStatusWithOutPaging(distributor, status, dateFirst, dateLast);
        if(salesList==null){
            return new ResponseEntity<>(salesList, HttpStatus.NOT_FOUND);
        }else{
            return new ResponseEntity<>(salesList, HttpStatus.OK);
        }
    }

//    ---------------------FILTER SALES BY PRODUCT NAME/ CUSTOMER NAME (W/O PAGINATION) FOR PRINT----------------------
    @GetMapping("/sales/filter/print/")
    public ResponseEntity<?> filterByProduct (@RequestParam String distributor, @RequestParam String nameproduct){
        List<Sales> salesList = salesService.filterByProductWoPagination(distributor, nameproduct);
        if(salesList == null){
            return new ResponseEntity<>(salesList, HttpStatus.NOT_FOUND);
        }else{
            return new ResponseEntity<>(salesList, HttpStatus.OK);
        }
    }

//    ------------------------COUNT SALES FILTERED BY STATUS--------------------------------------------------------
    @GetMapping("/sales/status/count/")
    public ResponseEntity<?> countSales(@RequestParam String distributor, @RequestParam String status,
                                        @RequestParam String dateFirst, @RequestParam String dateLast) {
        int salesCount= salesService.countSalesStatus(distributor, status, dateFirst, dateLast);
        return new ResponseEntity<>(salesCount, HttpStatus.OK);
    }

//    -----------------------COUNT SALES FILTERED BY PRODUCT NAME/ CUSTOMER NAME----------------------------------------
    @GetMapping("/sales/product/count/")
    public ResponseEntity<?> countProduct (@RequestParam String distributor, @RequestParam String nameProduct){
        int salesProdCount = salesService.countSalesProd(distributor, nameProduct);
        return new ResponseEntity<>(salesProdCount, HttpStatus.OK);
    }

//    ------------------------COUNT SALES TODAY-------------------------------------------------------------------------
    @GetMapping("/sales/today/count/")
    public ResponseEntity<?> countSalesToday (@RequestParam String distributor, @RequestParam String date){
        int salesProdCount = salesService.countSalesToday(distributor, date);
        return new ResponseEntity<>(salesProdCount, HttpStatus.OK);
    }

//    ----------------------------------COUNT SALES THIS MONTH---------------------------------------------------------
    @GetMapping("/sales/month/count/")
    public ResponseEntity<?> countSalesToday (@RequestParam String distributor, @RequestParam String dateFirst, @RequestParam String dateLast){
        int salesProdCount = salesService.countSalesMonth(distributor, dateFirst, dateLast);
        return new ResponseEntity<>(salesProdCount, HttpStatus.OK);
    }

//    -------------------------------------------COUNT SALES UNPAID THIS MONTH------------------------------------
    @GetMapping("/sales/status/month/count/")
    public ResponseEntity<?> countSalesUnpaidMonth (@RequestParam String distributor, @RequestParam String dateFirst, @RequestParam String dateLast, @RequestParam String status){
        int salesProdCount = salesService.countSalesUnpaidMonth(distributor, dateFirst, dateLast, status);
        return new ResponseEntity<>(salesProdCount, HttpStatus.OK);
    }

//    --------------------------------------COUNT SALES FILTERED BY STATUS AND PRODUCT NAME----------------------------
    @GetMapping("/sales/filter/toggle/")
    public ResponseEntity<?> countSalesFilterAndToggle (@RequestParam String distributor, @RequestParam String status,
                                                        @RequestParam String nameProduct){
        int salesProdCount = salesService.countFilterAndToggle(distributor, status, nameProduct);
        return new ResponseEntity<>(salesProdCount, HttpStatus.OK);
    }

//    -----------------------------------------CREATE SALES-----------------------------------------------------------
    @PostMapping("/sales/")
    public ResponseEntity<?> createSales(@RequestBody Sales sales){
        List<Product> productList = sales.getProductList();
        for (int i = 0; i < productList.size(); i++) {
            Product product = productService.findByCode(sales.getProductList().get(i).getCode());
            for (int j = 0; j < productList.size(); j++){
                if (i != j){
                    if (productList.get(j).getCode().equals(product.getCode())){
                        return new ResponseEntity<>(new CustomErrorType("Unable to create . A Product with code " +
                                product.getCode()+"Already exist"), HttpStatus.CONFLICT);
                    }
                }
            }
            if (product.getStock() < sales.getProductList().get(i).getQty()) {
                return new ResponseEntity<>(new CustomErrorType("Unable to create. A product with code" +
                        " " + sales.getProductList().get(i).getCode() + " Over in Qty"), HttpStatus.CONFLICT);
            }
        }
        if(sales.getDateSales()==null||sales.getCustomer().isBlank()||sales.getStatus().isBlank()){
            return new ResponseEntity<>(new CustomErrorType("Insert customer name, date and status!"),
                    HttpStatus.BAD_REQUEST);
        }else{
            salesService.saveSales(sales);
            for (int i = 0; i < productList.size(); i++) {
                Product product = productService.findByCode(sales.getProductList().get(i).getCode());
                for (int j = 0; j < productList.size(); j++){
                    if (i == j){
                        if (productList.get(j).getCode().equals(product.getCode())){
                            if(product.getStock()==0){
                                product.setStatus("INACTIVE");
                                productService.update(product);
                            }
                        }
                    }
                }
            }
            return new ResponseEntity<>(new CustomSuccessType("New Sales succesfully cretaed"), HttpStatus.CREATED);

        }
    }
    //  ------------------------------------------------UPDATE SALES----------------------------------------------------
//    @PutMapping("/update/sales/{idSales}")
//    public ResponseEntity<?> updateSales(@PathVariable ("idSales") String idSales, @RequestBody Sales sales){
//        Sales findSales = salesService.findById(idSales);
//        List<Product> productList = sales.getProductList();
//        for (int i = 0; i < productList.size(); i++) {
//            Product product = productService.findByCode(sales.getProductList().get(i).getCode());
//            for (int j = 0; j < productList.size(); j++) {
//                if (i != j) {
//                    if (productList.get(j).getCode().equals(product.getCode())) {
//                        return new ResponseEntity<>(new CustomErrorType("Unable to create . A Product with code " +
//                                product.getCode() + " already exist"), HttpStatus.CONFLICT);
//                    }
//                }
//            }
//            int qtyFind = productList.get(i).getQty();
//            int qty = product.getStock() + findSales.getProductList().get(i).getQty();
////
////            if (findSales.getProductList().get(i) != (sales.getProductList().get(i))) {
////                if ((product.getStock() + findSales.getProductList().get(i).getQty()) < sales.getProductList().get(i).getQty()) {
////                    return new ResponseEntity<>(new CustomErrorType("Unable to create. A product with code" +
////                            " " + sales.getProductList().get(i).getCode() + " Over in Qty1"), HttpStatus.CONFLICT);
////                }
////            } else {
////                if (product.getStock() < sales.getProductList().get(i).getQty()) {
////                    return new ResponseEntity<>(new CustomErrorType("Unable to create. A product with code" +
////                            " " + sales.getProductList().get(i).getCode() + " Over in Qty2"), HttpStatus.CONFLICT);
////                }
////
////                }
////            }
//        }
//        if(findSales== null){
//            return new ResponseEntity<>(new CustomErrorType("Sales with id "+sales.getIdSales()+" not found"),
//                    HttpStatus.NOT_FOUND);
//        }else{
//            if(sales.getProductList().isEmpty()){
//                return new ResponseEntity<>(new CustomErrorType("Insert Product!"),
//                        HttpStatus.BAD_REQUEST);
//            }else{
//                sales.setIdSales(findSales.getIdSales());
//                salesService.updateSales(sales);
//                for (int i = 0; i < productList.size(); i++) {
//                    Product product = productService.findByCode(sales.getProductList().get(i).getCode());
//                    for (int j = 0; j < productList.size(); j++){
//                        if (i == j){
//                            if (productList.get(j).getCode().equals(product.getCode())){
//                                if(product.getStock()<=0){
//                                    product.setStatus("INACTIVE");
//                                    productService.update(product);
//                                }
//                            }
//                        }
//                    }
//                }
//                return new ResponseEntity<>(new CustomSuccessType("Update success!"), HttpStatus.CREATED);
//            }
//        }
//
//    }
//}


    @PutMapping("/update/sales/{idSales}")
    public ResponseEntity<?> updateSales(@PathVariable ("idSales") String idSales, @RequestBody Sales sales){
        Sales findSales = salesService.findById(idSales);
        List<Product> productList = sales.getProductList();
        for (int i = 0; i < productList.size(); i++) {
            Product product = productService.findByCode(sales.getProductList().get(i).getCode());
            for (int j = 0; j < productList.size(); j++){
                if (i != j){
                    if (productList.get(j).getCode().equals(product.getCode())){
                        return new ResponseEntity<>(new CustomErrorType("Unable to create . A Product with code " +
                                product.getCode()+"Already exist"), HttpStatus.CONFLICT);
                    }
                }
            }

//            for(int k=0; k < findSales.getProductList().size(); k++) {
//                if (sales.getProductList().get(i).getCode().equalsIgnoreCase(findSales.getProductList().get(k).getCode())) {
//                    if ((product.getStock() + findSales.getProductList().get(i).getQty()) < sales.getProductList().get(k).getQty()) {
//                        return new ResponseEntity<>(new CustomErrorType("Unable to create. A product with code" +
//                                " " + sales.getProductList().get(i).getCode() + " Over in Qty1"), HttpStatus.CONFLICT);
//                    }
//                    break;
//                } else {
//                    if (product.getStock() < sales.getProductList().get(i).getQty()  ) {
//                        return new ResponseEntity<>(new CustomErrorType("Unable to create. A product with code" +
//                                " " + sales.getProductList().get(i).getCode() + " Over in Qty2"), HttpStatus.CONFLICT);
//                    }
//                    break;
//                }
//
//            }

        }
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
                for (int i = 0; i < productList.size(); i++) {
                    Product product = productService.findByCode(sales.getProductList().get(i).getCode());
                    for (int j = 0; j < productList.size(); j++){
                        if (i == j){
                            if (productList.get(j).getCode().equals(product.getCode())){
                                if(product.getStock()==0){
                                    product.setStatus("INACTIVE");
                                    productService.update(product);
                                }
                            }
                        }
                    }
                }
                return new ResponseEntity<>(new CustomSuccessType("Update success!"), HttpStatus.CREATED);
            }
        }

    }
}
