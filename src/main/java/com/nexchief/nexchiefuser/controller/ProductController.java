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
    public ResponseEntity<List<Product>> listAllProducts(){
        List<Product> productList = productService.findAll();
        if(productList.isEmpty()){
            return new ResponseEntity<>(productList, HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(productList, HttpStatus.OK);
    }

    @GetMapping("products/{name}")
    public ResponseEntity<?> getListProduct (@PathVariable("name") String name){
        List<Product> productList = productService.searcProductbyUser(name);
        if(productList == null){
            return new ResponseEntity<>(productList, HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(productList, HttpStatus.OK);
    }

    @GetMapping("product/{code}")
    public ResponseEntity<?> getProductbyId (@PathVariable("code") String code){
        Product productFind = productService.findByCode(code);
        if (productFind == null){
            return new ResponseEntity<>(productFind, HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(productFind, HttpStatus.OK);
    }



    @PostMapping("/product")
    public ResponseEntity<?> createProduct (@RequestBody Product product){
        if(product.getNameProduct().isBlank() || product.getPackaging().isBlank()|| product.getCategory().isBlank()){
            return new ResponseEntity<>(new CustomErrorType("Insert Product name, Packaging, and Category!"),
                    HttpStatus.BAD_REQUEST);
        }
        else if(productService.isCodeExist(product)){
            return new ResponseEntity<>(new CustomErrorType("Product with code "+product.getCode()+" already exist"),
                    HttpStatus.CONFLICT);
        }
        else{
            productService.saveProduct(product);
            return new ResponseEntity<>(new CustomSuccessType("New product successfully created"), HttpStatus.CREATED);
        }
    }

//    @PutMapping("/updateProduct/{code}")
//    public  ResponseEntity<?> updateProduct (@PathVariable("code") String code, @RequestBody Product product){
//
//    }


}
