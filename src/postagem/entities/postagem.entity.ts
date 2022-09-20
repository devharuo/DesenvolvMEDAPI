import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, MaxLength, MinLength } from "class-validator";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Comentario } from "../../comentario/entities/comentario.entity";
import { Medico } from "../../medico/entities/medico.entity";
import { Tema } from "../../tema/entities/tema.entity";

@Entity('tb_postagens')
export class Postagem {

    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number

    @ApiProperty({
        description: 'Pode conter no máximo 500 caracteres'
    })
    @IsNotEmpty()
    @MaxLength(255)
    @MinLength(20)
    @Column({ nullable: false, length: 255 })
    titulo: string

    @ApiProperty({
        description: 'Pode conter entre 20 e 5000 caracteres'
    })
    @IsNotEmpty()
    @MaxLength(5000)
    @MinLength(20)
    @Column({ nullable: false, length: 5000 })
    descricao: string

    @ApiProperty({
        description: 'Pode conter entre 10 e 500 caracteres, porém é opcional'
    })
    @IsNotEmpty()
    @MaxLength(500)
    @MinLength(10)
    @Column({ nullable: false, length: 500 })
    anexo: string

    @ApiProperty()
    @IsNotEmpty()
    @Column({ nullable: false })
    dataPostagem: Date

    @ManyToOne(() => Tema, (tema) => tema.postagens, {
        onDelete: "CASCADE"
    })
    @ApiProperty({type: () => Comentario})
    tema: Tema

    @ManyToOne(() => Medico, (medico) => medico.postagens, {
        onDelete: "CASCADE"
    })
    @ApiProperty({type: () => Medico})
    medico: Medico

    @OneToMany(() => Comentario, (comentarioReferencia) => comentarioReferencia.postagem)
    @ApiProperty({type: () => Comentario})
    comentarios: Comentario[]
}