const hello = {
    "hi": "hello",
    "en": "english",
    "sp": "bonjour"
}
exports.handler = async (event) => {
    let {lang, name, ...info} = event.queryStringParameters;
    let message = `${hello[lang] ? hello[lang] : hello["en"]} ${name}`
    const response = {
        message: message
    }
    return {
        status: 200,
        body: JSON.stringify(response)
    }
}