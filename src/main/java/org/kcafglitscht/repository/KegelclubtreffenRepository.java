package org.kcafglitscht.repository;

import org.kcafglitscht.domain.Kegelclubtreffen;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

/**
 * Spring Data R2DBC repository for the Kegelclubtreffen entity.
 */
@SuppressWarnings("unused")
@Repository
public interface KegelclubtreffenRepository extends ReactiveCrudRepository<Kegelclubtreffen, Long>, KegelclubtreffenRepositoryInternal {
    @Override
    <S extends Kegelclubtreffen> Mono<S> save(S entity);

    @Override
    Flux<Kegelclubtreffen> findAll();

    @Override
    Mono<Kegelclubtreffen> findById(Long id);

    @Override
    Mono<Void> deleteById(Long id);
}

interface KegelclubtreffenRepositoryInternal {
    <S extends Kegelclubtreffen> Mono<S> save(S entity);

    Flux<Kegelclubtreffen> findAllBy(Pageable pageable);

    Flux<Kegelclubtreffen> findAll();

    Mono<Kegelclubtreffen> findById(Long id);
    // this is not supported at the moment because of https://github.com/jhipster/generator-jhipster/issues/18269
    // Flux<Kegelclubtreffen> findAllBy(Pageable pageable, Criteria criteria);
}
