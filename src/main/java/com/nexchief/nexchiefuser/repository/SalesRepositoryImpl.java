package com.nexchief.nexchiefuser.repository;

import com.nexchief.nexchiefuser.model.Product;
import com.nexchief.nexchiefuser.model.Sales;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Repository("salesRepository")
public class SalesRepositoryImpl implements SalesRepository{

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public Map<String, Object> findAll(int page, int limit, String id, String dateFirst, String dateLast) {
        int numPages;
        Map<String ,Object> map = new HashMap<>();
        numPages = jdbcTemplate.query("SELECT COUNT(*) as count FROM sales WHERE distributor='"+id+"' AND date " +
                        "BETWEEN '"+dateFirst+"' AND '"+dateLast+"'",
                (rs, rowNum) -> rs.getInt("count")).get(0);
        map.put("count",numPages);
        if(numPages >0){
            if (page > numPages)
                page = numPages;
        }
        if (page < 1) page = 1;
        int start = (page - 1) * limit;

        List<Sales> salesList;
        salesList = jdbcTemplate.query("SELECT s.*, u.name FROM sales s, user u WHERE u.id=s.distributor AND" +
                        " s.distributor='"+id+"' AND s.date BETWEEN '"+dateFirst+"' AND '"+dateLast+"' ORDER  BY s.date DESC LIMIT " + start + "," + limit + " ;",
                (rs, rowNum) ->
                        new Sales(
                                rs.getString("idSales"),
                                rs.getDate("date"),
                                rs.getString("name"),
                                rs.getString("customer"),
                                rs.getDouble("discount"),
                                rs.getString("status"),
                                null,
                                0,
                                0,
                                0
                        ));
        for (Sales sales:salesList){
            sales.setProductList(jdbcTemplate.query("SELECT p.*, sd.qty, p.price*sd.qty as totalPrice FROM salesdetail sd," +
                            " product p WHERE sd.codeProduct=p.code AND sd.idSales=?",
                    preparedStatement -> preparedStatement.setString(1,sales.getIdSales()),
                    (rs,rowNum)->
                        new Product(
                                rs.getString("code"),
                                rs.getString("nameProduct"),
                                rs.getInt("price"),
                                rs.getInt("stock"),
                                rs.getString("status"),
                                rs.getInt("qty"),
                                rs.getInt("totalPrice")

                        )));
            sales.setGross();
            sales.setTax();
            sales.setInvoice();
        }
        map.put("salesList", salesList);
        return map;
    }

    @Override
    public Map<String, Object> filterSearchAndStatus(int page, int limit, String id, String status, String nameProduct) {
        int numPages;
        Map<String ,Object> map = new HashMap<>();
        numPages = jdbcTemplate.queryForObject("SELECT COUNT(*) FROM sales WHERE idSales IN "+
        "(SELECT sd.idSales FROM salesdetail sd "+
        "JOIN product p ON sd.codeProduct=p.code "+
        "JOIN sales sl ON sd.idSales=sl.idSales "+
        "WHERE sl.distributor = '"+id+"' AND "+
        "p.nameProduct LIKE '%"+nameProduct+"%' OR sl.customer LIKE '%"+nameProduct+"%') AND status ='"+status+"'", Integer.class);

        map.put("count",numPages);
        if(numPages >0){
            if (page >= numPages)
                page = numPages;
        }
        if (page < 1) page = 1;
        int start = (page - 1) * limit;

        List<Sales> salesList;
        salesList = jdbcTemplate.query("SELECT * FROM sales WHERE idSales IN " +
                        "(SELECT sd.idSales FROM salesdetail sd "+
                        "JOIN product p ON sd.codeProduct=p.code " +
                        "JOIN sales sl ON sd.idSales=sl.idSales " +
                        "WHERE sl.distributor = ? AND " +
                        "p.nameProduct LIKE ? OR sl.customer LIKE ?) AND status = ? ORDER  BY date DESC LIMIT " + start + "," + limit + " ;",
                preparedStatement -> {
                    preparedStatement.setString(1, id);
                    preparedStatement.setString(2, "%"+nameProduct+"%");
                    preparedStatement.setString(3, "%"+nameProduct+"%");
                    preparedStatement.setString(4, status);
                },

                (rs, rowNum) ->
                        new Sales(
                                rs.getString("idSales"),
                                rs.getDate("date"),
                                rs.getString("distributor"),
                                rs.getString("customer"),
                                rs.getDouble("discount"),
                                rs.getString("status"),
                                null,
                                0,
                                0,
                                0
//                                0
                        ));
        for (Sales sales:salesList){
            sales.setProductList(jdbcTemplate.query("SELECT p.*, sd.qty, p.price*sd.qty as totalPrice FROM salesdetail sd," +
                            " product p WHERE sd.codeProduct=p.code AND sd.idSales=?",
                    preparedStatement -> preparedStatement.setString(1,sales.getIdSales()),
                    (rs,rowNum)->
                            new Product(
                                    rs.getString("code"),
                                    rs.getString("nameProduct"),
                                    rs.getInt("price"),
                                    rs.getInt("stock"),
                                    rs.getString("status"),
                                    rs.getInt("qty"),
                                    rs.getInt("totalPrice")

                            )));
            sales.setGross();
            sales.setTax();
            sales.setInvoice();
        }
        map.put("salesList", salesList);
        return map;
    }

