package org.kcafglitscht.web.rest;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import org.kcafglitscht.domain.Kegelclubtreffen;
import org.kcafglitscht.repository.KegelclubtreffenRepository;
import org.kcafglitscht.service.KegelclubtreffenService;
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
 * REST controller for managing {@link org.kcafglitscht.domain.Kegelclubtreffen}.
 */
@RestController
@RequestMapping("/api/kegelclubtreffens")
public class KegelclubtreffenResource {

    private static final Logger LOG = LoggerFactory.getLogger(KegelclubtreffenResource.class);

    private static final String ENTITY_NAME = "kegelclubtreffen";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final KegelclubtreffenService kegelclubtreffenService;

    private final KegelclubtreffenRepository kegelclubtreffenRepository;

    public KegelclubtreffenResource(
        KegelclubtreffenService kegelclubtreffenService,
        KegelclubtreffenRepository kegelclubtreffenRepository
    ) {
        this.kegelclubtreffenService = kegelclubtreffenService;
        this.kegelclubtreffenRepository = kegelclubtreffenRepository;
    }

    /**
     * {@code POST  /kegelclubtreffens} : Create a new kegelclubtreffen.
     *
     * @param kegelclubtreffen the kegelclubtreffen to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new kegelclubtreffen, or with status {@code 400 (Bad Request)} if the kegelclubtreffen has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public Mono<ResponseEntity<Kegelclubtreffen>> createKegelclubtreffen(@Valid @RequestBody Kegelclubtreffen kegelclubtreffen)
        throws URISyntaxException {
        LOG.debug("REST request to save Kegelclubtreffen : {}", kegelclubtreffen);
        if (kegelclubtreffen.getId() != null) {
            throw new BadRequestAlertException("A new kegelclubtreffen cannot already have an ID", ENTITY_NAME, "idexists");
        }
        return kegelclubtreffenService
            .save(kegelclubtreffen)
            .map(result -> {
                try {
                    return ResponseEntity.created(new URI("/api/kegelclubtreffens/" + result.getId()))
                        .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
                        .body(result);
                } catch (URISyntaxException e) {
                    throw new RuntimeException(e);
                }
            });
    }

    /**
     * {@code PUT  /kegelclubtreffens/:id} : Updates an existing kegelclubtreffen.
     *
     * @param id the id of the kegelclubtreffen to save.
     * @param kegelclubtreffen the kegelclubtreffen to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated kegelclubtreffen,
     * or with status {@code 400 (Bad Request)} if the kegelclubtreffen is not valid,
     * or with status {@code 500 (Internal Server Error)} if the kegelclubtreffen couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public Mono<ResponseEntity<Kegelclubtreffen>> updateKegelclubtreffen(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody Kegelclubtreffen kegelclubtreffen
    ) throws URISyntaxException {
        LOG.debug("REST request to update Kegelclubtreffen : {}, {}", id, kegelclubtreffen);
        if (kegelclubtreffen.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, kegelclubtreffen.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        return kegelclubtreffenRepository
            .existsById(id)
            .flatMap(exists -> {
                if (!exists) {
                    return Mono.error(new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound"));
                }

                return kegelclubtreffenService
                    .update(kegelclubtreffen)
                    .switchIfEmpty(Mono.error(new ResponseStatusException(HttpStatus.NOT_FOUND)))
                    .map(result ->
                        ResponseEntity.ok()
                            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
                            .body(result)
                    );
            });
    }

    /**
     * {@code PATCH  /kegelclubtreffens/:id} : Partial updates given fields of an existing kegelclubtreffen, field will ignore if it is null
     *
     * @param id the id of the kegelclubtreffen to save.
     * @param kegelclubtreffen the kegelclubtreffen to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated kegelclubtreffen,
     * or with status {@code 400 (Bad Request)} if the kegelclubtreffen is not valid,
     * or with status {@code 404 (Not Found)} if the kegelclubtreffen is not found,
     * or with status {@code 500 (Internal Server Error)} if the kegelclubtreffen couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public Mono<ResponseEntity<Kegelclubtreffen>> partialUpdateKegelclubtreffen(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody Kegelclubtreffen kegelclubtreffen
    ) throws URISyntaxException {
        LOG.debug("REST request to partial update Kegelclubtreffen partially : {}, {}", id, kegelclubtreffen);
        if (kegelclubtreffen.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, kegelclubtreffen.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        return kegelclubtreffenRepository
            .existsById(id)
            .flatMap(exists -> {
                if (!exists) {
                    return Mono.error(new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound"));
                }

                Mono<Kegelclubtreffen> result = kegelclubtreffenService.partialUpdate(kegelclubtreffen);

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
     * {@code GET  /kegelclubtreffens} : get all the kegelclubtreffens.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of kegelclubtreffens in body.
     */
    @GetMapping(value = "", produces = MediaType.APPLICATION_JSON_VALUE)
    public Mono<List<Kegelclubtreffen>> getAllKegelclubtreffens() {
        LOG.debug("REST request to get all Kegelclubtreffens");
        return kegelclubtreffenService.findAll().collectList();
    }

    /**
     * {@code GET  /kegelclubtreffens} : get all the kegelclubtreffens as a stream.
     * @return the {@link Flux} of kegelclubtreffens.
     */
    @GetMapping(value = "", produces = MediaType.APPLICATION_NDJSON_VALUE)
    public Flux<Kegelclubtreffen> getAllKegelclubtreffensAsStream() {
        LOG.debug("REST request to get all Kegelclubtreffens as a stream");
        return kegelclubtreffenService.findAll();
    }

    /**
     * {@code GET  /kegelclubtreffens/:id} : get the "id" kegelclubtreffen.
     *
     * @param id the id of the kegelclubtreffen to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the kegelclubtreffen, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public Mono<ResponseEntity<Kegelclubtreffen>> getKegelclubtreffen(@PathVariable("id") Long id) {
        LOG.debug("REST request to get Kegelclubtreffen : {}", id);
        Mono<Kegelclubtreffen> kegelclubtreffen = kegelclubtreffenService.findOne(id);
        return ResponseUtil.wrapOrNotFound(kegelclubtreffen);
    }

    /**
     * {@code DELETE  /kegelclubtreffens/:id} : delete the "id" kegelclubtreffen.
     *
     * @param id the id of the kegelclubtreffen to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public Mono<ResponseEntity<Void>> deleteKegelclubtreffen(@PathVariable("id") Long id) {
        LOG.debug("REST request to delete Kegelclubtreffen : {}", id);
        return kegelclubtreffenService
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
