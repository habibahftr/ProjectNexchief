package com.nexchief.nexchiefuser.model;

import java.util.Date;
import java.util.List;

public class Sales {
    private  String idSales;
    private Date dateSales;
    private String distributor;
    private String customer;
    private double discount;
    private String status;
    List<Product> productList;
    private double gross;
    private double tax;
    private double invoice;
//    List<Integer> qty;
//    private int qty;

    public Sales() {
    }

    public Sales(String idSales, Date dateSales, String distributor, String customer, float discount, String status) {
        this.idSales = idSales;
        this.dateSales = dateSales;
        this.distributor = distributor;
        this.customer = customer;
        this.discount = discount;
        this.status = status;
    }

    public String getIdSales() {
        return idSales;
    }

    public Sales(String idSales, Date dateSales, String distributor, String customer, float discount, String status, List<Product> productList) {
        this.idSales = idSales;
        this.dateSales = dateSales;
        this.distributor = distributor;
        this.customer = customer;
        this.discount = discount;
        this.status = status;
        this.productList = productList;
    }

    public Sales(String idSales, Date dateSales, String distributor, String customer, double discount, String status, List<Product> productList, double gross, double tax, double invoice) {
        this.idSales = idSales;
        this.dateSales = dateSales;
        this.distributor = distributor;
        this.customer = customer;
        this.discount = discount;
        this.status = status;
        this.productList = productList;
        this.gross = gross;
        this.tax = tax;
        this.invoice = invoice;
//        this.qty = qty;
    }

    public void setIdSales(String idSales) {
        this.idSales = idSales;
    }

    public Date getDateSales() {
        return dateSales;
    }

    public void setDateSales(Date dateSales) {
        this.dateSales = dateSales;
    }

    public String getDistributor() {
        return distributor;
    }

    public void setDistributor(String distributor) {
        this.distributor = distributor;
    }

    public String getCustomer() {
        return customer;
    }

    public void setCustomer(String customer) {
        this.customer = customer;
    }

    public double getDiscount() {
        return discount;
    }

    public void setDiscount(double discount) {
        this.discount = discount;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public List<Product> getProductList() {
        return productList;
    }

    public void setProductList(List<Product> productList) {
        this.productList = productList;
    }

    public double getGross() {
        return gross;
    }

    public void setGross() {
        double gross = 0;
        for (int i=0; i<productList.size(); i++){
            gross+= (productList.get(i).getPrice()*productList.get(i).getQty());
        }
        this.gross = gross;
    }

    public double getTax() {
        return tax;
    }

    public void setTax() {
        double tax = 0;
        tax=((getGross()-getDiscount())*0.1);
        this.tax = tax;
    }

    public double getInvoice() {
        return invoice;
    }

    public void setInvoice() {
        double invoice =0;
        invoice =(getGross()-getDiscount()+getTax());
        this.invoice = invoice;
    }

}
