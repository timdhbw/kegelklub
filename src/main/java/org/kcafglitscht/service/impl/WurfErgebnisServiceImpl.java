package org.kcafglitscht.service.impl;

import org.kcafglitscht.domain.WurfErgebnis;
import org.kcafglitscht.repository.WurfErgebnisRepository;
import org.kcafglitscht.service.WurfErgebnisService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

/**
 * Service Implementation for managing {@link org.kcafglitscht.domain.WurfErgebnis}.
 */
@Service
@Transactional
public class WurfErgebnisServiceImpl implements WurfErgebnisService {

    private static final Logger LOG = LoggerFactory.getLogger(WurfErgebnisServiceImpl.class);

    private final WurfErgebnisRepository wurfErgebnisRepository;

    public WurfErgebnisServiceImpl(WurfErgebnisRepository wurfErgebnisRepository) {
        this.wurfErgebnisRepository = wurfErgebnisRepository;
    }

    @Override
    public Mono<WurfErgebnis> save(WurfErgebnis wurfErgebnis) {
        LOG.debug("Request to save WurfErgebnis : {}", wurfErgebnis);
        return wurfErgebnisRepository.save(wurfErgebnis);
    }

    @Override
    public Mono<WurfErgebnis> update(WurfErgebnis wurfErgebnis) {
        LOG.debug("Request to update WurfErgebnis : {}", wurfErgebnis);
        return wurfErgebnisRepository.save(wurfErgebnis);
    }

    @Override
    public Mono<WurfErgebnis> partialUpdate(WurfErgebnis wurfErgebnis) {
        LOG.debug("Request to partially update WurfErgebnis : {}", wurfErgebnis);

        return wurfErgebnisRepository
            .findById(wurfErgebnis.getId())
            .map(existingWurfErgebnis -> {
                if (wurfErgebnis.getAnzahlWuerfe() != null) {
                    existingWurfErgebnis.setAnzahlWuerfe(wurfErgebnis.getAnzahlWuerfe());
                }
                if (wurfErgebnis.getGesamtpunktzahl() != null) {
                    existingWurfErgebnis.setGesamtpunktzahl(wurfErgebnis.getGesamtpunktzahl());
                }
                if (wurfErgebnis.getPudel() != null) {
                    existingWurfErgebnis.setPudel(wurfErgebnis.getPudel());
                }
                if (wurfErgebnis.getNeuner() != null) {
                    existingWurfErgebnis.setNeuner(wurfErgebnis.getNeuner());
                }
                if (wurfErgebnis.getKraenze() != null) {
                    existingWurfErgebnis.setKraenze(wurfErgebnis.getKraenze());
                }

                return existingWurfErgebnis;
            })
            .flatMap(wurfErgebnisRepository::save);
    }

    @Override
    @Transactional(readOnly = true)
    public Flux<WurfErgebnis> findAll() {
        LOG.debug("Request to get all WurfErgebnis");
        return wurfErgebnisRepository.findAll();
    }

    public Mono<Long> countAll() {
        return wurfErgebnisRepository.count();
    }

    @Override
    @Transactional(readOnly = true)
    public Mono<WurfErgebnis> findOne(Long id) {
        LOG.debug("Request to get WurfErgebnis : {}", id);
        return wurfErgebnisRepository.findById(id);
    }

    @Override
    public Mono<Void> delete(Long id) {
        LOG.debug("Request to delete WurfErgebnis : {}", id);
        return wurfErgebnisRepository.deleteById(id);
    }
}
