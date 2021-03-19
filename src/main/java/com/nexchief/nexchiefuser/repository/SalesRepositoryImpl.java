package com.nexchief.nexchiefuser.repository;

import com.nexchief.nexchiefuser.model.Product;
import com.nexchief.nexchiefuser.model.Sales;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository("salesRepository")
public class SalesRepositoryImpl implements SalesRepository{

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public List<Sales> findAll(int page, int limit, String id) {
        int numPages;
        numPages = jdbcTemplate.query("SELECT COUNT(*) as count FROM sales WHERE distributor='"+id+"'",
                (rs, rowNum) -> rs.getInt("count")).get(0);

        if(numPages >0){
            if (page > numPages)
                page = numPages;
        }
        if (page < 1) page = 1;
        int start = (page - 1) * limit;

        List<Sales> salesList;
        salesList = jdbcTemplate.query("SELECT s.*, u.name FROM sales s, user u WHERE u.id=s.distributor AND s.distributor=? ORDER  BY s.date ASC LIMIT " + start + "," + limit + " ;",
                preparedStatement -> preparedStatement.setString(1, id),
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
    public List<Sales> filterByStatus(int page, int limit, String id, String status) {
        int numPages;
        numPages = jdbcTemplate.query("SELECT COUNT(*) as count FROM sales WHERE distributor='"+id+"' AND status= '"+status+"'",
                (rs, rowNum) -> rs.getInt("count")).get(0);

        if(numPages >0){
            if (page > numPages)
                page = numPages;
        }
        if (page < 1) page = 1;
        int start = (page - 1) * limit;

        List<Sales> salesList;
        salesList = jdbcTemplate.query("SELECT s.*, u.name FROM sales s, user u WHERE u.id=s.distributor AND s.distributor=? AND s.status=? ORDER  BY s.date ASC LIMIT " + start + "," + limit + " ;",
                preparedStatement -> {
                    preparedStatement.setString(1, id);
                    preparedStatement.setString(2, status);
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
    public List<Sales> filterByStatusWithOutPaging(String id, String status) {
        List<Sales> salesList;
        salesList = jdbcTemplate.query("SELECT s.*, u.name FROM sales s, user u WHERE u.id=s.distributor AND s.distributor=? AND s.status=? ORDER  BY s.date ASC",
                preparedStatement -> {
                    preparedStatement.setString(1, id);
                    preparedStatement.setString(2, status);
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
    public List<Sales> findAllWithOutPaging(String id) {
        List<Sales> salesList;
        salesList = jdbcTemplate.query("SELECT s.*, u.name FROM sales s, user u WHERE u.id=s.distributor AND s.distributor=? ORDER  BY s.date ASC " ,
                preparedStatement -> preparedStatement.setString(1, id),
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
                "SELECT p.*, sd.qty, p.price*sd.qty as totalPrice FROM salesdetail sd," +
                " product p WHERE sd.codeProduct=p.code AND sd.idSales=?",
                preparedStatement -> preparedStatement.setString(1, sales.getIdSales()),
                (rs,rowNum)->
                        new Product(
                                rs.getString("code"),
                                rs.getString("nameProduct"),
                                rs.getInt("price"),
                                rs.getInt("stock"),
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
    public List<Sales> filterByNameProduct(int page, int limit, String id, String nameProduct) {
        int numPages;
        numPages = jdbcTemplate.query("SELECT COUNT(*) as count FROM sales s JOIN salesdetail sd ON s.idSales=sd.idSales" +
                " JOIN product p ON sd.codeProduct=p.code WHERE p.nameProduct LIKE '%"+nameProduct+"%'" ,
                (rs, rowNum) -> rs.getInt("count")).get(0);

        if(numPages >0){
            if (page > numPages)
                page = numPages;
        }
        if (page < 1) page = 1;
        int start = (page - 1) * limit;

        List<Sales> salesList;
        salesList = jdbcTemplate.query("SELECT * FROM sales s JOIN salesdetail sd ON s.idSales=sd.idSales JOIN " +
                        "product p ON sd.codeProduct=p.code WHERE s.distributor=? AND p.nameProduct LIKE ? LIMIT " + start + "," + limit + " ;",
                preparedStatement -> {
                    preparedStatement.setString(1, id);
                    preparedStatement.setString(2, "%"+nameProduct+"%");
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
    public int countSales(String distributor) {
        int countSales;
        countSales= jdbcTemplate.queryForObject("SELECT COUNT(*) as count FROM sales WHERE distributor='"+distributor+"'", Integer.class);
        return countSales;
    }

    @Override
    public int countSalesStatus(String id, String status) {
        int countSalesStatus;
        countSalesStatus= jdbcTemplate.queryForObject("SELECT COUNT(*) as count FROM sales WHERE distributor='"+id+"' AND status='"+status+"'", Integer.class);
        return countSalesStatus;
    }

    @Override
    public int countSalesProduct(String id, String nameProduct) {
        int countSalesProd;
        countSalesProd= jdbcTemplate.queryForObject("SELECT COUNT(*) as count FROM sales s JOIN salesdetail sd ON " +
                "s.idSales=sd.idSales JOIN product p ON sd.codeProduct=p.code WHERE s.distributor='"+id+"' AND p.nameProduct LIKE '%"+nameProduct+"%'", Integer.class);
        return countSalesProd;
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
                    "INSERT INTO salesdetail (idDetail, idSales, codeProduct, qty) values (?,?,?,?)",
                    salesDetailId,
                    salesHeaderId.toString(),
                    product.getCode(),
                    product.getQty()
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
                "UPDATE sales SET status=? WHERE idSales=?", sales.getStatus(), sales.getIdSales()
        );

        for(Product product: sales.getProductList()) {
            String salesDetailId = String.valueOf(UUID.randomUUID());
            jdbcTemplate.update(
                    "INSERT INTO salesdetail (idDetail, idSales, codeProduct, qty) values (?,?,?,?)",
                    salesDetailId,
                    sales.getIdSales(),
                    product.getCode(),
                    product.getQty()
            );
        }

    }


}
