import { useTranslation } from 'react-i18next';

export function useUserOptions() {
    const { t } = useTranslation();
    const ageRanges = [
        { id: 0, text: t('secret_user_input'), value: "" },
        { id: 1, text: "13-17", value: "13-17" },
        { id: 2, text: "18-25", value: "18-25" },
        { id: 3, text: "26-30", value: "26-30" },
    ];

    const genders = [
        { id: 0, text: t('female_user_input'), value: "female" },
        { id: 1, text: t('male_user_input'), value: "male" },
    ];

    const locations = [
        { id: 0, text: t('secret_user_input'), value: "" },
        { id: 1, text: "Johor", value: "johor" },
        { id: 2, text: "Kedah", value: "kedah" },
        { id: 3, text: "Kelantan", value: "kelantan" },
        { id: 4, text: "Melaka", value: "melaka" },
        { id: 5, text: "Negeri Sembilan", value: "negeri_sembilan" },
        { id: 6, text: "Pahang", value: "pahang" },
        { id: 7, text: "Penang", value: "penang" },
        { id: 8, text: "Perak", value: "perak" },
        { id: 9, text: "Perlis", value: "perlis" },
        { id: 10, text: "Sabah", value: "sabah" },
        { id: 11, text: "Sarawak", value: "sarawak" },
        { id: 12, text: "Selangor", value: "selangor" },
        { id: 13, text: "Terengganu", value: "terengganu" },
        { id: 14, text: "Kuala Lumpur", value: "kuala_lumpur" },
        { id: 15, text: "Putrajaya", value: "putrajaya" },
        { id: 16, text: "Labuan", value: "labuan" },
    ];

    const sectors = [
        { id: 0, text: t('secret_user_input'), value: "" },
        { id: 1, text: t('public_sector_user_input'), value: "public" },
        { id: 2, text: t('private_sector_user_input'), value: "private" },
        { id: 3, text: t('student_user_input'), value: "student" },
        { id: 4, text: t('housewife_user_input'), value: "housewife" },
        { id: 5, text: t('freelance_user_input'), value: "freelance" },
        { id: 6, text: t('rider_user_input'), value: "rider" },
        { id: 7, text: t('agent_user_input'), value: "agent" },
        { id: 8, text: t('business_owner_user_input'), value: "business_owner" },
        { id: 9, text: t('unemployed_user_input'), value: "unemployed" },

    ];

    const homeSearchPlaceholders = [
        { id: 0, text: "#situasi"},
        { id: 1, text: "#pengalamanHidup"},
        { id: 2, text: "#luahan"},
        { id: 3, text: "#pendapat"},
        { id: 4, text: "#masalah"},
        { id: 5, text: "#kenapaAku"},
        { id: 6, text: "#akuSorangJeKe?"},
        { id: 7, text: "#pening"},
        { id: 8, text: "#hidupMendewasakan"},
        { id: 9, text: "#susahlah"},
        { id: 10, text: "#isiHati"},
        { id: 11, text: "#pendam"},
        { id: 12, text: "#pahitmanis"},
        { id: 13, text: "#termenung"},
        { id: 14, text: "#rindu"},
        { id: 15, text: "#tips"},
        { id: 16, text: "#nasihat"},
        { id: 17, text: "#keluhan"},

    ];

    function getTranslatedGenderText(value) {
        return genders.find(g => (g.value === value)).text;
    }

    function getTranslatedSectorText(value) {
        return sectors.find(s => (s.value === value)).text;
    }

    function getLocationText(value) {
        return locations.find(l => (l.value === value)).text;
    }

    return {
        ageRanges,
        genders,
        locations,
        sectors,
        homeSearchPlaceholders,
        getTranslatedGenderText,
        getTranslatedSectorText,
        getLocationText
    }
}