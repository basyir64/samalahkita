import '../index.css';
import { useTranslation } from 'react-i18next';
import { useOutletContext } from 'react-router';
import { useEffect } from 'react';
import Footer from '../components/footer/Footer';

export default function Disclaimer() {
    const {t} = useTranslation();
    const { setIsFaceTitleVisible } = useOutletContext();

    useEffect(() => {
        setIsFaceTitleVisible(false);
    }, [])

    return (
        <div>
            <div className='mx-auto px-6 py-6 max-w-3xl dark:text-gray-300'>
                <div className='mb-4 text-xl font-bold'>{t("disclaimer_title")}</div>
                {t("disclaimer_subtitle")}
                <div className='mt-4 font-bold'>{t("disclaimer_item1_heading")}</div>
                {t("disclaimer_item1_subheading")}
                <ul className='list-disc pl-4 md:pl-7'>
                    <li>{t("disclaimer_item1_point1")}</li>
                    <li>{t("disclaimer_item1_point2")}</li>
                    <li>{t("disclaimer_item1_point3")}</li>
                </ul>
                <div className='mt-4 font-bold'>{t("disclaimer_item2_heading")}</div>
                {t("disclaimer_item2_subheading")}
                <ul className='list-disc pl-4 md:pl-7'>
                    <li>{t("disclaimer_item2_point1")}</li>
                    <li>{t("disclaimer_item2_point2")}</li>
                    <li>{t("disclaimer_item2_point3")}</li>
                    <li>{t("disclaimer_item2_point4")}</li>
                </ul>
                <div className='mt-4 font-bold'>{t("disclaimer_item3_heading")}</div>
                {t("disclaimer_item3_subheading")}
                <ul className='list-disc pl-4 md:pl-7'>
                    <li>{t("disclaimer_item3_point1")}</li>
                    <li>{t("disclaimer_item3_point2")}</li>
                    <li>{t("disclaimer_item3_point3")}</li>
                    <li>{t("disclaimer_item3_point4")}</li>
                </ul>
                <div className='mt-4 font-bold'>{t("disclaimer_item4_heading")}</div>
                {t("disclaimer_item4_subheading")}
                <ul className='list-disc pl-4 md:pl-7'>
                    <li>{t("disclaimer_item4_point1")}</li>
                    <li>{t("disclaimer_item4_point2")}</li>
                    <li>{t("disclaimer_item4_point3")}</li>
                    <li>{t("disclaimer_item4_point4")}</li>
                </ul>
                {/* <div className='mt-4 font-bold'>{t("disclaimer_item5_heading")}</div>
                {t("disclaimer_item5_subheading")}
                <ul className='list-disc pl-4 md:pl-7'>
                    <li>{t("disclaimer_item5_point1")}</li>
                    <li>{t("disclaimer_item5_point2")}</li>
                    <li>{t("disclaimer_item5_point3")}</li>
                    <li>{t("disclaimer_item5_point4")}</li>
                </ul> */}
                <div className='mt-4 font-bold'>{t("disclaimer_item6_heading")}</div>
                {t("disclaimer_item6_subheading")}
                <ul className='list-disc pl-4 md:pl-7'>
                    <li>{t("disclaimer_item6_point1")}</li>
                    <li>{t("disclaimer_item6_point2")}</li>
                </ul>
                <div className='mt-4 font-bold'>{t("disclaimer_item7_heading")}</div>
                {t("disclaimer_item7_subheading")}
                <ul className='list-disc pl-4 md:pl-7'>
                    <li>{t("disclaimer_item7_point1")}</li>
                    <li>{t("disclaimer_item7_point2")}</li>
                </ul>
                <div className='mt-4 font-bold'>{t("disclaimer_item8_heading")}</div>
                {t("disclaimer_item8_subheading")}
                <ul className='list-disc pl-4 md:pl-7'>
                    <li>{t("disclaimer_item8_point1")}</li>
                    <li>{t("disclaimer_item8_point2")}</li>
                </ul>
            </div>
            <Footer/>
        </div>
    );
}