    @Override
    public Map<String, Object> filterByStatus(int page, int limit, String id, String status, String dateFirst, String dateLast) {
        int numPages;
        Map<String ,Object> map = new HashMap<>();
        numPages = jdbcTemplate.query("SELECT COUNT(*) as count FROM sales WHERE distributor='"+id+"' " +
                        "AND status= '"+status+"' AND date BETWEEN '"+dateFirst+"' AND '"+dateLast+"'",
                (rs, rowNum) -> rs.getInt("count")).get(0);
        map.put("count", numPages);
        if(numPages >0){
            if (page > numPages)
                page = numPages;
        }
        if (page < 1) page = 1;
        int start = (page - 1) * limit;

        List<Sales> salesList;
        salesList = jdbcTemplate.query("SELECT s.*, u.name FROM sales s, user u WHERE u.id=s.distributor AND " +
                        "s.distributor=? AND s.status=? AND s.date BETWEEN ? AND ? ORDER  BY s.date ASC LIMIT " + start + "," + limit + " ;",
                preparedStatement -> {
                    preparedStatement.setString(1, id);
                    preparedStatement.setString(2, status);
                    preparedStatement.setString(3, dateFirst);
                    preparedStatement.setString(4, dateLast);
                },

                (rs, rowNum) ->
                        new Sales(
                                rs.getString("idSales"),
                                rs.getDate("date"),
                                rs.getString("name"),
                                rs.getString("customer"),
                                rs.getDouble("discount"),
                                rs.getString("status"),
                                null,
                                0,
                                0,
                                0
//                                0
                        ));
        for (Sales sales:salesList){
            sales.setProductList(jdbcTemplate.query("SELECT p.*, sd.qty, p.price*sd.qty as totalPrice FROM salesdetail sd," +
                            " product p WHERE sd.codeProduct=p.code AND sd.idSales=?",
                    preparedStatement -> preparedStatement.setString(1,sales.getIdSales()),
                    (rs,rowNum)->
                            new Product(
                                    rs.getString("code"),
                                    rs.getString("nameProduct"),
                                    rs.getInt("price"),
                                    rs.getInt("stock"),
                                    rs.getString("status"),
                                    rs.getInt("qty"),
                                    rs.getInt("totalPrice")

                            )));
            sales.setGross();
            sales.setTax();
            sales.setInvoice();
        }
        map.put("salesList", salesList);
        return map;
    }

    @Override
    public List<Sales> filterByStatusWithOutPaging(String id, String status, String dateFirst, String dateLast) {
        List<Sales> salesList;
        salesList = jdbcTemplate.query("SELECT s.*, u.name FROM sales s, user u WHERE u.id=s.distributor AND s.distributor=? " +
                        "AND s.status=? AND s.date BETWEEN ? AND ? ORDER  BY s.date ASC",
                preparedStatement -> {
                    preparedStatement.setString(1, id);
                    preparedStatement.setString(2, status);
                    preparedStatement.setString(3, dateFirst);
                    preparedStatement.setString(4, dateLast);
                },

                (rs, rowNum) ->
                        new Sales(
                                rs.getString("idSales"),
                                rs.getDate("date"),
                                rs.getString("name"),
                                rs.getString("customer"),
                                rs.getDouble("discount"),
                                rs.getString("status"),
                                null,
                                0,
                                0,
                                0
                        ));
        for (Sales sales:salesList){
            sales.setProductList(jdbcTemplate.query("SELECT p.*, sd.qty, p.price*sd.qty as totalPrice FROM salesdetail sd," +
                            " product p WHERE sd.codeProduct=p.code AND sd.idSales=?",
                    preparedStatement -> preparedStatement.setString(1,sales.getIdSales()),
                    (rs,rowNum)->
                            new Product(
                                    rs.getString("code"),
                                    rs.getString("nameProduct"),
                                    rs.getInt("price"),
                                    rs.getInt("stock"),
                                    rs.getString("status"),
                                    rs.getInt("qty"),
                                    rs.getInt("totalPrice")

                            )));
            sales.setGross();
            sales.setTax();
            sales.setInvoice();
        }
        return salesList;
    }

