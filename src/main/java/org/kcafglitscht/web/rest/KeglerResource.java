package org.kcafglitscht.web.rest;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import org.kcafglitscht.domain.Kegler;
import org.kcafglitscht.repository.KeglerRepository;
import org.kcafglitscht.service.KeglerService;
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
 * REST controller for managing {@link org.kcafglitscht.domain.Kegler}.
 */
@RestController
@RequestMapping("/api/keglers")
public class KeglerResource {

    private static final Logger LOG = LoggerFactory.getLogger(KeglerResource.class);

    private static final String ENTITY_NAME = "kegler";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final KeglerService keglerService;

    private final KeglerRepository keglerRepository;

    public KeglerResource(KeglerService keglerService, KeglerRepository keglerRepository) {
        this.keglerService = keglerService;
        this.keglerRepository = keglerRepository;
    }

    /**
     * {@code POST  /keglers} : Create a new kegler.
     *
     * @param kegler the kegler to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new kegler, or with status {@code 400 (Bad Request)} if the kegler has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public Mono<ResponseEntity<Kegler>> createKegler(@Valid @RequestBody Kegler kegler) throws URISyntaxException {
        LOG.debug("REST request to save Kegler : {}", kegler);
        if (kegler.getId() != null) {
            throw new BadRequestAlertException("A new kegler cannot already have an ID", ENTITY_NAME, "idexists");
        }
        return keglerService
            .save(kegler)
            .map(result -> {
                try {
                    return ResponseEntity.created(new URI("/api/keglers/" + result.getId()))
                        .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
                        .body(result);
                } catch (URISyntaxException e) {
                    throw new RuntimeException(e);
                }
            });
    }

    /**
     * {@code PUT  /keglers/:id} : Updates an existing kegler.
     *
     * @param id the id of the kegler to save.
     * @param kegler the kegler to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated kegler,
     * or with status {@code 400 (Bad Request)} if the kegler is not valid,
     * or with status {@code 500 (Internal Server Error)} if the kegler couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public Mono<ResponseEntity<Kegler>> updateKegler(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody Kegler kegler
    ) throws URISyntaxException {
        LOG.debug("REST request to update Kegler : {}, {}", id, kegler);
        if (kegler.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, kegler.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        return keglerRepository
            .existsById(id)
            .flatMap(exists -> {
                if (!exists) {
                    return Mono.error(new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound"));
                }

                return keglerService
                    .update(kegler)
                    .switchIfEmpty(Mono.error(new ResponseStatusException(HttpStatus.NOT_FOUND)))
                    .map(result ->
                        ResponseEntity.ok()
                            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
                            .body(result)
                    );
            });
    }

    /**
     * {@code PATCH  /keglers/:id} : Partial updates given fields of an existing kegler, field will ignore if it is null
     *
     * @param id the id of the kegler to save.
     * @param kegler the kegler to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated kegler,
     * or with status {@code 400 (Bad Request)} if the kegler is not valid,
     * or with status {@code 404 (Not Found)} if the kegler is not found,
     * or with status {@code 500 (Internal Server Error)} if the kegler couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public Mono<ResponseEntity<Kegler>> partialUpdateKegler(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody Kegler kegler
    ) throws URISyntaxException {
        LOG.debug("REST request to partial update Kegler partially : {}, {}", id, kegler);
        if (kegler.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, kegler.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        return keglerRepository
            .existsById(id)
            .flatMap(exists -> {
                if (!exists) {
                    return Mono.error(new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound"));
                }

                Mono<Kegler> result = keglerService.partialUpdate(kegler);

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
     * {@code GET  /keglers} : get all the keglers.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of keglers in body.
     */
    @GetMapping(value = "", produces = MediaType.APPLICATION_JSON_VALUE)
    public Mono<List<Kegler>> getAllKeglers() {
        LOG.debug("REST request to get all Keglers");
        return keglerService.findAll().collectList();
    }

    /**
     * {@code GET  /keglers} : get all the keglers as a stream.
     * @return the {@link Flux} of keglers.
     */
    @GetMapping(value = "", produces = MediaType.APPLICATION_NDJSON_VALUE)
    public Flux<Kegler> getAllKeglersAsStream() {
        LOG.debug("REST request to get all Keglers as a stream");
        return keglerService.findAll();
    }

    /**
     * {@code GET  /keglers/:id} : get the "id" kegler.
     *
     * @param id the id of the kegler to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the kegler, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public Mono<ResponseEntity<Kegler>> getKegler(@PathVariable("id") Long id) {
        LOG.debug("REST request to get Kegler : {}", id);
        Mono<Kegler> kegler = keglerService.findOne(id);
        return ResponseUtil.wrapOrNotFound(kegler);
    }

    /**
     * {@code DELETE  /keglers/:id} : delete the "id" kegler.
     *
     * @param id the id of the kegler to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public Mono<ResponseEntity<Void>> deleteKegler(@PathVariable("id") Long id) {
        LOG.debug("REST request to delete Kegler : {}", id);
        return keglerService
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
