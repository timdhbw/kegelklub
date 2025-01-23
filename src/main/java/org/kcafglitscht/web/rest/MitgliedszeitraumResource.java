package org.kcafglitscht.web.rest;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import org.kcafglitscht.domain.Mitgliedszeitraum;
import org.kcafglitscht.repository.MitgliedszeitraumRepository;
import org.kcafglitscht.web.rest.errors.BadRequestAlertException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.reactive.ResponseUtil;

/**
 * REST controller for managing {@link org.kcafglitscht.domain.Mitgliedszeitraum}.
 */
@RestController
@RequestMapping("/api/mitgliedszeitraums")
@Transactional
public class MitgliedszeitraumResource {

    private static final Logger LOG = LoggerFactory.getLogger(MitgliedszeitraumResource.class);

    private static final String ENTITY_NAME = "mitgliedszeitraum";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final MitgliedszeitraumRepository mitgliedszeitraumRepository;

    public MitgliedszeitraumResource(MitgliedszeitraumRepository mitgliedszeitraumRepository) {
        this.mitgliedszeitraumRepository = mitgliedszeitraumRepository;
    }

    /**
     * {@code POST  /mitgliedszeitraums} : Create a new mitgliedszeitraum.
     *
     * @param mitgliedszeitraum the mitgliedszeitraum to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new mitgliedszeitraum, or with status {@code 400 (Bad Request)} if the mitgliedszeitraum has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public Mono<ResponseEntity<Mitgliedszeitraum>> createMitgliedszeitraum(@Valid @RequestBody Mitgliedszeitraum mitgliedszeitraum)
        throws URISyntaxException {
        LOG.debug("REST request to save Mitgliedszeitraum : {}", mitgliedszeitraum);
        if (mitgliedszeitraum.getId() != null) {
            throw new BadRequestAlertException("A new mitgliedszeitraum cannot already have an ID", ENTITY_NAME, "idexists");
        }
        return mitgliedszeitraumRepository
            .save(mitgliedszeitraum)
            .map(result -> {
                try {
                    return ResponseEntity.created(new URI("/api/mitgliedszeitraums/" + result.getId()))
                        .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
                        .body(result);
                } catch (URISyntaxException e) {
                    throw new RuntimeException(e);
                }
            });
    }

    /**
     * {@code PUT  /mitgliedszeitraums/:id} : Updates an existing mitgliedszeitraum.
     *
     * @param id the id of the mitgliedszeitraum to save.
     * @param mitgliedszeitraum the mitgliedszeitraum to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated mitgliedszeitraum,
     * or with status {@code 400 (Bad Request)} if the mitgliedszeitraum is not valid,
     * or with status {@code 500 (Internal Server Error)} if the mitgliedszeitraum couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public Mono<ResponseEntity<Mitgliedszeitraum>> updateMitgliedszeitraum(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody Mitgliedszeitraum mitgliedszeitraum
    ) throws URISyntaxException {
        LOG.debug("REST request to update Mitgliedszeitraum : {}, {}", id, mitgliedszeitraum);
        if (mitgliedszeitraum.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, mitgliedszeitraum.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        return mitgliedszeitraumRepository
            .existsById(id)
            .flatMap(exists -> {
                if (!exists) {
                    return Mono.error(new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound"));
                }

                return mitgliedszeitraumRepository
                    .save(mitgliedszeitraum)
                    .switchIfEmpty(Mono.error(new ResponseStatusException(HttpStatus.NOT_FOUND)))
                    .map(result ->
                        ResponseEntity.ok()
                            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
                            .body(result)
                    );
            });
    }

    /**
     * {@code PATCH  /mitgliedszeitraums/:id} : Partial updates given fields of an existing mitgliedszeitraum, field will ignore if it is null
     *
     * @param id the id of the mitgliedszeitraum to save.
     * @param mitgliedszeitraum the mitgliedszeitraum to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated mitgliedszeitraum,
     * or with status {@code 400 (Bad Request)} if the mitgliedszeitraum is not valid,
     * or with status {@code 404 (Not Found)} if the mitgliedszeitraum is not found,
     * or with status {@code 500 (Internal Server Error)} if the mitgliedszeitraum couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public Mono<ResponseEntity<Mitgliedszeitraum>> partialUpdateMitgliedszeitraum(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody Mitgliedszeitraum mitgliedszeitraum
    ) throws URISyntaxException {
        LOG.debug("REST request to partial update Mitgliedszeitraum partially : {}, {}", id, mitgliedszeitraum);
        if (mitgliedszeitraum.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, mitgliedszeitraum.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        return mitgliedszeitraumRepository
            .existsById(id)
            .flatMap(exists -> {
                if (!exists) {
                    return Mono.error(new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound"));
                }

                Mono<Mitgliedszeitraum> result = mitgliedszeitraumRepository
                    .findById(mitgliedszeitraum.getId())
                    .map(existingMitgliedszeitraum -> {
                        if (mitgliedszeitraum.getStartMitgliedschaft() != null) {
                            existingMitgliedszeitraum.setStartMitgliedschaft(mitgliedszeitraum.getStartMitgliedschaft());
                        }
                        if (mitgliedszeitraum.getEndeMitgliedschaft() != null) {
                            existingMitgliedszeitraum.setEndeMitgliedschaft(mitgliedszeitraum.getEndeMitgliedschaft());
                        }

                        return existingMitgliedszeitraum;
                    })
                    .flatMap(mitgliedszeitraumRepository::save);

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
     * {@code GET  /mitgliedszeitraums} : get all the mitgliedszeitraums.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of mitgliedszeitraums in body.
     */
    @GetMapping(value = "", produces = MediaType.APPLICATION_JSON_VALUE)
    public Mono<List<Mitgliedszeitraum>> getAllMitgliedszeitraums() {
        LOG.debug("REST request to get all Mitgliedszeitraums");
        return mitgliedszeitraumRepository.findAll().collectList();
    }

    /**
     * {@code GET  /mitgliedszeitraums} : get all the mitgliedszeitraums as a stream.
     * @return the {@link Flux} of mitgliedszeitraums.
     */
    @GetMapping(value = "", produces = MediaType.APPLICATION_NDJSON_VALUE)
    public Flux<Mitgliedszeitraum> getAllMitgliedszeitraumsAsStream() {
        LOG.debug("REST request to get all Mitgliedszeitraums as a stream");
        return mitgliedszeitraumRepository.findAll();
    }

    /**
     * {@code GET  /mitgliedszeitraums/:id} : get the "id" mitgliedszeitraum.
     *
     * @param id the id of the mitgliedszeitraum to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the mitgliedszeitraum, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public Mono<ResponseEntity<Mitgliedszeitraum>> getMitgliedszeitraum(@PathVariable("id") Long id) {
        LOG.debug("REST request to get Mitgliedszeitraum : {}", id);
        Mono<Mitgliedszeitraum> mitgliedszeitraum = mitgliedszeitraumRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(mitgliedszeitraum);
    }

    /**
     * {@code DELETE  /mitgliedszeitraums/:id} : delete the "id" mitgliedszeitraum.
     *
     * @param id the id of the mitgliedszeitraum to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public Mono<ResponseEntity<Void>> deleteMitgliedszeitraum(@PathVariable("id") Long id) {
        LOG.debug("REST request to delete Mitgliedszeitraum : {}", id);
        return mitgliedszeitraumRepository
            .deleteById(id)
            .then(
                Mono.just(
                    ResponseEntity.noContent()
                        .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
                        .build()
                )
            );
    }
}
