import { Column, Entity, Index, PrimaryColumn } from "typeorm";


@Entity()
export class Session {
  @Index()
  @Column("int")
  public expiredAt = Date.now();

  @PrimaryColumn("varchar", { length: 255 })
  public id = "";

  @Column("text")
  public json = "";
}