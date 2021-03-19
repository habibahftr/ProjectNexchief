package com.nexchief.nexchiefuser.controller;

import com.nexchief.nexchiefuser.model.Product;
import com.nexchief.nexchiefuser.service.ProductService;
import com.nexchief.nexchiefuser.util.CustomErrorType;
import com.nexchief.nexchiefuser.util.CustomSuccessType;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;
import java.util.UUID;


@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/nexchief")
public class ProductController {
    public static final Logger logger = LoggerFactory.getLogger(ProductController.class);

    @Autowired
    ProductService productService;

    @GetMapping("/products/")
    public ResponseEntity<List<Product>> listAllProducts() {
        List<Product> productList = productService.findAll();
        if (productList.isEmpty()) {
            return new ResponseEntity<>(productList, HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(productList, HttpStatus.OK);
    }

    @GetMapping("/products/{name}")
    public ResponseEntity<?> getListProduct(@PathVariable("name") String name) {
        List<Product> productList = productService.searcProductbyUser(name);
        if (productList == null) {
            return new ResponseEntity<>(productList, HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(productList, HttpStatus.OK);
    }

    @GetMapping("/product/search/")
    public ResponseEntity<?> searchProduct(@RequestParam int page, @RequestParam int limit, @RequestParam String id, @RequestParam String nameProduct) {
        List<Product> productList = productService.findByName(page, limit, id, nameProduct);
        if (productList == null) {
            return new ResponseEntity<>(productList, HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(productList, HttpStatus.OK);
    }

    @GetMapping("/product/filter/")
    public ResponseEntity<?> filterProduct (@RequestParam int page, @RequestParam int limit, @RequestParam String id, @RequestParam String status){
        List<Product> productList = productService.filterProductByStatus(page, limit, id, status);
        if (productList == null) {
            return new ResponseEntity<>(productList, HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(productList, HttpStatus.OK);
    }

    @GetMapping("/product/paging/")
    public ResponseEntity<?>getProductForPagin(@RequestParam int page, @RequestParam int limit ,@RequestParam String id){
        List<Product> productList = productService.findProductForPaging(page,limit, id);
        return new ResponseEntity<>(productList, HttpStatus.OK);
    }



    @GetMapping("/product/{code}")
    public ResponseEntity<?> getProductbyId(@PathVariable("code") String code) {
        Product productFind = productService.findByCode(code);
        if (productFind == null) {
            return new ResponseEntity<>(productFind, HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(productFind, HttpStatus.OK);
    }



    @GetMapping("/product/count/{id}")
    public ResponseEntity<?> countProduct(@PathVariable("id") String id) {
        int productCount = productService.countProduct(id);
        return new ResponseEntity<>(productCount, HttpStatus.OK);
    }

    @GetMapping("/search/count/")
    public ResponseEntity<?> countProductSearch(@RequestParam String updated_by, @RequestParam String nameProduct) {
        int productCount = productService.countProductName(updated_by, nameProduct);
        return new ResponseEntity<>(productCount, HttpStatus.OK);
    }

    @GetMapping("/filter/count/")
    public ResponseEntity<?> countProductStatus(@RequestParam String updated_by, @RequestParam String status) {
        int productCount = productService.countProductStatus(updated_by, status);
        return new ResponseEntity<>(productCount, HttpStatus.OK);
    }


    @PostMapping("/product/")
    public ResponseEntity<?> createProduct(@RequestBody Product product) {
        if (product.getNameProduct().isBlank() || product.getPackaging().isBlank() || product.getCategory().isBlank()) {
            return new ResponseEntity<>(new CustomErrorType("Insert Product name, Packaging, and Category!"),
                    HttpStatus.BAD_REQUEST);
        } else if(product.getLaunch_date()==null){
            return new ResponseEntity<>(new CustomErrorType("Insert market launch date product!"),
                    HttpStatus.BAD_REQUEST);
        }
        else if (productService.isCodeExist(product)) {
            return new ResponseEntity<>(new CustomErrorType("Product with code " + product.getCode() + " already exist"),
                    HttpStatus.CONFLICT);
        } else if (productService.findByNameProduct(product.getUpdated_by(), product.getNameProduct())!= null) {
            return new ResponseEntity<>(new CustomErrorType("Product with name " + product.getNameProduct() + " already exist"),
                    HttpStatus.CONFLICT);
        } else {
            productService.saveProduct(product);
            return new ResponseEntity<>(new CustomSuccessType("New product successfully created"), HttpStatus.CREATED);
        }

    }

    @PutMapping("/updateProduct/{code}")
    public ResponseEntity<?> updateProduct(@PathVariable("code") String code, @RequestBody Product product) {
        Product findProduct = productService.findByCode(code);
        if (findProduct == null) {
            return new ResponseEntity<>(new CustomErrorType("Product with code "+product.getCode()+" not found"),
                    HttpStatus.NOT_FOUND);
        }
        else{
            if (product.getNameProduct().isBlank() || product.getPackaging().isBlank() || product.getCategory().isBlank()) {
                return new ResponseEntity<>(new CustomErrorType("Insert Product name, Packaging, and Category!"),
                        HttpStatus.BAD_REQUEST);
            }
            else if(productService.findByNameProduct(product.getUpdated_by(), product.getNameProduct())!= null){
                return new ResponseEntity<>(new CustomErrorType("Failed update Product with name " +
                        product.getNameProduct()+". Product with name " + product.getNameProduct() + " already exist"),
                            HttpStatus.CONFLICT);
            }
//           else if (productService.isNameSpesificExist(product) && !findProduct.getNameProduct().equalsIgnoreCase(product.getNameProduct())) {
//                  return new ResponseEntity<>(new CustomErrorType("Failed update Product with name " + product.getNameProduct()),
//                            HttpStatus.CONFLICT);
//            }
            else {
                product.setCode(findProduct.getCode());
                productService.update(product);
                return new ResponseEntity<>(new CustomSuccessType("Update success!"), HttpStatus.CREATED);
            }
        }
    }

    @DeleteMapping("/product/{code}")
    public ResponseEntity<?> deleteProductByCode(@PathVariable("code") String code){
        Product productFind = productService.findByCode(code);
        if(productFind == null){
            return new ResponseEntity<>(new CustomErrorType("Unable to delete, Product with code "+ code +" not found"),
                    HttpStatus.NOT_FOUND);
        }else{
            productService.deleteByCode(code);
            return new ResponseEntity<>(new CustomSuccessType("Delete success!"),
                    HttpStatus.NO_CONTENT);
        }
    }






}
