package org.kcafglitscht.repository;

import org.kcafglitscht.domain.Bild;
import org.springframework.data.domain.Pageable;
import org.springframework.data.r2dbc.repository.Query;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

/**
 * Spring Data R2DBC repository for the Bild entity.
 */
@SuppressWarnings("unused")
@Repository
public interface BildRepository extends ReactiveCrudRepository<Bild, Long>, BildRepositoryInternal {
    @Query("SELECT * FROM bild entity WHERE entity.treffen_id = :id")
    Flux<Bild> findByTreffen(Long id);

    @Query("SELECT * FROM bild entity WHERE entity.treffen_id IS NULL")
    Flux<Bild> findAllWhereTreffenIsNull();

    @Override
    <S extends Bild> Mono<S> save(S entity);

    @Override
    Flux<Bild> findAll();

    @Override
    Mono<Bild> findById(Long id);

    @Override
    Mono<Void> deleteById(Long id);
}

interface BildRepositoryInternal {
    <S extends Bild> Mono<S> save(S entity);

    Flux<Bild> findAllBy(Pageable pageable);

    Flux<Bild> findAll();

    Mono<Bild> findById(Long id);
    // this is not supported at the moment because of https://github.com/jhipster/generator-jhipster/issues/18269
    // Flux<Bild> findAllBy(Pageable pageable, Criteria criteria);
}
