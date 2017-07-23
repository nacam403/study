package nacam403;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

import org.apache.commons.dbutils.QueryRunner;

public class JDBCTest {

    public static void main(String[] args) throws SQLException {
        try (Connection connection = DriverManager.getConnection("jdbc:sqlite:sample.db")) {
            QueryRunner queryRunner = new QueryRunner();
            queryRunner.update(connection, "DROP TABLE IF EXISTS PERSON");
            queryRunner.update(connection, "CREATE TABLE PERSON (Id INTEGER, Name String)");
            queryRunner.update(connection, "INSERT INTO PERSON VALUES(?, ?)", 1, "AAA");
        }
    }

}
