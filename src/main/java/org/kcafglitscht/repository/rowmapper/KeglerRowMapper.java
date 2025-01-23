package org.kcafglitscht.repository.rowmapper;

import io.r2dbc.spi.Row;
import java.util.function.BiFunction;
import org.kcafglitscht.domain.Kegler;
import org.springframework.stereotype.Service;

/**
 * Converter between {@link Row} to {@link Kegler}, with proper type conversions.
 */
@Service
public class KeglerRowMapper implements BiFunction<Row, String, Kegler> {

    private final ColumnConverter converter;

    public KeglerRowMapper(ColumnConverter converter) {
        this.converter = converter;
    }

    /**
     * Take a {@link Row} and a column prefix, and extract all the fields.
     * @return the {@link Kegler} stored in the database.
     */
    @Override
    public Kegler apply(Row row, String prefix) {
        Kegler entity = new Kegler();
        entity.setId(converter.fromRow(row, prefix + "_id", Long.class));
        entity.setName(converter.fromRow(row, prefix + "_name", String.class));
        return entity;
    }
}
