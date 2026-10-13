import { Category, IWorker } from "./types.js";

export function getAllWorkers(): IWorker[] {
  return [
    { id: 1, name: "Danylo", surname: "Romanovych", available: false, salary: 1000, category: Category.BusinessAnalyst },
    { id: 2, name: "Pavlo", surname: "Skoropadskyi", available: true, salary: 1500, category: Category.Designer },
    { id: 3, name: "Mykola", surname: "Mikhnovskyi", available: false, salary: 1600, category: Category.Developer },
    { id: 4, name: "Jarema", surname: "Vyshnevetskyi", available: true, salary: 1300, category: Category.ScrumMaster }
  ];
}

export function logFirstAvaliable(workers: IWorker[] = getAllWorkers()): void {
  console.log(`Кількість робітників: ${workers.length}`);
  let firstAvailable: IWorker | undefined = undefined;

  for (const currentWorker of workers) {
    if (currentWorker.available) {
      firstAvailable = currentWorker;
      break;
    }
  }

  if (firstAvailable) {
    console.log(`Перший доступний робітник: ${firstAvailable.name} ${firstAvailable.surname}`);
  } else {
    console.log("Доступних робітників немає");
  }
}

export function getWorkersSurnamesByCategory(category: Category = Category.Designer): Array<string> {
  const workers = getAllWorkers();

  return workers.filter((worker) => worker.category === category).map((worker) => worker.surname);
}

export function logWorkersNames(names: string[]): void {
  names.forEach((name) => console.log(name));
}

export function getWorkerByID(id: number): { name: string; surname: string; salary: number; available: boolean } | undefined {
  const workers = getAllWorkers();
  const worker = workers.find((w) => w.id === id);

  if (!worker) {
    return undefined;
  }

  return {
    name: worker.name,
    surname: worker.surname,
    salary: worker.salary,
    available: worker.available
  };
}

export function сheckoutWorkers(customer: string, ...workerIDs: number[]): string[] {
  console.log(`Замовник: ${customer}`)
  const availableWorkers: string[] = [];

  for (const id of workerIDs) {
    const worker = getWorkerByID(id);

    if (worker && worker.available) {
      availableWorkers.push(`${worker.name} ${worker.surname}`);
    }
  }

  return availableWorkers;
}