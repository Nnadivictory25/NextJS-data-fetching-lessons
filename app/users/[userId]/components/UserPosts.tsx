interface Props {
	promise: Promise<Post[]>;
}

const UserPosts = async ({ promise }: Props) => {
	const posts = await promise;

	return (
		<div>
			{posts.map((post) => (
				<article className='mb-4' key={post.id}>
					<h2 className='text-lg font-semibold'>{post.title}</h2>
					<p>{post.body}</p>
				</article>
			))}
		</div>
	);
};

export default UserPosts;
