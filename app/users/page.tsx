import type { Metadata } from "next";
import getAllUsers from "@/utils/getAllUsers";
import Link from "next/link";

export const metadata: Metadata = {
    title: 'Users'
}


const UsersPage = async () => {
    const usersData: Promise<User[]> = getAllUsers();

    const users = await usersData;

    return (
        <section>
            <h2 className="text-2xl font-bold">
                <Link href='/'>Back to home</Link>
            </h2>

            <br />

            {users.map(user => (
                <>
                    <Link href={`users/${user.id}`} key={user.id}>{user.name}</Link>
                    <br />
                </>
            ))}
        </section>
    );
};

export default UsersPage;