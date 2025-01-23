package org.kcafglitscht.repository;

import java.util.ArrayList;
import java.util.List;
import org.springframework.data.relational.core.sql.Column;
import org.springframework.data.relational.core.sql.Expression;
import org.springframework.data.relational.core.sql.Table;

public class WurfErgebnisSqlHelper {

    public static List<Expression> getColumns(Table table, String columnPrefix) {
        List<Expression> columns = new ArrayList<>();
        columns.add(Column.aliased("id", table, columnPrefix + "_id"));
        columns.add(Column.aliased("anzahl_wuerfe", table, columnPrefix + "_anzahl_wuerfe"));
        columns.add(Column.aliased("gesamtpunktzahl", table, columnPrefix + "_gesamtpunktzahl"));
        columns.add(Column.aliased("pudel", table, columnPrefix + "_pudel"));
        columns.add(Column.aliased("neuner", table, columnPrefix + "_neuner"));
        columns.add(Column.aliased("kraenze", table, columnPrefix + "_kraenze"));

        columns.add(Column.aliased("kegler_id", table, columnPrefix + "_kegler_id"));
        columns.add(Column.aliased("kegelclubtreffen_id", table, columnPrefix + "_kegelclubtreffen_id"));
        return columns;
    }
}
