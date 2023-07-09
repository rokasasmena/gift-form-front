export class Gift {
  id: number;
  name: string;
  childId: number;
  isEditing: boolean;

  constructor() {
    this.id = 0;
    this.name = "";
    this.childId = 0;
    this.isEditing = false;
  }
}