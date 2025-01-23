package org.kcafglitscht.repository.rowmapper;

import io.r2dbc.spi.Row;
import java.util.function.BiFunction;
import org.kcafglitscht.domain.WurfErgebnis;
import org.springframework.stereotype.Service;

/**
 * Converter between {@link Row} to {@link WurfErgebnis}, with proper type conversions.
 */
@Service
public class WurfErgebnisRowMapper implements BiFunction<Row, String, WurfErgebnis> {

    private final ColumnConverter converter;

    public WurfErgebnisRowMapper(ColumnConverter converter) {
        this.converter = converter;
    }

    /**
     * Take a {@link Row} and a column prefix, and extract all the fields.
     * @return the {@link WurfErgebnis} stored in the database.
     */
    @Override
    public WurfErgebnis apply(Row row, String prefix) {
        WurfErgebnis entity = new WurfErgebnis();
        entity.setId(converter.fromRow(row, prefix + "_id", Long.class));
        entity.setAnzahlWuerfe(converter.fromRow(row, prefix + "_anzahl_wuerfe", Integer.class));
        entity.setGesamtpunktzahl(converter.fromRow(row, prefix + "_gesamtpunktzahl", Integer.class));
        entity.setPudel(converter.fromRow(row, prefix + "_pudel", Integer.class));
        entity.setNeuner(converter.fromRow(row, prefix + "_neuner", Integer.class));
        entity.setKraenze(converter.fromRow(row, prefix + "_kraenze", Integer.class));
        entity.setKeglerId(converter.fromRow(row, prefix + "_kegler_id", Long.class));
        entity.setKegelclubtreffenId(converter.fromRow(row, prefix + "_kegelclubtreffen_id", Long.class));
        return entity;
    }
}
