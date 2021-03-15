package com.nexchief.nexchiefuser.repository;

import com.nexchief.nexchiefuser.model.Product;
import com.nexchief.nexchiefuser.model.Sales;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository("salesRepository")
public class SalesRepositoryImpl implements SalesRepository{

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public List<Sales> findAll(int page, int limit, String id) {
        int numPages;
        numPages = jdbcTemplate.query("SELECT COUNT(*) as count FROM sales WHERE distributor='"+id+"'",
                (rs, rowNum) -> rs.getInt("count")).get(0);

        if (page < 1) page = 1;
        if (page > numPages) page = numPages;
        int start = (page - 1) * limit;

        List<Sales> salesList;
        salesList = jdbcTemplate.query("SELECT s.*, u.name FROM sales s, user u WHERE u.id=s.distributor AND s.distributor=? LIMIT " + start + "," + limit + ";",
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
    public int countSales(String distributor) {
        int countSales;
        countSales= jdbcTemplate.queryForObject("SELECT COUNT(*) as count FROM sales WHERE distributor='"+distributor+"'", Integer.class);
        return countSales;
    }
}
