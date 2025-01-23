package org.kcafglitscht.web.rest;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import org.kcafglitscht.domain.WurfErgebnis;
import org.kcafglitscht.repository.WurfErgebnisRepository;
import org.kcafglitscht.service.WurfErgebnisService;
import org.kcafglitscht.web.rest.errors.BadRequestAlertException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.reactive.ResponseUtil;

/**
 * REST controller for managing {@link org.kcafglitscht.domain.WurfErgebnis}.
 */
@RestController
@RequestMapping("/api/wurf-ergebnis")
public class WurfErgebnisResource {

    private static final Logger LOG = LoggerFactory.getLogger(WurfErgebnisResource.class);

    private static final String ENTITY_NAME = "wurfErgebnis";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final WurfErgebnisService wurfErgebnisService;

    private final WurfErgebnisRepository wurfErgebnisRepository;

    public WurfErgebnisResource(WurfErgebnisService wurfErgebnisService, WurfErgebnisRepository wurfErgebnisRepository) {
        this.wurfErgebnisService = wurfErgebnisService;
        this.wurfErgebnisRepository = wurfErgebnisRepository;
    }

    /**
     * {@code POST  /wurf-ergebnis} : Create a new wurfErgebnis.
     *
     * @param wurfErgebnis the wurfErgebnis to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new wurfErgebnis, or with status {@code 400 (Bad Request)} if the wurfErgebnis has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public Mono<ResponseEntity<WurfErgebnis>> createWurfErgebnis(@Valid @RequestBody WurfErgebnis wurfErgebnis) throws URISyntaxException {
        LOG.debug("REST request to save WurfErgebnis : {}", wurfErgebnis);
        if (wurfErgebnis.getId() != null) {
            throw new BadRequestAlertException("A new wurfErgebnis cannot already have an ID", ENTITY_NAME, "idexists");
        }
        return wurfErgebnisService
            .save(wurfErgebnis)
            .map(result -> {
                try {
                    return ResponseEntity.created(new URI("/api/wurf-ergebnis/" + result.getId()))
                        .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
                        .body(result);
                } catch (URISyntaxException e) {
                    throw new RuntimeException(e);
                }
            });
    }

    /**
     * {@code PUT  /wurf-ergebnis/:id} : Updates an existing wurfErgebnis.
     *
     * @param id the id of the wurfErgebnis to save.
     * @param wurfErgebnis the wurfErgebnis to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated wurfErgebnis,
     * or with status {@code 400 (Bad Request)} if the wurfErgebnis is not valid,
     * or with status {@code 500 (Internal Server Error)} if the wurfErgebnis couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public Mono<ResponseEntity<WurfErgebnis>> updateWurfErgebnis(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody WurfErgebnis wurfErgebnis
    ) throws URISyntaxException {
        LOG.debug("REST request to update WurfErgebnis : {}, {}", id, wurfErgebnis);
        if (wurfErgebnis.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, wurfErgebnis.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        return wurfErgebnisRepository
            .existsById(id)
            .flatMap(exists -> {
                if (!exists) {
                    return Mono.error(new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound"));
                }

                return wurfErgebnisService
                    .update(wurfErgebnis)
                    .switchIfEmpty(Mono.error(new ResponseStatusException(HttpStatus.NOT_FOUND)))
                    .map(result ->
                        ResponseEntity.ok()
                            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
                            .body(result)
                    );
            });
    }

    /**
     * {@code PATCH  /wurf-ergebnis/:id} : Partial updates given fields of an existing wurfErgebnis, field will ignore if it is null
     *
     * @param id the id of the wurfErgebnis to save.
     * @param wurfErgebnis the wurfErgebnis to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated wurfErgebnis,
     * or with status {@code 400 (Bad Request)} if the wurfErgebnis is not valid,
     * or with status {@code 404 (Not Found)} if the wurfErgebnis is not found,
     * or with status {@code 500 (Internal Server Error)} if the wurfErgebnis couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public Mono<ResponseEntity<WurfErgebnis>> partialUpdateWurfErgebnis(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody WurfErgebnis wurfErgebnis
    ) throws URISyntaxException {
        LOG.debug("REST request to partial update WurfErgebnis partially : {}, {}", id, wurfErgebnis);
        if (wurfErgebnis.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, wurfErgebnis.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        return wurfErgebnisRepository
            .existsById(id)
            .flatMap(exists -> {
                if (!exists) {
                    return Mono.error(new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound"));
                }

                Mono<WurfErgebnis> result = wurfErgebnisService.partialUpdate(wurfErgebnis);

                return result
                    .switchIfEmpty(Mono.error(new ResponseStatusException(HttpStatus.NOT_FOUND)))
                    .map(res ->
                        ResponseEntity.ok()
                            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, res.getId().toString()))
                            .body(res)
                    );
            });
    }

    /**
     * {@code GET  /wurf-ergebnis} : get all the wurfErgebnis.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of wurfErgebnis in body.
     */
    @GetMapping(value = "", produces = MediaType.APPLICATION_JSON_VALUE)
    public Mono<List<WurfErgebnis>> getAllWurfErgebnis() {
        LOG.debug("REST request to get all WurfErgebnis");
        return wurfErgebnisService.findAll().collectList();
    }

    /**
     * {@code GET  /wurf-ergebnis} : get all the wurfErgebnis as a stream.
     * @return the {@link Flux} of wurfErgebnis.
     */
    @GetMapping(value = "", produces = MediaType.APPLICATION_NDJSON_VALUE)
    public Flux<WurfErgebnis> getAllWurfErgebnisAsStream() {
        LOG.debug("REST request to get all WurfErgebnis as a stream");
        return wurfErgebnisService.findAll();
    }

    /**
     * {@code GET  /wurf-ergebnis/:id} : get the "id" wurfErgebnis.
     *
     * @param id the id of the wurfErgebnis to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the wurfErgebnis, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public Mono<ResponseEntity<WurfErgebnis>> getWurfErgebnis(@PathVariable("id") Long id) {
        LOG.debug("REST request to get WurfErgebnis : {}", id);
        Mono<WurfErgebnis> wurfErgebnis = wurfErgebnisService.findOne(id);
        return ResponseUtil.wrapOrNotFound(wurfErgebnis);
    }

    /**
     * {@code DELETE  /wurf-ergebnis/:id} : delete the "id" wurfErgebnis.
     *
     * @param id the id of the wurfErgebnis to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public Mono<ResponseEntity<Void>> deleteWurfErgebnis(@PathVariable("id") Long id) {
        LOG.debug("REST request to delete WurfErgebnis : {}", id);
        return wurfErgebnisService
            .delete(id)
            .then(
                Mono.just(
                    ResponseEntity.noContent()
                        .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
                        .build()
                )
            );
    }
}
