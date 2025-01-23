package org.kcafglitscht.repository;

import org.kcafglitscht.domain.Kegler;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

/**
 * Spring Data R2DBC repository for the Kegler entity.
 */
@SuppressWarnings("unused")
@Repository
public interface KeglerRepository extends ReactiveCrudRepository<Kegler, Long>, KeglerRepositoryInternal {
    @Override
    <S extends Kegler> Mono<S> save(S entity);

    @Override
    Flux<Kegler> findAll();

    @Override
    Mono<Kegler> findById(Long id);

    @Override
    Mono<Void> deleteById(Long id);
}

interface KeglerRepositoryInternal {
    <S extends Kegler> Mono<S> save(S entity);

    Flux<Kegler> findAllBy(Pageable pageable);

    Flux<Kegler> findAll();

    Mono<Kegler> findById(Long id);
    // this is not supported at the moment because of https://github.com/jhipster/generator-jhipster/issues/18269
    // Flux<Kegler> findAllBy(Pageable pageable, Criteria criteria);
}
