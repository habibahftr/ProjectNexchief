package com.nexchief.nexchiefuser.model;

import java.util.Date;

public class Product {
    private String code;
    private String nameProduct;
    private String packaging;
    private String product_desc;
    private String category;
    private Date launch_date;
    private String status;
    private int price;
    private int stock;
    private Date created_at;
    private String created_by;
    private Date updated_at;
    private String updated_by;

    public Product() {
    }

    public Product(String code, String nameProduct, String packaging, String product_desc, String category,
                   Date launch_date, String status, int price, int stock, Date created_at, String created_by,
                   Date updated_at, String updated_by) {
        this.code = code;
        this.nameProduct = nameProduct;
        this.packaging = packaging;
        this.product_desc = product_desc;
        this.category = category;
        this.launch_date = launch_date;
        this.status = status;
        this.price = price;
        this.stock = stock;
        this.created_at = created_at;
        this.created_by = created_by;
        this.updated_at = updated_at;
        this.updated_by = updated_by;
    }

    public void setNameProduct(String nameProduct) {
        this.nameProduct = nameProduct;
    }

    public String getCreated_by() {
        return created_by;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getNameProduct() {
        return nameProduct;
    }


    public String getPackaging() {
        return packaging;
    }

    public void setPackaging(String packaging) {
        this.packaging = packaging;
    }

    public String getProduct_desc() {
        return product_desc;
    }

    public void setProduct_desc(String product_desc) {
        this.product_desc = product_desc;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public Date getLaunch_date() {
        return launch_date;
    }

    public void setLaunch_date(Date launch_date) {
        this.launch_date = launch_date;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
    }

    public int getStock() {
        return stock;
    }

    public void setStock(int stock) {
        this.stock = stock;
    }

    public Date getCreated_at() {
        return created_at;
    }

    public void setCreated_at(Date created_at) {
        this.created_at = created_at;
    }

    public void setCreated_by(String created_by) {
        this.created_by = created_by;
    }

    public Date getUpdated_at() {
        return updated_at;
    }

    public void setUpdated_at(Date updated_at) {
        this.updated_at = updated_at;
    }

    public String getUpdated_by() {
        return updated_by;
    }

    public void setUpdated_by(String updated_by) {
        this.updated_by = updated_by;
    }

    @Override
    public String toString() {
        return "Product{" +
                "code='" + code + '\'' +
                ", name='" + nameProduct + '\'' +
                ", packaging='" + packaging + '\'' +
                ", product_desc='" + product_desc + '\'' +
                ", category='" + category + '\'' +
                ", launch_date=" + launch_date +
                ", status='" + status + '\'' +
                ", price=" + price +
                ", stock=" + stock +
                ", created_at=" + created_at +
                ", created_by='" + created_by + '\'' +
                ", updated_at=" + updated_at +
                ", updated_by='" + updated_by + '\'' +
                '}';
    }
}
