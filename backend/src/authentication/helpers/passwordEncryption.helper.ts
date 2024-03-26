import * as argon2 from "argon2"

// <------------------------Password Hashing------------------------------------->
export const hashedPassword = async (plainPassword: string): Promise<string> => {
    const hash = await argon2.hash(plainPassword);
    return hash;
}

export const verifyPassword = async (hashedPassword: string, plainPassword: string): Promise<boolean> => {
    const isPasswordCorrect = await argon2.verify(hashedPassword, plainPassword);
    if(isPasswordCorrect) {
        return true;
    } else {
        return false;
    }
}