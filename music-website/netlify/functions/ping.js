// Netlify Function: Health check / environment verification (CommonJS)
// GET -> /.netlify/functions/ping (or /api/ping if redirect configured)

exports.handler = async function () {
    try {
        const openaiConfigured = Boolean(process.env.OPENAI_API_KEY);
        const stripeSecretConfigured = Boolean(process.env.STRIPE_SECRET_KEY);
        const stripePublishableConfigured = Boolean(process.env.STRIPE_PUBLISHABLE_KEY);

        return {
            statusCode: 200,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                status: 'ok',
                node: process.version,
                functionsRuntime: 'netlify',
                openaiConfigured,
                stripeSecretConfigured,
                stripePublishableConfigured,
            }),
        };
    } catch (err) {
        return { statusCode: 500, body: `Ping error: ${err.message}` };
    }
};
