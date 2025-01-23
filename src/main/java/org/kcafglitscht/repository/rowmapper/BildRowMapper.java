package org.kcafglitscht.repository.rowmapper;

import io.r2dbc.spi.Row;
import java.time.Instant;
import java.util.function.BiFunction;
import org.kcafglitscht.domain.Bild;
import org.springframework.stereotype.Service;

/**
 * Converter between {@link Row} to {@link Bild}, with proper type conversions.
 */
@Service
public class BildRowMapper implements BiFunction<Row, String, Bild> {

    private final ColumnConverter converter;

    public BildRowMapper(ColumnConverter converter) {
        this.converter = converter;
    }

    /**
     * Take a {@link Row} and a column prefix, and extract all the fields.
     * @return the {@link Bild} stored in the database.
     */
    @Override
    public Bild apply(Row row, String prefix) {
        Bild entity = new Bild();
        entity.setId(converter.fromRow(row, prefix + "_id", Long.class));
        entity.setBildbeschreibung(converter.fromRow(row, prefix + "_bildbeschreibung", String.class));
        entity.setTyp(converter.fromRow(row, prefix + "_typ", String.class));
        entity.setErstellung(converter.fromRow(row, prefix + "_erstellung", Instant.class));
        entity.setBildContentType(converter.fromRow(row, prefix + "_bild_content_type", String.class));
        entity.setBild(converter.fromRow(row, prefix + "_bild", byte[].class));
        entity.setTreffenId(converter.fromRow(row, prefix + "_treffen_id", Long.class));
        return entity;
    }
}
