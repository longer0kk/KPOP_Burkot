// 2.2.1
export interface PrizeLogger {
  (prize: string): void;
}

// 2.1.1, 2.2.2
export interface Worker {
  id: number;
  name: string;
  surname: string;
  available: boolean;
  salary: number;
  markPrize?: PrizeLogger;
}

// 2.3.1
export interface Person {
  name: string;
  email: string;
}

// 2.3.2
export interface Author extends Person {
  numBooksPublished: number;
}

// 2.3.3
export interface Librarian extends Person {
  department: string;
  assistCustomer: (customerName: string) => void;
}