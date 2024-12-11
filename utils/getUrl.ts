const branchName = process.env.INPUT_BRANCH?.replaceAll(/\//g, '-');

export const getUrl = (domain: string, lang: string, path: string, property: string) => {
    let url: string;
    if (branchName === 'main' || !branchName) {
        url = domain
    }
    else if (branchName === 'dev') {
        url = `https://market-dev.bridgify.io/`
    }
    else {
        url = `https://${branchName}.${process.env.INPUT_APP_ID}.amplifyapp.com/`
    }

    if (lang)
        url = `${url}${lang}/`;

    if (path)
        url = `${url}${path}`;

    const urlObj = new URL(url);

    if (branchName && branchName !== 'main')
        // url = `${url}?property=${property}`;
        urlObj.searchParams.append('property', property);

    urlObj.searchParams.append('testing', 'true');

    url = urlObj.toString().replaceAll(/^:\/\//g, '/');

    return url;
}