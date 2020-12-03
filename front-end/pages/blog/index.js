import { withTranslation } from '../../i18n'
import { Box } from "reflexbox"

function BlogList({ t }) {
    return (
        <Box variant="container">
            { t('blog:This is a blog page')}
        </Box>
    )
}


export async function getStaticProps() {
    const { API_URL } = process.env

    const res = await fetch(`${API_URL}/pages/2`)
    const data = await res.json()

    return {
        props: {
            page: data
        },
        revalidate: 1
    }
}



export default withTranslation()(BlogList)