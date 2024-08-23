'use server';

import { db } from '@/prisma/db';
import { redirect } from 'next/navigation';
import bcrypt from 'bcryptjs';

export async function createUserAction(
    formState: { message: string },
    formData: FormData
) {
    console.log(formData);

    try {
        const name = formData.get('name') as string;
        const username = formData.get('username') as string;
        let password = formData.get('password') as string;

        if (!name || !username || !password) {
            return { message: 'All fields are required' };
        }

        const duplicate = await db.user.findUnique({
            where: {
                username: username
            }
        });

        if (duplicate) {
            return { message: 'That username already exists.' };
        }

        if (password.length < 5) {
            return { message: 'Password is too short.' };
        }

        password = await bcrypt.hash(password, 10);

        await db.user.create({ data: { name, username, password } });
    } catch (error) {
        return renderError(error);
    }
    redirect('/');
}

const renderError = (error: unknown): { message: string } => {
    console.log(error);
    return {
        message: error instanceof Error ? error.message : 'An error occurred'
    };
};
