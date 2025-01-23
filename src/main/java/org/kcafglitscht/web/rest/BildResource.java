package org.kcafglitscht.web.rest;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import org.kcafglitscht.domain.Bild;
import org.kcafglitscht.repository.BildRepository;
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
 * REST controller for managing {@link org.kcafglitscht.domain.Bild}.
 */
@RestController
@RequestMapping("/api/bilds")
@Transactional
public class BildResource {

    private static final Logger LOG = LoggerFactory.getLogger(BildResource.class);

    private static final String ENTITY_NAME = "bild";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final BildRepository bildRepository;

    public BildResource(BildRepository bildRepository) {
        this.bildRepository = bildRepository;
    }

    /**
     * {@code POST  /bilds} : Create a new bild.
     *
     * @param bild the bild to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new bild, or with status {@code 400 (Bad Request)} if the bild has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public Mono<ResponseEntity<Bild>> createBild(@Valid @RequestBody Bild bild) throws URISyntaxException {
        LOG.debug("REST request to save Bild : {}", bild);
        if (bild.getId() != null) {
            throw new BadRequestAlertException("A new bild cannot already have an ID", ENTITY_NAME, "idexists");
        }
        return bildRepository
            .save(bild)
            .map(result -> {
                try {
                    return ResponseEntity.created(new URI("/api/bilds/" + result.getId()))
                        .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
                        .body(result);
                } catch (URISyntaxException e) {
                    throw new RuntimeException(e);
                }
            });
    }

    /**
     * {@code PUT  /bilds/:id} : Updates an existing bild.
     *
     * @param id the id of the bild to save.
     * @param bild the bild to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated bild,
     * or with status {@code 400 (Bad Request)} if the bild is not valid,
     * or with status {@code 500 (Internal Server Error)} if the bild couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public Mono<ResponseEntity<Bild>> updateBild(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody Bild bild
    ) throws URISyntaxException {
        LOG.debug("REST request to update Bild : {}, {}", id, bild);
        if (bild.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, bild.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        return bildRepository
            .existsById(id)
            .flatMap(exists -> {
                if (!exists) {
                    return Mono.error(new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound"));
                }

                return bildRepository
                    .save(bild)
                    .switchIfEmpty(Mono.error(new ResponseStatusException(HttpStatus.NOT_FOUND)))
                    .map(result ->
                        ResponseEntity.ok()
                            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
                            .body(result)
                    );
            });
    }

    /**
     * {@code PATCH  /bilds/:id} : Partial updates given fields of an existing bild, field will ignore if it is null
     *
     * @param id the id of the bild to save.
     * @param bild the bild to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated bild,
     * or with status {@code 400 (Bad Request)} if the bild is not valid,
     * or with status {@code 404 (Not Found)} if the bild is not found,
     * or with status {@code 500 (Internal Server Error)} if the bild couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public Mono<ResponseEntity<Bild>> partialUpdateBild(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody Bild bild
    ) throws URISyntaxException {
        LOG.debug("REST request to partial update Bild partially : {}, {}", id, bild);
        if (bild.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, bild.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        return bildRepository
            .existsById(id)
            .flatMap(exists -> {
                if (!exists) {
                    return Mono.error(new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound"));
                }

                Mono<Bild> result = bildRepository
                    .findById(bild.getId())
                    .map(existingBild -> {
                        if (bild.getBildbeschreibung() != null) {
                            existingBild.setBildbeschreibung(bild.getBildbeschreibung());
                        }
                        if (bild.getTyp() != null) {
                            existingBild.setTyp(bild.getTyp());
                        }
                        if (bild.getErstellung() != null) {
                            existingBild.setErstellung(bild.getErstellung());
                        }
                        if (bild.getBild() != null) {
                            existingBild.setBild(bild.getBild());
                        }
                        if (bild.getBildContentType() != null) {
                            existingBild.setBildContentType(bild.getBildContentType());
                        }

                        return existingBild;
                    })
                    .flatMap(bildRepository::save);

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
     * {@code GET  /bilds} : get all the bilds.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of bilds in body.
     */
    @GetMapping(value = "", produces = MediaType.APPLICATION_JSON_VALUE)
    public Mono<List<Bild>> getAllBilds() {
        LOG.debug("REST request to get all Bilds");
        return bildRepository.findAll().collectList();
    }

    /**
     * {@code GET  /bilds} : get all the bilds as a stream.
     * @return the {@link Flux} of bilds.
     */
    @GetMapping(value = "", produces = MediaType.APPLICATION_NDJSON_VALUE)
    public Flux<Bild> getAllBildsAsStream() {
        LOG.debug("REST request to get all Bilds as a stream");
        return bildRepository.findAll();
    }

    /**
     * {@code GET  /bilds/:id} : get the "id" bild.
     *
     * @param id the id of the bild to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the bild, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public Mono<ResponseEntity<Bild>> getBild(@PathVariable("id") Long id) {
        LOG.debug("REST request to get Bild : {}", id);
        Mono<Bild> bild = bildRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(bild);
    }

    /**
     * {@code DELETE  /bilds/:id} : delete the "id" bild.
     *
     * @param id the id of the bild to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public Mono<ResponseEntity<Void>> deleteBild(@PathVariable("id") Long id) {
        LOG.debug("REST request to delete Bild : {}", id);
        return bildRepository
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
