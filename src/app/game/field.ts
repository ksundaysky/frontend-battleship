
  enum StateOfField{
    EMPTY,
    OCCUPIED
}
export class Field{
    stateOfField: StateOfField = StateOfField.EMPTY;
    id: number;

    constructor(id:String){
      this.stateOfField = StateOfField.EMPTY;
      this.id = +id;

    }
  }

