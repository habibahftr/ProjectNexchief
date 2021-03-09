package com.nexchief.nexchiefuser.repository;

import com.nexchief.nexchiefuser.model.Product;
import com.nexchief.nexchiefuser.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository("ProductRepository")
public class ProductRepositoryImpl implements ProductRepository{
    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public List<Product> findAll() {
        return jdbcTemplate.query("SELECT p.code, p.nameProduct, p.packaging, p.product_desc, p.category, " +
                        "p.launch_date, p.status, p.price, p.stock, p.created_at,u.name, p.updated_at, u.name FROM product p, " +
                        "user u WHERE u.id = p.updated_by",
                (rs,rowNum)->
                new Product(
                        rs.getString("code"),
                        rs.getString("nameProduct"),
                        rs.getString("packaging"),
                        rs.getString("product_desc"),
                        rs.getString("category"),
                        rs.getDate("launch_date"),
                        rs.getString("status"),
                        rs.getInt("price"),
                        rs.getInt("stock"),
                        rs.getDate("created_at"),
                        rs.getString("name"),
                        rs.getDate("updated_at"),
                        rs.getString("name")
                )
                );
    }

    @Override
    public List<Product> searcProductbyUser(String name) {
        List<Product> productList;
        try{
            productList = this.jdbcTemplate.query("SELECT p.code, p.nameProduct, p.packaging, p.product_desc, " +
                    "p.category, p.launch_date, p.status, p.price, p.stock, p.created_at,u.name, p.updated_at, " +
                    "u.name FROM product p, user u WHERE u.id = p.updated_by AND p.created_by=?",
                    preparedStatement -> preparedStatement.setString(1, name),
                    (rs,rowNum)->
                            new Product(
                                rs.getString("code"),
                                rs.getString("nameProduct"),
                                rs.getString("packaging"),
                                rs.getString("product_desc"),
                                rs.getString("category"),
                                rs.getDate("launch_date"),
                                rs.getString("status"),
                                rs.getInt("price"),
                                rs.getInt("stock"),
                                rs.getDate("created_at"),
                                rs.getString("name"),
                                rs.getDate("updated_at"),
                                rs.getString("name")
                            )
            );
        }catch (Exception e){
            System.out.println(e);
            productList=null;
        }
        return productList;
    }

    @Override
    public Product findyByCode(String code) {
        Product product;
        try{
            product=jdbcTemplate.query(
                    "SELECT * FROM product WHERE code=?",
                    preparedStatement -> preparedStatement.setString(1, code),
                    (rs, rowNum)->
                            new Product(
                                    rs.getString("code"),
                                    rs.getString("nameProduct"),
                                    rs.getString("packaging"),
                                    rs.getString("product_desc"),
                                    rs.getString("category"),
                                    rs.getDate("launch_date"),
                                    rs.getString("status"),
                                    rs.getInt("price"),
                                    rs.getInt("stock"),
                                    rs.getDate("created_at"),
                                    rs.getString("created_by"),
                                    rs.getDate("updated_at"),
                                    rs.getString("updated_by")
                            )
            ).get(0);
        }catch (IndexOutOfBoundsException e){
            System.out.println(e);
            product= null;
        }
        return product;
    }

    @Override
    public Product findByName(String name) {
        return null;
    }

    @Override
    public int saveProduct(Product product) {
        return jdbcTemplate.update(
                "INSERT INTO product (code, nameProduct, packaging, product_desc, category, launch_date, status, " +
                        "price, stock, created_at, created_by, updated_at, updated_by) values (?,?,?,?,?,?,?,?,?,?,?,?,?)",
                product.getCode(), product.getNameProduct(), product.getPackaging(), product.getProduct_desc(),
                product.getCategory(), product.getLaunch_date(), product.getStatus(), product.getPrice(), product.getStock(),
                product.getCreated_at(), product.getCreated_by(), product.getUpdated_at(), product.getUpdated_by()
        );
    }

    @Override
    public int updateProduct(Product product) {
        return jdbcTemplate.update(
                "UPDATE product SET nameProduct=?, packaging=?, product_desc=?, category=?, launch_date=?, status=?, " +
                        "price=?, stock=?, created_at=? WHERE code=?",
                product.getNameProduct(), product.getPackaging(), product.getProduct_desc(), product.getCategory(),
                product.getLaunch_date(), product.getStatus(), product.getPrice(), product.getStock(),
                product.getCreated_at(), product.getCode()
        );
    }

    @Override
    public int deleteById(String id) {
        return 0;
    }
}
