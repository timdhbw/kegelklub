package org.kcafglitscht.repository;

import io.r2dbc.spi.Row;
import io.r2dbc.spi.RowMetadata;
import java.util.List;
import org.kcafglitscht.domain.Bild;
import org.kcafglitscht.repository.rowmapper.BildRowMapper;
import org.kcafglitscht.repository.rowmapper.KegelclubtreffenRowMapper;
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
 * Spring Data R2DBC custom repository implementation for the Bild entity.
 */
@SuppressWarnings("unused")
class BildRepositoryInternalImpl extends SimpleR2dbcRepository<Bild, Long> implements BildRepositoryInternal {

    private final DatabaseClient db;
    private final R2dbcEntityTemplate r2dbcEntityTemplate;
    private final EntityManager entityManager;

    private final KegelclubtreffenRowMapper kegelclubtreffenMapper;
    private final BildRowMapper bildMapper;

    private static final Table entityTable = Table.aliased("bild", EntityManager.ENTITY_ALIAS);
    private static final Table kegelclubtreffenTable = Table.aliased("kegelclubtreffen", "kegelclubtreffen");

    public BildRepositoryInternalImpl(
        R2dbcEntityTemplate template,
        EntityManager entityManager,
        KegelclubtreffenRowMapper kegelclubtreffenMapper,
        BildRowMapper bildMapper,
        R2dbcEntityOperations entityOperations,
        R2dbcConverter converter
    ) {
        super(
            new MappingRelationalEntityInformation(converter.getMappingContext().getRequiredPersistentEntity(Bild.class)),
            entityOperations,
            converter
        );
        this.db = template.getDatabaseClient();
        this.r2dbcEntityTemplate = template;
        this.entityManager = entityManager;
        this.kegelclubtreffenMapper = kegelclubtreffenMapper;
        this.bildMapper = bildMapper;
    }

    @Override
    public Flux<Bild> findAllBy(Pageable pageable) {
        return createQuery(pageable, null).all();
    }

    RowsFetchSpec<Bild> createQuery(Pageable pageable, Condition whereClause) {
        List<Expression> columns = BildSqlHelper.getColumns(entityTable, EntityManager.ENTITY_ALIAS);
        columns.addAll(KegelclubtreffenSqlHelper.getColumns(kegelclubtreffenTable, "kegelclubtreffen"));
        SelectFromAndJoinCondition selectFrom = Select.builder()
            .select(columns)
            .from(entityTable)
            .leftOuterJoin(kegelclubtreffenTable)
            .on(Column.create("kegelclubtreffen_id", entityTable))
            .equals(Column.create("id", kegelclubtreffenTable));
        // we do not support Criteria here for now as of https://github.com/jhipster/generator-jhipster/issues/18269
        String select = entityManager.createSelect(selectFrom, Bild.class, pageable, whereClause);
        return db.sql(select).map(this::process);
    }

    @Override
    public Flux<Bild> findAll() {
        return findAllBy(null);
    }

    @Override
    public Mono<Bild> findById(Long id) {
        Comparison whereClause = Conditions.isEqual(entityTable.column("id"), Conditions.just(id.toString()));
        return createQuery(null, whereClause).one();
    }

    private Bild process(Row row, RowMetadata metadata) {
        Bild entity = bildMapper.apply(row, "e");
        entity.setKegelclubtreffen(kegelclubtreffenMapper.apply(row, "kegelclubtreffen"));
        return entity;
    }

    @Override
    public <S extends Bild> Mono<S> save(S entity) {
        return super.save(entity);
    }
}
