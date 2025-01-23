package org.kcafglitscht.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.validation.constraints.*;
import java.io.Serializable;
import java.time.Instant;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;

/**
 * A Bild.
 */
@Table("bild")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Bild implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @Column("id")
    private Long id;

    @Column("bildbeschreibung")
    private String bildbeschreibung;

    @Column("typ")
    private String typ;

    @NotNull(message = "must not be null")
    @Column("erstellung")
    private Instant erstellung;

    @Column("bild")
    private byte[] bild;

    @NotNull
    @Column("bild_content_type")
    private String bildContentType;

    @org.springframework.data.annotation.Transient
    @JsonIgnoreProperties(value = { "bilds", "wurfErgebnis" }, allowSetters = true)
    private Kegelclubtreffen treffen;

    @Column("treffen_id")
    private Long treffenId;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Bild id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getBildbeschreibung() {
        return this.bildbeschreibung;
    }

    public Bild bildbeschreibung(String bildbeschreibung) {
        this.setBildbeschreibung(bildbeschreibung);
        return this;
    }

    public void setBildbeschreibung(String bildbeschreibung) {
        this.bildbeschreibung = bildbeschreibung;
    }

    public String getTyp() {
        return this.typ;
    }

    public Bild typ(String typ) {
        this.setTyp(typ);
        return this;
    }

    public void setTyp(String typ) {
        this.typ = typ;
    }

    public Instant getErstellung() {
        return this.erstellung;
    }

    public Bild erstellung(Instant erstellung) {
        this.setErstellung(erstellung);
        return this;
    }

    public void setErstellung(Instant erstellung) {
        this.erstellung = erstellung;
    }

    public byte[] getBild() {
        return this.bild;
    }

    public Bild bild(byte[] bild) {
        this.setBild(bild);
        return this;
    }

    public void setBild(byte[] bild) {
        this.bild = bild;
    }

    public String getBildContentType() {
        return this.bildContentType;
    }

    public Bild bildContentType(String bildContentType) {
        this.bildContentType = bildContentType;
        return this;
    }

    public void setBildContentType(String bildContentType) {
        this.bildContentType = bildContentType;
    }

    public Kegelclubtreffen getTreffen() {
        return this.treffen;
    }

    public void setTreffen(Kegelclubtreffen kegelclubtreffen) {
        this.treffen = kegelclubtreffen;
        this.treffenId = kegelclubtreffen != null ? kegelclubtreffen.getId() : null;
    }

    public Bild treffen(Kegelclubtreffen kegelclubtreffen) {
        this.setTreffen(kegelclubtreffen);
        return this;
    }

    public Long getTreffenId() {
        return this.treffenId;
    }

    public void setTreffenId(Long kegelclubtreffen) {
        this.treffenId = kegelclubtreffen;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Bild)) {
            return false;
        }
        return getId() != null && getId().equals(((Bild) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Bild{" +
            "id=" + getId() +
            ", bildbeschreibung='" + getBildbeschreibung() + "'" +
            ", typ='" + getTyp() + "'" +
            ", erstellung='" + getErstellung() + "'" +
            ", bild='" + getBild() + "'" +
            ", bildContentType='" + getBildContentType() + "'" +
            "}";
    }
}
