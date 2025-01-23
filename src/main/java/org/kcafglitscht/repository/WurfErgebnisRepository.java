package org.kcafglitscht.repository;

import org.kcafglitscht.domain.WurfErgebnis;
import org.springframework.data.domain.Pageable;
import org.springframework.data.r2dbc.repository.Query;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

/**
 * Spring Data R2DBC repository for the WurfErgebnis entity.
 */
@SuppressWarnings("unused")
@Repository
public interface WurfErgebnisRepository extends ReactiveCrudRepository<WurfErgebnis, Long>, WurfErgebnisRepositoryInternal {
    @Query("SELECT * FROM wurf_ergebnis entity WHERE entity.kegler_id = :id")
    Flux<WurfErgebnis> findByKegler(Long id);

    @Query("SELECT * FROM wurf_ergebnis entity WHERE entity.kegler_id IS NULL")
    Flux<WurfErgebnis> findAllWhereKeglerIsNull();

    @Query("SELECT * FROM wurf_ergebnis entity WHERE entity.kegelclubtreffen_id = :id")
    Flux<WurfErgebnis> findByKegelclubtreffen(Long id);

    @Query("SELECT * FROM wurf_ergebnis entity WHERE entity.kegelclubtreffen_id IS NULL")
    Flux<WurfErgebnis> findAllWhereKegelclubtreffenIsNull();

    @Override
    <S extends WurfErgebnis> Mono<S> save(S entity);

    @Override
    Flux<WurfErgebnis> findAll();

    @Override
    Mono<WurfErgebnis> findById(Long id);

    @Override
    Mono<Void> deleteById(Long id);
}

interface WurfErgebnisRepositoryInternal {
    <S extends WurfErgebnis> Mono<S> save(S entity);

    Flux<WurfErgebnis> findAllBy(Pageable pageable);

    Flux<WurfErgebnis> findAll();

    Mono<WurfErgebnis> findById(Long id);
    // this is not supported at the moment because of https://github.com/jhipster/generator-jhipster/issues/18269
    // Flux<WurfErgebnis> findAllBy(Pageable pageable, Criteria criteria);
}
