import fetch from 'isomorphic-unfetch'
import { Flex, Box } from 'reflexbox'
import { useRouter } from 'next/router'
import { I18nContext } from 'next-i18next'
import { useContext } from 'react'

function BlogsPage({ blogs, page, numberOfBlogs }) {
    const router = useRouter()
    // console.log(numberOfMovies)

    const lastPage = Math.ceil(numberOfloBlogs / 3)
    const { i18n: { language } } = useContext(I18nContext)

    return (
        <Box variant="container" pt={40}>
            <ul>
                {blogs.map(blog => (
                    <li key={blog.id}>
                        <h3>{language === 'en' ? blog.title : blog.title_ar}</h3>
                    </li>
                ))}
            </ul>
            <Flex mt={40} pl={20} justifyContent="space-between" maxWidth={300}>
                <button onClick={() => router.push(`/movies?page=${page - 1}`)}
                    disabled={page <= 1}>Previous</button>
                <button onClick={() => router.push(`/movies?page=${page + 1}`)}
                    disabled={page >= lastPage}>Next</button>
            </Flex>
        </Box>
    )
}

export async function getServerSideProps({ query: { page = 1 } }) {
    const { API_URL } = process.env

    const start = +page === 1 ? 0 : (+page - 1) * 3

    const numberOfBlogsResponse = await fetch(`${API_URL}/movies/count`)
    const numberOfMovies = await numberOfBlogsResponse.json()

    const res = await fetch(`${API_URL}/movies?_limit=3&_start=${start}`)
    const data = await res.json()

    return {
        props: {
            blogs: data,
            page: +page,
            numberOfBlogs
        }
    }
}

export default BlogsPage
