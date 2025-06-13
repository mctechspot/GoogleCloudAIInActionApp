import FooterConfig from "@/app/config/footer.json";

export default function Footer() {

    const startYear: number = 2025;
    const currentYear: number = new Date().getFullYear();
    const yearText: string = currentYear >  startYear ? `${startYear} - ${currentYear}` : `${currentYear}`;

    return (
        <>

            <footer id={"footer"} className={"bg-navy text-white"}>
                <div className={"footer-content"}>
                    <p className={"footer-year text-center"}>&copy; {yearText} {FooterConfig.en.app_name}</p>
                </div>
            </footer>
        </>
    );
}