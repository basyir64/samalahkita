import '../index.css';
import { useTranslation } from 'react-i18next';

export default function PrivacyNotice() {
    const {t} = useTranslation();

    return (
        <div className='mx-auto px-6 py-6 max-w-3xl dark:text-white'>
            <div className='text-xl font-bold'>{t("privacy_title")}</div>
            {t("privacy_subtitle")}

            <div className='mt-4 font-bold'>{t("privacy_item1_heading")}</div>
            <ul className='list-disc pl-4 md:pl-7'>
                <li>{t("privacy_item1_point1")}</li>
                <li>{t("privacy_item1_point2")}</li>
                <li>{t("privacy_item1_point3")}</li>
            </ul>

            <div className='mt-6 font-bold'>{t("privacy_item2_heading")}</div>
            {t("privacy_item2_subheading1")}
            <ul className='list-disc pl-4 md:pl-7'>
                <li>{t("privacy_item2_point1")}</li>
                <li>{t("privacy_item2_point2")}</li>
                <li>{t("privacy_item2_point3")}</li>
                <li>{t("privacy_item2_point4")}</li>
            </ul>

            <div className='mt-6'>{t("privacy_item2_subheading2")}</div>
            <ul className='list-disc pl-4 md:pl-7'>
                <li>{t("privacy_item2_point5")}</li>
                <li>{t("privacy_item2_point6")}</li>
            </ul>
            <div className='mt-6'>{t("privacy_item2_subheading3")}</div>
            
            <div className='mt-6 font-bold'>{t("privacy_item3_heading")}</div>
            <ul className='list-disc pl-4 md:pl-7'>
                <li>{t("privacy_item3_point1")}</li>
                <li>{t("privacy_item3_point2")}</li>
                <li>{t("privacy_item3_point3")}</li>
            </ul>
            <div className='mt-6'>{t("privacy_item3_subheading")}</div>

            <div className='mt-6 font-bold'>{t("privacy_item4_heading")}</div>
            <ul className='list-disc pl-4 md:pl-7'>
                <li>{t("privacy_item4_point1")}</li>
                <li>{t("privacy_item4_point2")}</li>
            </ul>

            <div className='mt-6 font-bold'>{t("privacy_item5_heading")}</div>
            <ul className='list-disc pl-4 md:pl-7'>
                <li>{t("privacy_item5_point1")}</li>
                <li>{t("privacy_item5_point2")}</li>
                <li>{t("privacy_item5_point3")}</li>
            </ul>

            <div className='mt-6 font-bold'>{t("privacy_item6_heading")}</div>
            <ul className='list-disc pl-4 md:pl-7'>
                <li>{t("privacy_item6_point1")}</li>
                <li>{t("privacy_item6_point2")}</li>
            </ul>

            <div className='mt-6 font-bold'>{t("privacy_item7_heading")}</div>
            <ul className='list-disc pl-4 md:pl-7'>
                <li>{t("privacy_item7_point1")}</li>
                <li>{t("privacy_item7_point2")}</li>
            </ul>

            <div className='mt-6 font-bold'>{t("privacy_item8_heading")}</div>
            {t("privacy_item8_subheading")}
        </div>
    )
}