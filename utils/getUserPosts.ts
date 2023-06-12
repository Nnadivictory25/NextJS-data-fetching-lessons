

const getUserPosts = async (userId: string) => {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)

    if (!res.ok) throw new Error('Failed to fetch user posts')

    return res.json()
};

export default getUserPosts;