    @Override
    public List<Sales> findAllWithOutPaging(String id, String dateFirst, String dateLast) {
        List<Sales> salesList;
        salesList = jdbcTemplate.query("SELECT s.*, u.name FROM sales s, user u WHERE u.id=s.distributor AND " +
                        "s.distributor='"+id+"' AND s.date BETWEEN '"+dateFirst+"' AND '"+dateLast+"' ORDER  BY s.date ASC " ,
                (rs, rowNum) ->
                        new Sales(
                                rs.getString("idSales"),
                                rs.getDate("date"),
                                rs.getString("name"),
                                rs.getString("customer"),
                                rs.getDouble("discount"),
                                rs.getString("status"),
                                null,
                                0,
                                0,
                                0
//                                0
                        ));
        for (Sales sales:salesList){
            sales.setProductList(jdbcTemplate.query("SELECT p.*, sd.qty, p.price*sd.qty as totalPrice FROM salesdetail sd," +
                            " product p WHERE sd.codeProduct=p.code AND sd.idSales=?",
                    preparedStatement -> preparedStatement.setString(1,sales.getIdSales()),
                    (rs,rowNum)->
                            new Product(
                                    rs.getString("code"),
                                    rs.getString("nameProduct"),
                                    rs.getInt("price"),
                                    rs.getInt("stock"),
                                    rs.getString("status"),
                                    rs.getInt("qty"),
                                    rs.getInt("totalPrice")

                            )));
            sales.setGross();
            sales.setTax();
            sales.setInvoice();
        }
        return salesList;
    }

    @Override
    public Sales findById(String id) {
        Sales sales;
        sales = jdbcTemplate.query(
                "SELECT * FROM sales WHERE idSales=?",
                preparedStatement -> preparedStatement.setString(1, id),
                (rs, rowNum)->
                        new Sales(
                                rs.getString("idSales"),
                                rs.getDate("date"),
                                rs.getString("distributor"),
                                rs.getString("customer"),
                                rs.getDouble("discount"),
                                rs.getString("status"),
                                null,
                                0,
                                0,
                                0
                        )
        ).get(0);
        sales.setProductList(jdbcTemplate.query(
                "SELECT p.*, sd.*, p.price*sd.qty as totalPrice FROM salesdetail sd," +
                " product p WHERE sd.codeProduct=p.code AND sd.idSales=?",
                preparedStatement -> preparedStatement.setString(1, sales.getIdSales()),
                (rs,rowNum)->
                        new Product(
                                rs.getString("code"),
                                rs.getString("nameProduct"),
                                rs.getInt("priceProduct"),
                                rs.getInt("stock"),
                                rs.getString("status"),
                                rs.getInt("qty"),
                                rs.getInt("totalPrice")
                        )
        ));
        sales.setGross();
        sales.setTax();
        sales.setInvoice();
        return sales;
    }

    @Override
    public List<Sales> filterByProductWoPagination(String id, String nameProduct) {
        List<Sales> salesList;
        salesList = jdbcTemplate.query("SELECT * FROM sales WHERE idSales IN " +
                        "(SELECT sd.idSales FROM salesdetail sd " +
                        "JOIN product p ON sd.codeProduct=p.code " +
                        "JOIN sales sl ON sd.idSales=sl.idSales " +
                        "WHERE sl.distributor =? AND " +
                        "p.nameProduct LIKE ? OR sl.customer LIKE ?) ORDER  BY date DESC ",
                preparedStatement -> {
                    preparedStatement.setString(1, id);
                    preparedStatement.setString(2, "%"+nameProduct+"%");
                    preparedStatement.setString(3, "%"+nameProduct+"%");
                },

                (rs, rowNum) ->
                        new Sales(
                                rs.getString("idSales"),
                                rs.getDate("date"),
                                rs.getString("distributor"),
                                rs.getString("customer"),
                                rs.getDouble("discount"),
                                rs.getString("status"),
                                null,
                                0,
                                0,
                                0
//                                0
                        ));
        for (Sales sales:salesList){
            sales.setProductList(jdbcTemplate.query("SELECT p.*, sd.qty, p.price*sd.qty as totalPrice FROM salesdetail sd," +
                            " product p WHERE sd.codeProduct=p.code AND sd.idSales=?",
                    preparedStatement -> preparedStatement.setString(1,sales.getIdSales()),
                    (rs,rowNum)->
                            new Product(
                                    rs.getString("code"),
                                    rs.getString("nameProduct"),
                                    rs.getInt("price"),
                                    rs.getInt("stock"),
                                    rs.getString("status"),
                                    rs.getInt("qty"),
                                    rs.getInt("totalPrice")

                            )));
            sales.setGross();
            sales.setTax();
            sales.setInvoice();
        }
        return salesList;
    }

