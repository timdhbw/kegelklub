package org.kcafglitscht.service;

import org.kcafglitscht.domain.Kegelclubtreffen;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

/**
 * Service Interface for managing {@link org.kcafglitscht.domain.Kegelclubtreffen}.
 */
public interface KegelclubtreffenService {
    /**
     * Save a kegelclubtreffen.
     *
     * @param kegelclubtreffen the entity to save.
     * @return the persisted entity.
     */
    Mono<Kegelclubtreffen> save(Kegelclubtreffen kegelclubtreffen);

    /**
     * Updates a kegelclubtreffen.
     *
     * @param kegelclubtreffen the entity to update.
     * @return the persisted entity.
     */
    Mono<Kegelclubtreffen> update(Kegelclubtreffen kegelclubtreffen);

    /**
     * Partially updates a kegelclubtreffen.
     *
     * @param kegelclubtreffen the entity to update partially.
     * @return the persisted entity.
     */
    Mono<Kegelclubtreffen> partialUpdate(Kegelclubtreffen kegelclubtreffen);

    /**
     * Get all the kegelclubtreffens.
     *
     * @return the list of entities.
     */
    Flux<Kegelclubtreffen> findAll();

    /**
     * Returns the number of kegelclubtreffens available.
     * @return the number of entities in the database.
     *
     */
    Mono<Long> countAll();

    /**
     * Get the "id" kegelclubtreffen.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Mono<Kegelclubtreffen> findOne(Long id);

    /**
     * Delete the "id" kegelclubtreffen.
     *
     * @param id the id of the entity.
     * @return a Mono to signal the deletion
     */
    Mono<Void> delete(Long id);
}
