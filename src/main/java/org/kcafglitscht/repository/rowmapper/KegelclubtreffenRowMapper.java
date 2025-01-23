package org.kcafglitscht.repository.rowmapper;

import io.r2dbc.spi.Row;
import java.time.Instant;
import java.util.function.BiFunction;
import org.kcafglitscht.domain.Kegelclubtreffen;
import org.springframework.stereotype.Service;

/**
 * Converter between {@link Row} to {@link Kegelclubtreffen}, with proper type conversions.
 */
@Service
public class KegelclubtreffenRowMapper implements BiFunction<Row, String, Kegelclubtreffen> {

    private final ColumnConverter converter;

    public KegelclubtreffenRowMapper(ColumnConverter converter) {
        this.converter = converter;
    }

    /**
     * Take a {@link Row} and a column prefix, and extract all the fields.
     * @return the {@link Kegelclubtreffen} stored in the database.
     */
    @Override
    public Kegelclubtreffen apply(Row row, String prefix) {
        Kegelclubtreffen entity = new Kegelclubtreffen();
        entity.setId(converter.fromRow(row, prefix + "_id", Long.class));
        entity.setZeitpunkt(converter.fromRow(row, prefix + "_zeitpunkt", Instant.class));
        entity.setDauer(converter.fromRow(row, prefix + "_dauer", Integer.class));
        entity.setTreffpunkt(converter.fromRow(row, prefix + "_treffpunkt", String.class));
        return entity;
    }
}
