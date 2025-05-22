import configs from '../configs/config.json';

export function loadProfileConfig() {
    const profilePath = `../configs/${configs.active_profile}.json`;
    return require(profilePath);
}

export default { loadProfileConfig };