package org.kcafglitscht.repository.rowmapper;

import io.r2dbc.spi.Row;
import java.time.LocalDate;
import java.util.function.BiFunction;
import org.kcafglitscht.domain.Mitgliedszeitraum;
import org.springframework.stereotype.Service;

/**
 * Converter between {@link Row} to {@link Mitgliedszeitraum}, with proper type conversions.
 */
@Service
public class MitgliedszeitraumRowMapper implements BiFunction<Row, String, Mitgliedszeitraum> {

    private final ColumnConverter converter;

    public MitgliedszeitraumRowMapper(ColumnConverter converter) {
        this.converter = converter;
    }

    /**
     * Take a {@link Row} and a column prefix, and extract all the fields.
     * @return the {@link Mitgliedszeitraum} stored in the database.
     */
    @Override
    public Mitgliedszeitraum apply(Row row, String prefix) {
        Mitgliedszeitraum entity = new Mitgliedszeitraum();
        entity.setId(converter.fromRow(row, prefix + "_id", Long.class));
        entity.setStartMitgliedschaft(converter.fromRow(row, prefix + "_start_mitgliedschaft", LocalDate.class));
        entity.setEndeMitgliedschaft(converter.fromRow(row, prefix + "_ende_mitgliedschaft", LocalDate.class));
        entity.setKeglerId(converter.fromRow(row, prefix + "_kegler_id", Long.class));
        return entity;
    }
}
