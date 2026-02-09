interface SettingsButtonComponentProps {
    showSettings: boolean;
    toggleSettingsMenu: () => void;
}

/**
 * Erstellt eine einfache Settings Button Komponente auf der der Nutzer zwischen dem Settings Menü
 * oder Drone Editor Menü swichen kann.
 * @param controller Stellt den Controller mit Zugriff auf die Logik bereit
 * @param toggleSettingsMenu Funktion zum Wechsel des Settings Menüs
 * @returns JSX-Element der Settings Button Komponente
 */
export default function SettingsButtonComponent({
    showSettings,
    toggleSettingsMenu,
}: SettingsButtonComponentProps) {
    return (
        <button
            onClick={toggleSettingsMenu}
            className={`btn ${showSettings ? "btn-secondary" : "btn-light"} d-flex align-items-center h-100 w-100 
        rounded-0 border-2 border-end-0 border-top-0 border-secondary p-3 gap-2`}
        >
            <i className="bi bi-gear-fill" />
            <span className="fw-bold">Einstellungen</span>
        </button>
    );
}