    @Override
    public List<Sales> filterSearchStatus(String id, String status, String nameProduct) {
        List<Sales> salesList;
        salesList = jdbcTemplate.query("SELECT * FROM sales WHERE idSales IN " +
                        "(SELECT sd.idSales FROM salesdetail sd "+
                        "JOIN product p ON sd.codeProduct=p.code " +
                        "JOIN sales sl ON sd.idSales=sl.idSales " +
                        "WHERE sl.distributor = ? AND " +
                        "p.nameProduct LIKE ? OR sl.customer LIKE ?) AND status = ? ORDER  BY date DESC ",
                preparedStatement -> {
                    preparedStatement.setString(1, id);
                    preparedStatement.setString(2, "%"+nameProduct+"%");
                    preparedStatement.setString(3, "%"+nameProduct+"%");
                    preparedStatement.setString(4, status);
                },

                (rs, rowNum) ->
                        new Sales(
                                rs.getString("idSales"),
                                rs.getDate("date"),
                                rs.getString("distributor"),
                                rs.getString("customer"),
                                rs.getDouble("discount"),
                                rs.getString("status"),
                                null,
                                0,
                                0,
                                0
//                                0
                        ));
        for (Sales sales:salesList){
            sales.setProductList(jdbcTemplate.query("SELECT p.*, sd.qty, p.price*sd.qty as totalPrice FROM salesdetail sd," +
                            " product p WHERE sd.codeProduct=p.code AND sd.idSales=?",
                    preparedStatement -> preparedStatement.setString(1,sales.getIdSales()),
                    (rs,rowNum)->
                            new Product(
                                    rs.getString("code"),
                                    rs.getString("nameProduct"),
                                    rs.getInt("price"),
                                    rs.getInt("stock"),
                                    rs.getString("status"),
                                    rs.getInt("qty"),
                                    rs.getInt("totalPrice")

                            )));
            sales.setGross();
            sales.setTax();
            sales.setInvoice();
        }
        return salesList;
    }

    @Override
    public Map<String, Object> filterByNameProduct(int page, int limit, String id, String nameProduct) {
        int numPages;
        Map<String ,Object> map = new HashMap<>();
        numPages=jdbcTemplate.queryForObject("SELECT COUNT(*) FROM sales WHERE idSales IN " +
                "(SELECT sd.idSales FROM salesdetail sd " +
                " JOIN product p ON sd.codeProduct=p.code " +
                " JOIN sales sl ON sd.idSales=sl.idSales " +
                " WHERE sl.distributor = '"+id+"' AND " +
                " p.nameProduct LIKE '%"+nameProduct+"%' OR sl.customer LIKE '%"+nameProduct+"%')" ,
                Integer.class);
        map.put("count", numPages);
        if(numPages >0){
            if (page > numPages) page = numPages;
        }
        if (page < 1) page = 1;
        int start = (page - 1) * limit;

        List<Sales> salesList;
        salesList = jdbcTemplate.query("SELECT * FROM sales WHERE idSales IN "+
                        "(SELECT sd.idSales FROM salesdetail sd " +
                        "JOIN product p ON sd.codeProduct=p.code " +
                        "JOIN sales sl ON sd.idSales=sl.idSales " +
                        "WHERE sl.distributor ='"+id+"' AND " +
                        "p.nameProduct LIKE '%"+nameProduct+"%' OR sl.customer LIKE '%"+nameProduct+"%') ORDER  BY date DESC LIMIT " + start + "," + limit + " ;",
//                preparedStatement -> {
//                    preparedStatement.setString(1, id);
//                    preparedStatement.setString(2, "%"+nameProduct+"%");
//                    preparedStatement.setString(3, "%"+nameProduct+"%");
//                },

                (rs, rowNum) ->
                        new Sales(
                                rs.getString("idSales"),
                                rs.getDate("date"),
                                rs.getString("distributor"),
                                rs.getString("customer"),
                                rs.getDouble("discount"),
                                rs.getString("status"),
                                null,
                                0,
                                0,
                                0
                        ));
        for (Sales sales:salesList){
            sales.setProductList(jdbcTemplate.query("SELECT p.*, sd.qty, p.price*sd.qty as totalPrice FROM salesdetail sd," +
                            " product p WHERE sd.codeProduct=p.code AND sd.idSales=?",
                    preparedStatement -> preparedStatement.setString(1,sales.getIdSales()),
                    (rs,rowNum)->
                            new Product(
                                    rs.getString("code"),
                                    rs.getString("nameProduct"),
                                    rs.getInt("price"),
                                    rs.getInt("stock"),
                                    rs.getString("status"),
                                    rs.getInt("qty"),
                                    rs.getInt("totalPrice")

                            )));
            sales.setGross();
            sales.setTax();
            sales.setInvoice();
        }
        map.put("salesList", salesList);
        return map;
    }


