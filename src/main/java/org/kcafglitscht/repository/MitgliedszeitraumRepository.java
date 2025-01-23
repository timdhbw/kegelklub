package org.kcafglitscht.repository;

import org.kcafglitscht.domain.Mitgliedszeitraum;
import org.springframework.data.domain.Pageable;
import org.springframework.data.r2dbc.repository.Query;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

/**
 * Spring Data R2DBC repository for the Mitgliedszeitraum entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MitgliedszeitraumRepository extends ReactiveCrudRepository<Mitgliedszeitraum, Long>, MitgliedszeitraumRepositoryInternal {
    @Query("SELECT * FROM mitgliedszeitraum entity WHERE entity.kegler_id = :id")
    Flux<Mitgliedszeitraum> findByKegler(Long id);

    @Query("SELECT * FROM mitgliedszeitraum entity WHERE entity.kegler_id IS NULL")
    Flux<Mitgliedszeitraum> findAllWhereKeglerIsNull();

    @Override
    <S extends Mitgliedszeitraum> Mono<S> save(S entity);

    @Override
    Flux<Mitgliedszeitraum> findAll();

    @Override
    Mono<Mitgliedszeitraum> findById(Long id);

    @Override
    Mono<Void> deleteById(Long id);
}

interface MitgliedszeitraumRepositoryInternal {
    <S extends Mitgliedszeitraum> Mono<S> save(S entity);

    Flux<Mitgliedszeitraum> findAllBy(Pageable pageable);

    Flux<Mitgliedszeitraum> findAll();

    Mono<Mitgliedszeitraum> findById(Long id);
    // this is not supported at the moment because of https://github.com/jhipster/generator-jhipster/issues/18269
    // Flux<Mitgliedszeitraum> findAllBy(Pageable pageable, Criteria criteria);
}
