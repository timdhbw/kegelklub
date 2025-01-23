package org.kcafglitscht.repository;

import java.util.ArrayList;
import java.util.List;
import org.springframework.data.relational.core.sql.Column;
import org.springframework.data.relational.core.sql.Expression;
import org.springframework.data.relational.core.sql.Table;

public class KegelclubtreffenSqlHelper {

    public static List<Expression> getColumns(Table table, String columnPrefix) {
        List<Expression> columns = new ArrayList<>();
        columns.add(Column.aliased("id", table, columnPrefix + "_id"));
        columns.add(Column.aliased("zeitpunkt", table, columnPrefix + "_zeitpunkt"));
        columns.add(Column.aliased("dauer", table, columnPrefix + "_dauer"));
        columns.add(Column.aliased("treffpunkt", table, columnPrefix + "_treffpunkt"));

        return columns;
    }
}
