import { GiftDto } from "./GiftDto";

export class Child {
  id: number;
  name: string;
  lastName: string;
  gifts: GiftDto[];
  isEditing: boolean;

  constructor() {
    this.id = 0;
    this.name = "";
    this.lastName = "";
    this.gifts = [];
    this.isEditing = false;
  }

  // constructor(entry: {
  //   id: number,
  //   name: string,
  //   lastName: string,
  //   gifts: GiftDto[],
  //   isEditing: boolean
  // }) {
  //   this.id = entry.id || 1;
  //   this.name = entry.name || "";
  //   this.lastName = entry.lastName || "";
  //   this.gifts = entry.gifts || [];
  //   this.isEditing = entry.isEditing || false;
  // }
}