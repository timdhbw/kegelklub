package org.kcafglitscht.service;

import org.kcafglitscht.domain.Kegler;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

/**
 * Service Interface for managing {@link org.kcafglitscht.domain.Kegler}.
 */
public interface KeglerService {
    /**
     * Save a kegler.
     *
     * @param kegler the entity to save.
     * @return the persisted entity.
     */
    Mono<Kegler> save(Kegler kegler);

    /**
     * Updates a kegler.
     *
     * @param kegler the entity to update.
     * @return the persisted entity.
     */
    Mono<Kegler> update(Kegler kegler);

    /**
     * Partially updates a kegler.
     *
     * @param kegler the entity to update partially.
     * @return the persisted entity.
     */
    Mono<Kegler> partialUpdate(Kegler kegler);

    /**
     * Get all the keglers.
     *
     * @return the list of entities.
     */
    Flux<Kegler> findAll();

    /**
     * Returns the number of keglers available.
     * @return the number of entities in the database.
     *
     */
    Mono<Long> countAll();

    /**
     * Get the "id" kegler.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Mono<Kegler> findOne(Long id);

    /**
     * Delete the "id" kegler.
     *
     * @param id the id of the entity.
     * @return a Mono to signal the deletion
     */
    Mono<Void> delete(Long id);
}
