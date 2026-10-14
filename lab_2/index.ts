import { getAllWorkers, getWorkerByID, PrintWorker } from "./workers.js";
import { PrizeLogger, Author, Librarian } from "./types.js";
import { UniversityLibrarian, Encyclopedia } from "./classes.js";

export function lab_2(): void {
  console.log("-------- 2.1 Визначення інтерфейсу --------");
  const allWorkers = getAllWorkers();
  console.log("Кількість робітників:", allWorkers.length);

  const worker = getWorkerByID(2);
  if (worker) {
    PrintWorker(worker); // 2.1.4
  }

  console.log("\n-------- 2.2 Визначення інтерфейсів для типів функцій --------");
  // 2.2.3
  const logPrize: PrizeLogger = (prize: string): void => {
    console.log(`Приз: ${prize}`);
  };
  logPrize("Премія $500");

  console.log("\n-------- 2.3 Розширення інтерфейсів --------");
  // 2.3.4
  const favoriteAuthor: Author = { name: "Максим Шмакович", email: "maksimka@smth.ua", numBooksPublished: 15 };
  console.log("favoriteAuthor:", favoriteAuthor);

  // 2.3.5 (Закоментовано за пунктом 2.4.2)
  /*
  const favoriteLibrarian: Librarian = {
    name: "Марія Іванівна",
    email: "mariaivan@smth.ua",
    department: "Читальний зал",
    assistCustomer: (customerName: string) => console.log(`${custName} отримав допомогу`)
  };
  */

  console.log("\n-------- 2.4 Інтерфейси для типів класів --------");
  // 2.4.3
  const favoriteLibrarian: Librarian = new UniversityLibrarian();
  favoriteLibrarian.name = "Марія Іванівна";
  favoriteLibrarian.assistCustomer("Владислав");

  console.log("\n-------- 2.5 Створення та використання класів --------");
  // 2.5.2 та 2.5.4 (Закоментовано за пунктом 2.7.1)
  /*
  const ref = new ReferenceItem("TypeScript Handbook", 2024);
  ref.printItem();
  ref.publisher = "O'Reilly Media";
  console.log("Publisher:", ref.publisher);
  */

  console.log("\n-------- 2.6 Розширення класів, 2.7 Абстрактні класи --------");
  // 2.6.2
  const refBook = new Encyclopedia("Велика Українська Енциклопедія", 2023, 3);
  refBook.publisher = "Наукова думка";
  console.log("Publisher (у верхньому регістрі):", refBook.publisher);

  // 2.6.2, 2.6.3
  refBook.printItem();

  // 2.7.3
  refBook.printCitation();
}