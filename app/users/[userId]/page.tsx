import getUser from '@/utils/getUser';
import getUserPosts from '@/utils/getUserPosts';
import { Suspense } from 'react';
import UserPosts from './components/UserPosts';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import getAllUsers from '@/utils/getAllUsers';

interface Params {
	params: {
		userId: string;
	};
}

export async function generateMetadata({
	params: { userId },
}: Params): Promise<Metadata> {
	const userData: Promise<User> = getUser(userId);
	const user = await userData;

	if (!user) {
		return {
			title: 'Error: User not found',
		};
	}

	return {
		title: user.name,
		description: `This is description for ${user.name}`,
	};
}

const UserPage = async ({ params: { userId } }: Params) => {
	const userData: Promise<User> = getUser(userId);
	const userPostsData: Promise<Post[]> = getUserPosts(userId);

	// const [user, userPosts] = await Promise.all([userData, userPostsData]);

	const user = await userData;

	if (!user) notFound();

	return (
		<div className='p-6 rounded-md shadow-md'>
			<h1 className='text-2xl font-bold mb-4'>{user.name}</h1>
			<p className='mb-2'>
				<span className='font-semibold'>Username:</span> {user.username}
			</p>
			<p className='mb-2'>
				<span className='font-semibold'>Email:</span> {user.email}
			</p>
			<p className='mb-2'>
				<span className='font-semibold'>Address:</span> {user.address.street},{' '}
				{user.address.suite}, {user.address.city}, {user.address.zipcode}
			</p>
			<p className='mb-2'>
				<span className='font-semibold'>Phone:</span> {user.phone}
			</p>
			<p className='mb-2'>
				<span className='font-semibold'>Website:</span> {user.website}
			</p>
			<p className='mb-2'>
				<span className='font-semibold'>Company:</span> {user.company.name}
			</p>
			<p>
				<span className='font-semibold'>Catch Phrase:</span>{' '}
				{user.company.catchPhrase}
			</p>

			<div>
				<h1 className='text-2xl font-bold mb-2 mt-7'>Posts</h1>
				<Suspense fallback={<h2>Loading...</h2>}>
					<UserPosts promise={userPostsData} />
				</Suspense>
			</div>
		</div>
	);
};

export async function generateStaticParams() {
	const usersData: Promise<User[]> = getAllUsers();
	const users = await usersData;

	return users.map((user) => ({
		userId: user.id.toString(),
	}));
}

export default UserPage;
