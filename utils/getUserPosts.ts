

const getUserPosts = async (userId: string) => {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)

    if (!res.ok) return undefined

    return res.json()
};

export default getUserPosts;