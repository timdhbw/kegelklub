package org.kcafglitscht.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.validation.constraints.*;
import java.io.Serializable;
import java.time.LocalDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;

/**
 * A Mitgliedszeitraum.
 */
@Table("mitgliedszeitraum")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Mitgliedszeitraum implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @Column("id")
    private Long id;

    @NotNull(message = "must not be null")
    @Column("start_mitgliedschaft")
    private LocalDate startMitgliedschaft;

    @Column("ende_mitgliedschaft")
    private LocalDate endeMitgliedschaft;

    @org.springframework.data.annotation.Transient
    @JsonIgnoreProperties(value = { "mitgliedszeitraums", "wurfErgebnis" }, allowSetters = true)
    private Kegler kegler;

    @Column("kegler_id")
    private Long keglerId;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Mitgliedszeitraum id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getStartMitgliedschaft() {
        return this.startMitgliedschaft;
    }

    public Mitgliedszeitraum startMitgliedschaft(LocalDate startMitgliedschaft) {
        this.setStartMitgliedschaft(startMitgliedschaft);
        return this;
    }

    public void setStartMitgliedschaft(LocalDate startMitgliedschaft) {
        this.startMitgliedschaft = startMitgliedschaft;
    }

    public LocalDate getEndeMitgliedschaft() {
        return this.endeMitgliedschaft;
    }

    public Mitgliedszeitraum endeMitgliedschaft(LocalDate endeMitgliedschaft) {
        this.setEndeMitgliedschaft(endeMitgliedschaft);
        return this;
    }

    public void setEndeMitgliedschaft(LocalDate endeMitgliedschaft) {
        this.endeMitgliedschaft = endeMitgliedschaft;
    }

    public Kegler getKegler() {
        return this.kegler;
    }

    public void setKegler(Kegler kegler) {
        this.kegler = kegler;
        this.keglerId = kegler != null ? kegler.getId() : null;
    }

    public Mitgliedszeitraum kegler(Kegler kegler) {
        this.setKegler(kegler);
        return this;
    }

    public Long getKeglerId() {
        return this.keglerId;
    }

    public void setKeglerId(Long kegler) {
        this.keglerId = kegler;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Mitgliedszeitraum)) {
            return false;
        }
        return getId() != null && getId().equals(((Mitgliedszeitraum) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Mitgliedszeitraum{" +
            "id=" + getId() +
            ", startMitgliedschaft='" + getStartMitgliedschaft() + "'" +
            ", endeMitgliedschaft='" + getEndeMitgliedschaft() + "'" +
            "}";
    }
}
