package com.nexchief.nexchiefuser.repository;

import com.nexchief.nexchiefuser.model.Product;
import com.nexchief.nexchiefuser.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
                    "u.name FROM product p, user u WHERE u.id = p.updated_by AND p.updated_by=?",
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
    public List<Product>  filterPrint(String id, String status) {
        List<Product> productList;
        try{
            productList = this.jdbcTemplate.query("SELECT p.*,u.name " +
                            "FROM product p, user u WHERE u.id = p.updated_by AND p.updated_by=? AND p.status=?",
                    preparedStatement ->  {
                        preparedStatement.setString(1, id);
                        preparedStatement.setString(2, status);
                    },
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
                                    rs.getString("created_by"),
                                    rs.getDate("updated_at"),
                                    rs.getString("updated_by")
                            )
            );
        }catch (Exception e){
            System.out.println(e);
            productList=null;
        }
        return productList;
    }

    @Override
    public Map<String,Object> findProductForPaging(int page, int limit, String id) {
        int numPages;
        Map<String ,Object> map = new HashMap<>();
        numPages = jdbcTemplate.query("SELECT COUNT(*) as count FROM product WHERE updated_by = '"+id+"'",
                (rs, rowNum) -> rs.getInt("count")).get(0);
        map.put("count",numPages);
        if(numPages >0){
            if (page > numPages) page = numPages;
        }
        if (page < 1) page = 1;
        int start = (page - 1) * limit;
        map.put("productList" , jdbcTemplate.query("SELECT p.code, p.nameProduct, p.packaging, p.product_desc," +
                        "p.category, p.launch_date, p.status, p.price, p.stock, p.created_at,u.name, p.updated_at, " +
                        "u.name FROM product p, user u WHERE u.id = p.updated_by AND p.updated_by=? ORDER BY p.nameProduct LIMIT " + start + "," + limit + ";",
                preparedStatement -> preparedStatement.setString(1, id),
                (rs, rowNum) ->
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
        ));
        return map;
    }

    @Override
    public Map<String, Object> findByName(int page, int limit, String id, String nameProduct) {
        int numPages;
        Map<String ,Object> map = new HashMap<>();
        numPages = jdbcTemplate.query("SELECT COUNT(*) as count FROM product WHERE updated_by='"+id+"' AND nameProduct LIKE '%"+nameProduct+"%'",
                (rs, rowNum) -> rs.getInt("count")).get(0);
        map.put("count",numPages);
        if(numPages >0){
            if (page > numPages)
                page = numPages;
        }
        if (page < 1) page = 1;
        int start = (page - 1) * limit;
        List<Product> productList;
        try{
            map.put("productList" ,this.jdbcTemplate.query("SELECT p.code, p.nameProduct, p.packaging, p.product_desc, " +
                            "p.category, p.launch_date, p.status, p.price, p.stock, p.created_at,u.name, p.updated_at, " +
                            "u.name FROM product p, user u WHERE u.id = p.updated_by AND p.updated_by=? AND p.nameProduct like ? LIMIT " + start + "," + limit + ";",
                    preparedStatement -> {
                        preparedStatement.setString(1, id);
                        preparedStatement.setString(2, "%"+nameProduct+"%");
                    },

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
            ));
        }catch (Exception e){
            System.out.println(e);
            productList=null;
        }
        return map;
    }

    @Override
    public Map<String, Object> filterByStatus(int page, int limit, String id, String status) {
        int numPages;
        Map<String ,Object> map = new HashMap<>();
        numPages = jdbcTemplate.query("SELECT COUNT(*) as count FROM product WHERE updated_by='"+id+"' AND status='"+status+"'",
                (rs, rowNum) -> rs.getInt("count")).get(0);

        if(numPages >0){
            if (page > numPages)
                page = numPages;
        }
        map.put("count", numPages);
        if (page < 1) page = 1;
        int start = (page - 1) * limit;
        List<Product> productList;
        try{
            map.put("productList", this.jdbcTemplate.query("SELECT p.*,u.name FROM product p, user u " +
                            "WHERE u.id = p.updated_by AND p.updated_by=? AND p.status=? LIMIT " + start + "," + limit + ";",
                    preparedStatement -> {
                        preparedStatement.setString(1, id);
                        preparedStatement.setString(2, status);
                    },

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
            ));
        }catch (Exception e){
            System.out.println(e);
            productList=null;
        }
        return map;
    }


    @Override
    public Product findyByCode(String code) {
        Product product;
        try{
            product=jdbcTemplate.query(
                    "SELECT p.code, p.nameProduct, p.packaging, p.product_desc, p.category, p.launch_date, " +
                            "p.status, p.price, p.stock, p.created_at,u.name, p.updated_at, u.name FROM product p, " +
                            "user u WHERE u.id = p.updated_by AND p.code=?",
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
                                    rs.getString("name"),
                                    rs.getDate("updated_at"),
                                    rs.getString("name")
                            )
            ).get(0);
        }catch (IndexOutOfBoundsException e){
            System.out.println(e);
            product= null;
        }
        return product;
    }


    @Override
    public Product findByNameProduct(String id, String nameProduct) {
        Product product;
        try{
            product=jdbcTemplate.query(
                    "SELECT p.code, p.nameProduct, p.packaging, p.product_desc, p.category, p.launch_date, " +
                            "p.status, p.price, p.stock, p.created_at,u.name, p.updated_at, u.name FROM product p, " +
                            "user u WHERE u.id = p.updated_by AND p.updated_by=? AND p.nameProduct=?",
                    preparedStatement -> {
                        preparedStatement.setString(1, id);
                        preparedStatement.setString(2, nameProduct);
                    },
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
                                    rs.getString("name"),
                                    rs.getDate("updated_at"),
                                    rs.getString("name")
                            )
            ).get(0);
        }catch (IndexOutOfBoundsException e){
            System.out.println(e);
            product= null;
        }
        return product;

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
                        "price=?, stock=?, updated_at=? WHERE code=?",
                product.getNameProduct(), product.getPackaging(), product.getProduct_desc(), product.getCategory(),
                product.getLaunch_date(), product.getStatus(), product.getPrice(), product.getStock(),
                product.getUpdated_at(), product.getCode()
        );
    }

    @Override
    public int deleteByCode(String code) {
        return jdbcTemplate.update(
                "UPDATE product SET status='INACTIVE' WHERE code=?", code
        );
    }

}
