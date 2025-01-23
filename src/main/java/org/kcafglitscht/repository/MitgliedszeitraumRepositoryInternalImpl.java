package org.kcafglitscht.repository;

import io.r2dbc.spi.Row;
import io.r2dbc.spi.RowMetadata;
import java.util.List;
import org.kcafglitscht.domain.Mitgliedszeitraum;
import org.kcafglitscht.repository.rowmapper.KeglerRowMapper;
import org.kcafglitscht.repository.rowmapper.MitgliedszeitraumRowMapper;
import org.springframework.data.domain.Pageable;
import org.springframework.data.r2dbc.convert.R2dbcConverter;
import org.springframework.data.r2dbc.core.R2dbcEntityOperations;
import org.springframework.data.r2dbc.core.R2dbcEntityTemplate;
import org.springframework.data.r2dbc.repository.support.SimpleR2dbcRepository;
import org.springframework.data.relational.core.sql.Column;
import org.springframework.data.relational.core.sql.Comparison;
import org.springframework.data.relational.core.sql.Condition;
import org.springframework.data.relational.core.sql.Conditions;
import org.springframework.data.relational.core.sql.Expression;
import org.springframework.data.relational.core.sql.Select;
import org.springframework.data.relational.core.sql.SelectBuilder.SelectFromAndJoinCondition;
import org.springframework.data.relational.core.sql.Table;
import org.springframework.data.relational.repository.support.MappingRelationalEntityInformation;
import org.springframework.r2dbc.core.DatabaseClient;
import org.springframework.r2dbc.core.RowsFetchSpec;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

/**
 * Spring Data R2DBC custom repository implementation for the Mitgliedszeitraum entity.
 */
@SuppressWarnings("unused")
class MitgliedszeitraumRepositoryInternalImpl
    extends SimpleR2dbcRepository<Mitgliedszeitraum, Long>
    implements MitgliedszeitraumRepositoryInternal {

    private final DatabaseClient db;
    private final R2dbcEntityTemplate r2dbcEntityTemplate;
    private final EntityManager entityManager;

    private final KeglerRowMapper keglerMapper;
    private final MitgliedszeitraumRowMapper mitgliedszeitraumMapper;

    private static final Table entityTable = Table.aliased("mitgliedszeitraum", EntityManager.ENTITY_ALIAS);
    private static final Table keglerTable = Table.aliased("kegler", "kegler");

    public MitgliedszeitraumRepositoryInternalImpl(
        R2dbcEntityTemplate template,
        EntityManager entityManager,
        KeglerRowMapper keglerMapper,
        MitgliedszeitraumRowMapper mitgliedszeitraumMapper,
        R2dbcEntityOperations entityOperations,
        R2dbcConverter converter
    ) {
        super(
            new MappingRelationalEntityInformation(converter.getMappingContext().getRequiredPersistentEntity(Mitgliedszeitraum.class)),
            entityOperations,
            converter
        );
        this.db = template.getDatabaseClient();
        this.r2dbcEntityTemplate = template;
        this.entityManager = entityManager;
        this.keglerMapper = keglerMapper;
        this.mitgliedszeitraumMapper = mitgliedszeitraumMapper;
    }

    @Override
    public Flux<Mitgliedszeitraum> findAllBy(Pageable pageable) {
        return createQuery(pageable, null).all();
    }

    RowsFetchSpec<Mitgliedszeitraum> createQuery(Pageable pageable, Condition whereClause) {
        List<Expression> columns = MitgliedszeitraumSqlHelper.getColumns(entityTable, EntityManager.ENTITY_ALIAS);
        columns.addAll(KeglerSqlHelper.getColumns(keglerTable, "kegler"));
        SelectFromAndJoinCondition selectFrom = Select.builder()
            .select(columns)
            .from(entityTable)
            .leftOuterJoin(keglerTable)
            .on(Column.create("kegler_id", entityTable))
            .equals(Column.create("id", keglerTable));
        // we do not support Criteria here for now as of https://github.com/jhipster/generator-jhipster/issues/18269
        String select = entityManager.createSelect(selectFrom, Mitgliedszeitraum.class, pageable, whereClause);
        return db.sql(select).map(this::process);
    }

    @Override
    public Flux<Mitgliedszeitraum> findAll() {
        return findAllBy(null);
    }

    @Override
    public Mono<Mitgliedszeitraum> findById(Long id) {
        Comparison whereClause = Conditions.isEqual(entityTable.column("id"), Conditions.just(id.toString()));
        return createQuery(null, whereClause).one();
    }

    private Mitgliedszeitraum process(Row row, RowMetadata metadata) {
        Mitgliedszeitraum entity = mitgliedszeitraumMapper.apply(row, "e");
        entity.setKegler(keglerMapper.apply(row, "kegler"));
        return entity;
    }

    @Override
    public <S extends Mitgliedszeitraum> Mono<S> save(S entity) {
        return super.save(entity);
    }
}
