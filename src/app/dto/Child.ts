import { Gift } from "./Gift";

export class Child {
  id: number;
  name: string;
  lastName: string;
  gifts: Gift[];
  isEditing: boolean;

  constructor() {
    this.id = 0;
    this.name = "";
    this.lastName = "";
    this.gifts = [];
    this.isEditing = false;
  }
}