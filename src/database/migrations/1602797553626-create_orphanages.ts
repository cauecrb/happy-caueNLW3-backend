import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createOrphanages1602797553626 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        //realizar alteraçoes no banco
        await queryRunner.createTable(new Table({
            name: 'orfanatos',
            columns:[{
                name:'id',
                type: 'integer',
                unsigned: true,
                isPrimary: true,
                isGenerated: true,
                generationStrategy: 'increment',
            },
            {
                name: 'name',
                type: 'varchar'
            },
            {
                name:'latitude',
                type: 'varchar',
            },
            {
                name:'longitude',
                type: 'varchar',
            },
            {
                name:'sobre',
                type:'text',
            },
            {
                name:'instrucoes',
                type:'text',
            },
            {
                name: 'horas_funcionamento',
                type: 'varchar'
            },
            {
                name:'aberto_fds',
                type: 'boolean',
                default: false,
            },
            ],
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        //desfazer oque foi mudado
        await queryRunner.dropTable('orfanatos');
    }

}
