import styled from '@emotion/styled'
import Link from 'next/link'
import { I18nContext } from 'next-i18next'
import { useContext } from 'react'
import { withTranslation } from '../i18n'

function Card({ movie, t }) {
    const { API_URL } = process.env
    //  console.log({ movie });
    const { i18n: { language } } = useContext(I18nContext)

    if (!movie.genre) {
        movie.genre = {}
        movie.genre.slug = 'uncategorised'
    }

    return (
        <CardStyled>
            {movie.poster && (
                <div className="poster">
                    <img src={API_URL + movie.poster.url} alt="" />
                </div>
            )}
            <div className="body">
                <h3>{language === 'en' ? movie.title : movie.title_ar}</h3>
                <p dangerouslySetInnerHTML={{
                    __html: `${(language == 'en') ?
                        (movie.description.substring(0, 100))
                        :
                        (movie.description_ar.substring(0, 100))} ...`
                }} />

                <Link href="/movies/[genre]/[slug]" as={`/movies/${movie.genre.slug}/${movie.slug}`}>
                    <a>{t('common:More about this article')}</a>
                </Link>
            </div>
        </CardStyled>
    )
}

const CardStyled = styled.div`
    width: 100%;
    border: 1px solid #cccccc;
    margin-top: 50px;
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0 0 10px rgba(0,0,0, 0.2);
    
    .body {
        padding: 20px;
        
        h3 {
            margin-bottom: 20px;
        }
        
        p {
            color: #666666;
            line-height: 1.5;
        }
        
        a {
            display: inline-block;
            margin: 20px 0;
        }
       
    }
`

export default withTranslation()(Card)
