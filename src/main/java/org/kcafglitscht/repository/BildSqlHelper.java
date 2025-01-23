package org.kcafglitscht.repository;

import java.util.ArrayList;
import java.util.List;
import org.springframework.data.relational.core.sql.Column;
import org.springframework.data.relational.core.sql.Expression;
import org.springframework.data.relational.core.sql.Table;

public class BildSqlHelper {

    public static List<Expression> getColumns(Table table, String columnPrefix) {
        List<Expression> columns = new ArrayList<>();
        columns.add(Column.aliased("id", table, columnPrefix + "_id"));
        columns.add(Column.aliased("bildbeschreibung", table, columnPrefix + "_bildbeschreibung"));
        columns.add(Column.aliased("typ", table, columnPrefix + "_typ"));
        columns.add(Column.aliased("erstellung", table, columnPrefix + "_erstellung"));
        columns.add(Column.aliased("bild", table, columnPrefix + "_bild"));
        columns.add(Column.aliased("bild_content_type", table, columnPrefix + "_bild_content_type"));

        columns.add(Column.aliased("treffen_id", table, columnPrefix + "_treffen_id"));
        return columns;
    }
}
