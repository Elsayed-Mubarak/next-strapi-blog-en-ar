import { withTranslation } from '../i18n'

function BlogPost({ t }) {
    return (

        <>
            { t('blog:Im a Blog Post')}
        </>
    )
}

export default withTranslation()(BlogPost)
