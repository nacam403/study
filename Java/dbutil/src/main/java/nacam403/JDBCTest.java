package nacam403;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.Map;

import org.apache.commons.dbutils.BasicRowProcessor;
import org.apache.commons.dbutils.BeanProcessor;
import org.apache.commons.dbutils.QueryRunner;
import org.apache.commons.dbutils.ResultSetHandler;
import org.apache.commons.dbutils.RowProcessor;
import org.apache.commons.dbutils.handlers.BeanHandler;
import org.apache.commons.dbutils.handlers.MapHandler;
import org.apache.commons.dbutils.handlers.ScalarHandler;

public class JDBCTest {

    public static void main(String[] args) throws SQLException {
        try (Connection connection = DriverManager.getConnection("jdbc:sqlite:sample.db")) {
            QueryRunner queryRunner = new QueryRunner();
            queryRunner.update(connection, "DROP TABLE IF EXISTS Person");
            queryRunner.update(connection, "CREATE TABLE Person (Id INTEGER PRIMARY KEY AUTOINCREMENT, Name String)");
            queryRunner.update(connection, "INSERT INTO Person(name) VALUES(?)", "Taro");

            Integer personId = queryRunner.insert(connection, "INSERT INTO Person(name) VALUES(?)",
                    new ScalarHandler<>(), "Jiro");
            System.out.println("id=" + personId);

            ResultSetHandler<String> personNameHandler = new ResultSetHandler<String>() {
                @Override
                public String handle(ResultSet rs) throws SQLException {
                    if (rs.next()) {
                        return rs.getString(1);
                    }
                    return null;
                }
            };

            String name = queryRunner.query(connection, "SELECT Name FROM Person WHERE Id = ?", personNameHandler, 1);
            System.out.println(name);

            String name2 = queryRunner.query(connection, "SELECT Name FROM Person WHERE Id = ?", new ScalarHandler<>(),
                    1);
            System.out.println(name2);

            Map<String, Object> map = queryRunner.query(connection, "SELECT * FROM Person WHERE Id = ?",
                    new MapHandler(), 1);
            System.out.println(map.get("Id"));
            System.out.println(map.get("Name"));

            Person person = queryRunner.query(connection, "SELECT * FROM Person WHERE Id = ?",
                    new BeanHandler<>(Person.class), 2);
            System.out.println(person.getId());
            System.out.println(person.getName());

            Map<String, String> columnToPeroperty = new HashMap<>();
            columnToPeroperty.put("Id", "id");
            columnToPeroperty.put("Name", "fullName");
            BeanProcessor beanProcessor = new BeanProcessor(columnToPeroperty);
            RowProcessor rowProcessor = new BasicRowProcessor(beanProcessor);
            ResultSetHandler<Person2> beanHandler = new BeanHandler<>(Person2.class, rowProcessor);
            Person2 person2 = queryRunner.query(connection, "SELECT * FROM Person WHERE Id = ?", beanHandler, 2);
            System.out.println(person2.getFullName());
        }
    }

}
