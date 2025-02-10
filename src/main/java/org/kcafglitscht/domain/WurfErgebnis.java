package org.kcafglitscht.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.validation.constraints.*;
import java.io.Serializable;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;

/**
 * A WurfErgebnis.
 */
@Table("wurf_ergebnis")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class WurfErgebnis implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @Column("id")
    private Long id;

    @NotNull(message = "must not be null")
    @Column("anzahl_wuerfe")
    private Integer anzahlWuerfe;

    @NotNull(message = "must not be null")
    @Column("gesamtpunktzahl")
    private Integer gesamtpunktzahl;

    @NotNull(message = "must not be null")
    @Column("pudel")
    private Integer pudel;

    @NotNull(message = "must not be null")
    @Column("neuner")
    private Integer neuner;

    @NotNull(message = "must not be null")
    @Column("kraenze")
    private Integer kraenze;

    @org.springframework.data.annotation.Transient
    @JsonIgnoreProperties(value = { "mitgliedszeitraums", "wurfErgebnis" }, allowSetters = true)
    private Kegler kegler;

    @org.springframework.data.annotation.Transient
    @JsonIgnoreProperties(value = { "bilders", "wurfErgebnis" }, allowSetters = true)
    private Kegelclubtreffen kegelclubtreffen;

    @Column("kegler_id")
    private Long keglerId;

    @Column("kegelclubtreffen_id")
    private Long kegelclubtreffenId;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public WurfErgebnis id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getAnzahlWuerfe() {
        return this.anzahlWuerfe;
    }

    public WurfErgebnis anzahlWuerfe(Integer anzahlWuerfe) {
        this.setAnzahlWuerfe(anzahlWuerfe);
        return this;
    }

    public void setAnzahlWuerfe(Integer anzahlWuerfe) {
        this.anzahlWuerfe = anzahlWuerfe;
    }

    public Integer getGesamtpunktzahl() {
        return this.gesamtpunktzahl;
    }

    public WurfErgebnis gesamtpunktzahl(Integer gesamtpunktzahl) {
        this.setGesamtpunktzahl(gesamtpunktzahl);
        return this;
    }

    public void setGesamtpunktzahl(Integer gesamtpunktzahl) {
        this.gesamtpunktzahl = gesamtpunktzahl;
    }

    public Integer getPudel() {
        return this.pudel;
    }

    public WurfErgebnis pudel(Integer pudel) {
        this.setPudel(pudel);
        return this;
    }

    public void setPudel(Integer pudel) {
        this.pudel = pudel;
    }

    public Integer getNeuner() {
        return this.neuner;
    }

    public WurfErgebnis neuner(Integer neuner) {
        this.setNeuner(neuner);
        return this;
    }

    public void setNeuner(Integer neuner) {
        this.neuner = neuner;
    }

    public Integer getKraenze() {
        return this.kraenze;
    }

    public WurfErgebnis kraenze(Integer kraenze) {
        this.setKraenze(kraenze);
        return this;
    }

    public void setKraenze(Integer kraenze) {
        this.kraenze = kraenze;
    }

    public Kegler getKegler() {
        return this.kegler;
    }

    public void setKegler(Kegler kegler) {
        this.kegler = kegler;
        this.keglerId = kegler != null ? kegler.getId() : null;
    }

    public WurfErgebnis kegler(Kegler kegler) {
        this.setKegler(kegler);
        return this;
    }

    public Kegelclubtreffen getKegelclubtreffen() {
        return this.kegelclubtreffen;
    }

    public void setKegelclubtreffen(Kegelclubtreffen kegelclubtreffen) {
        this.kegelclubtreffen = kegelclubtreffen;
        this.kegelclubtreffenId = kegelclubtreffen != null ? kegelclubtreffen.getId() : null;
    }

    public WurfErgebnis kegelclubtreffen(Kegelclubtreffen kegelclubtreffen) {
        this.setKegelclubtreffen(kegelclubtreffen);
        return this;
    }

    public Long getKeglerId() {
        return this.keglerId;
    }

    public void setKeglerId(Long kegler) {
        this.keglerId = kegler;
    }

    public Long getKegelclubtreffenId() {
        return this.kegelclubtreffenId;
    }

    public void setKegelclubtreffenId(Long kegelclubtreffen) {
        this.kegelclubtreffenId = kegelclubtreffen;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof WurfErgebnis)) {
            return false;
        }
        return getId() != null && getId().equals(((WurfErgebnis) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "WurfErgebnis{" +
            "id=" + getId() +
            ", anzahlWuerfe=" + getAnzahlWuerfe() +
            ", gesamtpunktzahl=" + getGesamtpunktzahl() +
            ", pudel=" + getPudel() +
            ", neuner=" + getNeuner() +
            ", kraenze=" + getKraenze() +
            "}";
    }
}
