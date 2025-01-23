package org.kcafglitscht.service.impl;

import org.kcafglitscht.domain.Kegler;
import org.kcafglitscht.repository.KeglerRepository;
import org.kcafglitscht.service.KeglerService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

/**
 * Service Implementation for managing {@link org.kcafglitscht.domain.Kegler}.
 */
@Service
@Transactional
public class KeglerServiceImpl implements KeglerService {

    private static final Logger LOG = LoggerFactory.getLogger(KeglerServiceImpl.class);

    private final KeglerRepository keglerRepository;

    public KeglerServiceImpl(KeglerRepository keglerRepository) {
        this.keglerRepository = keglerRepository;
    }

    @Override
    public Mono<Kegler> save(Kegler kegler) {
        LOG.debug("Request to save Kegler : {}", kegler);
        return keglerRepository.save(kegler);
    }

    @Override
    public Mono<Kegler> update(Kegler kegler) {
        LOG.debug("Request to update Kegler : {}", kegler);
        return keglerRepository.save(kegler);
    }

    @Override
    public Mono<Kegler> partialUpdate(Kegler kegler) {
        LOG.debug("Request to partially update Kegler : {}", kegler);

        return keglerRepository
            .findById(kegler.getId())
            .map(existingKegler -> {
                if (kegler.getName() != null) {
                    existingKegler.setName(kegler.getName());
                }

                return existingKegler;
            })
            .flatMap(keglerRepository::save);
    }

    @Override
    @Transactional(readOnly = true)
    public Flux<Kegler> findAll() {
        LOG.debug("Request to get all Keglers");
        return keglerRepository.findAll();
    }

    public Mono<Long> countAll() {
        return keglerRepository.count();
    }

    @Override
    @Transactional(readOnly = true)
    public Mono<Kegler> findOne(Long id) {
        LOG.debug("Request to get Kegler : {}", id);
        return keglerRepository.findById(id);
    }

    @Override
    public Mono<Void> delete(Long id) {
        LOG.debug("Request to delete Kegler : {}", id);
        return keglerRepository.deleteById(id);
    }
}
