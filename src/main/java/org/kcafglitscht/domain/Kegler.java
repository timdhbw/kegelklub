package org.kcafglitscht.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;

/**
 * A Kegler.
 */
@Table("kegler")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Kegler implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @Column("id")
    private Long id;

    @NotNull(message = "must not be null")
    @Column("name")
    private String name;

    @org.springframework.data.annotation.Transient
    @JsonIgnoreProperties(value = { "kegler" }, allowSetters = true)
    private Set<Mitgliedszeitraum> mitgliedszeitraums = new HashSet<>();

    @org.springframework.data.annotation.Transient
    @JsonIgnoreProperties(value = { "kegler", "kegelclubtreffen" }, allowSetters = true)
    private Set<WurfErgebnis> wurfErgebnis = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Kegler id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return this.name;
    }

    public Kegler name(String name) {
        this.setName(name);
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Set<Mitgliedszeitraum> getMitgliedszeitraums() {
        return this.mitgliedszeitraums;
    }

    public void setMitgliedszeitraums(Set<Mitgliedszeitraum> mitgliedszeitraums) {
        if (this.mitgliedszeitraums != null) {
            this.mitgliedszeitraums.forEach(i -> i.setKegler(null));
        }
        if (mitgliedszeitraums != null) {
            mitgliedszeitraums.forEach(i -> i.setKegler(this));
        }
        this.mitgliedszeitraums = mitgliedszeitraums;
    }

    public Kegler mitgliedszeitraums(Set<Mitgliedszeitraum> mitgliedszeitraums) {
        this.setMitgliedszeitraums(mitgliedszeitraums);
        return this;
    }

    public Kegler addMitgliedszeitraum(Mitgliedszeitraum mitgliedszeitraum) {
        this.mitgliedszeitraums.add(mitgliedszeitraum);
        mitgliedszeitraum.setKegler(this);
        return this;
    }

    public Kegler removeMitgliedszeitraum(Mitgliedszeitraum mitgliedszeitraum) {
        this.mitgliedszeitraums.remove(mitgliedszeitraum);
        mitgliedszeitraum.setKegler(null);
        return this;
    }

    public Set<WurfErgebnis> getWurfErgebnis() {
        return this.wurfErgebnis;
    }

    public void setWurfErgebnis(Set<WurfErgebnis> wurfErgebnis) {
        if (this.wurfErgebnis != null) {
            this.wurfErgebnis.forEach(i -> i.setKegler(null));
        }
        if (wurfErgebnis != null) {
            wurfErgebnis.forEach(i -> i.setKegler(this));
        }
        this.wurfErgebnis = wurfErgebnis;
    }

    public Kegler wurfErgebnis(Set<WurfErgebnis> wurfErgebnis) {
        this.setWurfErgebnis(wurfErgebnis);
        return this;
    }

    public Kegler addWurfErgebnis(WurfErgebnis wurfErgebnis) {
        this.wurfErgebnis.add(wurfErgebnis);
        wurfErgebnis.setKegler(this);
        return this;
    }

    public Kegler removeWurfErgebnis(WurfErgebnis wurfErgebnis) {
        this.wurfErgebnis.remove(wurfErgebnis);
        wurfErgebnis.setKegler(null);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Kegler)) {
            return false;
        }
        return getId() != null && getId().equals(((Kegler) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Kegler{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            "}";
    }
}
