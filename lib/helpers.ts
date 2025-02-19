import * as bcrypt from "bcrypt";

export async function encryptPassword(password: string) {
    try {
        if (!password) {
            throw new Error("Se necesita un password para encriptar");
        }
        const salt = await bcrypt.genSalt(10);
        return await bcrypt.hash(password, salt);
    } catch (error) {
        console.error("Error encriptando password:", error);
        throw error;
    }
}

export async function matchPassword(password: string, savedPassword: string) {
    try {
        if (!password || !savedPassword) {
            throw new Error("Se necesitan ambos passwords para comparar");
        }
        return await bcrypt.compare(password, savedPassword);
    } catch (error) {
        console.error("Error comparando password:", error);
        throw error;
    }
}

export function isValidDate(day: number, month: number, year: number): boolean {
    const date = new Date(year, month - 1, day);
    return (
        date.getFullYear() === year &&
        date.getMonth() === month - 1 &&
        date.getDate() === day
    );
}

export function calculateAge(birthdate: string): number {
    const [day, month, year] = birthdate.split('/').map(Number);

    if (!this.isValidDate(day, month, year)) {
        throw new Error('Formato de fecha inválido');
    }

    const birthDate = new Date(year, month - 1, day);
    const currentDate = new Date();

    if (birthDate > currentDate) {
        throw new Error('Ingresó una fecha futura');
    }

    let age = currentDate.getFullYear() - birthDate.getFullYear();
    const hasBirthdayOccurred =
        currentDate.getMonth() > birthDate.getMonth() ||
        (currentDate.getMonth() === birthDate.getMonth() && currentDate.getDate() >= birthDate.getDate());

    if (!hasBirthdayOccurred) {
        age--;
    }

    return age;
}

export function generateRandomUsername(firstName: string, lastName: string): string {
    const randomUsername = `${firstName[0]}${lastName[0]}_${Math.floor(Math.random() * 10000)}`;
    return randomUsername;
}
