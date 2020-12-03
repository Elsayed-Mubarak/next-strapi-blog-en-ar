import { Box, Flex } from 'reflexbox'
import getConfig from 'next/config'
import fetch from 'isomorphic-unfetch'
import { NextSeo } from 'next-seo'
import { I18nContext } from 'next-i18next'
import { useContext } from 'react'

function Blog({ blog }) {

    const SEO = {
        title: `Kware Blog | ${blog.title}`,
        description: blog.description,

        openGraph: {
            title: `Kware Blog | ${blog.title}`,
            description: blog.title,
        }
    }
    const { i18n: { language } } = useContext(I18nContext)

    return (
        
        <>
            <NextSeo {...SEO} />
            <Box variant="container">
                <Box as="h2" my={40}> {language === 'en' ? blog.title : blog.title_ar}</Box>
                <Box maxWidth={600}> <p dangerouslySetInnerHTML={{ __html: language === 'en' ? blog.description : blog.description_ar }}></p> </Box>

            </Box>
        </>
    )
}

const { publicRuntimeConfig } = getConfig()

export async function getServerSideProps(context) {
    const { slug } = context.query
    const res = await fetch(`${publicRuntimeConfig.API_URL}/movies?slug=${slug}`)
    const data = await res.json()
    return {
        props: {
            blog: data[0]
        },
    }
}

export default Blog
