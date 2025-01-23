package org.kcafglitscht.repository;

import java.util.ArrayList;
import java.util.List;
import org.springframework.data.relational.core.sql.Column;
import org.springframework.data.relational.core.sql.Expression;
import org.springframework.data.relational.core.sql.Table;

public class MitgliedszeitraumSqlHelper {

    public static List<Expression> getColumns(Table table, String columnPrefix) {
        List<Expression> columns = new ArrayList<>();
        columns.add(Column.aliased("id", table, columnPrefix + "_id"));
        columns.add(Column.aliased("start_mitgliedschaft", table, columnPrefix + "_start_mitgliedschaft"));
        columns.add(Column.aliased("ende_mitgliedschaft", table, columnPrefix + "_ende_mitgliedschaft"));

        columns.add(Column.aliased("kegler_id", table, columnPrefix + "_kegler_id"));
        return columns;
    }
}
