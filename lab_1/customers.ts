export type CustomerIdGenerator = (name: string, id: number) => string;

export function createCustomerID(name: string, id: number): string {
    return `${name}${id}`;
}

export function createCustomer(name: string, age?: number, city?: string): void {
    console.log(`Customer: ${name}`);
    if (age) { console.log(`Age: ${age}`) };
    if (city) { console.log(`City: ${city}`) };
}