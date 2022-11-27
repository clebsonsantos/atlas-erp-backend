export abstract class Base {
  public id?: string 
  public created_at?: Date 
  
  setIdAndDate(id: string, createdAt: Date): void {
    this.id = id
    this.created_at = createdAt
    Object.freeze(this)
  }
}
