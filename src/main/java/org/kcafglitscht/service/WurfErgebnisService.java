package org.kcafglitscht.service;

import org.kcafglitscht.domain.WurfErgebnis;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

/**
 * Service Interface for managing {@link org.kcafglitscht.domain.WurfErgebnis}.
 */
public interface WurfErgebnisService {
    /**
     * Save a wurfErgebnis.
     *
     * @param wurfErgebnis the entity to save.
     * @return the persisted entity.
     */
    Mono<WurfErgebnis> save(WurfErgebnis wurfErgebnis);

    /**
     * Updates a wurfErgebnis.
     *
     * @param wurfErgebnis the entity to update.
     * @return the persisted entity.
     */
    Mono<WurfErgebnis> update(WurfErgebnis wurfErgebnis);

    /**
     * Partially updates a wurfErgebnis.
     *
     * @param wurfErgebnis the entity to update partially.
     * @return the persisted entity.
     */
    Mono<WurfErgebnis> partialUpdate(WurfErgebnis wurfErgebnis);

    /**
     * Get all the wurfErgebnis.
     *
     * @return the list of entities.
     */
    Flux<WurfErgebnis> findAll();

    /**
     * Returns the number of wurfErgebnis available.
     * @return the number of entities in the database.
     *
     */
    Mono<Long> countAll();

    /**
     * Get the "id" wurfErgebnis.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Mono<WurfErgebnis> findOne(Long id);

    /**
     * Delete the "id" wurfErgebnis.
     *
     * @param id the id of the entity.
     * @return a Mono to signal the deletion
     */
    Mono<Void> delete(Long id);
}
