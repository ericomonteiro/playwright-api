import configs from '../configs/config.js';
import {loadDefaultExport} from "./modules";

export function loadProfileConfig() {
    const profilePath = `../configs/profile_${configs.activeProfile}.js`;
    return loadDefaultExport(profilePath);
}