    @Override
    public int countSalesStatus(String id, String status, String dateFirst, String dateLast) {
        int countSalesStatus;
        countSalesStatus= jdbcTemplate.queryForObject("SELECT COUNT(*) as count FROM sales WHERE distributor='"+id+"' " +
                "AND status='"+status+"' AND date BETWEEN '"+dateFirst+"' AND '"+dateLast+"' ", Integer.class);
        return countSalesStatus;
    }

    @Override
    public int countSalesToday(String id, String date) {
        int countSalestoday;
        countSalestoday = jdbcTemplate.queryForObject("SELECT COUNT(*) as count FROM sales WHERE distributor='"+id+"' AND date='"+date+"'", Integer.class);
        return countSalestoday;
    }

    @Override
    public int countSalesMonth(String id, String dateFirst, String dateLast) {
        int countSalesmonth;
        countSalesmonth = jdbcTemplate.queryForObject("select COUNT(*) as count from sales where " +
                "distributor='"+id+"' AND date between '"+dateFirst+"' and '"+dateLast+"'", Integer.class);
        return countSalesmonth;
    }

    @Override
    public int countSalesUnpaidMonth(String id, String dateFirst, String dateLast, String status) {
        int countSalesUnpaidmonth;
        countSalesUnpaidmonth = jdbcTemplate.queryForObject("select COUNT(*) as count from sales where " +
                "distributor='"+id+"' AND date between '"+dateFirst+"' and '"+dateLast+"' and status='"+status+"'", Integer.class);
        return countSalesUnpaidmonth;
    }


    @Override
    public int saveSales(Sales sales) {
        UUID salesHeaderId= UUID.randomUUID();
        jdbcTemplate.update(
                "INSERT INTO sales (idSales, date, distributor, customer, discount, status) values(?,?,?,?,?,?)",
                salesHeaderId.toString(),
                sales.getDateSales(),
                sales.getDistributor(),
                sales.getCustomer(),
                sales.getDiscount(),
                sales.getStatus()
        );
        for(Product product: sales.getProductList()){
            String salesDetailId = String.valueOf(UUID.randomUUID());
            jdbcTemplate.update(
                    "INSERT INTO salesdetail (idDetail, idSales, codeProduct, qty, priceProduct) values (?,?,?,?,?)",
                    salesDetailId,
                    salesHeaderId.toString(),
                    product.getCode(),
                    product.getQty(),
                    product.getPrice()
            );
        }
        return 0;
    }

    @Override
    public void updateSales(Sales sales) {
        jdbcTemplate.update(
                "DELETE FROM salesdetail WHERE idSales=?",sales.getIdSales()
        );
        jdbcTemplate.update(
                "UPDATE sales SET status=?, discount=? WHERE idSales=?", sales.getStatus(), sales.getDiscount(), sales.getIdSales()
        );

        for(Product product: sales.getProductList()) {
            String salesDetailId = String.valueOf(UUID.randomUUID());
            jdbcTemplate.update(
                    "INSERT INTO salesdetail (idDetail, idSales, codeProduct, qty, priceProduct) values (?,?,?,?,?)",
                    salesDetailId,
                    sales.getIdSales(),
                    product.getCode(),
                    product.getQty(),
                    product.getPrice()
            );
        }

    }
}
