import { Librarian } from "./types.js";

// 2.4.1
export class UniversityLibrarian implements Librarian {
  name: string = "";
  email: string = "";
  department: string = "";

  assistCustomer(customerName: string): void {
    console.log(`${this.name} is assisting ${customerName}`);
  }
}

// 2.5, 2.7
export abstract class ReferenceItem {
    // --- 2.5.1 (Закоментовано по пункту 2.5.3) ---
    /*
    title: string;
    year: number;

  constructor(newTitle: string, newYear: number) {
    console.log("Creating a new ReferenceItem ...");
    this.title = newTitle;
    this.year = newYear;
  }
  */

  // 2.5.4
  private _publisher: string = "";

  // 2.5.5
  static department: string = "Classical Literature";

  // 2.5.3
  constructor(public title: string, protected year: number) {
    console.log("Creating a new ReferenceItem ...");
  }

  // 2.5.4
  get publisher(): string {
    return this._publisher.toUpperCase();
  }

  set publisher(newPublisher: string) {
    this._publisher = newPublisher;
  }

  // 2.5.1, 2.5.5
  printItem(): void {
    console.log(`${this.title} was published in ${this.year}`);
    console.log(`Department: ${ReferenceItem.department}`);
  }

  // 2.7.2
  abstract printCitation(): void;
}

// 2.6, 2.7.3
export class Encyclopedia extends ReferenceItem {
  constructor(title: string, year: number, public edition: number) {
    super(title, year);
  }

  // 2.6.3
  override printItem(): void {
    super.printItem();
    console.log(`Edition: ${this.edition} (${this.year})`);
  }

  // 2.7.3
  printCitation(): void {
    console.log(`${this.title} - ${this.year}`);
  }
}