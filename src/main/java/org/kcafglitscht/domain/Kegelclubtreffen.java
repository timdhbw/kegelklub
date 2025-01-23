package org.kcafglitscht.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.validation.constraints.*;
import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;

/**
 * A Kegelclubtreffen.
 */
@Table("kegelclubtreffen")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Kegelclubtreffen implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @Column("id")
    private Long id;

    @NotNull(message = "must not be null")
    @Column("zeitpunkt")
    private Instant zeitpunkt;

    @Column("dauer")
    private Integer dauer;

    @NotNull(message = "must not be null")
    @Column("treffpunkt")
    private String treffpunkt;

    @org.springframework.data.annotation.Transient
    @JsonIgnoreProperties(value = { "treffen" }, allowSetters = true)
    private Set<Bild> bilds = new HashSet<>();

    @org.springframework.data.annotation.Transient
    @JsonIgnoreProperties(value = { "kegler", "kegelclubtreffen" }, allowSetters = true)
    private Set<WurfErgebnis> wurfErgebnis = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Kegelclubtreffen id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Instant getZeitpunkt() {
        return this.zeitpunkt;
    }

    public Kegelclubtreffen zeitpunkt(Instant zeitpunkt) {
        this.setZeitpunkt(zeitpunkt);
        return this;
    }

    public void setZeitpunkt(Instant zeitpunkt) {
        this.zeitpunkt = zeitpunkt;
    }

    public Integer getDauer() {
        return this.dauer;
    }

    public Kegelclubtreffen dauer(Integer dauer) {
        this.setDauer(dauer);
        return this;
    }

    public void setDauer(Integer dauer) {
        this.dauer = dauer;
    }

    public String getTreffpunkt() {
        return this.treffpunkt;
    }

    public Kegelclubtreffen treffpunkt(String treffpunkt) {
        this.setTreffpunkt(treffpunkt);
        return this;
    }

    public void setTreffpunkt(String treffpunkt) {
        this.treffpunkt = treffpunkt;
    }

    public Set<Bild> getBilds() {
        return this.bilds;
    }

    public void setBilds(Set<Bild> bilds) {
        if (this.bilds != null) {
            this.bilds.forEach(i -> i.setTreffen(null));
        }
        if (bilds != null) {
            bilds.forEach(i -> i.setTreffen(this));
        }
        this.bilds = bilds;
    }

    public Kegelclubtreffen bilds(Set<Bild> bilds) {
        this.setBilds(bilds);
        return this;
    }

    public Kegelclubtreffen addBild(Bild bild) {
        this.bilds.add(bild);
        bild.setTreffen(this);
        return this;
    }

    public Kegelclubtreffen removeBild(Bild bild) {
        this.bilds.remove(bild);
        bild.setTreffen(null);
        return this;
    }

    public Set<WurfErgebnis> getWurfErgebnis() {
        return this.wurfErgebnis;
    }

    public void setWurfErgebnis(Set<WurfErgebnis> wurfErgebnis) {
        if (this.wurfErgebnis != null) {
            this.wurfErgebnis.forEach(i -> i.setKegelclubtreffen(null));
        }
        if (wurfErgebnis != null) {
            wurfErgebnis.forEach(i -> i.setKegelclubtreffen(this));
        }
        this.wurfErgebnis = wurfErgebnis;
    }

    public Kegelclubtreffen wurfErgebnis(Set<WurfErgebnis> wurfErgebnis) {
        this.setWurfErgebnis(wurfErgebnis);
        return this;
    }

    public Kegelclubtreffen addWurfErgebnis(WurfErgebnis wurfErgebnis) {
        this.wurfErgebnis.add(wurfErgebnis);
        wurfErgebnis.setKegelclubtreffen(this);
        return this;
    }

    public Kegelclubtreffen removeWurfErgebnis(WurfErgebnis wurfErgebnis) {
        this.wurfErgebnis.remove(wurfErgebnis);
        wurfErgebnis.setKegelclubtreffen(null);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Kegelclubtreffen)) {
            return false;
        }
        return getId() != null && getId().equals(((Kegelclubtreffen) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Kegelclubtreffen{" +
            "id=" + getId() +
            ", zeitpunkt='" + getZeitpunkt() + "'" +
            ", dauer=" + getDauer() +
            ", treffpunkt='" + getTreffpunkt() + "'" +
            "}";
    }
}
