package org.kcafglitscht.service.impl;

import org.kcafglitscht.domain.Kegelclubtreffen;
import org.kcafglitscht.repository.KegelclubtreffenRepository;
import org.kcafglitscht.service.KegelclubtreffenService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

/**
 * Service Implementation for managing {@link org.kcafglitscht.domain.Kegelclubtreffen}.
 */
@Service
@Transactional
public class KegelclubtreffenServiceImpl implements KegelclubtreffenService {

    private static final Logger LOG = LoggerFactory.getLogger(KegelclubtreffenServiceImpl.class);

    private final KegelclubtreffenRepository kegelclubtreffenRepository;

    public KegelclubtreffenServiceImpl(KegelclubtreffenRepository kegelclubtreffenRepository) {
        this.kegelclubtreffenRepository = kegelclubtreffenRepository;
    }

    @Override
    public Mono<Kegelclubtreffen> save(Kegelclubtreffen kegelclubtreffen) {
        LOG.debug("Request to save Kegelclubtreffen : {}", kegelclubtreffen);
        return kegelclubtreffenRepository.save(kegelclubtreffen);
    }

    @Override
    public Mono<Kegelclubtreffen> update(Kegelclubtreffen kegelclubtreffen) {
        LOG.debug("Request to update Kegelclubtreffen : {}", kegelclubtreffen);
        return kegelclubtreffenRepository.save(kegelclubtreffen);
    }

    @Override
    public Mono<Kegelclubtreffen> partialUpdate(Kegelclubtreffen kegelclubtreffen) {
        LOG.debug("Request to partially update Kegelclubtreffen : {}", kegelclubtreffen);

        return kegelclubtreffenRepository
            .findById(kegelclubtreffen.getId())
            .map(existingKegelclubtreffen -> {
                if (kegelclubtreffen.getZeitpunkt() != null) {
                    existingKegelclubtreffen.setZeitpunkt(kegelclubtreffen.getZeitpunkt());
                }
                if (kegelclubtreffen.getDauer() != null) {
                    existingKegelclubtreffen.setDauer(kegelclubtreffen.getDauer());
                }
                if (kegelclubtreffen.getTreffpunkt() != null) {
                    existingKegelclubtreffen.setTreffpunkt(kegelclubtreffen.getTreffpunkt());
                }

                return existingKegelclubtreffen;
            })
            .flatMap(kegelclubtreffenRepository::save);
    }

    @Override
    @Transactional(readOnly = true)
    public Flux<Kegelclubtreffen> findAll() {
        LOG.debug("Request to get all Kegelclubtreffens");
        return kegelclubtreffenRepository.findAll();
    }

    public Mono<Long> countAll() {
        return kegelclubtreffenRepository.count();
    }

    @Override
    @Transactional(readOnly = true)
    public Mono<Kegelclubtreffen> findOne(Long id) {
        LOG.debug("Request to get Kegelclubtreffen : {}", id);
        return kegelclubtreffenRepository.findById(id);
    }

    @Override
    public Mono<Void> delete(Long id) {
        LOG.debug("Request to delete Kegelclubtreffen : {}", id);
        return kegelclubtreffenRepository.deleteById(id);
    }
}
