import Header from 'components/Header'
import { ThemeProvider } from 'emotion-theming'
import GlobalStyles from 'components/GlobalStyles/GlobalStyles'
import theme from '../theme/theme.js'
import getConfig from 'next/config'
import fetch from 'isomorphic-unfetch'
import { DefaultSeo } from 'next-seo'
import ContextWrapper from 'components/ContextWrapper'
import { appWithTranslation } from '../i18n'
import Router from 'next/router'
import { parseCookies } from 'nookies'


import SEO from '../next-seo.config'

function MyApp({ Component, pageProps, navigation, lang }) {
    //  console.log(navigation)
    const pageDir = lang == 'en' ? "ltr" : "rtl";
    console.log("ctx.......locale.............", pageDir);

    return (
        <div dir={pageDir}>
            <DefaultSeo {...SEO} />
            <ThemeProvider theme={theme}>
                <GlobalStyles />
                <ContextWrapper navigation={navigation}>
                    <Header />
                </ContextWrapper>
                <Component {...pageProps} />
            </ThemeProvider>
        </div>
    )
}

const { publicRuntimeConfig } = getConfig()

function redirectUser(ctx, location) {
    if (ctx.req) {
        ctx.res.writeHead(302, { Location: location });
        ctx.res.end();
    } else {
        Router.push(location);
    }
}

MyApp.getInitialProps = async ({ Component, ctx }) => {

    let pageProps = {}
    const jwt = parseCookies(ctx).jwt

    const res = await fetch(`${publicRuntimeConfig.API_URL}/navigations`)
    const navigation = await res.json()

    if (Component.getInitialProps) {
        pageProps = await Component.getInitialProps(ctx)
    }

    if (!jwt) {
        if (ctx.pathname === "/payed-articles") {
            redirectUser(ctx, "/login");
        }
    }

    return {
        pageProps,
        navigation,
        lang: ctx.req.locale
    }
}

export default appWithTranslation(MyApp)
