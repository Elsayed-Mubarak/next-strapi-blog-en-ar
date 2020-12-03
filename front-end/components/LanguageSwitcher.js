import { i18n, withTranslation } from '../i18n'
import styled from "@emotion/styled"
import { useContext } from 'react'
import { I18nContext } from 'next-i18next'

function LanguageSwitcher({ t }) {
    const { i18n: { language } } = useContext(I18nContext)

    return (
        <LanguageSwitcherStyled>
            <button type="button" onClick={() => {
                i18n.changeLanguage('ar');
            }}
                className={language === 'ar' ? 'is-active' : ''}>{t('AR')}</button>
            <button type="button" onClick={() => {
                i18n.changeLanguage('en');
            }}
                className={language === 'en' ? 'is-active' : ''}>{t('EN')}</button>
        </LanguageSwitcherStyled>
    )
}

const LanguageSwitcherStyled = styled.div`
    button.is-active {
        background: #000;
        color: #fff;
    }
`;

export default withTranslation()(LanguageSwitcher)
